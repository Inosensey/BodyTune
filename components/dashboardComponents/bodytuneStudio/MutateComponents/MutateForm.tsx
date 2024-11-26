"use client";

// Components
import DashboardHeader from "../../DashboardHeader";
import BodyTuneCreationOptions from "./BodyTuneCreationOptions";

// Icons
import SolarStarsMinimalisticLineDuotone from "@/icons/SolarStarsMinimalisticLineDuotone";

// Types
import { TableRow } from "@/types/database.types";
interface props {
  personaInfo: TableRow<"personal_information">
}

const MutateForm = ({personaInfo}:props) => {
  console.log(personaInfo)
  return (
    <div className="flex flex-col gap-1 h-[99%]">
      <DashboardHeader
        headerText="Create Your BodyTune"
        headerDescription="Craft a personalized plan by combining workouts and meals into your perfect routine."
        Icon={SolarStarsMinimalisticLineDuotone}
      />
      <div className="flex flex-col flex-1 gap-8 items-center justify-center">
        <BodyTuneCreationOptions />
      </div>
    </div>
  );
};

export default MutateForm;
