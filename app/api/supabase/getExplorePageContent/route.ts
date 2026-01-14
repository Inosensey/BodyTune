import getUser from "@/lib/getUser";
import {
  getBodyTunes,
  getExercisePlans,
  getMealPlans,
  getUserFavorites,
} from "@/lib/supabaseQueries";
import { TableRow } from "@/types/database.types";
import {
  bodyTunePlan,
  exercisePlanQuery,
  exploreBodyTuneInterface,
  exploreExercisePlanInterface,
  exploreMealPlanInterface,
  explorePageContentInterface,
  mealPlanQuery,
} from "@/types/planTypes";

export async function GET() {
  try {
    const [userFavoritesRes, exercisePlanRes, mealPlanRes, bodyTuneRes]: [
      Array<TableRow<"user_favorites">>,
      Array<exercisePlanQuery>,
      Array<mealPlanQuery>,
      Array<bodyTunePlan>
    ] = await Promise.all([
      getUserFavorites(),
      getExercisePlans(),
      getMealPlans(),
      getBodyTunes(),
    ]);

    const user = await getUser();
    const userId = user.data.user!.id;
    const favoritePlanIds = new Set(userFavoritesRes.map((fav) => fav.planId));
    const bodyTuneList: Array<exploreBodyTuneInterface> = bodyTuneRes
      .map((bodyTune) => ({
        ...bodyTune,
        canMutate: bodyTune.created_by === userId,
        userFavorite: favoritePlanIds.has(bodyTune.id),
      }))
      .sort((a, b) => Number(b.canMutate) - Number(a.canMutate));
    const exercisePlanList: Array<exploreExercisePlanInterface> =
      exercisePlanRes
        .map((exercisePlan) => ({
          ...exercisePlan,
          canMutate: exercisePlan.created_by === userId,
          userFavorite: favoritePlanIds.has(exercisePlan.id!),
        }))
        .sort((a, b) => Number(b.canMutate) - Number(a.canMutate));
    const mealPlanList: Array<exploreMealPlanInterface> = mealPlanRes
      .map((mealPlan) => ({
        ...mealPlan,
        canMutate: mealPlan.created_by === userId,
        userFavorite: favoritePlanIds.has(mealPlan.id),
      }))
      .sort((a, b) => Number(b.canMutate) - Number(a.canMutate));

    const response: explorePageContentInterface = {
      bodyTunes: bodyTuneList,
      exercisePlans: exercisePlanList,
      mealPlans: mealPlanList,
    };
    // Respond with JSON data
    return Response.json({ response });
  } catch (error) {
    return Response.json({ message: error });
  }
}
