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
import { bodyTunePlan, exercisePlan } from "@/types/planTypes";
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

export const arrangeBodyTuePlan = (
  bodyTunePlan: bodyTunePlan
): { exercisePlan?: exercisePlan; mealPlan?: mealPlanType } => {
  console.log(bodyTunePlan)
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

  const mealPlan: mealPlanType = {};

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
    > = bodyTunePlan.exercise_plan.exercise
      .filter((exercise) => exercise.day === day)
      .map(
        (exercise: {
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
          return {
            exerciseName: exercise.exerciseName,
            bodyPart: exercise.bodyPart,
            equipment: exercise.equipment,
            day: exercise.day,
            exerciseMeasurementType: exercise.exercise_measurement_type.id,
            measurement: exercise.measurement,
            exerciseDemo: exercise.exerciseDemo,
            bmiClassification: 1,
            instruction: exercise.instruction,
            youtubeLink: exercise?.youtubeLink,
            exerciseDemoInfo: {
              url: exercise.exerciseDemo,
              fileName: "",
              height: 0,
              width: 0,
            },
          };
        }
      );

    exercisePlan[day] = filteredExercises.length > 0 ? filteredExercises : [];
  });

  weekDates.forEach((day) => {
    bodyTunePlan.meal_plan.daily_meals
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
            meal_ingredients: Array<{
              mealId: number;
              ingredientName: string;
              fat: number;
              carbs: number;
              protein: number;
              calories: number;
            }>;
            veganAlternative: string | null;
          };
          lunch: {
            id: number;
            mealName: string;
            mealType: {
              mealType: string;
            };
            instructions: string;
            meal_ingredients: [
              {
                mealId: number;
                ingredientName: string;
                fat: number;
                carbs: number;
                protein: number;
                calories: number;
              }
            ];
            veganAlternative: string | null;
          };
          dinner: {
            id: number;
            mealName: string;
            mealType: {
              mealType: string;
            };
            instructions: string;
            meal_ingredients: [
              {
                mealId: number;
                ingredientName: string;
                fat: number;
                carbs: number;
                protein: number;
                calories: number;
              }
            ];
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

  return { exercisePlan, mealPlan };
};

const arrangeIngredientInfo = (
  ingredients: Array<{
    mealId: number;
    ingredientName: string;
    fat: number;
    carbs: number;
    protein: number;
    calories: number;
  }>
) => {
  let ingredientList: IngredientTypes = {};
  const nutritionInfo: Nutrients = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  };
  ingredients.forEach(
    (ingredient: {
      mealId: number;
      ingredientName: string;
      fat: number;
      carbs: number;
      protein: number;
      calories: number;
    }) => {
      const UUID = crypto.randomUUID();
      ingredientList = {
        ...ingredientList,
        [`ingredient${UUID}`]: {
          id: UUID,
          ingredientName: `Ingredients ${UUID}`,
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
