"use server";

import Activity from "@/components/dashboardComponents/activity/Activity";
import {
  getUserActivePlanData,
  getUserActivePlans,
  getUserBodyTunes,
  getUserExercisePlans,
  getUserFavBodyTuneView,
  getUserFavExerciseView,
  getUserFavMealView,
  getUserMealPlans,
} from "@/lib/supabaseQueries";
import { TableRow } from "@/types/database.types";
import {
  bodyTunePlan,
  exercisePlanQuery,
  mealPlanQuery,
  userActivePlanInterface,
} from "@/types/planTypes";

const ActivityPage = async () => {
  const [
    exercisePlanRes,
    mealPlanRes,
    bodyTunes,
    bodyTuneViewRes,
    exercisePlanViewRes,
    mealPlanViewRes,
    userPlanInfoRes,
  ]: [
    Array<exercisePlanQuery>,
    Array<mealPlanQuery>,
    Array<bodyTunePlan> | [],
    Array<bodyTunePlan> | [],
    Array<exercisePlanQuery>,
    Array<mealPlanQuery>,
    Array<userActivePlanInterface>
  ] = await Promise.all([
    getUserExercisePlans(),
    getUserMealPlans(),
    getUserBodyTunes(),
    getUserFavBodyTuneView(),
    getUserFavExerciseView(),
    getUserFavMealView(),
    getUserActivePlans(),
  ]);
  const userPlanActiveData: Array<TableRow<"user_active_plan_data">> | [] =
    userPlanInfoRes[0]?.id
      ? await getUserActivePlanData(userPlanInfoRes[0].id)
      : [];

  // console.log(`exercisePlanRes`,exercisePlanRes);
  // console.log(`mealPlanRes`,mealPlanRes);
  // console.log(`userPlanInfoRes`,userPlanInfoRes);
  // console.log(`bodyTunes`,bodyTunes);
  // console.log(`userPlanActiveData`,userPlanActiveData);

  return (
    <div className="px-4 mt-4 w-full">
      {/* test */}
      <Activity
        userPlanActiveInfo={userPlanInfoRes}
        userPlanActiveData={userPlanActiveData}
        exercisePlanList={exercisePlanRes}
        mealPlanList={mealPlanRes}
        BodyTunesList={bodyTunes}
        BodyTunesViewList={bodyTuneViewRes}
        exercisePlanViewList={exercisePlanViewRes}
        mealPlanViewList={mealPlanViewRes}
      />
    </div>
  );
};

export default ActivityPage;
