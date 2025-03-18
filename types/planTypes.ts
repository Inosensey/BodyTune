import { TableInsert } from "@/types/database.types";
// import { mealPlanType } from "./mealTypes";

export interface exerciseQueryHygraphType {
  day: string;
  exerciseName: string;
  bodyPart: string;
  equipment: string;
  youtubeLink: string;
  measurement: {
    [key: string]: string;
  };
  instruction: string;
  exerciseDemo: {
    url: string;
    width: number;
    height: number;
    fileName: string;
  };
  exerciseMeasurementType: {
    measurementName: string;
  };
  bmiClassification: {
    classification: string;
  };
}

export interface exercisePlan {
  [key: string]: Array<
    TableInsert<"exercise"> & {
      exerciseDemoInfo: {
        url: string;
        width: number;
        height: number;
        fileName: string;
      };
    }
  >;
}

export interface bodyTunePlan {
  mealPlanId: number;
  exercisePlanId: number;
  created_by: string;
  personal_information: {
    name: string;
  };
  meal_plan: {
    id: number;
    planName: string;
    created_by: string;
    visibility: number;
    meal_plan_tags: Array<{
      meal_tags: {
        id: number;
        mealTagName: string;
      };
    }>;
    plan_visibility: {
      visibility: string;
    };
    personal_information: {
      name: string;
    };
    daily_meals: Array<{
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
    }>;
  };
  exercise_plan: {
    id: number;
    planName: string;
    created_by: string;
    visibility: number;
    exercise_plan_tag: Array<{
      exercise_tags: {
        id: number;
        exerciseTagName: string;
      };
    }>;
    plan_visibility: {
      visibility: string;
    };
    personal_information: {
      name: string;
    };
    exercise: [
      {
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
      }
    ];
  };
}
