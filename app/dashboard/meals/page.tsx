"use server"

import BodyTuneMeals from "@/components/dashboardComponents/bodytuneMeals/BodyTuneMeals"
import { getUserMealPlans } from "@/lib/supabaseQueries";

// Types
import { mealPlanQuery } from "@/types/planTypes"

const BodyTuneMealsPage = async () => {
  const mealPlans: Array<mealPlanQuery> | [] = await getUserMealPlans();

  return (
    <div className='px-4 mt-4 w-full'>
      <BodyTuneMeals mealPlans={mealPlans} />
    </div>
  )
}

export default BodyTuneMealsPage