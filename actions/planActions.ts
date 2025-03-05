"use server";

// Types
import { formReturnType } from "@/types/formTypes";
import { mealPlanType } from "@/types/mealTypes";
import { exercisePlan } from "@/types/planTypes";

export const createBodyTunePlan = async (
  prevState: formReturnType<[]>,
  formData: FormData
): Promise<formReturnType<[]>> => {
  const jsonData: {
    mealPlan: mealPlanType;
    exercisePlan: exercisePlan;
  } = JSON.parse(formData.get("jsonData") as string);
  const mealPlanName = formData.get("mealPlanName") as string;
  const exercisePlanName = formData.get("exercisePlanName") as string;
  const visibilityPreference = formData.get("visibilityPreference") as string;
  const selectedMealPlan = formData.get("selectedMealPlan") as string;
  const selectedExercisePlan = formData.get("selectedExercisePlan") as string;
  const mealPlan: mealPlanType = jsonData.mealPlan;
  const exercisePlan: exercisePlan = jsonData.exercisePlan;

  try {
    await saveMealPlan(
      mealPlanName,
      selectedMealPlan,
      mealPlan,
      visibilityPreference
    );
    await saveExercisePlan(
      exercisePlanName,
      selectedExercisePlan,
      exercisePlan,
      visibilityPreference
    );
    return {
      success: true,
      error: false,
      data: [],
      message: ``,
    };
  } catch (error) {
    const errorMessage: string =
      error instanceof Error
        ? `There is an error Creating new BodyTune: ${error.message}`
        : "An unknown error occurred";
    return {
      success: false,
      error: true,
      data: [],
      message: errorMessage,
    };
  }
};

const saveMealPlan = async (
  mealPlanName: string,
  selectedMealPlan: string,
  mealPlan: mealPlanType,
  visibilityPreference: string
) => {
  console.log(mealPlanName);
  console.log(selectedMealPlan);
  console.log(mealPlan);
  console.log(visibilityPreference);
};

const saveExercisePlan = async (
  exercisePlanName: string,
  selectedExercisePlan: string,
  exercisePlan: exercisePlan,
  visibilityPreference: string
) => {
  console.log(exercisePlanName);
  console.log(selectedExercisePlan);
  console.log(exercisePlan);
  console.log(visibilityPreference);
};
