import { TableInsert } from "@/types/database.types";
import { mealPlanType } from "./mealTypes";



export interface exerciseQueryHygraphType {
  day: string;
  exerciseName: string;
  bodyPart: string;
  equipment: string;
  youtubeLink: string;
  measurement: string;
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
  [key: string]: Array<TableInsert<"exercise">> | "Rest Day";
  // monday: TableInsert<"exercise"> | null,
  // tuesday: TableInsert<"exercise"> | null,
  // wednesday: TableInsert<"exercise"> | null,
  // thursday: TableInsert<"exercise"> | null,
  // friday: TableInsert<"exercise"> | null,
  // saturday: TableInsert<"exercise"> | null,
  // sunday: TableInsert<"exercise"> | null,
}

export interface bodyTunePlan {
  mealPlan: mealPlanType;
  exercisePlan: exercisePlan;
}
