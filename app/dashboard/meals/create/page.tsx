"use server";

// lib
import getUserInformation from "@/lib/getUserInformation";
import { getMealPlans } from "@/lib/supabaseQueries";

// Components
import MutateForm from "@/components/dashboardComponents/bodytuneMeals/Mutatecomponents/MutateForm";

// Types
import { TableRow } from "@/types/database.types";
import { mealPlanQuery } from "@/types/planTypes";

const CreateMealPage = async () => {
  const [personalRes, mealPlanRes]: [
    Response | undefined,
    Array<mealPlanQuery>
  ] = await Promise.all([getUserInformation(), getMealPlans()]);
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
        mealPlanList={mealPlanRes}
        action="Create"
      />
    </div>
  );
};

export default CreateMealPage;
