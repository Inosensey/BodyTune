"use server";

// lib
import { getBodyTune } from "@/lib/supabaseQueries";

// Components
import PlanDetails from "@/components/planComponents/PlanDetails";

// Types
import { bodyTunePlan } from "@/types/planTypes";
import { arrangeBodyTuePlan } from "@/utils/dashboardUtils";
interface props {
  params: { planId: string };
}

const BodyTunePlanPage = async ({ params }: props) => {
  const res: Array<bodyTunePlan> | [] = await getBodyTune(
    parseInt(params.planId)
  );
  const bodyTune: bodyTunePlan | [] = res[0];
  const exercisePlanInfo: {
    planName: string;
    shortDescription?: string;
    tags: Array<{exercise_tags: {
      id: number;
      exerciseTagName: string;
    }}>
  } = { planName: bodyTune.meal_plan.planName, tags: bodyTune.exercise_plan.exercise_plan_tag };
  const mealPlanInfo: {
    planName: string;
    shortDescription?: string;
    tags: Array<{meal_tags: {
      id: number;
      mealTagName: string;
    }}>
  } = { planName: bodyTune.exercise_plan.planName, tags: bodyTune.meal_plan.meal_plan_tags };
  const { exercisePlan, mealPlan } = arrangeBodyTuePlan(bodyTune);

  return (
    <div className="w-full">
      <PlanDetails
        exercisePlanInfo={exercisePlanInfo}
        mealPlanInfo={mealPlanInfo}
        exercisePlan={exercisePlan}
        mealPlan={mealPlan}
      />
    </div>
  );
};

export default BodyTunePlanPage;
