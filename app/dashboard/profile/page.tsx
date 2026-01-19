"use server";

import Profile from "@/components/dashboardComponents/profile/Profile";

// Libs
import getUserInformation from "@/lib/getUserInformation";
import {
  getUserBodyTunes,
  getUserExercisePlans,
  getUserMealPlans,
} from "@/lib/supabaseQueries";

// Types
import { TableRow } from "@/types/database.types";
import {
  bodyTunePlan,
  exercisePlanQuery,
  mealPlanQuery,
} from "@/types/planTypes";

const ProfilePage = async () => {
  const [userRes, exercisePlanRes, mealPlanRes, bodyTuneRes]: [
    Response | undefined,
    Array<exercisePlanQuery>,
    Array<mealPlanQuery>,
    Array<bodyTunePlan>,
  ] = await Promise.all([
    getUserInformation(),
    getUserExercisePlans(),
    getUserMealPlans(),
    getUserBodyTunes(),
  ]);

  let userInformation:
    | { response: TableRow<"personal_information">[] }
    | { response: [] } = { response: [] };
  if (userRes) {
    userInformation = await userRes.json();
  } else {
    userInformation = { response: [] };
  }
  const personalInformation:
    | { response: TableRow<"personal_information">[] }
    | [] = userInformation;
  return (
    <div className="w-full laptop:px-4 laptop:mt-4">
      <Profile
        personalInfo={personalInformation.response[0]}
        bodyTunes={bodyTuneRes}
        exercisePlans={exercisePlanRes}
        mealPlans={mealPlanRes}
      />
    </div>
  );
};

export default ProfilePage;
