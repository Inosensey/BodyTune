"use server";

import { exercisePlan, exerciseQueryHygraphType, mealPlan, mealQueryHygraphType } from "@/types/planTypes";

import { days } from "@/utils/date";

const NEXT_HYGRAPH_ENDPOINT = process.env.NEXT_HYGRAPH_ENDPOINT;

export const getMeals = async () => {
  try {
    const response = await fetch(NEXT_HYGRAPH_ENDPOINT!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query Meals {
                    meals(first: 100) {
                        mealType,
                        mealName,
                        ingredients,
                        veganAlternative,
                        cookingInstructions
                    }
                }`,
      }),
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log("There is an error getting your meals", error);
    return error;
  }
};

export const getWorkouts = async () => {
  try {
    const response = await fetch(NEXT_HYGRAPH_ENDPOINT!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query Exercises {
                        exercises(
                        first: 100
                    ) {
                        day,
                        exerciseName,
                        bodyPart,
                        equipment
                        youtubeLink
                        measurement
                        instruction
                        exerciseDemo {
                            url
                            width
                            height
                            fileName
                        }
                        exerciseMeasurementType {
                            measurementName
                        }
                        bmiClassification {
                            classification
                        }
                    }
                }`,
      }),
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log("There is an error getting your Exercises", error);
    return error;
  }
};

const getMealsByBmi = async (bmiClassification: string) => {
  if (bmiClassification === "" || bmiClassification === undefined) {
    console.log("Please provide a valid bmi classification");
    return "Please provide a valid bmi classification";
  }
  try {
    const response = await fetch(NEXT_HYGRAPH_ENDPOINT!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query Meals {
                    meals(first: 100, where: {bmiClassification:{id: "${bmiClassification}"}}) {
                        mealType,
                        mealName,
                        ingredients,
                        veganAlternative,
                        cookingInstructions
                    }
                }`,
      }),
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log("There is an error getting your meals", error);
    return error;
  }
};

const getExerciseByBmi = async (bmiClassification: string) => {
  if (bmiClassification === "" || bmiClassification === undefined) {
    console.log("Please provide a valid bmi classification");
    return "Please provide a valid bmi classification";
  }
  try {
    const response = await fetch(NEXT_HYGRAPH_ENDPOINT!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query Exercises {
                        exercises(
                        first: 100, 
                        where: { bmiClassification: { id: "${bmiClassification}" } }
                    ) {
                        day,
                        exerciseName,
                        bodyPart,
                        equipment
                        youtubeLink
                        measurement
                        instruction
                        exerciseDemo {
                            url
                            width
                            height
                            fileName
                        }
                        exerciseMeasurementType {
                            measurementName
                        }
                        bmiClassification {
                            classification
                        }
                    }
                }`,
      }),
    });
    const json = await response.json();
    return json;  
  } catch (error) {
    console.log("There is an error getting your Exercises", error);
    return error;
  }
};

export const generateBodyTunePlan = async (bmiClassification: string) => {
  const mealList = await getMealsByBmi(bmiClassification);
  const exerciseList = await getExerciseByBmi(bmiClassification);
  const mealPlan: mealPlan = setMealPlan(mealList.data.meals)
  const exercisePlan: exercisePlan = setExercisePlan(exerciseList.data.exercises)
  console.log(exercisePlan)
  return { mealPlan, exercisePlan };
};

const setMealPlan = (meals:Array<mealQueryHygraphType>) => {
  const shuffledMeals = [...meals].sort(() => Math.random() - 0.5);
  const mealPlan: mealPlan = {};
  let mealIndex = 0;

  days.forEach(day => {
      if (mealIndex + 3 > shuffledMeals.length) return;

      mealPlan[day] = {
          Breakfast: shuffledMeals[mealIndex++],
          Lunch: shuffledMeals[mealIndex++],
          Dinner: shuffledMeals[mealIndex++]
      };
  });

  return mealPlan;
}

const setExercisePlan = (exercises: Array<exerciseQueryHygraphType>) => {
  const exercisePlan: exercisePlan = {};

  days.forEach(day => {
    const filteredExercises = exercises
      .filter(exercise => exercise.day === day)
      .map(exercise => ({
        exerciseName: exercise.exerciseName,
        bodyPart: exercise.bodyPart,
        equipment: exercise.equipment,
        exerciseDifficulty: 1,
        exerciseMeasurementType: 1,
        measurement: exercise.measurement,
        exerciseDemo: exercise.exerciseDemo?.url,
        bmiClassification: 1,
        instruction: exercise.instruction,
        youtubeLink: exercise?.youtubeLink
      }));

    exercisePlan[day] = filteredExercises.length > 0 ? filteredExercises : "Rest Day";
  });

  return exercisePlan;
};