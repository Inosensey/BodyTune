"use client";

import Image from "next/image";

// Types
import {
  IngredientTypes,
  MealInfoTypes,
  nutritionTypes,
} from "@/types/mealTypes";
interface props {
  meal: {
    mealInfo: MealInfoTypes | undefined;
    ingredients: IngredientTypes | undefined;
    nutrition: nutritionTypes | undefined;
  };
  setToggleAddMealForm: React.Dispatch<React.SetStateAction<boolean>>;
  setFormAction: React.Dispatch<React.SetStateAction<string>>;
  setSelectedMeal: React.Dispatch<React.SetStateAction<string>>;
  mealType: string,
}

const MealPlanCard = ({
  meal,
  setFormAction,
  setSelectedMeal,
  setToggleAddMealForm,
  mealType
}: props) => {
  return (
    <div className="overflow-auto border-[1.5px] border-lightSecondary phone:w-[100%] phone:h-[380px] mdtablet:w-[33%]">
      {meal.mealInfo ? (
        <div className="py-1 px-2 flex flex-col gap-[0.1rem]">
          <div className="flex justify-between w-[100%]">
            <p className="font-dmSans font-bold text-lightSecondary text-lg m-0 p-0">
              {meal.mealInfo.mealName}
            </p>
            <button
              onClick={() => {
                setToggleAddMealForm(true);
                setFormAction("Edit");
                setSelectedMeal(mealType);
              }}
              className="bg-[#5d897b] text-white font-quickSand font-semibold text-sm rounded-md py-[0.2rem] px-4 w-max transition duration-200 hover:bg-secondary"
            >
              Edit
            </button>
          </div>
          <div>
            <label className="text-[#a3e09f] font-dmSans text-base font-semibold underline">
              Ingredients:
            </label>
            <div className="flex gap-1">
              <p className="font-dmSans text-white text-sm">
                {Object.entries(meal.ingredients!)
                  .map(([, value]) => value.ingredientValue)
                  .join(", ")}
              </p>
            </div>
          </div>
          <div>
            <label className="text-[#a3e09f] font-dmSans text-base font-semibold underline">
              Nutrition:
            </label>
            <div className="flex flex-wrap gap-2 items-center">
              <div className="flex items-center gap-1">
                <p className="font-dmSans text-white text-sm">Calories:</p>
                <p className="font-quickSand text-sm">
                  {meal.nutrition?.caloriesValue}g
                </p>
              </div>
              <div className="flex items-center gap-1">
                <p className="font-dmSans text-white text-sm">Protein:</p>
                <p className="font-quickSand text-sm">
                  {meal.nutrition?.proteinsValue}g
                </p>
              </div>
              <div className="flex items-center gap-1">
                <p className="font-dmSans text-white text-sm">Carbs:</p>
                <p className="font-quickSand text-sm">
                  {meal.nutrition?.carbsValue}g
                </p>
              </div>
              <div className="flex items-center gap-1">
                <p className="font-dmSans text-white text-sm">Fat:</p>
                <p className="font-quickSand text-sm">
                  {meal.nutrition?.fatValue}g
                </p>
              </div>
            </div>
          </div>
          <div>
            <label className="text-[#a3e09f] font-dmSans text-base font-semibold underline">
              Cooking Instructions:
            </label>
            <p className="font-dmSans text-white text-sm">
              {meal.mealInfo.cookingInstruction}
            </p>
          </div>
        </div>
      ) : (
        <div className="w-[100%] h-[100%] flex flex-col justify-center items-center">
          <Image
            src="/assets/svg/healthy-1.svg"
            width={200}
            height={200}
            alt="Logo"
          />
          <p
            onClick={() => {
              setToggleAddMealForm(true);
              setFormAction("Add");
              setSelectedMeal(mealType);
            }}
            className="font-dmSans font-semibold text-lightSecondary underline cursor-pointer"
          >
            Make a {mealType} Meal
          </p>
        </div>
      )}
    </div>
  );
};

export default MealPlanCard;
