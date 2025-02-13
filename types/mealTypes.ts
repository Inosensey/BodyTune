export interface MealInfoTypes {
  mealName: string;
  shortDescription: string;
  cookingInstruction: string;
}

export interface IngredientTypes {
  [key: string]: {
    id: string;
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
}

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
