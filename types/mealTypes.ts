export type mealPlanName = {
  selectedMealPlan: number | string;
  mealPlanName: string;
};

export interface mealPlanGeneralInfo {
  id: number,
  planName: string;
  shortDescription?: string;
  tags: Array<mealPlanTag>;
}

export interface mealPlanTag {
  meal_tags: {
    id: number | string;
    mealTagName: string;
  };
}

export interface Meal {
  mealName: string;
  mealType: string;
  ingredients: ingredient[];
  veganAlternative: string;
  cookingInstructions: string;
}

export interface ingredient {
  id: string;
  name: string;
  nutrition: Nutrients;
}

export type Nutrients = {
  calories: number;
  carbs: number;
  fat: number;
  protein: number;
};

export interface mealPlanType {
  [key: string]: dailyMealInfo;
}

export interface dailyMealInfo {
  [key: string]: {
    mealInfo: MealInfoTypes | undefined;
    ingredients: IngredientTypes | undefined;
    nutrition: Nutrients | undefined;
  };
}

export interface MealInfoTypes {
  mealName: string;
  shortDescription: string;
  cookingInstruction: string;
  veganAlternative: string;
}

export interface IngredientTypes {
  [key: string]: IngredientInfo;
}
export type IngredientInfo = {
  id?: string;
  ingredientName: string;
  ingredientValue: string;
  caloriesName: string;
  caloriesValue: string;
  proteinsName: string;
  proteinsValue: string;
  carbsName: string;
  carbsValue: string;
  fatName: string;
  fatValue: string;
};

export interface IngredientInputValidation {
  [key: string]: {
    ingredientValid: boolean | null;
    ingredientValidationMessage: string;
    caloriesValid: boolean | null;
    caloriesValidationMessage: string;
    proteinsValid: boolean | null;
    proteinsValidationMessage: string;
    carbsValid: boolean | null;
    carbsValidationMessage: string;
    fatValid: boolean | null;
    fatValidationMessage: string;
  };
}

export interface nutritionTypes {
  caloriesValue: number;
  proteinsValue: number;
  carbsValue: number;
  fatValue: number;
}

export interface mealQueryHygraphType {
  id: string;
  mealType: string;
  mealName: string;
  ingredients: Array<ingredient>;
  veganAlternative: string;
  cookingInstructions: string;
}
