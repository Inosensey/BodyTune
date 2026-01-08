"use client";

import { useQuery } from "@tanstack/react-query";
// Components
import DashboardHeader from "../DashboardHeader";
import BodyTuneWorkoutsContent from "./BodyTuneWorkoutsContent";

// Icons
import TablerBarbell from "@/icons/TablerBarbell";

// types
import { exercisePlanQuery } from "@/types/planTypes";
import { getUserExercisePlans } from "@/lib/supabaseQueries";
interface props {
  exercisePlans?: Array<exercisePlanQuery> | [];
}


const BodyTuneWorkouts = ({exercisePlans}:props) => {
    // Use query
  useQuery({
    queryKey: ["userExercisePlans"],
    initialData: exercisePlans,
    queryFn: () => {
      return getUserExercisePlans();
    }
  });
  console.log(exercisePlans);
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
