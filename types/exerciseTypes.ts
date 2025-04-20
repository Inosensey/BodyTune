export interface ExercisePlanInfoTypes {
  exercisePlanName: string;
  shortDescription?: string;
}

export type exercisePlanName = {
  selectedExercisePlanUserId: string,
  selectedExercisePlan: number | string;
  exercisePlanName: string;
};

export interface exercisePlanGeneralInfo {
  id: number,
  planName: string;
  shortDescription?: string;
  tags: Array<exercisePlanTag>;
  createdBy: string;
}

export interface exercisePlanTag {
  exercise_tags: {
    id: number;
    exerciseTagName: string;
  };
}
