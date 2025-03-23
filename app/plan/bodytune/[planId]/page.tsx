"use server";

// lib
import { getBodyTune } from "@/lib/supabaseQueries";

// Components
import PlanDetails from "@/components/planComponents/PlanDetails";

// Types
import { bodyTunePlan } from "@/types/planTypes";
import { arrangeBodyTuePlan } from "@/utils/dashboardUtils";
import { ExercisePlanInfoTypes } from "@/types/exerciseTypes";
import { MealInfoTypes } from "@/types/mealTypes";
interface props {
  params: { planId: string };
}

const BodyTunePlanPage = async ({ params }: props) => {
  const res: Array<bodyTunePlan> | [] = await getBodyTune(
    parseInt(params.planId)
  );
  const bodyTune: bodyTunePlan | [] = res[0];
  const exercisePlanInfo:ExercisePlanInfoTypes = {
    exercisePlanName: bodyTune.exercise_plan.planName
  }
  const { exercisePlan, mealPlan } = arrangeBodyTuePlan(bodyTune);

  return (
    <div className="w-full">
      <PlanDetails exercisePlan={exercisePlan} mealPlan={mealPlan} />
    </div>
  );
};

export default BodyTunePlanPage;
