"use client";

import { useState } from "react";
// Components
import DashboardHeader from "../../DashboardHeader";
import BodyTuneCreationOptions from "./BodyTuneCreationOptions";
import BreadCrumbs from "./BreadCrumbs";
import SetGeneralInfo from "./SetGeneralInfo";
import SetMealPlan from "./SetMealPlan";
import SetExercisePlan from "./SetExercisePlan";
import SetVisibility from "./SetVisibility";

// Icons
import SolarStarsMinimalisticLineDuotone from "@/icons/SolarStarsMinimalisticLineDuotone";

// Types
import { TableRow } from "@/types/database.types";
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
    <div className="flex flex-col gap-2 h-[99%] relative">
      <div className="phone:h-[17%] laptop:h-[12%]">
        <DashboardHeader
          headerText="Create Your BodyTune"
          headerDescription="Craft a personalized plan by combining workouts and meals into your perfect routine."
          Icon={SolarStarsMinimalisticLineDuotone}
        />
      </div>
      <div className="h-[83%] flex flex-col flex-1 gap-1 items-center">
        {selectedOption === "" ? (
          <BodyTuneCreationOptions setSelectOption={setSelectedOption} />
        ) : (
          <div className="flex flex-1 h-full flex-col items-center justify-center-center gap-1 w-full">
            <div className="w-max phone:h-[14%] laptop:h-[12%]">
              <BreadCrumbs
                breadCrumbs={BreadCrumbsInitials}
                setSelectedBreadCrumb={setSelectedBreadCrumb}
                setProgress={setProgress}
                selectedBreadCrumb={selectedBreadCrumb}
              />
            </div>

            {progress === 1 && (
              <div className="flex justify-center w-full">
                <SetGeneralInfo
                  personalInfo={personaInfo[0]}
                  setSelectedOption={setSelectedOption}
                  setProgress={setProgress}
                  setSelectedBreadCrumb={setSelectedBreadCrumb}
                />
              </div>
            )}
            {progress === 2 && (
              <div className="flex flex-1 justify-center h-[85%] w-full">
                <SetMealPlan
                  setSelectedOption={setSelectedOption}
                  setSelectedBreadCrumb={setSelectedBreadCrumb}
                  setProgress={setProgress}
                />
              </div>
            )}
            {progress === 3 && (
              <div className="flex flex-1 justify-center h-[85%] w-full">
                <SetExercisePlan
                  setSelectedOption={setSelectedOption}
                  setSelectedBreadCrumb={setSelectedBreadCrumb}
                  setProgress={setProgress}
                />
              </div>
            )}
            {progress === 4 && (
              <div className="flex flex-1 justify-center h-[85%] w-full">
                <SetVisibility
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
