"use server";

// lib
import { getMealPlan } from "@/lib/supabaseQueries";

// Components
import MealPlanDetails from "@/components/planComponents/MealPlanDetails";

// Types
import { mealPlanQuery } from "@/types/planTypes";
import { arrangeMealPlan } from "@/utils/dashboardUtils";
import { mealPlanGeneralInfo } from "@/types/mealTypes";
interface props {
  params: { planId: string };
}

const BodyTunePlanPage = async ({ params }: props) => {
  const res: Array<mealPlanQuery> | [] = await getMealPlan(
    parseInt(params.planId)
  );
  const mealPlan: mealPlanQuery | [] = res[0];
  const mealPlanGeneralInfo: mealPlanGeneralInfo = {
    id: mealPlan.id,
    planName: mealPlan.planName,
    tags: mealPlan.meal_plan_tags,
    createdBy: mealPlan.created_by
  };
  const mealPlanDetails = arrangeMealPlan(mealPlan);
  
  return (
    <div className="w-full">
        <MealPlanDetails mealPlanGeneralInfo={mealPlanGeneralInfo} mealPlan={mealPlanDetails} />
    </div>
  );
};

export default BodyTunePlanPage;
