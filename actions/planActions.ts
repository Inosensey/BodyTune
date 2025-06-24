"use server";

// Types
import { TableInsert, TablesUpdate, TableUpdate } from "@/types/database.types";
import { formReturnType } from "@/types/formTypes";
import {
  IngredientTypes,
  mealPlanType,
  Nutrients,
} from "@/types/mealTypes";
import { exercisePlan } from "@/types/planTypes";
import { extractFilePathFromSignedUrl, getExerciseTagIds, getMealTagIds, getMealType } from "@/utils/dashboardUtils";
import { createSSR } from "@/utils/supabaseSSR";
import { revalidateTag } from "next/cache";

export const updateBodyTunePlan = async (
  prevState: formReturnType<[] | number>,
  formData: FormData,
): Promise<formReturnType<[] | number>> => {
  const supabase = await createSSR();

  const jsonData: {
    bodyTuneId?: number,
    mealPlan: mealPlanType;
    exercisePlan: exercisePlan;
    mealPlanTags: Array<string>;
    exercisePlanTags: Array<string>;
    toBeDeletedIngredients: Array<number>;
    toBeDeletedExercises: Array<number>;
  } = JSON.parse(formData.get("jsonData") as string);
  const selectedMealPlan: {
    selectedMealPlanUserId: string,
    selectedMealPlanId: number | string;
  } = JSON.parse(formData.get("selectedMealPlan") as string);
  const selectedExercisePlan: {
    selectedExercisePlanUserId: string;
    selectedExercisePlanId: number | string,
  } = JSON.parse(formData.get("selectedExercisePlan") as string);
  const mealPlanName = formData.get("mealPlanName") as string;
  const exercisePlanName = formData.get("exercisePlanName") as string;
  const visibilityPreference = parseInt(
    formData.get("visibilityPreference") as string
  );
  // const selectedMealPlan = formData.get("selectedMealPlan") as string;
  // const selectedExercisePlan = formData.get("selectedExercisePlan") as string;
  const mealPlan: mealPlanType = jsonData.mealPlan;
  // const exercisePlan: exercisePlan = jsonData.exercisePlan;
  const mealPlanTags: Array<string> = jsonData.mealPlanTags;
  // const exercisePlanTags: Array<string> = jsonData.exercisePlanTags;


  const user = await supabase.auth.getUser();
  const userId = user.data.user!.id;

  // console.log(jsonData);
  // console.log(jsonData.exercisePlan.Monday[0].exerciseDemo)
  // console.log(jsonData.exercisePlan.Monday);
  // console.log(jsonData.exercisePlanTags)
  // console.log(selectedExercisePlan)

  try {
    if(selectedExercisePlan.selectedExercisePlanUserId !== userId) {
      const { error} = await supabase.from("bodytune_plan").update<TablesUpdate<"bodytune_plan">>({
        exercisePlanId: parseInt(selectedExercisePlan.selectedExercisePlanId as string),
        visibility: visibilityPreference,
        created_by: userId
      }).eq("id", parseInt(selectedExercisePlan.selectedExercisePlanId as string)).select()

      if (error) {
        const errorMessage: string = `There is an error Updating the Exercise Plan: ${error.message}`;
        return {
          success: false,
          error: true,
          data: [],
          message: errorMessage,
        };
      }
    } else {
      const mutateExercisePlanResult = await mutateExercisePlan(
        exercisePlanName,
        parseInt(selectedExercisePlan.selectedExercisePlanId as string),
        jsonData.exercisePlan,
        visibilityPreference,
        jsonData.exercisePlanTags,
        userId,
        jsonData.toBeDeletedExercises
      );

      if (mutateExercisePlanResult.error) {
        return {
          success: mutateExercisePlanResult.success,
          error: mutateExercisePlanResult.error,
          data: [],
          message: mutateExercisePlanResult.message,
        };
      }
    }
    if( selectedMealPlan.selectedMealPlanUserId !== userId ) {
      const { error} = await supabase.from("bodytune_plan").update<TablesUpdate<"bodytune_plan">>({
        mealPlanId: parseInt(selectedMealPlan.selectedMealPlanId as string),
        visibility: visibilityPreference,
        created_by: userId
      }).eq("id", jsonData.bodyTuneId).select()

      if (error) {
        const errorMessage: string = `There is an error Updating the BodyTune Plan: ${error.message}`;
        return {
          success: false,
          error: true,
          data: [],
          message: errorMessage,
        };
      }
    } else {
      const createMealPlanResult = await mutateMealPlan(
        mealPlan,
        mealPlanName,
        visibilityPreference,
        mealPlanTags,
        userId,
        parseInt(selectedMealPlan.selectedMealPlanId as string),
        jsonData.toBeDeletedIngredients
      );
      if (createMealPlanResult.error) {
        return {
          success: createMealPlanResult.success,
          error: createMealPlanResult.error,
          data: [],
          message: createMealPlanResult.message,
        };
      }
    }
    revalidateTag("bodyTunes");
    revalidateTag(`bodyTunes${jsonData.bodyTuneId}`);
    // console.log(jsonData.mealPlan);
    // console.log(jsonData.exercisePlan);
    
    // Object.entries(mealPlan).map(([day]) => {
    //   Object.entries(mealPlan[day]).map(([mealType]) => {
        // Object.entries(mealPlan.Monday!.breakFast!.ingredients!).forEach(([, value]) => {
        //   const isNumeric = (num: string | number) => (typeof(num) === 'number' || typeof(num) === "string" && num.trim() !== '') && !isNaN(num as number)
        //   console.log(isNumeric(value!.id!))
        // });
        // const arrangedIngredients = arrangeIngredients(
        //   mealPlan[day][mealType].ingredients!,
        //   userId,
        //   mealPlan[day][mealType].mealInfo!.id!
        // );
        // console.log(arrangedIngredients)
        // console.log(mealPlan.Monday![mealType]!.mealInfo!)
        // console.log(mealPlan.Monday![mealType]!.ingredients)
    //   })
    // })
    return {
      success: true,
      error: false,
      data: [],
      message: "",
    };
  } catch (error) {
    const errorMessage: string =
      error instanceof Error
        ? `There is an error Updating new BodyTune: ${error.message}`
        : "An unknown error occurred";
    return {
      success: false,
      error: true,
      data: [],
      message: errorMessage,
    };
  }
}

export const createBodyTunePlan = async (
  prevState: formReturnType<[] | number>,
  formData: FormData
): Promise<formReturnType<[] | number>> => {
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
  const selectedMealPlan: {
    selectedMealPlanUserId: string,
    selectedMealPlanId: number | string;
  } = JSON.parse(formData.get("selectedMealPlan") as string);
  const selectedExercisePlan: {
    selectedExercisePlanUserId: string;
    selectedExercisePlanId: number | string,
  } = JSON.parse(formData.get("selectedExercisePlan") as string);
  const mealPlan: mealPlanType = jsonData.mealPlan;
  const exercisePlan: exercisePlan = jsonData.exercisePlan;
  const mealPlanTags: Array<string> = jsonData.mealPlanTags;
  const exercisePlanTags: Array<string> = jsonData.exercisePlanTags;

  const user = await supabase.auth.getUser();
  const userId = user.data.user!.id;

  console.log(selectedMealPlan)
  console.log(selectedExercisePlan)

  try {
    const createMealPlanResult = await mutateMealPlan(
      mealPlan,
      mealPlanName,
      visibilityPreference,
      mealPlanTags,
      userId,
      parseInt(selectedMealPlan.selectedMealPlanId as string)
    );

    if (createMealPlanResult.error) {
      return {
        success: createMealPlanResult.success,
        error: createMealPlanResult.error,
        data: [],
        message: createMealPlanResult.message,
      };
    }

    const mutateExercisePlanResult = await mutateExercisePlan(
      exercisePlanName,
      parseInt(selectedExercisePlan.selectedExercisePlanId as string),
      exercisePlan,
      visibilityPreference,
      exercisePlanTags,
      userId,
    );

    if (mutateExercisePlanResult.error) {
      return {
        success: mutateExercisePlanResult.success,
        error: mutateExercisePlanResult.error,
        data: [],
        message: mutateExercisePlanResult.message,
      };
    }

    const mealPlanId = createMealPlanResult.data[0].id!;
    const exercisePlanId = mutateExercisePlanResult.data[0].id!;

    const {data, error} = await supabase.from("bodytune_plan").insert<TableInsert<"bodytune_plan">>({
      mealPlanId: mealPlanId,
      exercisePlanId: exercisePlanId,
      visibility: visibilityPreference,
      created_by: userId
    }).select()

    
    if (error) {
      const errorMessage: string = `There is an error Creating the BodyTune Plan: ${error.message}`;
      return {
        success: false,
        error: true,
        data: [],
        message: errorMessage,
      };
    }

    const response = data as TableInsert<"bodytune_plan">[];
    const bodyTunePlanId = response[0].id!;

    revalidateTag("bodyTunes");
    return {
      success: true,
      error: false,
      data: bodyTunePlanId,
      message: ``,
    };
    // return {
    //   success: true,
    //   error: false,
    //   data: [],
    //   message: ``,
    // };
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

export const deleteBodyTunePlan = async (
  prevState: formReturnType<[] | number>,
  formData: FormData
): Promise<formReturnType<[] | number>> => {
  const supabase = await createSSR();

  const bodytuneId = parseInt(
    formData.get("bodytune_plan") as string
  );
  try {
    const { error } = await supabase
      .from("exercise")
      .delete()
      .eq("id", bodytuneId);

    if (error) {
      const errorMessage: string = `There is an error Deleting the BodyTune: ${error.message}`;
      return {
        success: false,
        error: true,
        data: [],
        message: errorMessage,
      };
    }
    revalidateTag("bodyTunes");
    return {
      success: true,
      error: false,
      data: [],
      message: ``,
    };
  } catch (error) {
    const errorMessage: string =
      error instanceof Error
        ? `There is an error Deleting the BodyTune: ${error.message}`
        : "An unknown error occurred";
    return {
      success: false,
      error: true,
      data: [],
      message: errorMessage,
    };
  }
}

// Meals functions
const mutateMealPlan = async (
  mealPlan: mealPlanType,
  mealPlanName: string,
  visibilityPreference: number,
  mealPlanTags: Array<string>,
  userId: string,
  planId?: number,
  toBeDeletedIngredients?: Array<number>
) => {
  const supabase = await createSSR();

  try {
    let response 
    let mealPlanId 
    if(planId! === 0) {
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
      response = data as TableInsert<"meal_plan">[];
      mealPlanId = response[0].id!;
    } else {
      const { data, error } = await supabase
        .from("meal_plan")
        .upsert<TableInsert<"meal_plan">>({
          id: planId,
          planName: mealPlanName,
          visibility: visibilityPreference,
          created_by: userId,
        })
        .select();
      if (error) {
        const errorMessage: string = `There is an error Updating the Meal Plan: ${error.message}`;
        return {
          success: false,
          error: true,
          data: [],
          message: errorMessage,
        };
      }
      response = data as TableInsert<"meal_plan">[];
      mealPlanId = response[0].id!;
    }

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

    const createAMealResult = await mutateMeals(mealPlan, userId)

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
      } 
    }

    if(toBeDeletedIngredients) {
      const deleteIngredientsResult = await deleteIngredients(toBeDeletedIngredients)
      if(deleteIngredientsResult.error) {
        return {
          success: deleteIngredientsResult.success,
          error: deleteIngredientsResult.error,
          data: [],
          message: deleteIngredientsResult.message,
        };
      }
    }

    if(!planId) {
      const createTheDailyMealResult = await createTheDailyMeal(mealIds, mealPlanId, userId)
  
      if(createTheDailyMealResult.error) {      
        return {
          success: createTheDailyMealResult.success,
          error: createTheDailyMealResult.error,
          data: [],
          message: createTheDailyMealResult.message,
        };
      }
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
    const deleteTagRes = await supabase
      .from('meal_plan_tags')
      .delete()
      .eq('mealPlanId', mealPlanId)
      .not('tagId', 'in', `(${mealTagIds})`);

    if (deleteTagRes.error) {
      const errorMessage: string = `There is an error Delete Meal Tags: ${deleteTagRes.error.message}`;
      return {
        success: false,
        error: true,
        data: [],
        message: errorMessage,
      };
    }

    const { error } = await supabase
      .from("meal_plan_tags")
      .upsert<TableInsert<"meal_plan_tags">>(mealTagData, {onConflict: "mealPlanId, tagId"});

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

const mutateMeals = async (
  mealPlan: mealPlanType,
  userId: string
) => {
  const supabase = await createSSR();

  const mealIds: {
    [key: string]: {
      id?: number,
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
              .upsert<TableInsert<"meal">>({
                id:  mealPlan[day][mealType].mealInfo?.id,
                mealType: mealTypeId,
                mealName: mealPlan[day][mealType].mealInfo!.mealName,
                instructions: mealPlan[day][mealType].mealInfo!.cookingInstruction,
                veganAlternative: mealPlan[day][mealType].mealInfo!.veganAlternative,
                created_by: userId,
              })
              .select();
    
            if (error) {
              throw new Error(`Error ${mealPlan[day][mealType].mealInfo?.id ? "updating" : "creating"} meal: ${error.message}`);
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
              id: mealPlan[day][mealType].mealInfo?.id,
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
    
            const ingredientMutationResult = await mutateMealIngredients(
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

const mutateMealIngredients = async (
  ingredients: {
    newIngredients: Array<
    Nutrients & { id?: number, ingredientName: string; created_by: string; mealId: number }
  >,
  oldIngredients: Array<
    Nutrients & { id?: number, ingredientName: string; created_by: string; mealId: number } >
  }
) => {
  const supabase = await createSSR();

  try {
    if(ingredients.newIngredients.length !== 0) {
      const { error } = await supabase
        .from("meal_ingredients")
        .insert<TableInsert<"meal_ingredients">>(ingredients.newIngredients).select();
      if (error) {
        const errorMessage: string = `There is an error Inserting an ingredient: ${error.message}`;
        return {
          success: false,
          error: true,
          message: errorMessage,
        };
      }
    } else {
      const { error } = await supabase
        .from("meal_ingredients")
        .upsert<TableInsert<"meal_ingredients">>(ingredients.oldIngredients).select();
      if (error) {
        const errorMessage: string = `There is an error Inserting an ingredient: ${error.message}`;
        return {
          success: false,
          error: true,
          message: errorMessage,
        };
      }
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

const deleteIngredients = async (toBeDeletedIngredients: Array<number>) => {
  const supabase = await createSSR();

  try {
    const { error } = await supabase
      .from("meal_ingredients")
      .delete()
      .in("id", toBeDeletedIngredients);

    if (error) {
      const errorMessage: string = `There is an error Deleting the Ingredients: ${error.message}`;
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
        ? `There is an error Deleting the Ingredients: ${error.message}`
        : "An unknown error occurred";
    return {
      success: false,
      error: true,
      data: [],
      message: errorMessage,
    };
  }
}

const arrangeIngredients = (
  ingredients: IngredientTypes,
  userId: string,
  mealId: number
): {
  newIngredients: Array<
  Nutrients & { id?: number, ingredientName: string; created_by: string; mealId: number }
>,
oldIngredients: Array<
  Nutrients & { id?: number, ingredientName: string; created_by: string; mealId: number } >
} => {
  const ingredientInfos: {
    newIngredients: Array<
    Nutrients & { id?: number, ingredientName: string; created_by: string; mealId: number }
  >,
  oldIngredients: Array<
    Nutrients & { id?: number, ingredientName: string; created_by: string; mealId: number } >
  } = {
    newIngredients: [],
    oldIngredients: [],
  };

  Object.entries(ingredients).forEach(([key]) => {
    
    const isNumeric = (num: string | number) => (typeof(num) === 'number' || typeof(num) === "string" && num.trim() !== '') && !isNaN(num as number)
    const numeric = isNumeric(ingredients[key].id!)
    if(numeric) {
      ingredientInfos.oldIngredients.push({
        id: parseInt(ingredients[key].id! as string),
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
    } else {
      ingredientInfos.newIngredients.push({
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
    }
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
const mutateExercisePlan = async (
  exercisePlanName: string,
  selectedExercisePlanId: number,
  exercisePlan: exercisePlan,
  visibilityPreference: number,
  exercisePlanTags: Array<string>,
  userId: string,
  toBeDeletedExercises?: Array<number>
) => {
  const supabase = await createSSR();
  
  try {
    let response
    let exercisePlanId

    if(selectedExercisePlanId === 0) {
      const { data, error } = await supabase.from("exercise_plan").insert<TablesUpdate<"exercise_plan">>({
        planName: exercisePlanName,
        visibility: visibilityPreference,
        created_by: userId
      }).select()

      if (error) {
        const errorMessage: string = `There is an error Creating your Exercise Plan: ${error.message}`;
        return {
          success: false,
          error: true,
          data: [],
          message: errorMessage,
        };
      }

      response = data as TableInsert<"exercise_plan">[];
      exercisePlanId = response[0].id!;
    } else {
      const { data, error } = await supabase.from("exercise_plan").upsert<TablesUpdate<"exercise_plan">>({
        id: selectedExercisePlanId,
        planName: exercisePlanName,
        visibility: visibilityPreference,
        created_by: userId
      }).select()

      if (error) {
        const errorMessage: string = `There is an error Updating your Exercise Plan: ${error.message}`;
        return {
          success: false,
          error: true,
          data: [],
          message: errorMessage,
        };
      }

      response = data as TableInsert<"exercise_plan">[];
      exercisePlanId = response[0].id!;
    }
    
    if(toBeDeletedExercises) {
      const deleteExercisesResult = await deleteExercises(toBeDeletedExercises)
      if(deleteExercisesResult.error) {
        return {
          success: deleteExercisesResult.success,
          error: deleteExercisesResult.error,
          data: [],
          message: deleteExercisesResult.message,
        };
      }
    }

    const mapExercisePlanWithExerciseTagResult = await mapExercisePlanWithExerciseTag(exercisePlanId, exercisePlanTags, userId)

    if(mapExercisePlanWithExerciseTagResult.error) {
      if(mapExercisePlanWithExerciseTagResult.error) {      
        return {
          success: mapExercisePlanWithExerciseTagResult.success,
          error: mapExercisePlanWithExerciseTagResult.error,
          data: [],
          message: mapExercisePlanWithExerciseTagResult.message,
        };
      }
    }

    const uploadExerciseDemosResult = await uploadExerciseDemos(exercisePlan, exercisePlanId, userId)

    if(uploadExerciseDemosResult.error) {
      if(uploadExerciseDemosResult.error) {      
        return {
          success: uploadExerciseDemosResult.success,
          error: uploadExerciseDemosResult.error,
          data: [],
          message: uploadExerciseDemosResult.message,
        };
      }
    }

    const mutateExercisesResult = await mutateExercises(exercisePlan, exercisePlanId, userId);

    if(mutateExercisesResult.error) {
      if(mutateExercisesResult.error) {      
        return {
          success: mutateExercisesResult.success,
          error: mutateExercisesResult.error,
          data: [],
          message: mutateExercisesResult.message,
        };
      }
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
        ? `There is an error Inserting the Exercises: ${error.message}`
        : "An unknown error occurred";
    return {
      success: false,
      error: true,
      data: [],
      message: errorMessage,
    };
  }
};

const checkIfFileExistInSupabaseBucket = async (userId: string, exercisePlanId: number, file: string) => {
  const supabase = await createSSR();

  const bucket = 'Exercise Demo'
  const pathToFile = `exercise-demo/${userId}/${exercisePlanId}`;

  if(file || file === '') return {
    success: true,
    error: false,
    data: [],
    message: '',
  };

  try {  
    const { data, error } = await supabase
      .storage
      .from(bucket)
      .list(pathToFile, {
        search: file
      })
    
    if (error) {
      const errorMessage: string = `There is an error checking the file: ${error.message}`;
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
      data: data,
      message: '',
    };

  } catch (error) {
    const errorMessage: string =
      error instanceof Error
        ? `There is an error checking the file: ${error.message}`
        : "An unknown error occurred";
    return {
      success: false,
      error: true,
      data: [],
      message: errorMessage,
    };
  }

  // const { data, error } = await supabase
  //   .storage
  //   .from(bucket)
  //   .list(pathToFile, {
  //     search: 'your-file.txt'
  //   })

  // if (error) {
  //   console.error('Error listing files:', error)
  //   return false
  // }

  // const exists = data.some(file => file.name === 'your-file.txt')
  // return exists
}

const mutateExercises = async(exercisePlan:exercisePlan, exercisePlanId: number, userId: string) => {
  const supabase = await createSSR();

  const {existingExercises, newExercises} = arrangeExercises(exercisePlan, exercisePlanId, userId)
  try {
    if(existingExercises.length !== 0) {
      const { error } = await supabase.from("exercise").upsert<TableUpdate<"exercise">>(existingExercises)
      if (error) {
        const errorMessage: string = `There is an error Inserting your Exercise: ${error.message}`;
        return {
          success: false,
          error: true,
          data: [],
          message: errorMessage,
        };
      }
    }
    if(newExercises.length !== 0) {
      const { error } = await supabase.from("exercise").insert<TableInsert<"exercise">>(newExercises)
      if (error) {
        const errorMessage: string = `There is an error Inserting your Exercise: ${error.message}`;
        return {
          success: false,
          error: true,
          data: [],
          message: errorMessage,
        };
      }
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
        ? `There is an error Inserting the Exercise: ${error.message}`
        : "An unknown error occurred";
    return {
      success: false,
      error: true,
      data: [],
      message: errorMessage,
    };
  }
}

const uploadExerciseDemos = async (exercisePlan:exercisePlan, exercisePlanId: number, userId: string) => {
  const supabase = await createSSR();

  const demoPaths: Array<string> = [];

  try {
    await Promise.all(
    Object.entries(exercisePlan).map(([day]) => {
        exercisePlan[day].forEach(async (exercise: TableInsert<"exercise"> & {exerciseDemoInfo: {
          url: string;
          width: number;
          height: number;
          fileName: string;
        }}) => {
          const extractedFileResult = extractFilePathFromSignedUrl(exercise.exerciseDemoInfo.url)
          if(!extractedFileResult) {
            if(exercise.exerciseDemoInfo || exercise.exerciseDemoInfo !== undefined) {
              const demoFile = await urlToFile(exercise.exerciseDemoInfo);
              const fileExist = await checkIfFileExistInSupabaseBucket(userId, exercisePlanId, demoFile!.name);
              if(fileExist.data.length === 0) {
                const {data, error} = await supabase.storage.from("Exercise Demo").upload(`exercise-demo/${userId}/${exercisePlanId}/${demoFile?.name}`, demoFile!, {
                  cacheControl: '3600',
                  upsert: false
                })
                
                if (error) {
                  const errorMessage: string = `There is an error Creating your Exercise Plan: ${error.message}`;
                  return {
                    success: false,
                    error: true,
                    data: [],
                    message: errorMessage,
                  };
                }
                demoPaths.push(data.fullPath);
              } else {
                demoPaths.push(`Exercise Demo/exercise-demo/${userId}/${exercisePlanId}/${demoFile?.name}`);
              }
            }
          } else {
            demoPaths.push(exercise.exerciseDemoInfo.url);
          }
        })
      })
    )
    
    return {
      success: true,
      error: false,
      data: demoPaths,
      message: "",
    };
  } catch (error) {
    const errorMessage: string =
      error instanceof Error
        ? `There is an error Uploading the Exercise Demo File: ${error.message}`
        : "An unknown error occurred";
    return {
      success: false,
      error: true,
      data: [],
      message: errorMessage,
    };
  }
}

const mapExercisePlanWithExerciseTag = async (exercisePlanId:number, exercisePlanTags:Array<string>, userId: string) => {
  const supabase = await createSSR();
  const exerciseTagIds: Array<number> = getExerciseTagIds(exercisePlanTags);
  const exerciseTagData: Array<{
    id?: number;
    exercisePlanId: number;
    tagId: number;
    createdAt?: string;
  }> = exerciseTagIds.map((id: number) => {
    return {
      exercisePlanId: exercisePlanId,
      tagId: id,
      created_by: userId,
    };
  });

  try {
    const deleteTagRes = await supabase
      .from('exercise_plan_tag')
      .delete()
      .eq('exercisePlanId', exercisePlanId)
      .not('tagId', 'in', `(${exerciseTagIds})`);

    if (deleteTagRes.error) {
      const errorMessage: string = `There is an error Delete Meal Tags: ${deleteTagRes.error.message}`;
      return {
        success: false,
        error: true,
        data: [],
        message: errorMessage,
      };
    }
    console.log(exerciseTagData);
    const { error } = await supabase.from("exercise_plan_tag").upsert<TableUpdate<"exercise_plan_tag">>(exerciseTagData, {onConflict: "exercisePlanId, tagId"})

    if (error) {
      const errorMessage: string = `There is an error Mapping your Exercise Plan: ${error.message}`;
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
        ? `There is an error Mapping your Exercise Plan: ${error.message}`
        : "An unknown error occurred";
    return {
      success: false,
      error: true,
      data: [],
      message: errorMessage,
    };
  }
}

const arrangeExercises = (exercisePlan:exercisePlan, exercisePlanId: number, userId: string) => {
  const newExercises:Array<TableInsert<"exercise">> = [];
  const existingExercises:Array<TableInsert<"exercise">> = [];
  Object.entries(exercisePlan).forEach(([day]) => {
    exercisePlan[day].forEach((exercise: TableInsert<"exercise">& {
      exerciseDemoInfo: {
        url: string;
        width: number;
        height: number;
        fileName: string;
      }}) => {
        if(exercise.id) {
          existingExercises.push({
            id: exercise.id,
            exerciseName: exercise.exerciseName,
            bodyPart: exercise.bodyPart,
            equipment: exercise.equipment,
            day: day,
            exerciseDemo: exercise.exerciseDemoInfo === null ? "" :  `Exercise Demo/exercise-demo/${userId}/${exercisePlanId}/${exercise.exerciseDemoInfo.fileName}`,
            exerciseMeasurementType: exercise.exerciseMeasurementType,
            measurement: exercise.measurement,
            instruction: exercise.instruction,
            youtubeLink: exercise.youtubeLink,
            bmiClassification: exercise.bmiClassification,
            exercisePlanId: exercisePlanId,
            created_by: userId
          })
        } else {
          newExercises.push({
            exerciseName: exercise.exerciseName,
            bodyPart: exercise.bodyPart,
            equipment: exercise.equipment,
            day: day,
            exerciseDemo: exercise.exerciseDemoInfo === null ? "" :  `Exercise Demo/exercise-demo/${userId}/${exercisePlanId}/${exercise.exerciseDemoInfo.fileName}`,
            exerciseMeasurementType: exercise.exerciseMeasurementType,
            measurement: exercise.measurement,
            instruction: exercise.instruction,
            youtubeLink: exercise.youtubeLink,
            bmiClassification: exercise.bmiClassification,
            exercisePlanId: exercisePlanId,
            created_by: userId
          })
        }
    })
  })

  return {newExercises, existingExercises};
}


const deleteExercises = async (toBeDeletedExercises: Array<number>) => {
  const supabase = await createSSR();

  try {
    const { error } = await supabase
      .from("exercise")
      .delete()
      .in("id", toBeDeletedExercises);

    if (error) {
      const errorMessage: string = `There is an error Deleting the Exercise: ${error.message}`;
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
        ? `There is an error Deleting the Exercise: ${error.message}`
        : "An unknown error occurred";
    return {
      success: false,
      error: true,
      data: [],
      message: errorMessage,
    };
  }
}

const getFileTypeFromFileName = (fileName: string) => {
  const extension = fileName.split(".").pop()?.toLowerCase();
  const mimeTypes: Record<string, string> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
  };

  return mimeTypes[extension || ""] || "application/octet-stream";
};

const urlToFile = async (exerciseDemo: { url: string; fileName: string }) => {
  try {
    const response = await fetch(exerciseDemo.url);
    const blob = await response.blob();
    const fileType =
      getFileTypeFromFileName(exerciseDemo.fileName) || blob.type;

    return new File([blob], exerciseDemo.fileName, { type: fileType });
  } catch (error) {
    console.error("Error converting URL to file:", error);
    return null;
  }
};