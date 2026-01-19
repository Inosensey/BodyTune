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
import ProfileContent from "./ProfileContent";

// Icons
import IcOutlinePerson from "@/icons/IcOutlinePerson";

// Types
import { TableRow } from "@/types/database.types";
interface props {
  personalInfo: TableRow<"personal_information">;
}
import { bodyTunePlan, exercisePlanQuery, mealPlanQuery } from "@/types/planTypes";
interface props {
  bodyTunes: Array<bodyTunePlan>,
  mealPlans: Array<mealPlanQuery>,
  exercisePlans: Array<exercisePlanQuery>,
}

const Profile = ({personalInfo, bodyTunes, exercisePlans, mealPlans}:props) => {
  // useQuery
  useQuery({
    queryKey: ["userBodyTunes"],
    initialData: bodyTunes,
    queryFn: () => {
      return getUserBodyTunes();
    },
  });
  useQuery({
    queryKey: ["userExercisePlans"],
    initialData: exercisePlans,
    queryFn: () => {
      return getUserExercisePlans();
    },
  });
  useQuery({
    queryKey: ["userMealPlans"],
    initialData: mealPlans,
    queryFn: () => {
      return getUserMealPlans();
    },
  });

  console.log(personalInfo);
  return (
    <div className="flex flex-col gap-3 h-[99%]">
      <div className="phone:px-4 laptop:px-0">
      <DashboardHeader
        headerText="Profile"
        headerDescription="Manage your profile, and preferences"
        Icon={IcOutlinePerson}
      />
      </div>
      <ProfileContent />
    </div>
  );
};

export default Profile;
