import { exercisePlanQuery } from "@/types/planTypes";
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
    const { data, error } = await supabase.from("exercise_plan").select(`
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
    `).eq("created_by", decryptedUserId);
    if (error) {
      return Response.json({ message: error });
    }
    const exercisePlanRes = data as unknown as exercisePlanQuery[];
    const res = await getSignedDemoUrls(exercisePlanRes);

    return Response.json({ res });
  } catch (error) {
    return Response.json({ message: error });
  }
}

const getSignedDemoUrls = async (exercisePlan: exercisePlanQuery[]) => {
  const supabase = await createSSR();
  try {
    const updatedExercisePlan = await Promise.all(
      exercisePlan.map(async (exercisePlanInfo: exercisePlanQuery) => {
        exercisePlanInfo.exercise = (await Promise.all(
          exercisePlanInfo.exercise.map(async (exercise) => {
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
        )) as typeof exercisePlanInfo.exercise;
        return exercisePlanInfo;
      })
    );
    return updatedExercisePlan;
  } catch (error) {
    return error;
  }
};
