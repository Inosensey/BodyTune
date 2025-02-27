"use client";

import { useQuery } from "@tanstack/react-query";

// lib
import {getMeals, getWorkouts} from "@/lib/hygraphQueries"

// Components
import DashboardHeader from "../DashboardHeader";

// Icons
import SolarStarsMinimalisticLineDuotone from "@/icons/SolarStarsMinimalisticLineDuotone";
import BodyTuneStudioContents from "./BodyTuneStudioContents";

const BodyTuneStudio = () => {

    // Use query
    const { data: meals } = useQuery({
      queryKey: ["meals"],
      queryFn: () => {
        return getMeals();
      }
    });
    const { data: exercises } = useQuery({
      queryKey: ["exercises"],
      queryFn: () => {
        return getWorkouts();
      }
    });
    console.log(meals);
    console.log(exercises);
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
