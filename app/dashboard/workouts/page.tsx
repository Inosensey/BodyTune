"use server"

// lib
import { getUserExercisePlans } from "@/lib/supabaseQueries"

// Components
import BodyTuneWorkouts from "@/components/dashboardComponents/bodytuneWorkouts/BodyTuneWorkouts"

// Types
import { exercisePlanQuery } from "@/types/planTypes"

const BodyTuneWorkoutsPage = async () => {
  const exercisePlans: Array<exercisePlanQuery> | [] = await getUserExercisePlans();

  return (
    <div className='px-4 mt-4 w-full'>
      <BodyTuneWorkouts exercisePlans={exercisePlans} />
    </div>
  )
}

export default BodyTuneWorkoutsPage