import { TableInsert } from "@/types/database.types";

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
  id: number;
  mealPlanId: number;
  exercisePlanId: number;
  created_by: string;
  personal_information: {
    name: string;
  };
  visibility: number;
  plan_visibility: {
    visibility: string;
  };
  meal_plan: mealPlanQuery;
  exercise_plan: exercisePlanQuery;
}

export interface exercisePlanQuery {
  id?: number;
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
  exercise: [exerciseInfo];
}

export interface exerciseInfo {
  id?: number;
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

export interface mealPlanQuery {
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
  daily_meals: Array<dailyMealsInterface>;
}

export interface dailyMealsInterface {
  plan_id: number;
  day: string;
  breakFast: mealInterface;
  lunch: mealInterface;
  dinner: mealInterface;
}

export interface mealInterface {
    id: number;
    mealName: string;
    mealType: {
      mealType: string;
    };
    instructions: string;
    meal_ingredients: Array<mealPlanIngredientQuery>;
    veganAlternative: string | null;
}

export interface mealPlanIngredientQuery {
  id: number;
  mealId: number;
  ingredientName: string;
  fat: number;
  carbs: number;
  protein: number;
  calories: number;
}

export interface visibilityInterface {
  id: number;
  visibility: string;
}

export interface userActivePlanInterface {
  id: number;
  mealPlanId: number;
  exercisePlanId: number;
  created_by: string;
  meal_plan: mealPlanQuery;
  exercise_plan: exercisePlanQuery;
}

export interface explorePageContentInterface {
  bodyTunes: Array<exploreBodyTuneInterface>;
  exercisePlans: Array<exploreExercisePlanInterface>;
  mealPlans: Array<exploreMealPlanInterface>;
}
export interface exploreBodyTuneInterface extends bodyTunePlan {
  canMutate: boolean;
  userFavorite: boolean;
}
export interface exploreExercisePlanInterface extends exercisePlanQuery {
  canMutate: boolean;
  userFavorite: boolean;
}
export interface exploreMealPlanInterface extends mealPlanQuery {
  canMutate: boolean;
  userFavorite: boolean;
}