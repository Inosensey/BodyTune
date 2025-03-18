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
import { getExerciseTagIds, getMealTagIds, getMealType } from "@/utils/dashboardUtils";
import { createSSR } from "@/utils/supabaseSSR";

export const createBodyTunePlan = async (
  prevState: formReturnType<[]>,
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
  // const selectedMealPlan = formData.get("selectedMealPlan") as string;
  const selectedExercisePlan = formData.get("selectedExercisePlan") as string;
  const mealPlan: mealPlanType = jsonData.mealPlan;
  const exercisePlan: exercisePlan = jsonData.exercisePlan;
  const mealPlanTags: Array<string> = jsonData.mealPlanTags;
  const exercisePlanTags: Array<string> = jsonData.exercisePlanTags;

  const user = await supabase.auth.getUser();
  const userId = user.data.user!.id;

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

    const createExercisePlanResult = await createExercisePlan(
      exercisePlanName,
      selectedExercisePlan,
      exercisePlan,
      visibilityPreference,
      exercisePlanTags,
      userId
    );

    if (createExercisePlanResult.error) {
      return {
        success: createExercisePlanResult.success,
        error: createExercisePlanResult.error,
        data: [],
        message: createExercisePlanResult.message,
      };
    }

    const mealPlanId = createMealPlanResult.data[0].id!;
    const exercisePlanId = createExercisePlanResult.data[0].id!;

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
    return {
      success: true,
      error: false,
      data: bodyTunePlanId,
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
const createExercisePlan = async (
  exercisePlanName: string,
  selectedExercisePlan: string,
  exercisePlan: exercisePlan,
  visibilityPreference: number,
  exercisePlanTags: Array<string>,
  userId: string
) => {
  const supabase = await createSSR();
  
  try {
    const { data, error } = await supabase.from("exercise_plan").insert<TableInsert<"exercise_plan">>({
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

    const response = data as TableInsert<"exercise_plan">[];
    const exercisePlanId = response[0].id!;

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

    const insertExercisesResult = await insertExercises(exercisePlan, exercisePlanId, userId);

    if(insertExercisesResult.error) {
      if(insertExercisesResult.error) {      
        return {
          success: insertExercisesResult.success,
          error: insertExercisesResult.error,
          data: [],
          message: insertExercisesResult.message,
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

const insertExercises = async(exercisePlan:exercisePlan, exercisePlanId: number, userId: string) => {
  const supabase = await createSSR();

  const arrangedExercises = arrangeExercises(exercisePlan, exercisePlanId, userId)
  try {
    const { error } = await supabase.from("exercise").insert<TableInsert<"exercise">>(arrangedExercises)
    
    if (error) {
      const errorMessage: string = `There is an error Inserting your Exercise: ${error.message}`;
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
          if(exercise.exerciseDemoInfo || exercise.exerciseDemoInfo === undefined) {
            const demoFile = await urlToFile(exercise.exerciseDemoInfo);
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
    const { error } = await supabase.from("exercise_plan_tag").insert<TableInsert<"exercise_plan_tag">>(exerciseTagData)
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

const arrangeExercises = (exercisePlan:exercisePlan, exercisePlanId: number, userId: string): Array<TableInsert<"exercise">> => {
  const exercises:Array<TableInsert<"exercise">> = [];
  Object.entries(exercisePlan).forEach(([day]) => {
    exercisePlan[day].forEach((exercise: TableInsert<"exercise">& {
      exerciseDemoInfo: {
        url: string;
        width: number;
        height: number;
        fileName: string;
      }}) => {
      exercises.push({
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
    })
  })

  return exercises
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