"use server";

// Types
import { TableInsert } from "@/types/database.types";
import { formReturnType } from "@/types/formTypes";
import { mealPlanType } from "@/types/mealTypes";
import { exercisePlan } from "@/types/planTypes";
import { getMealTagIds } from "@/utils/dashboardUtils";
import { createSSR } from "@/utils/supabaseSSR";

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
    console.log(mealPlan);
    Object.entries(mealPlan).map( ([key, value]) => {
      console.log(`${key}: ${value}`);
    })
    // await saveMealPlan(
    //   mealPlanName,
    //   selectedMealPlan,
    //   mealPlan,
    //   visibilityPreference
    // );
    // await saveExercisePlan(
    //   exercisePlanName,
    //   selectedExercisePlan,
    //   exercisePlan,
    //   visibilityPreference
    // );
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

// Meals functions
const createMealPlan = async (
  mealPlanName: string,
  mealPlan: mealPlanType,
  visibilityPreference: number
) => {
  const supabase = await createSSR();
  const user = await supabase.auth.getUser();
  const userId = user.data.user!.id;

  try {
    const { data, error } = await supabase
      .from("meal_plan")
      .insert<TableInsert<"meal_plan">>({
        planName: mealPlanName,
        visibility: visibilityPreference,
        created_by: userId,
      })
      .select();
    if (error) {
      const errorMessage: string =
        error instanceof Error
          ? `There is an error Creating the Meal Plan: ${error.message}`
          : "An unknown error occurred";
      return {
        success: false,
        error: true,
        message: errorMessage,
      };
    }
    const response = data as TableInsert<"meal_plan">[];
    const mealPlanId = response[0].id;
    return {
      success: true,
      error: false,
      data: [mealPlanId],
      message: "",
    };
  } catch (error) {
    const errorMessage: string =
      error instanceof Error
        ? `There is an error Creating the Meal Plan: ${error.message}`
        : "An unknown error occurred";
    return {
      success: false,
      error: true,
      data: [],
      message: errorMessage,
    };
  }
};

const mapMealPlanWithMealtag = async (
  mealPlanId: number,
  mealTags: Array<string>
) => {
  const supabase = await createSSR();
  const mealTagIds: Array<number> = getMealTagIds(mealTags);
  const mealTagData: Array<{
    id?: number;
    mealPlanId: number;
    tagId: number;
    createdAt?: string;
  }> = mealTagIds.map((id: number) => {
    return {
      mealPlanId: mealPlanId,
      tagId: id,
    };
  });

  try {
    const { error } = await supabase
      .from("meal_plan_tags")
      .insert<TableInsert<"meal_plan_tags">>(mealTagData);

    if (error) {
      const errorMessage: string =
        error instanceof Error
          ? `There is an error Mapping the Meal Tags: ${error.message}`
          : "An unknown error occurred";
      return {
        success: false,
        error: true,
        message: errorMessage,
      };
    }
    return {
      success: true,
      error: false,
      data: [],
      message: "",
    };
  } catch (error) {
    const errorMessage: string =
      error instanceof Error
        ? `There is an error Mapping the Meal Tags: ${error.message}`
        : "An unknown error occurred";
    return {
      success: false,
      error: true,
      data: [],
      message: errorMessage,
    };
  }
};

// Exercises functions
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
