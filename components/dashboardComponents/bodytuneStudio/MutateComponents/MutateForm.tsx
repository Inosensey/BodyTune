"use client";

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { AnimatePresence } from "framer-motion";

// Actions
import { createBodyTunePlan } from "@/actions/planActions";
import LoadingPopUp from "@/components/reusableComponent/loadingAnimation/LoadingPopUp";

// Components
import DashboardHeader from "@/components/dashboardComponents/DashboardHeader";
import BreadCrumbs from "@/components/dashboardComponents/reusableComponents/BreadCrumbs";
import SetGeneralInfo from "@/components/dashboardComponents/reusableComponents/SetGeneralInfo";
import SetMealPlan from "@/components/dashboardComponents/reusableComponents/SetMealPlan";
import SetExercisePlan from "@/components/dashboardComponents/reusableComponents/SetExercisePlan";
import SetVisibility from "@/components/dashboardComponents/reusableComponents/SetVisibility";
import CreationOption from "../../reusableComponents/CreationOption";
import BodyTuneDetails from "../BodyTuneDetails";

// Icons
import SolarStarsMinimalisticLineDuotone from "@/icons/SolarStarsMinimalisticLineDuotone";

// Types
import { TableRow } from "@/types/database.types";
import { InterfaceBreadCrumbs } from "@/types/inputTypes";
import { exercisePlan } from "@/types/planTypes";
import { mealPlanType } from "@/types/mealTypes";
import { formReturnType } from "@/types/formTypes";
interface props {
  personalInfo: TableRow<"personal_information">[];
}
interface generalInfoType {
  weight: string;
  height: string;
  experience: string;
  bmi: string;
}
interface mealPlanInterface {
  selectedMealPlan: string;
  mealPlanName: string;
}
interface exercisePlanInterface {
  selectedExercisePlan: number;
  exercisePlanName: string;
}

// Initials
const useFormStateInitials: formReturnType<[]> = {
  success: null,
  error: null,
  message: "",
  data: [],
};
const mealPlanFieldsInit: mealPlanInterface = {
  selectedMealPlan: "0",
  mealPlanName: "",
};
const exercisePlanInitials: exercisePlanInterface = {
  selectedExercisePlan: 0,
  exercisePlanName: "",
};
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

const mealPlanInitial: mealPlanType = {
  ["Monday"]: {
    breakFast: {
      mealInfo: undefined,
      ingredients: undefined,
      nutrition: undefined,
    },
    lunch: {
      mealInfo: undefined,
      ingredients: undefined,
      nutrition: undefined,
    },
    dinner: {
      mealInfo: undefined,
      ingredients: undefined,
      nutrition: undefined,
    },
  },
};

// const exercisePlanInitial: exercisePlan = {
//   ["Monday"]: [
//     {
//       exerciseName: "",
//       bodyPart: "",
//       equipment: "",
//       day: "",
//       exerciseDifficulty: 1,
//       exerciseMeasurementType: 1,
//       measurement: "",
//       exerciseDemo: "",
//       bmiClassification: 1,
//       instruction: "",
//       youtubeLink: "",
//     },
//   ],
// };

const MutateForm = ({ personalInfo }: props) => {
  // UseFormState
  const [formState, formAction] = useFormState(
    createBodyTunePlan,
    useFormStateInitials
  );

  // States
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitMessage, setSubmitMessage] = useState<string>("");
  const [generalInfoFieldsVal, setGeneralInfoFieldsVal] =
    useState<generalInfoType>({
      height: personalInfo[0].height!.toString(),
      weight: personalInfo[0].weight!.toString(),
      experience: "",
      bmi: "",
    });
  const [mealPlanFieldsVal, setMealPlanFieldsVal] =
    useState<mealPlanInterface>(mealPlanFieldsInit);
  const [exercisePlanFieldsVal, setExercisePlanFieldsVal] =
    useState<exercisePlanInterface>(exercisePlanInitials);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedBreadCrumb, setSelectedBreadCrumb] =
    useState<InterfaceBreadCrumbs>({
      id: 1,
      title: "Body Metrics",
      shortDescription: "Set weight, height, and experience",
    });
  const [progress, setProgress] = useState<number>(1);
  const [mealPlanInfo, setMealPlanInfo] =
    useState<mealPlanType>(mealPlanInitial);
  const [exercisePlanInfo, setExercisePlanInfo] = useState<exercisePlan>({});
  const [disabledBreadCrumbs, setDisabledBreadCrumbs] = useState<number[]>([]);
  const [visibilityPreference, setVisibilityPreference] = useState<string>("");
  const [togglePreviewBodyTune, setTogglePreviewBodyTune] =
    useState<boolean>(false);
  console.log(visibilityPreference);

  // Events
  const handleSubmit = () => {
    setSubmitMessage("test");
    setIsSubmitting(true);
  };

  // useEffect
  useEffect(() => {
    if (selectedOption === "") return;
    if (selectedOption === "recommendation") {
      setDisabledBreadCrumbs([2, 3, 4]);
    } else {
      setDisabledBreadCrumbs([]);
    }
  }, [selectedOption]);
  useEffect(() => {
    if (formState.success !== null || formState.error !== null) {
      if (formState.success) {
        console.log(formState);
        // setSubmitMessage("You're in! 🎯 Taking you to your dashboard—let’s crush some goals today! 💪");
        setIsSubmitting(false);
      } else {
        setIsSubmitting(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  return (
    <>
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
            <CreationOption
              label="How would you like to create your BodyTune"
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
                  selectedCreateOption={selectedOption}
                  disabledBreadCrumbs={disabledBreadCrumbs}
                />
              </div>

              <form action={formAction} onSubmit={handleSubmit}>
                {progress === 1 && (
                  <div className="flex justify-center max-h w-full">
                    <SetGeneralInfo
                      personalInfo={personalInfo[0]}
                      setSelectedOption={setSelectedOption}
                      setDisabledBreadCrumbs={setDisabledBreadCrumbs}
                      setProgress={setProgress}
                      setSelectedBreadCrumb={setSelectedBreadCrumb}
                      selectedCreateOption={selectedOption}
                      generalInfoFieldsVal={generalInfoFieldsVal}
                      setGeneralInfoFieldsVal={setGeneralInfoFieldsVal}
                      setExercisePlanInfo={setExercisePlanInfo}
                      setMealPlanInfo={setMealPlanInfo}
                    />
                  </div>
                )}
                {progress === 2 && (
                  <div className="flex flex-1 justify-center h-[75%] phone:w-full laptop:w-[90%]">
                    <SetMealPlan
                      mealPlanFieldsVal={mealPlanFieldsVal}
                      setMealPlanFieldsVal={setMealPlanFieldsVal}
                      setSelectedOption={setSelectedOption}
                      setSelectedBreadCrumb={setSelectedBreadCrumb}
                      setProgress={setProgress}
                      mealPlanInfo={mealPlanInfo}
                      setMealPlanInfo={setMealPlanInfo}
                      selectedCreateOption={selectedOption}
                    />
                  </div>
                )}
                {progress === 3 && (
                  <div className="flex flex-1 justify-center h-[75%]">
                    <SetExercisePlan
                      exercisePlanFieldsVal={exercisePlanFieldsVal}
                      setExercisePlanFieldsVal={setExercisePlanFieldsVal}
                      setSelectedOption={setSelectedOption}
                      setSelectedBreadCrumb={setSelectedBreadCrumb}
                      setProgress={setProgress}
                      exercisePlanInfo={exercisePlanInfo}
                      setExercisePlanInfo={setExercisePlanInfo}
                      selectedCreateOption={selectedOption}
                    />
                  </div>
                )}
                {progress === 4 && (
                  <div className="flex flex-1 justify-center w-full">
                    <SetVisibility
                      setSelectedOption={setSelectedOption}
                      setSelectedBreadCrumb={setSelectedBreadCrumb}
                      setProgress={setProgress}
                      Icon={SolarStarsMinimalisticLineDuotone}
                      visibilityPreference={visibilityPreference}
                      setVisibilityPreference={setVisibilityPreference}
                      setTogglePreviewBodyTune={setTogglePreviewBodyTune}
                    />
                  </div>
                )}
              </form>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {togglePreviewBodyTune && (
          <BodyTuneDetails
            exercisePlan={exercisePlanInfo}
            mealPlan={mealPlanInfo}
            setToggleBodyTuneDetails={setTogglePreviewBodyTune}
          />
        )}
      </AnimatePresence>
      <LoadingPopUp message={submitMessage} isLoading={isSubmitting} />
    </>
  );
};

export default MutateForm;
