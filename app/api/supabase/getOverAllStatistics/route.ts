import { createSSR } from "@/utils/supabaseSSR";



import { decryptUserId } from "@/utils/encrypter";

import { overAllStatistics } from "@/types/generalTypes";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const encryptedUserId = searchParams.get("user")?.toString();
  const activePlanId = searchParams.get("activePlanId")?.toString();
  const supabase = await createSSR();

  if (!encryptedUserId) return Response.json({ message: "No user!" });
  const decodedEncryptUserId = decodeURIComponent(encryptedUserId);
  const decryptedUserId = decryptUserId(decodedEncryptUserId);

  try {
    const {
      error: userActiveExercisePlanDataError,
      count: userActiveExercisePlanDataCount,
    } = await supabase
      .from("user_active_plan_data")
      .select(`*`, { count: 'exact' })
      .eq("created_by", decryptedUserId)
      .eq("activePlanId", activePlanId)
      .eq("status", 1)
      .eq("planType", "exercise");
    const {
      error: userActiveMealPlanDataError,
      count: userActiveMealPlanDataCount,
    } = await supabase
      .from("user_active_plan_data")
      .select(`*`, { count: 'exact' })
      .eq("created_by", decryptedUserId)
      .eq("activePlanId", activePlanId)
      .eq("status", 1)
      .eq("planType", "meal");

    const {
      error: mealPlanError,
      count: mealPlanCount,
    } = await supabase.from("meal_plan").select(`*`, { count: 'exact' });
    const {
      error: exercisePlanError,
      count: exercisePlanCount,
    } = await supabase.from("exercise_plan").select(`*`, { count: 'exact' });
    const {
      error: bodytunePlanError,
      count: bodytunePlanCount,
    } = await supabase.from("bodytune_plan").select(`*`, { count: 'exact' });

    if (userActiveExercisePlanDataError) {
      return Response.json({ message: userActiveExercisePlanDataError });
    }
    if (userActiveMealPlanDataError) {
      return Response.json({ message: userActiveMealPlanDataError });
    }
    if (mealPlanError) {
      return Response.json({ message: mealPlanError });
    }
    if (exercisePlanError) {
      return Response.json({ message: exercisePlanError });
    }
    if (bodytunePlanError) {
      return Response.json({ message: bodytunePlanError });
    }

    const response: overAllStatistics = {
      mealPlansCount: mealPlanCount ? mealPlanCount : 0,
      exercisePlansCount: exercisePlanCount ? exercisePlanCount : 0,
      bodyTunePlansCount: bodytunePlanCount ? bodytunePlanCount : 0,
      mealPlanCompleted: userActiveMealPlanDataCount
        ? userActiveMealPlanDataCount
        : 0,
      exercisePlanCompleted: userActiveExercisePlanDataCount
        ? userActiveExercisePlanDataCount
        : 0,
    };
    // Respond with JSON data
    return Response.json({ response });
  } catch (error) {
    return Response.json({ message: error });
  }
}
