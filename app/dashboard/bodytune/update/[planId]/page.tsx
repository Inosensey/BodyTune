"use server";

// lib
import { getBodyTune, getExercisePlans, getMealPlans } from "@/lib/supabaseQueries";
import getUserInformation from "@/lib/getUserInformation";

// utils
import { arrangeBodyTunePlan } from "@/utils/dashboardUtils";

// components
import MutateForm from "@/components/dashboardComponents/bodytuneStudio/MutateComponents/MutateForm";

// Types
import {
  bodyTunePlan,
  exercisePlanInfo,
  exercisePlanQuery,
  mealPlanInfo,
  mealPlanQuery,
} from "@/types/planTypes";
import { TableRow } from "@/types/database.types";
interface props {
  params: { planId: string };
}

const BodyTunePlanPage = async ({ params }: props) => {
  const [bodyTuneRes, personalRes, exercisePlanRes, mealPlanRes]:[Array<bodyTunePlan>, Response | undefined, Array<exercisePlanQuery>, Array<mealPlanQuery> ] = await Promise.all([
    getBodyTune(parseInt(params.planId)),
    getUserInformation(),
    getExercisePlans(),
    getMealPlans()
  ]);

  let userInformation:
    | { response: TableRow<"personal_information">[] }
    | { response: [] } = { response: [] };
  if (personalRes) {
    userInformation = await personalRes.json();
  } else {
    userInformation = { response: [] };
  }
  const personalInformation:
    | { response: TableRow<"personal_information">[] }
    | [] = userInformation;

  const bodyTune: bodyTunePlan | [] = bodyTuneRes[0];
  const exercisePlanInfo: exercisePlanInfo = {
    planName: bodyTune.meal_plan.planName,
    tags: bodyTune.exercise_plan.exercise_plan_tag,
  };
  const mealPlanInfo: mealPlanInfo = {
    planName: bodyTune.exercise_plan.planName,
    tags: bodyTune.meal_plan.meal_plan_tags,
  };
  const { exercisePlan, mealPlan } = arrangeBodyTunePlan(bodyTune);
  console.log(exercisePlanRes)
  console.log(mealPlanRes)
  return (
    <div className="px-4 mt-4 w-full">
      <MutateForm
        action="Update"
        personalInfo={personalInformation.response}
        exercisePlanInfoTags={exercisePlanInfo.tags}
        mealPlanInfoTags={mealPlanInfo.tags}
        fetchedExercisePlanInfo={exercisePlan}
        fetchedMealPlanInfo={mealPlan}
      />
    </div>
  );
};

export default BodyTunePlanPage;
