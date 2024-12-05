"use client";

import { useState } from "react";
// Components
import DashboardHeader from "../../DashboardHeader";
import BodyTuneCreationOptions from "./BodyTuneCreationOptions";
import BreadCrumbs from "./BreadCrumbs";
import SecondStep from "./SecondStep";

// Icons
import SolarStarsMinimalisticLineDuotone from "@/icons/SolarStarsMinimalisticLineDuotone";

// Types
import { TableRow } from "@/types/database.types";
import FirstStep from "./FirstStep";
import { InterfaceBreadCrumbs } from "@/types/inputTypes";
interface props {
  personaInfo: TableRow<"personal_information">[];
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
  const [progress, setProgress] = useState<number>(1);

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
          <div className="flex flex-1 flex-col items-center gap-4 w-full">
            <div className="w-max">
              <BreadCrumbs
                breadCrumbs={BreadCrumbsInitials}
                setSelectedBreadCrumb={setSelectedBreadCrumb}
                setProgress={setProgress}
                selectedBreadCrumb={selectedBreadCrumb}
              />
            </div>

            {progress === 1 && (
              <div className="flex justify-center w-full">
                <FirstStep
                  personalInfo={personaInfo[0]}
                  setSelectedOption={setSelectedOption}
                  setProgress={setProgress}
                  setSelectedBreadCrumb={setSelectedBreadCrumb}
                />
              </div>
            )}
            {progress === 2 && (
              <div className="flex flex-1 justify-center w-full">
                <SecondStep
                  setSelectedOption={setSelectedOption}
                  setSelectedBreadCrumb={setSelectedBreadCrumb}
                  setProgress={setProgress}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MutateForm;
