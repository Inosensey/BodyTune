export interface ExercisePlanInfoTypes {
  exercisePlanName: string;
  shortDescription?: string;
}

export type exercisePlanName = {
  selectedExercisePlan: number | string;
  exercisePlanName: string;
};

export interface exercisePlanGeneralInfo {
  id: number,
  planName: string;
  shortDescription?: string;
  tags: Array<exercisePlanTag>;
}

export interface exercisePlanTag {
  exercise_tags: {
    id: number;
    exerciseTagName: string;
  };
}
