import { bodyTunePlan } from "@/types/planTypes";
import { createSSR } from "@/utils/supabaseSSR";

export async function GET() {
  const supabase = await createSSR();

  try {
    const bodyTuneQuery = supabase.from("bodytune_plan").select(`
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
                )`);
    const {data, error} = await bodyTuneQuery;
    if (error) {
      return Response.json({ message: error });
    }
    const bodyTuneQueryRes = data as unknown as bodyTunePlan[];

    const res = await getSignedDemoUrls(bodyTuneQueryRes);

    return Response.json({ res });
  } catch (error) {
    return Response.json({ message: error });
  }
}

const getSignedDemoUrls = async (bodyTunes: bodyTunePlan[]) => {
  const supabase = await createSSR();
  try {
    const updatedBodyTune = await Promise.all(
      bodyTunes.map(async (bodyTune: bodyTunePlan) => {
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
      })
    );
    return updatedBodyTune;
  } catch (error) {
    return error;
  }
};
