"use client";

import { useState } from "react";

// Components
import DashboardHeader from "@/components/dashboardComponents/DashboardHeader";
import BreadCrumbs from "@/components/dashboardComponents/reusableComponents/BreadCrumbs";
import CreationOption from "@/components/dashboardComponents/reusableComponents/CreationOption";
import SetGeneralInfo from "@/components/dashboardComponents/reusableComponents/SetGeneralInfo";
import SetVisibility from "@/components/dashboardComponents/reusableComponents/SetVisibility";
import SetExercisePlan from "@/components/dashboardComponents/reusableComponents/SetExercisePlan";

// Icons
import TablerBarbell from "@/icons/TablerBarbell";

// Types
import { TableRow } from "@/types/database.types";
import { InterfaceBreadCrumbs } from "@/types/inputTypes";
interface props {
  personalInfo: TableRow<"personal_information">[];
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
    title: "Exercise Plan",
    shortDescription: "Define your workout routine",
  },
  {
    id: 3,
    title: "Finalize & Share",
    shortDescription: "Review and set visibility",
  },
];

const MutateForm = ({ personalInfo }: props) => {
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
          headerText="Create Your Workout Plan"
          headerDescription="Design a workout routine that fits your goals and lifestyle."
          Icon={TablerBarbell}
        />
      </div>
      <div className="h-[83%] flex flex-col flex-1 gap-1 items-center">
        {selectedOption === "" ? (
          <CreationOption
            label="How would you like to create your Workout Plan"
            setSelectOption={setSelectedOption}
          />
        ) : (
          <div className="flex flex-1 h-full flex-col items-center justify-center-center gap-1 w-full">
            <div className="h-max max-w-[800px] mb-1">
              <BreadCrumbs
                breadCrumbs={BreadCrumbsInitials}
                setSelectedBreadCrumb={setSelectedBreadCrumb}
                setProgress={setProgress}
                selectedBreadCrumb={selectedBreadCrumb}
              />
            </div>
            {progress === 1 && (
              <div className="flex justify-center max-h w-full">
                <SetGeneralInfo
                  personalInfo={personalInfo[0]}
                  setSelectedOption={setSelectedOption}
                  setProgress={setProgress}
                  setSelectedBreadCrumb={setSelectedBreadCrumb}
                />
              </div>
            )}
            {progress === 2 && (
              <div className="flex flex-1 justify-center h-[75%]">
                <SetExercisePlan
                  setSelectedOption={setSelectedOption}
                  setSelectedBreadCrumb={setSelectedBreadCrumb}
                  setProgress={setProgress}
                />
              </div>
            )}
            {progress === 3 && (
              <div className="flex flex-1 justify-center h-[75%]">
                <SetVisibility
                  setSelectedOption={setSelectedOption}
                  setSelectedBreadCrumb={setSelectedBreadCrumb}
                  setProgress={setProgress}
                  Icon={TablerBarbell}
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
