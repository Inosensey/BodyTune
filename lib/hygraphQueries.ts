"use server";

import { TableInsert } from "@/types/database.types";
import {
  ingredient,
  IngredientTypes,
  mealPlanType,
  mealQueryHygraphType,
  Nutrients,
} from "@/types/mealTypes";
import { exercisePlan, exerciseQueryHygraphType } from "@/types/planTypes";

import { weekDates } from "@/utils/initials";

const NEXT_HYGRAPH_ENDPOINT = process.env.NEXT_HYGRAPH_ENDPOINT;

export const getMeals = async () => {
  try {
    const response = await fetch(NEXT_HYGRAPH_ENDPOINT!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query Meals {
                    meals(first: 100) {
                        mealType,
                        mealName,
                        ingredients,
                        veganAlternative,
                        cookingInstructions
                    }
                }`,
      }),
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log("There is an error getting your meals", error);
    return error;
  }
};

export const getWorkouts = async () => {
  try {
    const response = await fetch(NEXT_HYGRAPH_ENDPOINT!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query Exercises {
                        exercises(
                        first: 100
                    ) {
                        day,
                        exerciseName,
                        bodyPart,
                        equipment
                        youtubeLink
                        measurement
                        instruction
                        exerciseDemo {
                            url
                            width
                            height
                            fileName
                        }
                        exerciseMeasurementType {
                            measurementName
                        }
                        bmiClassification {
                            classification
                        }
                    }
                }`,
      }),
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log("There is an error getting your Exercises", error);
    return error;
  }
};

const getMealsByBmi = async (bmiClassification: string) => {
  if (bmiClassification === "" || bmiClassification === undefined) {
    console.log("Please provide a valid bmi classification");
    return "Please provide a valid bmi classification";
  }
  try {
    const response = await fetch(NEXT_HYGRAPH_ENDPOINT!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query Meals {
                    meals(first: 100, where: {bmiClassification:{id: "${bmiClassification}"}}) {
                        id,
                        mealType,
                        mealName,
                        ingredients,
                        veganAlternative,
                        cookingInstructions
                    }
                }`,
      }),
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log("There is an error getting your meals", error);
    return error;
  }
};

const getExerciseByBmi = async (bmiClassification: string) => {
  if (bmiClassification === "" || bmiClassification === undefined) {
    console.log("Please provide a valid bmi classification");
    return "Please provide a valid bmi classification";
  }
  try {
    const response = await fetch(NEXT_HYGRAPH_ENDPOINT!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query Exercises {
                        exercises(
                        first: 100, 
                        where: { bmiClassification: { id: "${bmiClassification}" } }
                    ) {
                        day,
                        exerciseName,
                        bodyPart,
                        equipment
                        youtubeLink
                        measurement
                        instruction
                        exerciseDemo {
                            url
                            width
                            height
                            fileName
                        }
                        exerciseMeasurementType {
                            measurementName
                        }
                        bmiClassification {
                            classification
                        }
                    }
                }`,
      }),
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log("There is an error getting your Exercises", error);
    return error;
  }
};

export const generateBodyTunePlan = async (
  bmiClassification: string,
  experience: string
) => {
  const mealList = await getMealsByBmi(bmiClassification);
  const exerciseList = await getExerciseByBmi(bmiClassification);
  const mealPlan: mealPlanType = setMealPlan(mealList.data.meals);
  const exercisePlan: exercisePlan = await setExercisePlan(
    exerciseList.data.exercises,
    experience
  );

  return { mealPlan, exercisePlan };
};

const setMealPlan = (meals: Array<mealQueryHygraphType>) => {
  const shuffledMeals = [...meals].sort(() => Math.random() - 0.5);
  const breakfastMeal = shuffledMeals.filter(
    (meal) => meal.mealType === "Breakfast"
  );
  const lunchMeal = shuffledMeals.filter((meal) => meal.mealType === "Lunch");
  const dinnerMeal = shuffledMeals.filter((meal) => meal.mealType === "Dinner");

  const mealPlan: mealPlanType = {};

  for (let index = 0; index < weekDates.length; index++) {
    const breakfastMealIngredientInfo = getIngredientsInfo(
      breakfastMeal[index].ingredients
    );
    const lunchMealIngredientInfo = getIngredientsInfo(
      lunchMeal[index].ingredients
    );
    const dinnerMealIngredientInfo = getIngredientsInfo(
      dinnerMeal[index].ingredients
    );

    mealPlan[weekDates[index]] = {
      breakFast: {
        mealInfo: {
          mealName: breakfastMeal[index].mealName,
          shortDescription: "",
          cookingInstruction: breakfastMeal[index].cookingInstructions,
          veganAlternative: breakfastMeal[index].veganAlternative,
        },
        ingredients: breakfastMealIngredientInfo.ingredientList,
        nutrition: breakfastMealIngredientInfo.nutritionInfo,
      },
      lunch: {
        mealInfo: {
          mealName: lunchMeal[index].mealName,
          shortDescription: "",
          cookingInstruction: lunchMeal[index].cookingInstructions,
          veganAlternative: lunchMeal[index].veganAlternative,
        },
        ingredients: lunchMealIngredientInfo.ingredientList,
        nutrition: lunchMealIngredientInfo.nutritionInfo,
      },
      dinner: {
        mealInfo: {
          mealName: dinnerMeal[index].mealName,
          shortDescription: "",
          cookingInstruction: dinnerMeal[index].cookingInstructions,
          veganAlternative: dinnerMeal[index].veganAlternative,
        },
        ingredients: dinnerMealIngredientInfo.ingredientList,
        nutrition: dinnerMealIngredientInfo.nutritionInfo,
      },
    };
  }

  return mealPlan;
};

const getIngredientsInfo = (ingredients: Array<ingredient>) => {
  let ingredientList: IngredientTypes = {};
  const nutritionInfo: Nutrients = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  };

  ingredients.forEach((ingredient: ingredient) => {
    const UUID = crypto.randomUUID();
    ingredientList = {
      ...ingredientList,
      [`ingredient${UUID}`]: {
        id: UUID,
        ingredientName: `Ingredients ${UUID}`,
        ingredientValue: ingredient.name,
        caloriesName: `Calories`,
        caloriesValue: ingredient.nutrition.calories.toString(),
        proteinsName: `Proteins`,
        proteinsValue: ingredient.nutrition.protein.toString(),
        carbsName: `Carbs`,
        carbsValue: ingredient.nutrition.carbs.toString(),
        fatName: `Fat`,
        fatValue: ingredient.nutrition.fat.toString(),
      },
    };
    nutritionInfo.calories += ingredient.nutrition.calories;
    nutritionInfo.protein += ingredient.nutrition.protein;
    nutritionInfo.carbs += ingredient.nutrition.carbs;
    nutritionInfo.fat += ingredient.nutrition.fat;
  });

  return { ingredientList, nutritionInfo };
};

const setExercisePlan = async (
  exercises: Array<exerciseQueryHygraphType>,
  experience: string
) => {
  const exercisePlan: exercisePlan = {
    ["Monday"]: [
      {
        exerciseName: "",
        bodyPart: "",
        equipment: "",
        day: "",
        exerciseMeasurementType: 1,
        measurement: "",
        exerciseDemo: "",
        bmiClassification: 1,
        instruction: "",
        youtubeLink: "",
        exerciseDemoInfo: {
          fileName: "",
          url: "",
          height: 0,
          width: 0,
        },
      },
    ],
  };

  const test = await urlToFile(exercises[0].exerciseDemo);
  console.log(test);

  weekDates.forEach((day) => {
    const filteredExercises: Array<
      TableInsert<"exercise"> & {
        exerciseDemoInfo: {
          url: string;
          width: number;
          height: number;
          fileName: string;
        };
      }
    > = exercises
      .filter((exercise) => exercise.day === day)
      .map((exercise: exerciseQueryHygraphType) => {
        let difficulty = 0;
        let measurementType = 0;
        if (experience === "beginner") {
          difficulty = 1;
        } else if (experience === "Amateur") {
          difficulty = 2;
        } else {
          difficulty = 3;
        }

        if (exercise.exerciseMeasurementType.measurementName === "Reps") {
          measurementType = 1;
        } else {
          measurementType = 2;
        }
        return {
          exerciseName: exercise.exerciseName,
          bodyPart: exercise.bodyPart,
          equipment: exercise.equipment,
          day: exercise.day,
          exerciseDifficulty: measurementType,
          exerciseMeasurementType: difficulty,
          measurement: exercise.measurement[experience],
          exerciseDemo: exercise.exerciseDemo?.url,
          bmiClassification: 1,
          instruction: exercise.instruction,
          youtubeLink: exercise?.youtubeLink,
          exerciseDemoInfo: {
            fileName: exercise.exerciseDemo?.fileName,
            url: exercise.exerciseDemo?.url,
            height: exercise.exerciseDemo ? exercise.exerciseDemo.height : 0,
            width: exercise.exerciseDemo ? exercise.exerciseDemo.width : 0,
          },
        };
      });

    exercisePlan[day] = filteredExercises.length > 0 ? filteredExercises : [];
  });

  return exercisePlan;
};

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
