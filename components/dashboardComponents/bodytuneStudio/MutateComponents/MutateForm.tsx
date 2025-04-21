"use client";

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "nextjs-toploader/app";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Oval } from "react-loader-spinner";

// Actions
import { createBodyTunePlan, updateBodyTunePlan } from "@/actions/planActions";
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

// Utils
import {
  generateMealPlanName,
  generateExercisePlanName,
} from "@/utils/dashboardUtils";

// Icons
import SolarStarsMinimalisticLineDuotone from "@/icons/SolarStarsMinimalisticLineDuotone";

// Types
import { TableRow } from "@/types/database.types";
import { InterfaceBreadCrumbs } from "@/types/inputTypes";
import {
  exercisePlan,
  exercisePlanQuery,
  mealPlanQuery,
  visibilityInterface,
} from "@/types/planTypes";
import { mealPlanGeneralInfo, mealPlanName, mealPlanType } from "@/types/mealTypes";
import { formReturnType } from "@/types/formTypes";
import { getExercisePlans, getMealPlans } from "@/lib/supabaseQueries";
import { exercisePlanGeneralInfo, exercisePlanName } from "@/types/exerciseTypes";
interface props {
  action: string;
  personalInfo: TableRow<"personal_information">[];
  bodyTuneId?: number,
  exercisePlanGeneralInfo?: exercisePlanGeneralInfo;
  fetchedExercisePlanInfo?: exercisePlan;
  mealPlanGeneralInfo?: mealPlanGeneralInfo;
  fetchedMealPlanInfo?: mealPlanType;
  planVisibilityInfo?: visibilityInterface;
  mealPlanList: Array<mealPlanQuery> | [];
  exercisePlanList: Array<exercisePlanQuery> | [];
}
interface generalInfoType {
  weight: string;
  height: string;
  experience: string;
  bmi: string;
}

// Form State Initials
const useFormStateInitials: formReturnType<[] | number> = {
  success: null,
  error: null,
  message: "",
  data: [],
};

// BreadCrumbs Initials
const BreadCrumbsInitials: Array<InterfaceBreadCrumbs> = [
  { id: 1, title: "Body Metrics", shortDescription: "Set weight, height, and experience" },
  { id: 2, title: "Meal Plan", shortDescription: "Customize your daily meals" },
  { id: 3, title: "Exercise Plan", shortDescription: "Define your workout routine" },
  { id: 4, title: "Finalize & Share", shortDescription: "Review and set visibility" },
];

// Meal Plan Initial Structure
const mealPlanInitial: mealPlanType = {
  ["Monday"]: {
    breakFast: { mealInfo: undefined, ingredients: undefined, nutrition: undefined },
    lunch: { mealInfo: undefined, ingredients: undefined, nutrition: undefined },
    dinner: { mealInfo: undefined, ingredients: undefined, nutrition: undefined },
  },
};

const MutateForm = ({
  action,
  bodyTuneId,
  personalInfo,
  planVisibilityInfo,
  fetchedExercisePlanInfo,
  fetchedMealPlanInfo,
  exercisePlanGeneralInfo,
  mealPlanGeneralInfo,
  exercisePlanList,
  mealPlanList,
}: props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const formData = new FormData();

  // UseQuery
  useQuery({
    queryKey: ["exercisePlans"],
    initialData: exercisePlanList,
    queryFn: () => {
      return getExercisePlans();
    },
  });
  useQuery({
    queryKey: ["mealPlans"],
    initialData: mealPlanList,
    queryFn: () => {
      return getMealPlans();
    },
  });

  // Derived Values
  const mealPlanNameInit: mealPlanName = {
    selectedMealPlanUserId: mealPlanGeneralInfo ? mealPlanGeneralInfo.createdBy : "",
    selectedMealPlan: mealPlanGeneralInfo ? mealPlanGeneralInfo.id : "0",
    mealPlanName: mealPlanGeneralInfo ? mealPlanGeneralInfo.planName : "",
  };
  const exercisePlanNameInit: exercisePlanName = {
    selectedExercisePlanUserId: exercisePlanGeneralInfo ? exercisePlanGeneralInfo.createdBy : "0",
    selectedExercisePlan: exercisePlanGeneralInfo ? exercisePlanGeneralInfo.id : "0",
    exercisePlanName: exercisePlanGeneralInfo ? exercisePlanGeneralInfo.planName : "",
  };
  const selectedBmisInitials: string[] = mealPlanGeneralInfo
    ? mealPlanGeneralInfo.tags.map((info) => info.meal_tags.mealTagName)
    : [];

  const selectedDifficultiesInitials: string[] = exercisePlanGeneralInfo
    ? exercisePlanGeneralInfo.tags.map((info) => info.exercise_tags.exerciseTagName)
    : [];

  // Form State
  const [formState, formAction] = useFormState(action === "Update" ? updateBodyTunePlan : createBodyTunePlan, useFormStateInitials);

  // State Hooks
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [selectedOption, setSelectedOption] = useState(
    fetchedExercisePlanInfo && fetchedMealPlanInfo ? "Custom" : ""
  );

  // BreadCrumbs State
  const [disabledBreadCrumbs, setDisabledBreadCrumbs] = useState<number[]>([]);
  const [selectedBreadCrumb, setSelectedBreadCrumb] = useState<InterfaceBreadCrumbs>(
    BreadCrumbsInitials[0]
  );
  const [progress, setProgress] = useState(1);
  const [togglePreviewBodyTune, setTogglePreviewBodyTune] = useState(false);

  // General Info Fields
  const [generalInfoFieldsVal, setGeneralInfoFieldsVal] = useState<generalInfoType>({
    height: personalInfo[0].height!.toString(),
    weight: personalInfo[0].weight!.toString(),
    experience: "",
    bmi: "",
  });

  // Meal Plan State
  const [originalFetchedMealPlanInfo] = useState<mealPlanType | undefined>(
    fetchedMealPlanInfo
  );
  const [mealPlanInfo, setMealPlanInfo] = useState<mealPlanType>(
    fetchedMealPlanInfo || mealPlanInitial
  );
  const [mealPlanNameVal, setMealPlanNameVal] = useState(mealPlanNameInit);
  const [selectedBmis, setSelectedBmis] = useState<string[]>(selectedBmisInitials);
  const [bmiClassification, setBmiClassification] = useState({ id: "", bmiClassification: "" });

  // Exercise Plan State
  const [originalFetchedExercisePlanInfo] = useState<exercisePlan | undefined>(
    fetchedExercisePlanInfo || {});
  const [exercisePlanInfo, setExercisePlanInfo] = useState<exercisePlan>(
    fetchedExercisePlanInfo || {}
  );
  const [exercisePlanNameVal, setExercisePlanNameVal] = useState(exercisePlanNameInit);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>(
    selectedDifficultiesInitials
  );

  // Visibility Preference
  const [visibilityPreference, setVisibilityPreference] = useState(planVisibilityInfo ? planVisibilityInfo.id.toString() : "");
  
  // Events
  const handleSubmit = () => {
    const jsonData = {
      bodyTuneId: bodyTuneId,
      mealPlan: mealPlanInfo,
      exercisePlan: exercisePlanInfo,
      mealPlanTags: selectedBmis,
      exercisePlanTags: selectedDifficulties,
    };
    formData.append("jsonData", JSON.stringify(jsonData));
    formData.append("mealPlanName", mealPlanNameVal.mealPlanName);
    formData.append("exercisePlanName", exercisePlanNameVal.exercisePlanName);
    formData.append("visibilityPreference", visibilityPreference);
    formData.append("selectedMealPlan", 
      JSON.stringify({
        selectedMealPlanId: mealPlanNameVal.selectedMealPlan, 
        selectedMealPlanUserId: mealPlanNameVal.selectedMealPlanUserId
      })
    )
    formData.append(
      "selectedExercisePlan",
      JSON.stringify({
        selectedExercisePlan: exercisePlanNameVal.selectedExercisePlan, 
        selectedExercisePlanUserId: exercisePlanNameVal.selectedExercisePlanUserId
      })
    );

    setSubmitMessage(
      "Creating your BodyTune... ⏳ Hang tight while we set up your plan!"
    );
    setIsSubmitting(true);
  };

  // useEffect

  // Handles breadcrumb disabling based on selectedOption
  useEffect(() => {
    if (selectedOption === "") return;
    setDisabledBreadCrumbs(selectedOption === "recommendation" ? [2, 3, 4] : []);
  }, [selectedOption]);

  // Updates BMI classification and generates a meal plan name
  useEffect(() => {
    if (!bmiClassification.id) return;

    setSelectedBmis((prev) => [...prev, bmiClassification.bmiClassification]);
    setMealPlanNameVal((prev) => ({
      ...prev,
      mealPlanName: generateMealPlanName(bmiClassification.bmiClassification),
    }));
  }, [bmiClassification]);

  // Updates experience-based difficulty selection and exercise plan name
  useEffect(() => {
    if (!generalInfoFieldsVal.experience) return;

    setSelectedDifficulties((prev) => [...prev, generalInfoFieldsVal.experience]);
    setExercisePlanNameVal((prev) => ({
      ...prev,
      exercisePlanName: generateExercisePlanName(generalInfoFieldsVal.experience),
    }));
  }, [generalInfoFieldsVal]);

  // Handles form submission success or error
  useEffect(() => {
    if (formState.success === null && formState.error === null) return;
    setIsSubmitting(false);
    console.log(formState);
    // if (formState.success) {
    //   setSubmitMessage(
    //     "Your BodyTune is ready! 🎯 Redirecting you to view your personalized plan—let’s get started! 💪"
    //   );
    //   queryClient.invalidateQueries({ queryKey: ["bodyTunes"] });
    //   router.push(`/plan/bodytune/${formState.data}`);
    // } else {
    //   setIsSubmitting(false);
    // }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  return (
    <>
      <div className="flex flex-col gap-2 h-[99%] relative">
        <div className="phone:h-[17%] laptop:h-[12%]">
          <DashboardHeader
            headerText={`${
              action === "Update" ? "Update" : "Create"
            } Your BodyTune`}
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

              <form action={() => formAction(formData)} onSubmit={handleSubmit}>
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
                      bmiClassification={bmiClassification}
                      setBmiClassification={setBmiClassification}
                    />
                  </div>
                )}
                {progress === 2 && (
                  <div className="flex flex-1 justify-center h-[75%] phone:w-full laptop:w-[90%]">
                    <SetMealPlan
                      mealPlanNameVal={mealPlanNameVal}
                      setMealPlanNameVal={setMealPlanNameVal}
                      setSelectedOption={setSelectedOption}
                      setSelectedBreadCrumb={setSelectedBreadCrumb}
                      setProgress={setProgress}
                      originalMealPlanGeneralInfo={mealPlanGeneralInfo}
                      originalFetchedMealPlanInfo={originalFetchedMealPlanInfo}
                      mealPlanInfo={mealPlanInfo}
                      setMealPlanInfo={setMealPlanInfo}
                      selectedCreateOption={selectedOption}
                      selectedBmis={selectedBmis}
                      setSelectedBmis={setSelectedBmis}
                    />
                  </div>
                )}
                {progress === 3 && (
                  <div className="flex flex-1 justify-center h-[75%]">
                    <SetExercisePlan
                      exercisePlanNameVal={exercisePlanNameVal}
                      setExercisePlanNameVal={setExercisePlanNameVal}
                      setSelectedOption={setSelectedOption}
                      setSelectedBreadCrumb={setSelectedBreadCrumb}
                      setProgress={setProgress}
                      originalExercisePlanGeneralInfo={exercisePlanGeneralInfo}
                      originalFetchedExercisePlanInfo={originalFetchedExercisePlanInfo}
                      exercisePlanInfo={exercisePlanInfo}
                      setExercisePlanInfo={setExercisePlanInfo}
                      selectedCreateOption={selectedOption}
                      selectedDifficulties={selectedDifficulties}
                      setSelectedDifficulties={setSelectedDifficulties}
                    />
                  </div>
                )}
                {progress === 4 && (
                  <div className="flex flex-1 justify-center w-full">
                    <SetVisibility
                      action={action}
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
      <LoadingPopUp
        message={submitMessage}
        isLoading={isSubmitting}
        LoadingAnimationIcon={
          <Oval
            visible={true}
            height="60"
            width="60"
            color="#4fa94d"
            secondaryColor="#4B6F64"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        }
      />
    </>
  );
};

export default MutateForm;
