"use server";

import getUserInformation from "@/lib/getUserInformation";

// Components
import MutateForm from "@/components/dashboardComponents/bodytuneWorkouts/Mutatecomponents/MutateForm";

// Types
import { TableRow } from "@/types/database.types";
import { exercisePlanQuery } from "@/types/planTypes";
import { getExercisePlans } from "@/lib/supabaseQueries";

const CreateWorkoutPage = async () => {
  const [personalRes, exercisePlanRes]: [
    Response | undefined,
    Array<exercisePlanQuery>
  ] = await Promise.all([getUserInformation(), getExercisePlans()]);
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
  return (
    <div className="px-4 mt-4 w-full">
      <MutateForm
        personalInfo={personalInformation.response}
        exercisePlanList={exercisePlanRes}
        action="Create"
      />
    </div>
  );
};

export default CreateWorkoutPage;
