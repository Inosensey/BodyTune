"use server";

// lib
import {
  getExercisePlan,
  getExercisePlans,
} from "@/lib/supabaseQueries";
import getUserInformation from "@/lib/getUserInformation";

// utils
import { arrangeExercisePlan } from "@/utils/dashboardUtils";

// components
import MutateForm from "@/components/dashboardComponents/bodytuneWorkouts/Mutatecomponents/MutateForm";

// Types
import {
  exercisePlanQuery,
  visibilityInterface,
} from "@/types/planTypes";
import { TableRow } from "@/types/database.types";
import { exercisePlanGeneralInfo } from "@/types/exerciseTypes";
interface props {
  params: { planId: string };
}

const WorkoutPlanPage = async ({ params }: props) => {
  const [personalRes, exercisePlanRes, exercisePlansRes]: [
    Response | undefined,
    Array<exercisePlanQuery>,
    Array<exercisePlanQuery>,
  ] = await Promise.all([
    getUserInformation(),
    getExercisePlan(parseInt(params.planId)),
    getExercisePlans(),
  ]);

  let userInformation:
    | { response: TableRow<"personal_information">[] }
    | { response: [] } = { response: [] };
  if (personalRes) {
    userInformation = await personalRes.json();
  } else {
    userInformation = { response: [] };
  }

  const exercisePlan: exercisePlanQuery | [] = exercisePlanRes[0];
  const personalInformation = userInformation;
  const exercisePlanInfo = arrangeExercisePlan(exercisePlan);

  const exercisePlanGeneralInfo: exercisePlanGeneralInfo = {
    id: exercisePlan.id!,
    planName: exercisePlan.planName,
    tags: exercisePlan.exercise_plan_tag,
    createdBy: exercisePlan.created_by
  };

  const visibility: visibilityInterface = {
      id: exercisePlan.visibility,
      visibility: exercisePlan.plan_visibility.visibility,
  }

  return (
    <div className="px-4 mt-4 w-full">
      <MutateForm
        action="Update"
        exerciseId={exercisePlan.id}
        exercisePlanList={exercisePlansRes}
        personalInfo={personalInformation.response}
        exercisePlanGeneralInfo={exercisePlanGeneralInfo}
        planVisibilityInfo={visibility}
        fetchedExercisePlanInfo={exercisePlanInfo}
      />
    </div>
  );
};

export default WorkoutPlanPage;
