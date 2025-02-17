"use client";

// Components
import DashboardHeader from "../DashboardHeader";
import ExploreContent from "./ExploreContent";

// Icons
import SolarRoundedMagniferLinear from "@/icons/SolarRoundedMagniferLinear";

const Explore = () => {
  return (
    <div className="flex flex-col gap-3 h-[99%]">
      <DashboardHeader
        headerText="Explore"
        headerDescription="Browse workouts, meal plans, and BodyTunes crafted by others"
        Icon={SolarRoundedMagniferLinear}
      />
      <ExploreContent />
    </div>
  );
};

export default Explore;
