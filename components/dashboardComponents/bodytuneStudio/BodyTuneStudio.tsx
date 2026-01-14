"use client";

import { useQuery } from "@tanstack/react-query";

// lib
import { getUserBodyTunes } from "@/lib/supabaseQueries";

// Components
import DashboardHeader from "../DashboardHeader";

// Icons
import SolarStarsMinimalisticLineDuotone from "@/icons/SolarStarsMinimalisticLineDuotone";
import BodyTuneStudioContents from "./BodyTuneStudioContents";

// Types
import { bodyTunePlan } from "@/types/planTypes";
interface props {
  bodyTunesProp: Array<bodyTunePlan> | []
}

const BodyTuneStudio = ({bodyTunesProp}:props) => {
  // Use query
  useQuery({
    queryKey: ["userBodyTunes"],
    initialData: bodyTunesProp,
    queryFn: () => {
      return getUserBodyTunes();
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
