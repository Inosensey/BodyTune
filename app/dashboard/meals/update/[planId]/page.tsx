"use server";

// lib
import {
  getMealPlan,
  getMealPlans,
} from "@/lib/supabaseQueries";
import getUserInformation from "@/lib/getUserInformation";

// utils
import { arrangeMealPlan } from "@/utils/dashboardUtils";

// components
import MutateForm from "@/components/dashboardComponents/bodytuneMeals/Mutatecomponents/MutateForm";

// Types
import {
  mealPlanQuery,
  visibilityInterface,
} from "@/types/planTypes";
import { TableRow } from "@/types/database.types";
import { mealPlanGeneralInfo } from "@/types/mealTypes";
interface props {
  params: { planId: string };
}

const MealPlanPage = async ({ params }: props) => {
  const [ personalRes, mealPlansRes, mealPlanRes]: [
    Response | undefined,
    Array<mealPlanQuery>,
    Array<mealPlanQuery>
  ] = await Promise.all([
    getUserInformation(),
    getMealPlans(),
    getMealPlan(parseInt(params.planId))
  ]);

  let userInformation:
    | { response: TableRow<"personal_information">[] }
    | { response: [] } = { response: [] };
  if (personalRes) {
    userInformation = await personalRes.json();
  } else {
    userInformation = { response: [] };
  }
  const personalInformation = userInformation;

  const mealPlan: mealPlanQuery | [] = mealPlanRes[0];
  const mealPlanGeneralInfo: mealPlanGeneralInfo = {
    id: mealPlan.id,
    planName: mealPlan.planName,
    tags: mealPlan.meal_plan_tags,
    createdBy: mealPlan.created_by
  };
  const visibility: visibilityInterface = {
    id: mealPlan.visibility,
    visibility: mealPlan.plan_visibility.visibility,
  }
  const mealPlanDetails = arrangeMealPlan(mealPlan);
  return (
    <div className="px-4 mt-4 w-full">
      <MutateForm
        action="Update"
        mealPlanId={mealPlan.id}
        mealPlanList={mealPlansRes}
        personalInfo={personalInformation.response}
        mealPlanGeneralInfo={mealPlanGeneralInfo}
        planVisibilityInfo={visibility}
        fetchedMealPlanInfo={mealPlanDetails}
      />
    </div>
  );
};

export default MealPlanPage;
