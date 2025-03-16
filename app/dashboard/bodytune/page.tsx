"use server"

// lib
import { getBodyTunes } from "@/lib/supabaseQueries"

// Components
import BodyTuneStudio from "@/components/dashboardComponents/bodytuneStudio/BodyTuneStudio"

// Types
import { bodyTunePlan } from "@/types/planTypes";


const BodyTuneStudioPage = async () => {
  const  bodyTunes: Array<bodyTunePlan> | undefined = await getBodyTunes();

  return (
    <div className='px-4 mt-4 w-full'>
      <BodyTuneStudio bodyTunesProp={bodyTunes} />
    </div>
  )
}

export default BodyTuneStudioPage