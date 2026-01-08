"use client";

import { useQuery } from "@tanstack/react-query";

// Lib
import {
  getBodyTunes,
  getExercisePlans,
  getMealPlans,
  getOverAllStatistics,
  getUserActivePlanData,
  getUserActivePlans,
  getUserWeeklyStatistics,
} from "@/lib/supabaseQueries";

// Components
import NewsFeed from "./NewsFeed";
import Suggestions from "./Suggestions";
import WeeklyActivity from "./WeeklyActivity";

// Types
import {
  bodyTunePlan,
  exercisePlanQuery,
  mealPlanQuery,
  userActivePlanInterface,
} from "@/types/planTypes";
import { TableRow } from "@/types/database.types";
import { overAllStatistics } from "@/types/generalTypes";
interface props {
  userPlanActiveInfo: Array<userActivePlanInterface> | [];
  userPlanActiveData: Array<TableRow<"user_active_plan_data">> | [];
  userWeeklyStatistics: Array<TableRow<"user_active_plan_data">> | [];
  userOverAllStatistics: overAllStatistics
  exercisePlanList: Array<exercisePlanQuery> | [];
  mealPlanList: Array<mealPlanQuery> | [];
  BodyTunesList: Array<bodyTunePlan> | [];
}


const Overview = ({
  userPlanActiveInfo,
  userPlanActiveData,
  userWeeklyStatistics,
  userOverAllStatistics,
  exercisePlanList,
  mealPlanList,
  BodyTunesList,
}: props) => {
  // UseQuery
  const { data: userPlanInfo } = useQuery({
    queryKey: ["userActivePlans"],
    initialData: userPlanActiveInfo,
    queryFn: () => {
      return getUserActivePlans();
    },
  });
  useQuery({
    queryKey: ["userActivePlanData"],
    initialData: userPlanActiveData,
    queryFn: () => {
      return getUserActivePlanData(userPlanInfo![0].id);
    },
  });
  useQuery({
    queryKey: ["userWeeklyActivities"],
    initialData: userWeeklyStatistics,
    queryFn: () => {
      return getUserWeeklyStatistics(userPlanInfo![0].id);
    },
  });
  useQuery({
    queryKey: ["userOverAllStatistics"],
    initialData: userOverAllStatistics,
    queryFn: () => {
      return getOverAllStatistics(userPlanInfo![0].id);
    },
  });
  useQuery({
    queryKey: ["exercisePlans"],
    initialData: exercisePlanList,
    queryFn: () => {
      return getExercisePlans();
    },
  });
  useQuery({
    queryKey: ["mealPlans"],
    initialData: mealPlanList,
    queryFn: () => {
      return getMealPlans();
    },
  });
  useQuery({
    queryKey: ["bodyTunes"],
    initialData: BodyTunesList,
    queryFn: () => {
      return getBodyTunes();
    },
  });
  return (
    <div className="w-full h-full">
      <div className="phone:w-full laptop:max-w-[1200px]">
        <WeeklyActivity />
      </div>
      <div className="phone:w-full laptop:max-w-[1200px]">
        <Suggestions />
      </div>
      <div className="phone:w-full laptop:max-w-[1200px]">
        <NewsFeed />
      </div>
    </div>
  );
};

export default Overview;
