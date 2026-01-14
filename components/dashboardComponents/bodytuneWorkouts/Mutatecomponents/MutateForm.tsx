"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { createExercisePlan, updateExercisePlan } from "@/actions/planActions";
import { useRouter } from "nextjs-toploader/app";

// Components
import DashboardHeader from "@/components/dashboardComponents/DashboardHeader";
import BreadCrumbs from "@/components/dashboardComponents/reusableComponents/BreadCrumbs";
import CreationOption from "@/components/dashboardComponents/reusableComponents/CreationOption";
import SetGeneralInfo from "@/components/dashboardComponents/reusableComponents/SetGeneralInfo";
import SetVisibility from "@/components/dashboardComponents/reusableComponents/SetVisibility";
import SetExercisePlan from "@/components/dashboardComponents/reusableComponents/SetExercisePlan";
import LoadingPopUp from "@/components/reusableComponent/loadingAnimation/LoadingPopUp";

// Utils
import { arrangeExercisePlan, generateExercisePlanName } from "@/utils/dashboardUtils";

// Icons
import TablerBarbell from "@/icons/TablerBarbell";
import { Oval } from "react-loader-spinner";

// Types
import { TableRow } from "@/types/database.types";
import { InterfaceBreadCrumbs } from "@/types/inputTypes";
import {
  exercisePlan,
  exercisePlanQuery,
  visibilityInterface,
} from "@/types/planTypes";
import {
  exercisePlanGeneralInfo,
  exercisePlanListType,
  exercisePlanName,
} from "@/types/exerciseTypes";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getExercisePlans } from "@/lib/supabaseQueries";
import { formReturnType } from "@/types/formTypes";
import { useFormState } from "react-dom";
import BodyTuneWorkoutDetails from "../BodyTuneWorkoutDetails";
import PlanListPopUp from "../../reusableComponents/PlanListPopUp";
interface props {
  action: string;
  personalInfo: TableRow<"personal_information">[];
  exerciseId?: number;
  exercisePlanList: Array<exercisePlanQuery>;
  fetchedExercisePlanInfo?: exercisePlan;
  exercisePlanGeneralInfo?: exercisePlanGeneralInfo;
  planVisibilityInfo?: visibilityInterface;
}
interface generalInfoType {
  weight: string;
  height: string;
  experience: string;
  bmi: string;
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

// Form State Initials
const useFormStateInitials: formReturnType<[] | number> = {
  success: null,
  error: null,
  message: "",
  data: [],
};

const MutateForm = ({
  exerciseId,
  personalInfo,
  action,
  exercisePlanList,
  fetchedExercisePlanInfo,
  exercisePlanGeneralInfo,
  planVisibilityInfo,
}: props) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const formData = new FormData();
  
  // UseQuery
  useQuery({
    queryKey: ["exercisePlans"],
    initialData: exercisePlanList,
    queryFn: () => {
      return getExercisePlans();
    },
  });
  const [exercisePlans] = useState<Array<exercisePlanListType>>(() =>
    exercisePlanList!.map((exercisePlanInfo) => {
      return {
        exerciseId: exercisePlanInfo.id,
        createdBy: exercisePlanInfo.created_by,
        planName: exercisePlanInfo.planName,
        planTags: exercisePlanInfo.exercise_plan_tag,
        exercises: arrangeExercisePlan(exercisePlanInfo),
      };
    })
  );

  // Derived Values
  const exercisePlanNameInit: exercisePlanName = {
    selectedExercisePlanUserId: exercisePlanGeneralInfo
      ? exercisePlanGeneralInfo.createdBy
      : "0",
    selectedExercisePlan: exercisePlanGeneralInfo
      ? exercisePlanGeneralInfo.id
      : "0",
    exercisePlanName: exercisePlanGeneralInfo
      ? exercisePlanGeneralInfo.planName
      : "",
  };
  const selectedDifficultiesInitials: string[] = exercisePlanGeneralInfo
    ? exercisePlanGeneralInfo.tags.map(
        (info) => info.exercise_tags.exerciseTagName
      )
    : [];

  // Form State
  // const [formState, formAction] = useFormState(action === "Update" ? updateBodyTunePlan : createBodyTunePlan, useFormStateInitials);
  const [formState, formAction] = useFormState(
    action === "Update" ? updateExercisePlan : createExercisePlan,
    useFormStateInitials
  );

  // States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [selectedOption, setSelectedOption] = useState(
    fetchedExercisePlanInfo ? "Custom" : ""
  );
  const [togglePlanPopUpList, setTogglePlanPopUpList] = useState<{listType: string, toggle:boolean}>({listType: "", toggle: false});

  // BreadCrumbs State
  const [disabledBreadCrumbs, setDisabledBreadCrumbs] = useState<number[]>([]);
  const [selectedBreadCrumb, setSelectedBreadCrumb] =
    useState<InterfaceBreadCrumbs>(BreadCrumbsInitials[0]);
  const [progress, setProgress] = useState(1);
  const [togglePreviewExercisePlan, setTogglePreviewExercisePlan] =
    useState(false);

  const [bmiClassification, setBmiClassification] = useState({
    id: "",
    bmiClassification: "",
  });

  // General Info Fields
  const [generalInfoFieldsVal, setGeneralInfoFieldsVal] =
    useState<generalInfoType>({
      height: personalInfo[0].height!.toString(),
      weight: personalInfo[0].weight!.toString(),
      experience: selectedDifficultiesInitials[0],
      bmi: "",
    });
  // Exercise Plan State
  const [originalFetchedExercisePlanInfo] = useState<exercisePlan | undefined>(
    fetchedExercisePlanInfo || {}
  );
  const [exercisePlanInfo, setExercisePlanInfo] = useState<exercisePlan>(
    fetchedExercisePlanInfo || {}
  );
  const [exercisePlanNameVal, setExercisePlanNameVal] =
    useState(exercisePlanNameInit);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>(
    selectedDifficultiesInitials
  );
  const [toBeDeletedExercises, setToBeDeletedExercises] = useState<number[]>(
    []
  );

  // Visibility Preference
  const [visibilityPreference, setVisibilityPreference] = useState(
    planVisibilityInfo ? planVisibilityInfo.id.toString() : ""
  );

  // Events

  const handleSubmit = () => {
    const jsonData = {
      exerciseId: exerciseId,
      exercisePlan: exercisePlanInfo,
      exercisePlanTags: selectedDifficulties,
      toBeDeletedExercises: toBeDeletedExercises,
    };
    console.log(exercisePlanInfo);
    formData.append("jsonData", JSON.stringify(jsonData));
    formData.append("exercisePlanName", exercisePlanNameVal.exercisePlanName);
    formData.append("visibilityPreference", visibilityPreference);
    formData.append(
      "selectedExercisePlan",
      JSON.stringify({
        selectedExercisePlanId: exercisePlanNameVal.selectedExercisePlan,
        selectedExercisePlanUserId:
          exercisePlanNameVal.selectedExercisePlanUserId,
      })
    );
    setSubmitMessage(
      action === "Update" ? "Updating your Exercise Plan... 🔄 Just a moment while we refresh your plan!" : "Creating your Exercise Plan... ⏳ Hang tight while we set up your plan!"
    );
    setIsSubmitting(true);
  };

  // useEffect

  // Handles breadcrumb disabling based on selectedOption
  useEffect(() => {
    if (selectedOption === "") return;
    setDisabledBreadCrumbs(
      selectedOption === "recommendation" ? [2, 3, 4] : []
    );
  }, [selectedOption]);

  // Updates experience-based difficulty selection and exercise plan name
  useEffect(() => {
    if (!generalInfoFieldsVal.experience || action === "Update") return;

    setSelectedDifficulties((prev) => [
      ...prev,
      generalInfoFieldsVal.experience,
    ]);
    setExercisePlanNameVal((prev) => ({
      ...prev,
      exercisePlanName: generateExercisePlanName(
        generalInfoFieldsVal.experience
      ),
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generalInfoFieldsVal]);

  // Handles form submission success or error
  useEffect(() => {
    if (formState.success === null && formState.error === null) return;
    console.log(formState);
    if (formState.success) {
      setSubmitMessage(
        "Your exercise plan is ready! 🎯 Redirecting you to view your personalized plan—let’s get started! 💪"
      );
      queryClient.invalidateQueries({ queryKey: ["exercisePlans"] });
      router.push(`/plan/exercisePlan/${formState.data}`);
    } else {
      setIsSubmitting(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  return (
    <>
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
                  selectedCreateOption={selectedOption}
                  disabledBreadCrumbs={disabledBreadCrumbs}
                />
              </div>

              <form action={() => formAction(formData)} onSubmit={handleSubmit}>
                {progress === 1 && (
                  <div className="flex justify-center max-h w-full">
                    <SetGeneralInfo
                      planType="exercise"
                      personalInfo={personalInfo[0]}
                      setSelectedOption={setSelectedOption}
                      setDisabledBreadCrumbs={setDisabledBreadCrumbs}
                      setProgress={setProgress}
                      setSelectedBreadCrumb={setSelectedBreadCrumb}
                      selectedCreateOption={selectedOption}
                      generalInfoFieldsVal={generalInfoFieldsVal}
                      setGeneralInfoFieldsVal={setGeneralInfoFieldsVal}
                      setExercisePlanInfo={setExercisePlanInfo}
                      bmiClassification={bmiClassification}
                      setBmiClassification={setBmiClassification}
                      setSelectedDifficulties={setSelectedDifficulties}
                    />
                  </div>
                )}
                {progress === 2 && (
                  <div className="flex flex-1 justify-center h-[75%]">
                    <SetExercisePlan
                      exercisePlanNameVal={exercisePlanNameVal}
                      setExercisePlanNameVal={setExercisePlanNameVal}
                      setSelectedOption={setSelectedOption}
                      setSelectedBreadCrumb={setSelectedBreadCrumb}
                      setProgress={setProgress}
                      originalExercisePlanGeneralInfo={exercisePlanGeneralInfo}
                      originalFetchedExercisePlanInfo={
                        originalFetchedExercisePlanInfo
                      }
                      exercisePlanInfo={exercisePlanInfo}
                      setExercisePlanInfo={setExercisePlanInfo}
                      selectedCreateOption={selectedOption}
                      selectedDifficulties={selectedDifficulties}
                      setSelectedDifficulties={setSelectedDifficulties}
                      setToBeDeletedExercises={setToBeDeletedExercises}
                      setTogglePlanPopUpList={setTogglePlanPopUpList}
                    />
                  </div>
                )}
                {progress === 3 && (
                  <div className="flex flex-1 justify-center h-[75%]">
                    <SetVisibility
                      action={action}
                      setSelectedOption={setSelectedOption}
                      setSelectedBreadCrumb={setSelectedBreadCrumb}
                      setProgress={setProgress}
                      Icon={TablerBarbell}
                      visibilityPreference={visibilityPreference}
                      setVisibilityPreference={setVisibilityPreference}
                      setTogglePreviewPlan={setTogglePreviewExercisePlan}
                    />
                  </div>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {togglePreviewExercisePlan && (
          <BodyTuneWorkoutDetails
            exercisePlan={{
              planName: exercisePlanNameVal.exercisePlanName, exercise_tags: selectedDifficulties, exercises: exercisePlanInfo
            }}
            setToggleBodyTuneWorkoutDetails={setTogglePreviewExercisePlan}
          />
        )}
        {togglePlanPopUpList.toggle && (
          <PlanListPopUp
            planList={ exercisePlans}
            setTogglePlanPopUpList={setTogglePlanPopUpList}
            listType={togglePlanPopUpList.listType}
            setExercisePlanInfo={setExercisePlanInfo}
            setExercisePlanNameVal={setExercisePlanNameVal}
            setSelectedDifficulties={setSelectedDifficulties}
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
