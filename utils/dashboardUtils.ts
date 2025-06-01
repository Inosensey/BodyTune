import {
  underweightMealPlanNames,
  healthyWeightMealPlanNames,
  overweightMealPlanNames,
  beginnerExercisePlanNames,
  amateurExercisePlanNames,
  expertExercisePlanNames,
  weekDates,
} from "@/utils/initials";

// Types
import {
  bodyTunePlan,
  exercisePlan,
  exercisePlanQuery,
  mealPlanIngredientQuery,
  mealPlanQuery,
} from "@/types/planTypes";
import { IngredientTypes, mealPlanType, Nutrients } from "@/types/mealTypes";
import { TableInsert } from "@/types/database.types";

export const getBmi = (
  weight: number,
  height: number
): {
  id: string;
  bmiClassification: string;
} => {
  const bmi = weight / (height * height);
  if (bmi < 18.5) {
    return {
      id: "cm7brtlun8hw907mnqb6mlng9",
      bmiClassification: "Underweight",
    };
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return {
      id: "cm7bs0dpa8i1908l6rpo4n3vv",
      bmiClassification: "Healthy weight",
    };
  } else {
    return {
      id: "cm7bsfudm8tf307jtngum4z6p",
      bmiClassification: "Overweight",
    };
  }
};

export const generateMealPlanName = (bmiClassifications: string): string => {
  let planName: string = "";
  let randomIndex: number;
  switch (bmiClassifications) {
    case "Underweight":
      randomIndex = Math.floor(Math.random() * underweightMealPlanNames.length);
      planName = underweightMealPlanNames[randomIndex];
      break;
    case "Healthy weight":
      randomIndex = Math.floor(Math.random() * underweightMealPlanNames.length);
      planName = healthyWeightMealPlanNames[randomIndex];
      break;
    case "Overweight":
      randomIndex = Math.floor(Math.random() * underweightMealPlanNames.length);
      planName = overweightMealPlanNames[randomIndex];
      break;
    default:
      randomIndex = Math.floor(Math.random() * underweightMealPlanNames.length);
      planName = healthyWeightMealPlanNames[randomIndex];
      break;
  }
  return planName;
};

export const generateExercisePlanName = (difficulty: string): string => {
  let planName: string = "";
  let randomIndex: number;
  switch (difficulty) {
    case "beginner":
      randomIndex = Math.floor(Math.random() * underweightMealPlanNames.length);
      planName = beginnerExercisePlanNames[randomIndex];
      break;
    case "Amateur":
      randomIndex = Math.floor(Math.random() * underweightMealPlanNames.length);
      planName = amateurExercisePlanNames[randomIndex];
      break;
    case "Expert":
      randomIndex = Math.floor(Math.random() * underweightMealPlanNames.length);
      planName = expertExercisePlanNames[randomIndex];
      break;
    default:
      randomIndex = Math.floor(Math.random() * underweightMealPlanNames.length);
      planName = amateurExercisePlanNames[randomIndex];
      break;
  }
  return planName;
};

export const getMealTagIds = (mealTags: Array<string>): Array<number> => {
  const mealTagIds: Array<number> = [];

  mealTags.forEach((tag: string) => {
    switch (tag) {
      case "Underweight":
        mealTagIds.push(1);
        break;

      case "Healthy weight":
        mealTagIds.push(2);
        break;

      case "Overweight":
        mealTagIds.push(3);
        break;

      default:
        mealTagIds.push(2);
        break;
    }
  });

  return mealTagIds;
};

export const getMealType = (type: string): number => {
  let mealType: number = 0;

  switch (type) {
    case "breakFast":
      mealType = 1;
      break;

    case "lunch":
      mealType = 2;

      break;

    case "dinner":
      mealType = 3;

      break;

    default:
      mealType = 1;
      break;
  }

  return mealType;
};

export const getExerciseTagIds = (
  exerciseTags: Array<string>
): Array<number> => {
  const exerciseTagIds: Array<number> = [];

  exerciseTags.map((tag) => {
    switch (tag) {
      case "beginner":
        exerciseTagIds.push(1);
        break;

      case "Amateur":
        exerciseTagIds.push(2);
        break;

      case "Expert":
        exerciseTagIds.push(3);
        break;

      default:
        exerciseTagIds.push(1);
        break;
    }
  });

  return exerciseTagIds;
};

export const arrangeBodyTunePlan = (
  bodyTunePlan: bodyTunePlan
): { exercisePlan?: exercisePlan; mealPlan?: mealPlanType } => {
  const exercisePlan: exercisePlan = arrangeExercisePlan(
    bodyTunePlan.exercise_plan
  );
  const mealPlan: mealPlanType = arrangeMealPlan(bodyTunePlan.meal_plan);

  return { exercisePlan, mealPlan };
};

const arrangeIngredientInfo = (
  ingredients: Array<mealPlanIngredientQuery>
) => {
  let ingredientList: IngredientTypes = {};
  const nutritionInfo: Nutrients = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  };
  ingredients.forEach(
    (ingredient: mealPlanIngredientQuery) => {
      ingredientList = {
        ...ingredientList,
        [ingredient.id]: {
          id: ingredient.id,
          ingredientName: `Ingredient ${ingredient.id}`,
          ingredientValue: ingredient.ingredientName,
          caloriesName: `Calories`,
          caloriesValue: ingredient.calories.toString(),
          proteinsName: `Proteins`,
          proteinsValue: ingredient.protein.toString(),
          carbsName: `Carbs`,
          carbsValue: ingredient.carbs.toString(),
          fatName: `Fat`,
          fatValue: ingredient.fat.toString(),
        },
      };
      nutritionInfo.calories += ingredient.calories;
      nutritionInfo.protein += ingredient.protein;
      nutritionInfo.carbs += ingredient.carbs;
      nutritionInfo.fat += ingredient.fat;
    }
  );
  return { ingredientList, nutritionInfo };
};

export const arrangeExercisePlan = (
  exercisePlanQuery: exercisePlanQuery
): exercisePlan => {
  const exercisePlan: exercisePlan = {
    ["Monday"]: [
      {
        id: 0,
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
    > = exercisePlanQuery.exercise
      .filter((exercise) => exercise.day === day)
      .map(
        (exercise: {
          id?: number,
          exerciseName: string;
          bodyPart: string;
          equipment: string;
          day: string;
          exerciseDemo: string;
          youtubeLink: string | null;
          measurement: string;
          instruction: string;
          bmiClassification: number;
          exerciseMeasurementType: number;
          exercise_measurement_type: {
            id: number;
            measurement: string;
          };
          bmi_classification: {
            classification: string;
          };
        }) => {
          const segments = exercise.exerciseDemo.split("/");
          const fileName = segments[segments.length - 1];
          let fileInfo;

          if (fileName !== "undefined") {
            fileInfo = extractFilePathFromSignedUrl(exercise.exerciseDemo)
          }
          return {
            id: exercise.id,
            exerciseName: exercise.exerciseName,
            bodyPart: exercise.bodyPart,
            equipment: exercise.equipment,
            day: exercise.day,
            exerciseMeasurementType: exercise.exercise_measurement_type.id,
            measurement: exercise.measurement,
            exerciseDemo: fileInfo ? exercise.exerciseDemo : "",
            bmiClassification: 1,
            instruction: exercise.instruction,
            youtubeLink: exercise?.youtubeLink,
            exerciseDemoInfo: {
              url: fileInfo ? exercise.exerciseDemo : "",
              fileName: fileInfo?.fileName || "",
              height: 0,
              width: 0,
            },
          };
        }
      );

    exercisePlan[day] = filteredExercises.length > 0 ? filteredExercises : [];
  });
  return exercisePlan;
};

export const extractFilePathFromSignedUrl = (signedUrl: string): {path: string | null, fileName: string} | null => {
  try {
    const url = new URL(signedUrl)
    const path = url.pathname
    const match = path.match(/\/sign\/(.+)/)

    if (!match || !match[1]) return null
    const decodedPath = decodeURIComponent(match[1])
    const segments = decodedPath.split('/')
    const fileName = segments[segments.length - 1]

    return {
      path: decodedPath,
      fileName,
    }
  } catch (err) {
    console.error('Invalid URL:', err)
    return null
  }
}

export const arrangeMealPlan = (mealPlanQuery: mealPlanQuery): mealPlanType => {
  const mealPlan: mealPlanType = {};

  weekDates.forEach((day) => {
    mealPlanQuery.daily_meals
      .filter((meal) => meal.day === day)
      .forEach(
        (meal: {
          plan_id: number;
          day: string;
          breakFast: {
            id: number;
            mealName: string;
            mealType: {
              mealType: string;
            };
            instructions: string;
            meal_ingredients: Array<mealPlanIngredientQuery>;
            veganAlternative: string | null;
          };
          lunch: {
            id: number;
            mealName: string;
            mealType: {
              mealType: string;
            };
            instructions: string;
            meal_ingredients: Array<mealPlanIngredientQuery>;
            veganAlternative: string | null;
          };
          dinner: {
            id: number;
            mealName: string;
            mealType: {
              mealType: string;
            };
            instructions: string;
            meal_ingredients: Array<mealPlanIngredientQuery>;
            veganAlternative: string | null;
          };
        }) => {
          const breakFastIngredientInfo = arrangeIngredientInfo(
            meal.breakFast.meal_ingredients
          );
          const lunchIngredientInfo = arrangeIngredientInfo(
            meal.lunch.meal_ingredients
          );
          const dinnerIngredientInfo = arrangeIngredientInfo(
            meal.dinner.meal_ingredients
          );

          mealPlan[day] = {
            breakFast: {
              mealInfo: {
                id: meal.breakFast.id,
                mealName: meal.breakFast.mealName,
                shortDescription: "",
                cookingInstruction: meal.breakFast.instructions,
                veganAlternative:
                  meal.breakFast.veganAlternative === null
                    ? ""
                    : meal.breakFast.veganAlternative,
              },
              ingredients: breakFastIngredientInfo.ingredientList,
              nutrition: breakFastIngredientInfo.nutritionInfo,
            },
            lunch: {
              mealInfo: {
                id: meal.lunch.id,
                mealName: meal.lunch.mealName,
                shortDescription: "",
                cookingInstruction: meal.lunch.instructions,
                veganAlternative:
                  meal.lunch.veganAlternative === null
                    ? ""
                    : meal.lunch.veganAlternative,
              },
              ingredients: lunchIngredientInfo.ingredientList,
              nutrition: lunchIngredientInfo.nutritionInfo,
            },
            dinner: {
              mealInfo: {
                id: meal.dinner.id,
                mealName: meal.dinner.mealName,
                shortDescription: "",
                cookingInstruction: meal.dinner.instructions,
                veganAlternative:
                  meal.dinner.veganAlternative === null
                    ? ""
                    : meal.dinner.veganAlternative,
              },
              ingredients: dinnerIngredientInfo.ingredientList,
              nutrition: dinnerIngredientInfo.nutritionInfo,
            },
          };
        }
      );
  });
  return mealPlan;
};
