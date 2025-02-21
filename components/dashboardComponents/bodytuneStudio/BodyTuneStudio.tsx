"use client";

import { useQuery } from "@tanstack/react-query";

// Utils
import {getMeals} from "@/lib/hygraphQueries"

// Components
import DashboardHeader from "../DashboardHeader";

// Icons
import SolarStarsMinimalisticLineDuotone from "@/icons/SolarStarsMinimalisticLineDuotone";
import BodyTuneStudioContents from "./BodyTuneStudioContents";

const BodyTuneStudio = () => {

    // Use query
    const { data } = useQuery({
      queryKey: ["meals"],
      queryFn: () => {
        return getMeals();
      }
    });
    console.log(data);
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
