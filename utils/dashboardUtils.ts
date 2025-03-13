import {underweightMealPlanNames, healthyWeightMealPlanNames, overweightMealPlanNames, beginnerExercisePlanNames, amateurExercisePlanNames, expertExercisePlanNames} from "@/utils/initials";

export const getBmi = (weight: number, height: number): {
    id: string,
    bmiClassification: string,
} => {
    const bmi = weight / (height * height);
    if (bmi < 18.5) {
        return {
            id: "cm7brtlun8hw907mnqb6mlng9",
            bmiClassification: "Underweight",
        };
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        return {
            id: "cm7bs0dpa8i1908l6rpo4n3vv",
            bmiClassification: "Healthy weight",
        };
    } else {
        return {
            id: "cm7bsfudm8tf307jtngum4z6p",
            bmiClassification: "Overweight",    
        };
    }
}

export const generateMealPlanName = (bmiClassifications:string):string => {
    let planName:string = "";
    let randomIndex: number;
    switch (bmiClassifications) {
        case "Underweight":
            randomIndex = Math.floor(Math.random() * underweightMealPlanNames.length)
            planName = underweightMealPlanNames[randomIndex];
            break;
        case "Healthy weight":
            randomIndex = Math.floor(Math.random() * underweightMealPlanNames.length)
            planName = healthyWeightMealPlanNames[randomIndex];
            break;
        case "Overweight":
            randomIndex = Math.floor(Math.random() * underweightMealPlanNames.length)
            planName = overweightMealPlanNames[randomIndex];
            break;
        default:
            randomIndex = Math.floor(Math.random() * underweightMealPlanNames.length)
            planName = healthyWeightMealPlanNames[randomIndex];
            break;
    }
    return planName;
}

export const generateExercisePlanName = (difficulty:string):string => {
    let planName:string = "";
    let randomIndex: number;
    switch (difficulty) {
        case "beginner":
            randomIndex = Math.floor(Math.random() * underweightMealPlanNames.length)
            planName = beginnerExercisePlanNames[randomIndex];
            break;
        case "Amateur":
            randomIndex = Math.floor(Math.random() * underweightMealPlanNames.length)
            planName = amateurExercisePlanNames[randomIndex];
            break;
        case "Expert":
            randomIndex = Math.floor(Math.random() * underweightMealPlanNames.length)
            planName = expertExercisePlanNames[randomIndex];
            break;
        default:
            randomIndex = Math.floor(Math.random() * underweightMealPlanNames.length)
            planName = amateurExercisePlanNames[randomIndex];
            break;
    }
    return planName;
}

export const getMealTagIds = (mealTags: Array<string>):Array<number> => {
  const mealTagIds: Array<number> = [];
  
  mealTags.forEach((tag:string) => {
    switch(tag) {
      case "Underweight":
        mealTagIds.push(1)
      break;

      case "Healthy weight":
        mealTagIds.push(2)
      break;

      case "Overweight":
        mealTagIds.push(3)
      break;

      default:
        mealTagIds.push(2)
      break;
    }
  })

  return mealTagIds;
}

export const getMealType = (type:string):number => {
  let mealType: number = 0;

  switch(type) {
    case "breakFast":
      mealType = 1;
    break;

    case "lunch":
      mealType = 2;

    break;
    
    case "dinner":
      mealType = 3;

    break;

    default:
      mealType = 1;
    break;
  }

  return mealType
} 

export const getExerciseTagIds = (exerciseTags: Array<string>): Array<number> => {
  const exerciseTagIds: Array<number> = [];

  exerciseTags.map((tag) => {
    switch (tag) {
      case "beginner":
        exerciseTagIds.push(1)
        break;
    
      case "Amateur":
        exerciseTagIds.push(2)
        break;
    
      case "Expert":
        exerciseTagIds.push(3)
        break;
    
      default:
        exerciseTagIds.push(1)
        break;
    }
  })

  return exerciseTagIds;
}