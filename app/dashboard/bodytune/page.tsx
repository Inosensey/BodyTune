"use server"

// lib
import { getUserBodyTunes } from "@/lib/supabaseQueries"

// Components
import BodyTuneStudio from "@/components/dashboardComponents/bodytuneStudio/BodyTuneStudio"

// Types
import { bodyTunePlan } from "@/types/planTypes";


const BodyTuneStudioPage = async () => {
  const  bodyTunes: Array<bodyTunePlan> | [] = await getUserBodyTunes();

  return (
    <div className='px-4 mt-4 w-full'>
      <BodyTuneStudio bodyTunesProp={bodyTunes} />
    </div>
  )
}

export default BodyTuneStudioPage