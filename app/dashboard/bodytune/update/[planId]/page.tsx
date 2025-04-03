"use server";

// lib
import {
  getBodyTune,
  getExercisePlans,
  getMealPlans,
} from "@/lib/supabaseQueries";
import getUserInformation from "@/lib/getUserInformation";

// utils
import { arrangeBodyTunePlan } from "@/utils/dashboardUtils";

// components
import MutateForm from "@/components/dashboardComponents/bodytuneStudio/MutateComponents/MutateForm";

// Types
import {
  bodyTunePlan,
  exercisePlanQuery,
  mealPlanQuery,
} from "@/types/planTypes";
import { TableRow } from "@/types/database.types";
import { exercisePlanGeneralInfo } from "@/types/exerciseTypes";
import { mealPlanGeneralInfo } from "@/types/mealTypes";
interface props {
  params: { planId: string };
}

const BodyTunePlanPage = async ({ params }: props) => {
  const [bodyTuneRes, personalRes, exercisePlanRes, mealPlanRes]: [
    Array<bodyTunePlan>,
    Response | undefined,
    Array<exercisePlanQuery>,
    Array<mealPlanQuery>
  ] = await Promise.all([
    getBodyTune(parseInt(params.planId)),
    getUserInformation(),
    getExercisePlans(),
    getMealPlans(),
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

  const bodyTune: bodyTunePlan | [] = bodyTuneRes[0];
  const exercisePlanGeneralInfo: exercisePlanGeneralInfo = {
    id: bodyTune.mealPlanId,
    planName: bodyTune.meal_plan.planName,
    tags: bodyTune.exercise_plan.exercise_plan_tag,
  };
  const mealPlanGeneralInfo: mealPlanGeneralInfo = {
    id: bodyTune.exercisePlanId,
    planName: bodyTune.exercise_plan.planName,
    tags: bodyTune.meal_plan.meal_plan_tags,
  };
  const { exercisePlan, mealPlan } = arrangeBodyTunePlan(bodyTune);
  return (
    <div className="px-4 mt-4 w-full">
      <MutateForm
        action="Update"
        exercisePlanList={exercisePlanRes}
        mealPlanList={mealPlanRes}
        personalInfo={personalInformation.response}
        exercisePlanGeneralInfo={exercisePlanGeneralInfo}
        mealPlanGeneralInfo={mealPlanGeneralInfo}
        fetchedExercisePlanInfo={exercisePlan}
        fetchedMealPlanInfo={mealPlan}
      />
    </div>
  );
};

export default BodyTunePlanPage;
