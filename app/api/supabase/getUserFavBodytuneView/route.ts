import { bodyTunePlan } from "@/types/planTypes";
import { decryptUserId } from "@/utils/encrypter";
import { createSSR } from "@/utils/supabaseSSR";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const encryptedUserId = searchParams.get("user")?.toString();
  const supabase = await createSSR();

  if (!encryptedUserId) return Response.json({ message: "No user!" });
  const decodedEncryptUserId = decodeURIComponent(encryptedUserId);
  const decryptedUserId = decryptUserId(decodedEncryptUserId);

  try {
    const { data, error } = await supabase.from("user_favorites_bodytune").select(`
      id,
      mealPlanId,
      exercisePlanId,
      created_by,
      personal_information:personal_information (
          name
      ),
      meal_plan (
          id,
          planName,
          created_by,
          visibility,
          created_by,
          personal_information (
              name
          ),
          meal_plan_tags (
              meal_tags (
                  id,
                  mealTagName
              )
          ),
          plan_visibility (
              visibility
          ),
          daily_meals (
              plan_id,
              day,
              breakFast,
              lunch,
              dinner,
              breakFast:meal!meal_plan_breakFast_fkey (
                  id, 
                  mealName,
                  mealType,
                  veganAlternative,
                  instructions,
                  mealType:meal_type (
                      mealType
                  ),
                  meal_ingredients (
                      id,
                      mealId,
                      ingredientName,
                      calories,
                      carbs,
                      fat,
                      protein
                  )  
              ),
              lunch:meal!meal_plan_lunch_fkey (
                  id, 
                  mealName,
                  mealType,
                  veganAlternative,
                  instructions,
                  mealType:meal_type (
                      mealType
                  ),
                  meal_ingredients (
                      id,
                      mealId,
                      ingredientName,
                      calories,
                      carbs,
                      fat,
                      protein
                  )  
              ),
              dinner:meal!meal_plan_dinner_fkey (
                  id, 
                  mealName,
                  mealType,
                  veganAlternative,
                  instructions,
                  mealType:meal_type (
                      mealType
                  ),
                  meal_ingredients (
                      id,
                      mealId,
                      ingredientName,
                      calories,
                      carbs,
                      fat,
                      protein
                  )  
              )
          )
      ),
      exercise_plan (
          id,
          planName,
          created_by,
          visibility,
          plan_visibility (
              visibility
          ),
          exercise_plan_tag (
              exercise_tags (
                  id,
                  exerciseTagName
              )
          ),
          created_by,
          personal_information (
              name
          ),
          exercise (
              id,
              exerciseName,
              bodyPart,
              equipment,
              day,
              exerciseDemo,
              youtubeLink,
              measurement,
              instruction,
              bmiClassification,
              exerciseMeasurementType,
              exercise_measurement_type (
                  id,
                  measurement
              ),
              bmi_classification (
                  classification
              )
          )
      )`).eq("favorite_created_by", decryptedUserId);

    if (error) {
      return Response.json({ message: error });
    }
    let response = data as unknown as bodyTunePlan[];
    if(response.length === 0) return Response.json({ response });
    if(response[0].exercisePlanId) {
      response = await getSignedDemoUrls(response) as bodyTunePlan[];
    }

    response = response.filter((bodyTune) => bodyTune.exercise_plan && bodyTune.meal_plan);
    
    return Response.json({ response });
  } catch (error) {
    return Response.json({ message: error });
  }
}

const getSignedDemoUrls = async (bodyTunes: bodyTunePlan[]) => {
  const supabase = await createSSR();
  try {
    const updatedBodyTune = await Promise.all(
      bodyTunes.map(async (bodyTune: bodyTunePlan) => {
        if (bodyTune.exercise_plan) {
          bodyTune.exercise_plan.exercise = (await Promise.all(
            bodyTune.exercise_plan.exercise.map(async (exercise) => {
              if (exercise.exerciseDemo) {
                const filePath = exercise.exerciseDemo
                  .replace("Exercise Demo/", "")
                  .trim();

                const { data: signedUrlData, error } = await supabase.storage
                  .from("Exercise Demo")
                  .createSignedUrl(filePath, 60 * 60);

                if (error) {
                  console.error("Error generating signed URL:", error);
                  return exercise;
                }

                return {
                  ...exercise,
                  exerciseDemo: signedUrlData?.signedUrl || "",
                };
              }
              return exercise;
            })
          )) as typeof bodyTune.exercise_plan.exercise;
          return bodyTune;
        } else {
          return bodyTune;
        }
      })
    );
    return updatedBodyTune;
  } catch (error) {
    return error;
  }
};
