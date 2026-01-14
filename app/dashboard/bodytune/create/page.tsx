"use server";

import getUserInformation from "@/lib/getUserInformation";

// Components
import MutateForm from "@/components/dashboardComponents/bodytuneStudio/MutateComponents/MutateForm";

// Types
import { TableRow } from "@/types/database.types";
import { exercisePlanQuery, mealPlanQuery } from "@/types/planTypes";
import { getUserExercisePlans, getUserMealPlans } from "@/lib/supabaseQueries";

const CreateBodyTunePage = async () => {
  const [personalRes, exercisePlanRes, mealPlanRes]: [
    Response | undefined,
    Array<exercisePlanQuery>,
    Array<mealPlanQuery>
  ] = await Promise.all([
    getUserInformation(),
    getUserExercisePlans(),
    getUserMealPlans(),
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

  return (
    <div className="px-4 mt-4 w-full">
      <MutateForm
        personalInfo={personalInformation.response}
        exercisePlanList={exercisePlanRes}
        mealPlanList={mealPlanRes}
        action="Create"
      />
    </div>
  );
};

export default CreateBodyTunePage;
