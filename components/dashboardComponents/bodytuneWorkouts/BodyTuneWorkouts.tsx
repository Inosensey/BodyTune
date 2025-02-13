"use client";

// Components
import DashboardHeader from "../DashboardHeader";
import BodyTuneWorkoutsContent from "./BodyTuneWorkoutsContent";

// Icons
import TablerBarbell from "@/icons/TablerBarbell";

const BodyTuneWorkouts = () => {
  return (
    <div className="flex flex-col gap-3 h-[99%]">
      <DashboardHeader
        headerText="BodyTune Workouts"
        headerDescription="Customize and track your exercise routines"
        Icon={TablerBarbell}
      />
      <BodyTuneWorkoutsContent />
    </div>
  );
};

export default BodyTuneWorkouts;
