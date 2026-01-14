"use server";

// lib
import { getExercisePlan } from "@/lib/supabaseQueries";

// Components

// Types
import { exercisePlanQuery } from "@/types/planTypes";
import { arrangeExercisePlan } from "@/utils/dashboardUtils";
import { exercisePlanGeneralInfo } from "@/types/exerciseTypes";
import ExercisePlanDetails from "@/components/planComponents/ExercisePlanDetails";
interface props {
  params: { planId: string };
}

const ExercisePlanPage = async ({ params }: props) => {
  const res: Array<exercisePlanQuery> | [] = await getExercisePlan(
    parseInt(params.planId)
  );
  const exercisePlan: exercisePlanQuery | [] = res[0];
  const exercisePlanGeneralInfo: exercisePlanGeneralInfo = {
    id: exercisePlan.id!,
    planName: exercisePlan.planName,
    tags: exercisePlan.exercise_plan_tag,
    createdBy: exercisePlan.created_by
  };
  const exercisePlanDetails = arrangeExercisePlan(exercisePlan);
  
  return (
    <div className="w-full">
      <ExercisePlanDetails exercisePlanGeneralInfo={exercisePlanGeneralInfo} exercisePlan={exercisePlanDetails} />
    </div>
  );
};

export default ExercisePlanPage;
