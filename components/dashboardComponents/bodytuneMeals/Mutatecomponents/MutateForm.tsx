"use client";

import { useState } from "react";

// Components
import DashboardHeader from "@/components/dashboardComponents/DashboardHeader";
import BreadCrumbs from "@/components/dashboardComponents/reusableComponents/BreadCrumbs";
import CreationOption from "@/components/dashboardComponents/reusableComponents/CreationOption";
import SetGeneralInfo from "@/components/dashboardComponents/reusableComponents/SetGeneralInfo";
import SetVisibility from "@/components/dashboardComponents/reusableComponents/SetVisibility";
import SetMealPlan from "@/components/dashboardComponents/reusableComponents/SetMealPlan";

// Icons
import MdiFoodDrumstickOutline from "@/icons/MdiFoodDrumstickOutline";

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
    title: "Meal Plan",
    shortDescription: "Customize your daily meals",
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
      <div className="phone:h-[17%] laptop:h-[16%]">
        <DashboardHeader
          headerText="Create Your Meal Plan"
          headerDescription="Design a meal plan tailored to your taste and nutrition goals."
          Icon={MdiFoodDrumstickOutline}
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
            <div className="w-max phone:h-[14%] laptop:h-[15%]">
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
                  personalInfo={personalInfo[0]}
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
