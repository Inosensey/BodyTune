import {TableInsert} from "@/types/database.types"

type Nutrients = {
    calories: number,
    carbs: number,
    fat: number,
    protein: number
}

interface ingredient {
    ingredientName: string,
    nutrients: Nutrients
}

export interface Meal {
    mealName: string,
    mealType: string,
    ingredients: ingredient[],
    veganAlternative: string,
    cookingInstructions: string
}

export interface mealPlan {
    [key: string]: {
        Breakfast: Meal;
        Lunch: Meal;
        Dinner: Meal;
    };
}

export interface mealQueryHygraphType {
    mealType: string,
    mealName: string,
    ingredients: Array<ingredient>,
    veganAlternative: string,
    cookingInstructions: string
}

export interface exerciseQueryHygraphType {
    day: string,
    exerciseName: string,
    bodyPart: string,
    equipment: string
    youtubeLink: string
    measurement: string
    instruction: string,
    exerciseDemo: {
        url: string
        width: number
        height: number
        fileName: string
    }
    exerciseMeasurementType: {
        measurementName: string
    }
    bmiClassification: {
        classification: string
    }
}

export interface exercisePlan {
    [key: string]: Array<TableInsert<"exercise">> | "Rest Day",
    // monday: TableInsert<"exercise"> | null,
    // tuesday: TableInsert<"exercise"> | null,
    // wednesday: TableInsert<"exercise"> | null,
    // thursday: TableInsert<"exercise"> | null,
    // friday: TableInsert<"exercise"> | null,
    // saturday: TableInsert<"exercise"> | null,
    // sunday: TableInsert<"exercise"> | null,
}