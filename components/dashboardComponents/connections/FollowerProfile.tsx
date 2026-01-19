"use client";
import { useQuery } from "@tanstack/react-query";

// lib
import {
  getUserBodyTunes,
  getUserExercisePlans,
  getUserMealPlans,
} from "@/lib/supabaseQueries";

// Components
import DashboardHeader from "../DashboardHeader";

// Icons
import IcBaselinePeopleOutline from "@/icons/IcBaselinePeopleOutline";
import FollowerProfileContent from "./FollowerProfileContent";


// Types
import { bodyTunePlan, exercisePlanQuery, mealPlanQuery } from "@/types/planTypes";
interface props {
  followerId: string,
  bodyTunes: Array<bodyTunePlan>,
  mealPlans: Array<mealPlanQuery>,
  exercisePlans: Array<exercisePlanQuery>,
}

const FollowerProfile = ({bodyTunes, exercisePlans, mealPlans, followerId}:props) => {
  // useQuery
  useQuery({
    queryKey: ["followerBodyTunes"],
    initialData: bodyTunes,
    queryFn: () => {
      return getUserBodyTunes(followerId);
    },
  });
  useQuery({
    queryKey: ["followerExercisePlans"],
    initialData: exercisePlans,
    queryFn: () => {
      return getUserExercisePlans(followerId);
    },
  });
  useQuery({
    queryKey: ["followerMealPlans"],
    initialData: mealPlans,
    queryFn: () => {
      return getUserMealPlans(followerId);
    },
  });


  return (
    <div className="flex flex-col gap-3 h-[99%]">
      <div className="phone:px-4 laptop:px-0">
        <DashboardHeader
          headerText="Connections"
          headerDescription="Your Fitness Network"
          Icon={IcBaselinePeopleOutline}
        />
      </div>
      <FollowerProfileContent followerId={followerId} />
    </div>
  );
};

export default FollowerProfile;
