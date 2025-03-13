import { TableInsert } from "@/types/database.types";
import { mealPlanType } from "./mealTypes";

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
  mealPlan: mealPlanType;
  exercisePlan: exercisePlan;
}
