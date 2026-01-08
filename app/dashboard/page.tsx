"use server";

import Overview from "@/components/dashboardComponents/overviewComponents/Overview";
import {
  getBodyTunes,
  getExercisePlans,
  getMealPlans,
  getOverAllStatistics,
  getUserActivePlanData,
  getUserActivePlans,
  getUserWeeklyStatistics,
} from "@/lib/supabaseQueries";
import { TableRow } from "@/types/database.types";
import { overAllStatistics } from "@/types/generalTypes";
import {
  bodyTunePlan,
  exercisePlanQuery,
  mealPlanQuery,
  userActivePlanInterface,
} from "@/types/planTypes";

const DashboardPage = async () => {
  const [exercisePlanRes, mealPlanRes, userPlanInfoRes]: [
    Array<exercisePlanQuery>,
    Array<mealPlanQuery>,
    Array<userActivePlanInterface>
  ] = await Promise.all([
    getExercisePlans(),
    getMealPlans(),
    getUserActivePlans(),
  ]);
  const bodyTunes: Array<bodyTunePlan> | [] = await getBodyTunes();
  const userPlanActiveData:
    | Array<TableRow<"user_active_plan_data">>
    | undefined = userPlanInfoRes[0]?.id
    ? await getUserActivePlanData(userPlanInfoRes[0].id)
    : [];
  const userWeeklyStatistics:
    | Array<TableRow<"user_active_plan_data">>
    | undefined = userPlanInfoRes[0]?.id
    ? await getUserWeeklyStatistics(userPlanInfoRes[0].id)
    : [];

  console.log(`userPlanInfoRes`, userPlanInfoRes);

  let userOverAllStatistics: overAllStatistics = {
    bodyTunePlansCount: 0,
    exercisePlanCompleted: 0,
    exercisePlansCount: 0,
    mealPlanCompleted: 0,
    mealPlansCount: 0
  };

  if(userPlanInfoRes.length !== 0) {
    userOverAllStatistics = await getOverAllStatistics(userPlanInfoRes[0].id);
  }

  // const userOverAllStatistics: overAllStatistics = await getOverAllStatistics(userPlanInfoRes[0].id);

  return (
    <div className="w-full">
      <Overview
        userPlanActiveInfo={userPlanInfoRes}
        userPlanActiveData={userPlanActiveData}
        userWeeklyStatistics={userWeeklyStatistics}
        userOverAllStatistics={userOverAllStatistics}
        exercisePlanList={exercisePlanRes}
        mealPlanList={mealPlanRes}
        BodyTunesList={bodyTunes}
      />
    </div>
  );
};

export default DashboardPage;
