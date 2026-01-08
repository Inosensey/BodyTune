"use client";

import { useQuery } from "@tanstack/react-query";
// Components
import DashboardHeader from "../DashboardHeader";
import BodyTuneMealsContent from "./BodyTuneMealsContent";

// Icons
import MdiFoodDrumstickOutline from "@/icons/MdiFoodDrumstickOutline";
import { getUserMealPlans } from "@/lib/supabaseQueries";

// Types
import { mealPlanQuery } from "@/types/planTypes";
interface props {
  mealPlans: Array<mealPlanQuery> | [];
}

const BodyTuneMeals = ({ mealPlans }: props) => {
  // UseQuery
  useQuery({
    queryKey: ["userMealPlans"],
    initialData: mealPlans,
    queryFn: () => {
      return getUserMealPlans();
    },
  });

  return (
    <div className="flex flex-col gap-3 h-[99%]">
      <DashboardHeader
        headerText="BodyTune Nutrition"
        headerDescription="Plan and personalize your meal choices"
        Icon={MdiFoodDrumstickOutline}
      />
      <BodyTuneMealsContent />
    </div>
  );
};

export default BodyTuneMeals;
