"use client";

import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "nextjs-toploader/app";

// lib
import { getMealPlans } from "@/lib/supabaseQueries";

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
import { mealPlanGeneralInfo, mealPlanListType, mealPlanName, mealPlanType } from "@/types/mealTypes";
import { mealPlanQuery, visibilityInterface } from "@/types/planTypes";
import { formReturnType } from "@/types/formTypes";
import { arrangeMealPlan, generateMealPlanName } from "@/utils/dashboardUtils";
import SolarStarsMinimalisticLineDuotone from "@/icons/SolarStarsMinimalisticLineDuotone";
import { AnimatePresence } from "framer-motion";
import LoadingPopUp from "@/components/reusableComponent/loadingAnimation/LoadingPopUp";
import { Oval } from "react-loader-spinner";
import BodyTuneMealDetails from "../BodyTuneMealDetails";
import { createMealPlan } from "@/actions/planActions";
import { useFormState } from "react-dom";
import PlanListPopUp from "../../reusableComponents/PlanListPopUp";
interface props {
  action: string;
  personalInfo: TableRow<"personal_information">[];
  mealPlanId?: number,
  mealPlanGeneralInfo?: mealPlanGeneralInfo;
  fetchedMealPlanInfo?: mealPlanType;
  planVisibilityInfo?: visibilityInterface;
  mealPlanList: Array<mealPlanQuery> | [];
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
    title: "Meal Plan",
    shortDescription: "Customize your daily meals",
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

// Meal Plan Initial Structure
const mealPlanInitial: mealPlanType = {
  ["Monday"]: {
    breakFast: { mealInfo: undefined, ingredients: undefined, nutrition: undefined },
    lunch: { mealInfo: undefined, ingredients: undefined, nutrition: undefined },
    dinner: { mealInfo: undefined, ingredients: undefined, nutrition: undefined },
  },
};

const MutateForm = ({ personalInfo, action, mealPlanList, fetchedMealPlanInfo, mealPlanGeneralInfo, mealPlanId, planVisibilityInfo }: props) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const formData = new FormData();

  // UseQuery
  useQuery({
    queryKey: ["mealPlans"],
    initialData: mealPlanList,
    queryFn: () => {
      return getMealPlans();
    },
  });
  const [mealPlans] = useState<Array<mealPlanListType>>(() => 
    mealPlanList!.map((mealPlanInfo) => {
      return {
        mealId: mealPlanInfo.id,
        createdBy: mealPlanInfo.created_by,
        planName: mealPlanInfo.planName,
        planTags: mealPlanInfo.meal_plan_tags,
        meals: arrangeMealPlan(mealPlanInfo),
      }
    })
  );

  // Derived Values
  const mealPlanNameInit: mealPlanName = {
    selectedMealPlanUserId: mealPlanGeneralInfo ? mealPlanGeneralInfo.createdBy : "",
    selectedMealPlan: mealPlanGeneralInfo ? mealPlanGeneralInfo.id : "0",
    mealPlanName: mealPlanGeneralInfo ? mealPlanGeneralInfo.planName : "",
  };
  const selectedBmisInitials: string[] = mealPlanGeneralInfo
    ? mealPlanGeneralInfo.tags.map((info) => info.meal_tags.mealTagName)
    : [];

  // Form State
  const [formState, formAction] = useFormState(createMealPlan, useFormStateInitials);
  // const [formState, formAction] = useFormState(action === "Update" ? updateBodyTunePlan : createBodyTunePlan, useFormStateInitials);

  // State Hooks
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [selectedOption, setSelectedOption] = useState(
    fetchedMealPlanInfo ? "Custom" : ""
  );
  const [togglePlanPopUpList, setTogglePlanPopUpList] = useState<{listType: string, toggle:boolean}>({listType: "", toggle: false});

  // BreadCrumbs State
  const [disabledBreadCrumbs, setDisabledBreadCrumbs] = useState<number[]>([]);
  const [selectedBreadCrumb, setSelectedBreadCrumb] = useState<InterfaceBreadCrumbs>(
    BreadCrumbsInitials[0]
  );
  const [progress, setProgress] = useState(1);
  const [togglePreviewMealPlan, setTogglePreviewMealPlan] =
    useState(false);

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
  const [toBeDeletedIngredients, setToBeDeletedIngredients] = useState<number[]>([]);

  // Visibility Preference
  const [visibilityPreference, setVisibilityPreference] = useState(planVisibilityInfo ? planVisibilityInfo.id.toString() : "");

  
  // Events
  const handleSubmit = () => {
    const jsonData = {
      mealPlanId: mealPlanId,
      mealPlan: mealPlanInfo,
      mealPlanTags: selectedBmis,
      toBeDeletedIngredients: toBeDeletedIngredients,
    };
    formData.append("jsonData", JSON.stringify(jsonData));
    formData.append("mealPlanName", mealPlanNameVal.mealPlanName);
    formData.append("visibilityPreference", visibilityPreference);
    formData.append("selectedMealPlan", 
      JSON.stringify({
        selectedMealPlanId: mealPlanNameVal.selectedMealPlan, 
        selectedMealPlanUserId: mealPlanNameVal.selectedMealPlanUserId
      })
    )
    setSubmitMessage(
      action === "Update" ? "Updating your Meal Plan... 🔄 Just a moment while we refresh your plan!" : "Creating your Meal Plan... ⏳ Hang tight while we set up your plan!"
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
    if (!bmiClassification.id || action === "Update") return;
    console.log(action);

    setSelectedBmis((prev) => [...prev, bmiClassification.bmiClassification]);
    setMealPlanNameVal((prev) => ({
      ...prev,
      mealPlanName: generateMealPlanName(bmiClassification.bmiClassification),
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bmiClassification]);

  // Handles form submission success or error
  useEffect(() => {
    if (formState.success === null && formState.error === null) return;
    // setIsSubmitting(false);
    console.log(formState);
    if (formState.success) {
      setSubmitMessage(
        "Your Meal Plan is ready! 🎯 Redirecting you to view your personalized plan—let’s get started! 💪"
      );
      queryClient.invalidateQueries({ queryKey: ["mealPlans"] });
      router.push(`/plan/mealPlan/${formState.data}`);
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
          headerText="Create Your Meal Plan"
          headerDescription="Design a meal plan tailored to your taste and nutrition goals."
          Icon={MdiFoodDrumstickOutline}
          />
      </div>
      <div className="h-[83%] flex flex-col flex-1 gap-1 items-center">
        {selectedOption === "" ? (
          <CreationOption
            label="How would you like to create your Meal Plan"
            setSelectOption={setSelectedOption}
            />
          ) : (
            <div className="flex flex-1 h-full flex-col items-center justify-center-center gap-1 w-full ">
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
              <form  action={() => formAction(formData)} onSubmit={handleSubmit}>
                {progress === 1 && (
                  <div className="flex justify-center max-h w-full">
                    <SetGeneralInfo
                        planType="meal"
                        personalInfo={personalInfo[0]}
                        setSelectedOption={setSelectedOption}
                        setDisabledBreadCrumbs={setDisabledBreadCrumbs}
                        setProgress={setProgress}
                        setSelectedBreadCrumb={setSelectedBreadCrumb}
                        selectedCreateOption={selectedOption}
                        generalInfoFieldsVal={generalInfoFieldsVal}
                        setGeneralInfoFieldsVal={setGeneralInfoFieldsVal}
                        bmiClassification={bmiClassification}
                        setBmiClassification={setBmiClassification}
                        setMealPlanInfo={setMealPlanInfo}
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
                      setToBeDeletedIngredients={setToBeDeletedIngredients}
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
                      Icon={SolarStarsMinimalisticLineDuotone}
                      visibilityPreference={visibilityPreference}
                      setVisibilityPreference={setVisibilityPreference}
                      setTogglePreviewPlan={setTogglePreviewMealPlan}
                      />
                  </div>
                )}
              </form>  
            </div>
          )}
      </div>
    </div>
    <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {togglePreviewMealPlan && (
          <BodyTuneMealDetails
          mealPlan={{
            planName: mealPlanNameVal.mealPlanName, bmi_classification: selectedBmis, meals: mealPlanInfo
            }}
            setToggleBodyTuneMealDetails={setTogglePreviewMealPlan}
          />
        )}
        {togglePlanPopUpList.toggle && (
          <PlanListPopUp
            planList={mealPlans}
            setTogglePlanPopUpList={setTogglePlanPopUpList}
            listType={togglePlanPopUpList.listType}
            setMealPlanInfo={setMealPlanInfo}
            setMealPlanNameVal={setMealPlanNameVal}
            setSelectedBmis={setSelectedBmis}
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
