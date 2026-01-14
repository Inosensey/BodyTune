"use client";

import { useQuery } from "@tanstack/react-query";

import { getExplorePageContent } from "@/lib/supabaseQueries";
// import { useQuery } from "@tanstack/react-query";

// Components
import DashboardHeader from "../DashboardHeader";
import ExploreContent from "./ExploreContent";

// Icons
import SolarRoundedMagniferLinear from "@/icons/SolarRoundedMagniferLinear";

// Types
import {
  explorePageContentInterface,
} from "@/types/planTypes";

interface props {
  explorePageContentInterface: explorePageContentInterface
}
const Explore = ({ explorePageContentInterface }: props) => {
  // Use query
  useQuery({
    queryKey: ["explorePageContent"],
    initialData: explorePageContentInterface,
    queryFn: () => {
      return getExplorePageContent();
    }
  });

  return (
    <div className="flex flex-col gap-3 h-[99%]">
      <DashboardHeader
        headerText="Explore"
        headerDescription="Browse workouts, meal plans, and BodyTunes crafted by others"
        Icon={SolarRoundedMagniferLinear}
      />
      <ExploreContent
      />
    </div>
  );
};

export default Explore;
