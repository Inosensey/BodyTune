"use server";

// lib
import {
  getUserBodyTunes,
  getUserExercisePlans,
  getUserMealPlans,
} from "@/lib/supabaseQueries";

// Components
import FollowerProfile from "@/components/dashboardComponents/connections/FollowerProfile";

// Types
interface props {
  params: { followerId: string };
}
import {
  bodyTunePlan,
  exercisePlanQuery,
  mealPlanQuery,
} from "@/types/planTypes";

const FollowerProfilePage = async ({ params }: props) => {
  const followerId: string = params.followerId;
  const [exercisePlanRes, mealPlanRes, bodyTuneRes]: [
    Array<exercisePlanQuery>,
    Array<mealPlanQuery>,
    Array<bodyTunePlan>,
  ] = await Promise.all([
    getUserExercisePlans(followerId),
    getUserMealPlans(followerId),
    getUserBodyTunes(followerId),
  ]);

  return (
    <div className="w-full laptop:px-4 laptop:mt-4">
      <FollowerProfile 
        bodyTunes={bodyTuneRes}
        exercisePlans={exercisePlanRes}
        mealPlans={mealPlanRes}
        followerId={followerId}
      />
    </div>
  );
};

export default FollowerProfilePage;
