"use server";

// lib
import { getBodyTune } from "@/lib/supabaseQueries";

// Components
import PlanDetails from "@/components/planComponents/PlanDetails";

// Types
import { bodyTunePlan } from "@/types/planTypes";
import { arrangeBodyTunePlan } from "@/utils/dashboardUtils";
import { exercisePlanGeneralInfo } from "@/types/exerciseTypes";
import { mealPlanGeneralInfo } from "@/types/mealTypes";
interface props {
  params: { planId: string };
}

const BodyTunePlanPage = async ({ params }: props) => {
  const res: Array<bodyTunePlan> | [] = await getBodyTune(
    parseInt(params.planId)
  );
  const bodyTune: bodyTunePlan | [] = res[0];
  const mealPlanGeneralInfo: mealPlanGeneralInfo = {
    id: bodyTune.mealPlanId,
    planName: bodyTune.meal_plan.planName,
    tags: bodyTune.meal_plan.meal_plan_tags,
    createdBy: bodyTune.meal_plan.created_by
  };
  const exercisePlanGeneralInfo: exercisePlanGeneralInfo = {
    id: bodyTune.exercisePlanId,
    planName: bodyTune.exercise_plan.planName,
    tags: bodyTune.exercise_plan.exercise_plan_tag,
    createdBy: bodyTune.exercise_plan.created_by
  };
  const { exercisePlan, mealPlan } = arrangeBodyTunePlan(bodyTune);
  
  return (
    <div className="w-full">
      <PlanDetails
        exercisePlanGeneralInfo={exercisePlanGeneralInfo}
        mealPlanGeneralInfo={mealPlanGeneralInfo}
        exercisePlan={exercisePlan}
        mealPlan={mealPlan}
      />
    </div>
  );
};

export default BodyTunePlanPage;
