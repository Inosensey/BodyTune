"use server";

// Types
import { TableInsert } from "@/types/database.types";
import { formReturnType } from "@/types/formTypes";
import {
  IngredientTypes,
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

  // saveExercisePlan(
  //   exercisePlanName,
  //   selectedExercisePlan,
  //   exercisePlan,
  //   visibilityPreference
  // );

  try {
    const createMealPlanResult = await createMealPlan(
      mealPlan,
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

    // console.log(createTheDailyMealResult)

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
  mealPlan: mealPlanType,
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
      const errorMessage: string = `There is an error Creating the Meal Plan: ${error.message}`;
      return {
        success: false,
        error: true,
        data: [],
        message: errorMessage,
      };
    }
    const response = data as TableInsert<"meal_plan">[];
    const mealPlanId = response[0].id!;

    const mapMealPlanWithMealTagResult = await mapMealPlanWithMealTag(
      mealPlanId,
      mealPlanTags,
      userId
    );

    if (mapMealPlanWithMealTagResult.error) {
      return {
        success: mapMealPlanWithMealTagResult.success,
        error: mapMealPlanWithMealTagResult.error,
        data: [],
        message: mapMealPlanWithMealTagResult.message,
      };
    }

    const createAMealResult = await createMeals(mealPlan, userId)

    if(createAMealResult.error) {      
      return {
        success: createAMealResult.success,
        error: createAMealResult.error,
        data: [],
        message: createAMealResult.message,
      };
    }
    const mealIds = createAMealResult.data[0]! as {[key: string]: {
      breakFast: number;
      lunch: number;
      dinner: number;
      day: string;
    } }
    const createTheDailyMealResult = await createTheDailyMeal(mealIds, mealPlanId, userId)

    if(createTheDailyMealResult.error) {      
      return {
        success: createTheDailyMealResult.success,
        error: createTheDailyMealResult.error,
        data: [],
        message: createTheDailyMealResult.message,
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
      created_by: userId,
    };
  });

  try {
    const { error } = await supabase
      .from("meal_plan_tags")
      .insert<TableInsert<"meal_plan_tags">>(mealTagData);

    if (error) {
      const errorMessage: string = `There is an error Mapping the Meal Tags: ${error.message}`;
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
  mealIds: {[key: string]: {
    breakFast: number;
    lunch: number;
    dinner: number;
    day: string;
  } },
  planId: number,
  userId: string
) => {
  const supabase = await createSSR();
  const dailyMealInfo = arrangeDailyMeal(mealIds, planId, userId)
  try {
    const { error } = await supabase
      .from("daily_meals")
      .insert<TableInsert<"daily_meals">>(dailyMealInfo);
    if (error) {
      const errorMessage: string = `There is an error Creating your Daily Meal: ${error.message}`;
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

const createMeals = async (
  mealPlan: mealPlanType,
  userId: string
) => {
  const supabase = await createSSR();

  const mealIds: {
    [key: string]: {
      breakFast: number;
      lunch: number;
      dinner: number;
      day: string;
    };
  } = {};
  try {
    await Promise.all(
      Object.entries(mealPlan).map(async ([day]) => {
        let breakFastId = 0;
        let lunchId = 0;
        let dinnerId = 0;
        await Promise.all(
          Object.entries(mealPlan[day]).map(async ([mealType]) => {
            const mealTypeId = getMealType(mealType);
    
            const { data, error } = await supabase
              .from("meal")
              .insert<TableInsert<"meal">>({
                mealType: mealTypeId,
                mealName: mealPlan[day][mealType].mealInfo!.mealName,
                instructions: mealPlan[day][mealType].mealInfo!.cookingInstruction,
                veganAlternative: mealPlan[day][mealType].mealInfo!.veganAlternative,
                created_by: userId,
              })
              .select();
    
            if (error) {
              throw new Error(`Error creating meal: ${error.message}`);
            }
    
            const mealMutationResult = data as TableInsert<"meal">[];
            const mealId = mealMutationResult[0].id!;
    
            switch (mealType) {
              case "breakFast":
                breakFastId = mealId;
                break;
              case "lunch":
                lunchId = mealId;
                break;
              case "dinner":
                dinnerId = mealId;
                break;
              default:
                lunchId = mealId;
                break;
            }
    
            mealIds[day] = {
              breakFast: breakFastId,
              lunch: lunchId,
              dinner: dinnerId,
              day: day,
            };
    
            const arrangedIngredients = arrangeIngredients(
              mealPlan[day][mealType].ingredients!,
              userId,
              mealId
            );
    
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
          })
        );
      })
    );
    return {
      success: true,
      error: false,
      data: [mealIds],
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
      const errorMessage: string = `There is an error Inserting an ingredient: ${error.message}`;
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
      protein: parseFloat(
        parseFloat(ingredients[key].proteinsValue).toFixed(2)
      ),
      calories: parseFloat(
        parseFloat(ingredients[key].caloriesValue).toFixed(2)
      ),
      carbs: parseFloat(parseFloat(ingredients[key].carbsValue).toFixed(2)),
      fat: parseFloat(parseFloat(ingredients[key].fatValue).toFixed(2)),
      created_by: userId,
      mealId: mealId,
    });
  });

  return ingredientInfos;
};

const arrangeDailyMeal = (mealIds:{
  [key: string]: {
    breakFast: number;
    lunch: number;
    dinner: number;
    day: string;
  };
}, mealPlanId: number, userId: string):Array<{plan_id:number, created_by:string, breakFast:number, lunch:number, dinner:number, day:string }> => {
  const dailyMealInfo:Array<{plan_id:number, created_by:string, breakFast:number, lunch:number, dinner:number, day:string }> = [];

  Object.entries(mealIds).map(([day]) => {
    dailyMealInfo.push({
      day: day,
      breakFast: mealIds[day].breakFast,
      lunch: mealIds[day].lunch,
      dinner: mealIds[day].dinner,
      plan_id: mealPlanId,
      created_by: userId
    })
  })

  return dailyMealInfo;
}

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
