"use client";

// Components
import DashboardHeader from "../DashboardHeader";

// Icons
import SolarStarsMinimalisticLineDuotone from "@/icons/SolarStarsMinimalisticLineDuotone";
import BodyTuneStudioContents from "./BodyTuneStudioContents";

const BodyTuneStudio = () => {
  return (
    <div className="flex flex-col gap-12">
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
