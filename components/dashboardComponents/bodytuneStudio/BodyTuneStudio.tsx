"use client";

import { useQuery } from "@tanstack/react-query";

// lib
import { getBodyTunes } from "@/lib/supabaseQueries";

// Components
import DashboardHeader from "../DashboardHeader";

// Icons
import SolarStarsMinimalisticLineDuotone from "@/icons/SolarStarsMinimalisticLineDuotone";
import BodyTuneStudioContents from "./BodyTuneStudioContents";

// Types
import { bodyTunePlan } from "@/types/planTypes";
interface props {
  bodyTunesProp: Array<bodyTunePlan> | undefined
}

const BodyTuneStudio = ({bodyTunesProp}:props) => {

  // Use query
  useQuery({
    queryKey: ["bodyTunes"],
    initialData: bodyTunesProp,
    queryFn: () => {
      return getBodyTunes();
    }
  });
  return (
    <div className="flex flex-col gap-3 h-[99%]">
      <DashboardHeader
        headerText="BodyTune Studio"
        headerDescription="Combine workouts and meals into your ideal regimen"
        Icon={SolarStarsMinimalisticLineDuotone}
      />
      <BodyTuneStudioContents />
    </div>
  );
};

export default BodyTuneStudio;
