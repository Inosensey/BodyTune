"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

// Icons
import MdiFoodDrumstickOutline from "@/icons/MdiFoodDrumstickOutline";

// types
import { mealPlanGeneralInfo, mealPlanType } from "@/types/mealTypes";
interface props {
  mealPlanGeneralInfo: mealPlanGeneralInfo;
  mealPlan?: mealPlanType;
}

// Initials
import { weekDates } from "@/utils/initials";

// Fixed values
const mealPlanTabs: Array<string> = ["Breakfast", "Lunch", "Dinner"];

// Variants
const fadeVariants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};

const MealPlanDetails = ({
  mealPlan,
  mealPlanGeneralInfo,
}: props) => {
  // States
  const [selectedMealTab, setSelectedMealTab] = useState<string>("breakFast");
  const [selectedMealPlanDate, setSelectedMealPlanDate] =
    useState<string>("Monday");

  return (
    <div className="w-full flex flex-col justify-center phone:h-full laptop:h-[98%] tablet:items-center">
      <div className="mt-5 mb-2 px-2 phone:w-full tablet:w-[98%]">
        <Link href={"/dashboard/meals"}>
          <div className="w-max flex flex-col py-1 px-[0.6rem] cursor-pointer border-2 border-lightSecondary rounded-lg">
            <div className="flex gap-1 text-base">
              <p className="font-dmSans font-semibold text-lightSecondary">
                Meal Plans
              </p>
              <MdiFoodDrumstickOutline
                color="#D3F0D1"
                width="1.3em"
                height="1.3em"
              />
            </div>
          </div>
        </Link>
      </div>
      <div className="rounded-lg h-[100%] overflow-auto phone:w-full phone:px-2 phone:py-4 tablet:p-2 tablet:w-[98%]">
        <div className="flex gap-1 h-[100%] flex-col">
          <div className="flex flex-col gap-2 p-4 rounded-md font-quickSand font-bold phone:w-12/12 laptop:w-max bg-lightPrimary">
            <p className="font-dmSans">
              Recommended BMI Categories:{" "}
              <span className="font-normal text-lightSecondary">
                {mealPlanGeneralInfo.tags.length === 1
                  ? `${mealPlanGeneralInfo.tags[0].meal_tags.mealTagName}`
                  : `From ${mealPlanGeneralInfo.tags[0].meal_tags.mealTagName} to ${
                      mealPlanGeneralInfo.tags[mealPlanGeneralInfo.tags.length - 1].meal_tags
                        .mealTagName
                    }`}
              </span>
            </p>
          </div>
          <div className="w-full flex gap-2 phone:flex-col laptop:flex-1 laptop:h-[80%] laptop:flex-row">
            <div className="p-4 flex flex-col  gap-1 laptop:h-[100%] laptop:w-[50%] desktop:w-[100%]  bg-lightPrimary">
              <div className="flex flex-col gap-1 laptop:h-[25%] laptop:overflow-auto">
                <p className="font-quickSand font-bold">
                  Meal Plan Name:
                  <span className="font-normal text-lightSecondary">
                    {" "}
                    {mealPlanGeneralInfo.planName}
                  </span>
                </p>
                {mealPlanGeneralInfo.shortDescription && (
                  <div className="font-dmSans">
                    <label className="font-bold">Short Description:</label>
                    <p className="font-normal text-lightSecondary text-sm text-justify">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Porro numquam corporis nisi facere, nihil sint accusantium
                      ullam quod explicabo quis temporibus sequi ratione modi
                      dolorum? Porro numquam corporis nisi facere, nihil sint
                      accusantium ullam quod explicabo quis temporibus sequi
                      ratione modi dolorum?
                    </p>
                  </div>
                )}
              </div>
              <div className="w-full flex flex-col gap-1 h-[72%]">
                <div className="flex flex-col gap-1">
                  <label className="font-dmSans font-bold">Select Date:</label>
                  <div className="flex flex-wrap h-max gap-1">
                    {weekDates.map((date: string, index: number) => (
                      <div
                        className="group border-[1.5px] border-secondary px-4 py-1 cursor-pointer"
                        key={index}
                        onClick={() => setSelectedMealPlanDate(date)}
                      >
                        <p
                          className={`text-sm font-semibold font-quickSand transition duration-200 ${
                            selectedMealPlanDate === date
                              ? "text-[#ffffff]"
                              : "text-[#b3b3b3] group-hover:text-[#ffffff]"
                          }`}
                        >
                          {date}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-dmSans font-bold">
                      Select Meal:
                    </label>
                    <div className="flex flex-wrap h-max gap-1">
                      {mealPlanTabs.map((meal: string, index: number) => (
                        <div
                          className="group border-[1.5px] border-secondary px-4 py-1 cursor-pointer"
                          key={index}
                          onClick={() => {
                            let mealType = "";
                            if (meal === "Breakfast") {
                              mealType = "breakFast";
                            } else if (meal === "Lunch") {
                              mealType = "lunch";
                            } else if (meal === "Dinner") {
                              mealType = "dinner";
                            }
                            setSelectedMealTab(mealType);
                          }}
                        >
                          <p
                            className={`text-sm font-semibold font-quickSand transition duration-200 ${
                              selectedMealTab.toLowerCase() ===
                              meal.toLowerCase()
                                ? "text-[#ffffff]"
                                : "text-[#b3b3b3] group-hover:text-[#ffffff]"
                            }`}
                          >
                            {meal}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {mealPlan &&
                  mealPlan[selectedMealPlanDate] &&
                  mealPlan[selectedMealPlanDate][selectedMealTab] && (
                    <motion.div
                      variants={fadeVariants}
                      initial="hidden"
                      animate="show"
                      className="py-1 flex flex-col gap-[0.1rem] w-[100%] laptop:h-[100%] laptop:overflow-auto"
                    >
                      <div className="flex flex-col justify-between w-[100%]">
                        <p className="font-dmSans font-bold text-lightSecondary text-lg m-0 p-0 underline">
                          {selectedMealTab.charAt(0).toUpperCase() +
                            selectedMealTab.slice(1)}{" "}
                          Meal
                        </p>
                        <p className="font-dmSans font-bold text-[#a3e09f] text-base m-0 p-0">
                          {
                            mealPlan[selectedMealPlanDate][selectedMealTab]
                              .mealInfo?.mealName
                          }
                        </p>
                      </div>
                      <div>
                        <label className="text-[#a3e09f] font-dmSans text-base font-semibold underline">
                          Ingredients:
                        </label>
                        <div className="flex gap-1">
                          <p className="font-dmSans text-white text-sm">
                            {Object.entries(
                              mealPlan[selectedMealPlanDate][selectedMealTab]
                                .ingredients!
                            )
                              .map(([, value]) => value.ingredientValue)
                              .join(", ")}
                          </p>
                        </div>
                      </div>
                      {mealPlan[selectedMealPlanDate][selectedMealTab].mealInfo
                        ?.veganAlternative !== null && (
                        <div className="flex flex-col gap-1">
                          <label className="text-[#a3e09f] font-dmSans text-base font-semibold underline">
                            Vegan Alternative:
                          </label>
                          <div className="flex gap-1">
                            <p className="font-dmSans text-white text-sm">
                              {
                                mealPlan[selectedMealPlanDate][selectedMealTab]
                                  .mealInfo!.veganAlternative
                              }
                            </p>
                          </div>
                        </div>
                      )}
                      <div>
                        <label className="text-[#a3e09f] font-dmSans text-base font-semibold underline">
                          Nutrition:
                        </label>
                        <div className="flex flex-wrap gap-2 items-center">
                          <div className="flex items-center gap-1">
                            <p className="font-dmSans text-white text-sm">
                              Calories:
                            </p>
                            <p className="font-quickSand text-sm">
                              {mealPlan[selectedMealPlanDate][
                                selectedMealTab
                              ].nutrition?.calories.toFixed(2)}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <p className="font-dmSans text-white text-sm">
                              Protein:
                            </p>
                            <p className="font-quickSand text-sm">
                              {mealPlan[selectedMealPlanDate][
                                selectedMealTab
                              ].nutrition?.protein.toFixed(2)}
                              g
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <p className="font-dmSans text-white text-sm">
                              Carbs:
                            </p>
                            <p className="font-quickSand text-sm">
                              {mealPlan[selectedMealPlanDate][
                                selectedMealTab
                              ].nutrition?.carbs.toFixed(2)}
                              g
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <p className="font-dmSans text-white text-sm">
                              Fat:
                            </p>
                            <p className="font-quickSand text-sm">
                              {mealPlan[selectedMealPlanDate][
                                selectedMealTab
                              ].nutrition?.fat.toFixed(2)}
                              g
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="phone:max-h-[250px]">
                        <label className="text-[#a3e09f] font-dmSans text-base font-semibold underline">
                          Cooking Instructions:
                        </label>
                        <p className="font-dmSans text-white text-sm phone:h-[90%] phone:overflow-auto">
                          {
                            mealPlan[selectedMealPlanDate][selectedMealTab]
                              .mealInfo?.cookingInstruction
                          }
                        </p>
                      </div>
                    </motion.div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealPlanDetails;
