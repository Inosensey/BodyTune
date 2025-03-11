"use server";

// Types
import { TableInsert } from "@/types/database.types";
import { formReturnType } from "@/types/formTypes";
import {
  IngredientInfo,
  IngredientTypes,
  MealInfoTypes,
  mealPlanType,
  Nutrients,
} from "@/types/mealTypes";
import { exercisePlan } from "@/types/planTypes";
import { getMealTagIds, getMealType } from "@/utils/dashboardUtils";
import { createSSR } from "@/utils/supabaseSSR";

export const createBodyTunePlan = async (
  prevState: formReturnType<[]>,
  formData: FormData
): Promise<formReturnType<[]>> => {
  const supabase = await createSSR();

  const jsonData: {
    mealPlan: mealPlanType;
    exercisePlan: exercisePlan;
    mealPlanTags: Array<string>;
    exercisePlanTags: Array<string>;
  } = JSON.parse(formData.get("jsonData") as string);
  const mealPlanName = formData.get("mealPlanName") as string;
  const exercisePlanName = formData.get("exercisePlanName") as string;
  const visibilityPreference = parseInt(
    formData.get("visibilityPreference") as string
  );
  // const selectedMealPlan = formData.get("selectedMealPlan") as string;
  const selectedExercisePlan = formData.get("selectedExercisePlan") as string;
  const mealPlan: mealPlanType = jsonData.mealPlan;
  const exercisePlan: exercisePlan = jsonData.exercisePlan;
  const mealPlanTags: Array<string> = jsonData.mealPlanTags;
  // const exercisePlanTags: Array<string> = jsonData.exercisePlanTags;

  const user = await supabase.auth.getUser();
  const userId = user.data.user!.id;

  const mealIds: {[key: string]:{ breakFast: number; lunch: number; dinner: number; day: string} } = {
  };

  // saveExercisePlan(
  //   exercisePlanName,
  //   selectedExercisePlan,
  //   exercisePlan,
  //   visibilityPreference
  // );

  try {
    const createMealPlanResult = await createMealPlan(
      mealPlanName,
      visibilityPreference, 
      mealPlanTags,
      userId
    );

    if (createMealPlanResult.error) {
      return {
        success: createMealPlanResult.success,
        error: createMealPlanResult.error,
        data: [],
        message: createMealPlanResult.message,
      };
    }

    Object.entries(mealPlan).map(async ([day]) => {
      Object.entries(mealPlan[day]).map(async ([mealType]) => {
        const mealTypeNumber = getMealType(mealType);
        const createAMealResult = await createAMeal(
          mealPlan[day][mealType].mealInfo!,
          mealPlan[day][mealType].ingredients!,
          mealTypeNumber,
          userId
        );
        if (createAMealResult.error) {
          return {
            success: createAMealResult.success,
            error: createAMealResult.error,
            data: [],
            message: createAMealResult.message,
          };
        }
        const mealId = createAMealResult.data![0].id!;

        console.log(mealType)
        switch (mealType) {
          case "breakFast":
            mealIds[day].breakFast = mealId;
            mealIds[day].day = day;
            break;

          case "lunch":
            mealIds[day].lunch = mealId;
            mealIds[day].day = day;

            break;

          case "dinner":
            mealIds[day].dinner = mealId;
            mealIds[day].day = day;

            break;

          default:
            mealIds[day].lunch = mealId;
            mealIds[day].day = day;
            break;
        }
      });
    });
    
    console.log("mealIds",mealIds)
    // const createTheDailyMealResult = await createTheDailyMeal(
    //   mealIds,
    //   createMealPlanResult.data![0].id!,
    //   day,
    //   userId
    // );

    // if (createTheDailyMealResult.error) {
    //   return {
    //     success: createTheDailyMealResult.success,
    //     error: createTheDailyMealResult.error,
    //     data: [],
    //     message: createTheDailyMealResult.message,
    //   };
    // }
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
  visibilityPreference: number,
  mealPlanTags: Array<string>,
  userId: string
) => {
  const supabase = await createSSR();

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
      const errorMessage: string = `There is an error Creating the Meal Plan: ${error.message}`
      return {
        success: false,
        error: true,
        data: [],
        message: errorMessage,
      };
    }
    const response = data as TableInsert<"meal_plan">[];

    const mapMealPlanWithMealTagResult = await mapMealPlanWithMealTag(
      response[0].id!,
      mealPlanTags,
      userId
    );

  
    console.log(response)
    console.log(mapMealPlanWithMealTagResult)

    if (mapMealPlanWithMealTagResult.error) {
      return {
        success: mapMealPlanWithMealTagResult.success,
        error: mapMealPlanWithMealTagResult.error,
        data: [],
        message: mapMealPlanWithMealTagResult.message,
      };
    }

    return {
      success: true,
      error: false,
      data: response,
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

const mapMealPlanWithMealTag = async (
  mealPlanId: number,
  mealTags: Array<string>,
  userId: string
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
      created_by: userId
    };
  });

  try {
    const { error } = await supabase
      .from("meal_plan_tags")
      .insert<TableInsert<"meal_plan_tags">>(mealTagData);

    if (error) {
      const errorMessage: string = `There is an error Mapping the Meal Tags: ${error.message}`
      return {
        success: false,
        error: true,
        data: [],
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

const createTheDailyMeal = async (
  mealIds: { breakFast: number; lunch: number; dinner: number },
  planId: number,
  day: string,
  userId: string
) => {
  const supabase = await createSSR();

  try {
    const { error } = await supabase
      .from("daily_meal")
      .insert<TableInsert<"daily_meals">>({
        plan_id: planId,
        breakFast: mealIds.breakFast,
        lunch: mealIds.lunch,
        dinner: mealIds.dinner,
        day: day,
        created_by: userId,
      });
    if (error) {
      console.log(mealIds);
      console.log(error);
      const errorMessage: string = `There is an error Creating your Daily Meal: ${error.message}`
      return {
        success: false,
        error: true,
        data: [],
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
        ? `There is an error Creating your Daily Meal: ${error.message}`
        : "An unknown error occurred";
    return {
      success: false,
      error: true,
      data: [],
      message: errorMessage,
    };
  }
};

const createAMeal = async (
  meal: MealInfoTypes,
  ingredients: IngredientTypes,
  mealType: number,
  userId: string
) => {
  const supabase = await createSSR();

  try {
    const { data, error } = await supabase
      .from("meal")
      .insert<TableInsert<"meal">>({
        mealType: mealType,
        mealName: meal.mealName,
        instructions: meal.cookingInstruction,
        veganAlternative: meal.veganAlternative,
        created_by: userId,
      })
      .select();

    if (error) {
      const errorMessage: string = `There is an error Creating your Meal: ${error.message}`
      return {
        success: false,
        error: true,
        data: [],
        message: errorMessage,
      };
    }

    const mealMutationResult = data as TableInsert<"meal">[];
    const mealId = mealMutationResult[0].id!;
    const arrangedIngredients = arrangeIngredients(ingredients, userId, mealId);

    const ingredientMutationResult = await insertMealIngredients(
      arrangedIngredients
    );

    if (ingredientMutationResult.error) {
      return {
        success: ingredientMutationResult.success,
        error: ingredientMutationResult.error,
        data: [],
        message: ingredientMutationResult.message,
      };
    }
    return {
      success: true,
      error: false,
      data: mealMutationResult,
      message: "",
    };
  } catch (error) {
    const errorMessage: string =
      error instanceof Error
        ? `There is an error Creating your Meal: ${error.message}`
        : "An unknown error occurred";
    return {
      success: false,
      error: true,
      data: [],
      message: errorMessage,
    };
  }
};

const insertMealIngredients = async (
  ingredients: Array<
    Nutrients & { ingredientName: string; created_by: string; mealId: number }
  >
) => {
  const supabase = await createSSR();

  try {
    const { error } = await supabase
      .from("meal_ingredients")
      .insert<TableInsert<"meal_ingredients">>(ingredients);
    if (error) {
      const errorMessage: string = `There is an error Inserting an ingredient: ${error.message}`
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
        ? `There is an error Inserting an ingredient: ${error.message}`
        : "An unknown error occurred";
    return {
      success: false,
      error: true,
      data: [],
      message: errorMessage,
    };
  }
};

const arrangeIngredients = (
  ingredients: IngredientTypes,
  userId: string,
  mealId: number
): Array<
  Nutrients & { ingredientName: string; created_by: string; mealId: number }
> => {
  const ingredientInfos: Array<
    Nutrients & { ingredientName: string; created_by: string; mealId: number }
  > = [];

  Object.entries(ingredients).forEach(([key]) => {
    ingredientInfos.push({
      ingredientName: ingredients[key].ingredientValue,
      protein: parseFloat(parseFloat(ingredients[key].proteinsValue).toFixed(2)),
      calories: parseFloat(parseFloat(ingredients[key].caloriesValue).toFixed(2)),
      carbs: parseFloat(parseFloat(ingredients[key].carbsValue).toFixed(2)),
      fat: parseFloat(parseFloat(ingredients[key].fatValue).toFixed(2)),
      created_by: userId,
      mealId: mealId,
    });
  })

  // ingredients.map((ingredient: IngredientInfo) => {
  //   ingredientInfos.push({
  //     ingredientName: ingredient.ingredientValue,
  //     protein: parseFloat(parseFloat(ingredient.proteinsValue).toFixed(2)),
  //     calories: parseFloat(parseFloat(ingredient.caloriesValue).toFixed(2)),
  //     carbs: parseFloat(parseFloat(ingredient.carbsValue).toFixed(2)),
  //     fat: parseFloat(parseFloat(ingredient.fatValue).toFixed(2)),
  //     userId: userId,
  //     mealId: mealId,
  //   });
  // });

  return ingredientInfos;
};

// Exercises functions
const saveExercisePlan = async (
  exercisePlanName: string,
  selectedExercisePlan: string,
  exercisePlan: exercisePlan,
  visibilityPreference: number
) => {
  console.log(exercisePlanName);
  console.log(selectedExercisePlan);
  console.log(exercisePlan);
  console.log(visibilityPreference);
};
