"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

// Lib
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

// Components
import DashboardHeader from "../DashboardHeader";
import ActivateBodyTune from "./ActivateBodyTune";
import ActivityCreationOption from "./ActivityCreationOption";
import ActivateMealPlan from "./ActivateMealPlan";
import ActivateExercisePlan from "./ActivateExercisePlan";
import CurrentActivePlans from "./CurrentActivePlans";

// Icons
import MingcuteFitnessLine from "@/icons/MingcuteFitnessLine";
import IcOutlineArrowBackIosNew from "@/icons/IcOutlineArrowBackIosNew";

// Types
import {
  bodyTunePlan,
  exercisePlanQuery,
  mealPlanQuery,
  userActivePlanInterface,
} from "@/types/planTypes";
import { TableRow } from "@/types/database.types";
interface props {
  userPlanActiveInfo: Array<userActivePlanInterface> | [];
  userPlanActiveData: Array<TableRow<"user_active_plan_data">> | [];
  exercisePlanList: Array<exercisePlanQuery> | [];
  mealPlanList: Array<mealPlanQuery> | [];
  BodyTunesList: Array<bodyTunePlan> | [];
  exercisePlanViewList: Array<exercisePlanQuery> | [];
  mealPlanViewList: Array<mealPlanQuery> | [];
  BodyTunesViewList: Array<bodyTunePlan> | [];
}

const Activity = ({
  userPlanActiveInfo,
  userPlanActiveData,
  exercisePlanList,
  mealPlanList,
  BodyTunesList,
  BodyTunesViewList,
  exercisePlanViewList,
  mealPlanViewList
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
    queryKey: ["userExercisePlans"],
    initialData: exercisePlanList,
    queryFn: () => {
      return getUserExercisePlans();
    },
  });
  useQuery({
    queryKey: ["userMealPlans"],
    initialData: mealPlanList,
    queryFn: () => {
      return getUserMealPlans();
    },
  });
  useQuery({
    queryKey: ["userBodyTunes"],
    initialData: BodyTunesList,
    queryFn: () => {
      return getUserBodyTunes();
    },
  });
  useQuery({
    queryKey: ["userFavExerciseView"],
    initialData: exercisePlanViewList,
    queryFn: () => {
      return getUserFavExerciseView();
    },
  });
  useQuery({
    queryKey: ["userFavMealView"],
    initialData: mealPlanViewList,
    queryFn: () => {
      return getUserFavMealView();
    },
  });
  useQuery({
    queryKey: ["userFavBodyTuneView"],
    initialData: BodyTunesViewList,
    queryFn: () => {
      return getUserFavBodyTuneView();
    },
  });

  // States
  const [activityCreationOption, setActivityCreationOption] =
    useState<string>("");

  return (
    <div className="flex flex-col gap-3 h-[99%]">
      <div className="phone:px-4 laptop:px-0">
        <DashboardHeader
          headerText="Activity & Plans"
          headerDescription="Activate and manage your selected exercise or meal plans"
          Icon={MingcuteFitnessLine}
        />
      </div>
      { userPlanInfo[0] ? (
        <CurrentActivePlans />
      ) : activityCreationOption === "" ? (
        <div className="mdtablet:h-[87%] flex justify-center">
          <ActivityCreationOption
            setSelectOption={setActivityCreationOption}
            label="Create Activity"
          />
        </div>
      ) : (
        <div className="mdtablet:h-[84%] flex flex-col items-center">
          <div
            className="flex h-[5%] items-center gap-1 group cursor-pointer"
            onClick={() => setActivityCreationOption("")}
          >
            <IcOutlineArrowBackIosNew
              color="#4B6F64"
              width="1.7em"
              height="1.7em"
            />
            <p className="font-dmSans font-semibold text-sm text-[#b3b3b3] transition duration-200 group-hover:text-[#ffffff]">
              Return to Activity creation options
            </p>
          </div>
          <div className="w-full flex justify-center gap-2 mdtablet:h-[93%] mdtablet:flex-row phone:flex-col">
            {activityCreationOption === "BodyTune" ? (
              <ActivateBodyTune />
            ) : (
              <>
                <ActivateMealPlan />
                <ActivateExercisePlan />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Activity;
