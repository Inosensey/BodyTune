"use client";

// Components
import DashboardHeader from "../DashboardHeader";
import BodyTuneMealsContent from "./BodyTuneMealsContent";

// Icons
import MdiFoodDrumstickOutline from "@/icons/MdiFoodDrumstickOutline";

const BodyTuneMeals = () => {
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
