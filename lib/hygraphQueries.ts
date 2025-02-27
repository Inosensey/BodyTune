"use server";

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
                    meals(first: 25) {
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
                        first: 25
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
                    meals(first: 25, where: {bmiClassification:{id: "${bmiClassification}"}}) {
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
                        first: 25, 
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
  console.log(mealList);
  console.log(exerciseList);
  return { mealList, exerciseList };
};
