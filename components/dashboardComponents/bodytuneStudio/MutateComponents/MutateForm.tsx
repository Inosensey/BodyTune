"use client";

import { useState } from "react";
// Components
import DashboardHeader from "../../DashboardHeader";
import BodyTuneCreationOptions from "./BodyTuneCreationOptions";

// Icons
import SolarStarsMinimalisticLineDuotone from "@/icons/SolarStarsMinimalisticLineDuotone";

// Types
import { TableRow } from "@/types/database.types";
import FirstStep from "./FirstStep";
import { InterfaceBreadCrumbs } from "@/types/inputTypes";
import BreadCrumbs from "./BreadCrumbs";
interface props {
  personaInfo: TableRow<"personal_information">;
}

// Initials
const BreadCrumbsInitials: InterfaceBreadCrumbs[] = [
  {
    id: 1,
    title: "Body Metrics",
    shortDescription: "Set weight, height, and experience",
  },
  {
    id: 2,
    title: "Meal Plan",
    shortDescription: "Customize your daily meals",
  },
  {
    id: 3,
    title: "Exercise Plan",
    shortDescription: "Define your workout routine",
  },
  {
    id: 4,
    title: "Finalize & Share",
    shortDescription: "Review and set visibility",
  },
];

const MutateForm = ({ personaInfo }: props) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedBreadCrumb, setSelectedBreadCrumb] =
    useState<InterfaceBreadCrumbs>({
      id: 1,
      title: "Body Metrics",
      shortDescription: "Set weight, height, and experience",
    });

  return (
    <div className="flex flex-col gap-4 h-[99%]">
      <DashboardHeader
        headerText="Create Your BodyTune"
        headerDescription="Craft a personalized plan by combining workouts and meals into your perfect routine."
        Icon={SolarStarsMinimalisticLineDuotone}
      />
      <div className="flex flex-col flex-1 gap-8 items-center">
        {selectedOption === "" ? (
          <BodyTuneCreationOptions setSelectOption={setSelectedOption} />
        ) : (
          <div className="flex flex-col gap-4">
            <BreadCrumbs
              breadCrumbs={BreadCrumbsInitials}
              setSelectedBreadCrumb={setSelectedBreadCrumb}
              selectedBreadCrumb={selectedBreadCrumb}
            />
            <FirstStep
              personalInfo={personaInfo}
              setSelectedOption={setSelectedOption}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MutateForm;
