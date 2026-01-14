import { useState } from "react";
import { motion } from "framer-motion";

// Components
import Overlay from "@/components/reusableComponent/Overlay";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons/faXmarkCircle";

// types
import { mealPlanType } from "@/types/mealTypes";
interface props {
  setToggleBodyTuneMealDetails: React.Dispatch<React.SetStateAction<boolean>>;
  mealPlan: {
    planName: string;
    bmi_classification: string[];
    meals: mealPlanType;
  };
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

const BodyTuneMealDetails = ({
  setToggleBodyTuneMealDetails,
  mealPlan,
}: props) => {
  // States
  const [selectedMealTab, setSelectedMealTab] = useState<string>("breakFast");
  const [selectedMealPlanDate, setSelectedMealPlanDate] =
    useState<string>("Monday");

  return (
    <Overlay>
      <div className="w-full phone:h-full laptop:h-[95%] flex flex-col justify-center tablet:items-center">
        <div className="flex justify-center gap-4 laptop:w-[100%] laptop:h-[5%]">
          <p className="text-[#a3e09f] font-dmSans text-lg font-semibold">
            BodyTune Meal Details
          </p>
          <div
            onClick={() => setToggleBodyTuneMealDetails(false)}
            className="cursor-pointer group"
          >
            <FontAwesomeIcon
              icon={faXmarkCircle}
              className="text-[#D3F0D1] text-2xl transition duration-200 group-hover:text-[#a3e09f]"
            />
          </div>
        </div>
        <div className="bg-lightPrimary rounded-lg h-[100%] overflow-auto phone:w-full phone:px-2 phone:py-4 tablet:p-4 tablet:w-[95%]">
          <div className="flex flex-col gap-2 laptop:h-[95%]">
            <div className="flex flex-col gap-2 bg-primary w-[100%] p-4 rounded-md font-quickSand font-bold h-[20%]  overflow-auto">
              <p className="font-dmSans">
                Meal Plan Name:
                <span className="font-normal text-lightSecondary">
                  {" "}
                  {mealPlan.planName}
                </span>
              </p>
              <p className="font-dmSans">
                Recommended BMI Categories:{" "}
                <span className="font-normal text-lightSecondary">
                  {mealPlan.bmi_classification.length !== 1
                    ? `Suitable from ${mealPlan.bmi_classification[0]} to ${
                        mealPlan.bmi_classification[
                          mealPlan.bmi_classification.length - 1
                        ]
                      }`
                    : `Suitable for ${mealPlan.bmi_classification[0]}`}
                </span>
              </p>
              <div className="font-dmSans">
                <label className="font-bold">Short Description:</label>
                <p className="font-normal text-lightSecondary text-sm text-justify">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Porro numquam corporis nisi facere, nihil sint accusantium
                  ullam quod explicabo quis temporibus sequi ratione modi
                  dolorum? Porro numquam corporis nisi facere, nihil sint
                  accusantium ullam quod explicabo quis temporibus sequi ratione
                  modi dolorum?
                </p>
              </div>
            </div>
            <div className="w-full h-[80%] flex gap-2 ">
              <div className="p-4 flex flex-col bg-primary gap-1 laptop:h-[100%] laptop:w-[50%] desktop:w-[100%]">
                <div className="w-full flex flex-col gap-1 h-[72%]">
                  <div className="flex flex-col gap-1">
                    <label className="font-dmSans font-bold">
                      Select Date:
                    </label>
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
                    mealPlan.meals[selectedMealPlanDate] &&
                    mealPlan.meals[selectedMealPlanDate][selectedMealTab] && (
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
                              mealPlan.meals[selectedMealPlanDate][selectedMealTab]
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
                                mealPlan.meals[selectedMealPlanDate][selectedMealTab]
                                  .ingredients!
                              )
                                .map(([, value]) => value.ingredientValue)
                                .join(", ")}
                            </p>
                          </div>
                        </div>
                        {mealPlan.meals[selectedMealPlanDate][selectedMealTab]
                          .mealInfo?.veganAlternative !== null && (
                          <div className="flex flex-col gap-1">
                            <label className="text-[#a3e09f] font-dmSans text-base font-semibold underline">
                              Vegan Alternative:
                            </label>
                            <div className="flex gap-1">
                              <p className="font-dmSans text-white text-sm">
                                {
                                  mealPlan.meals[selectedMealPlanDate][
                                    selectedMealTab
                                  ].mealInfo!.veganAlternative
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
                                {mealPlan.meals[selectedMealPlanDate][
                                  selectedMealTab
                                ].nutrition?.calories.toFixed(2)}
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              <p className="font-dmSans text-white text-sm">
                                Protein:
                              </p>
                              <p className="font-quickSand text-sm">
                                {mealPlan.meals[selectedMealPlanDate][
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
                                {mealPlan.meals[selectedMealPlanDate][
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
                                {mealPlan.meals[selectedMealPlanDate][
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
                              mealPlan.meals[selectedMealPlanDate][selectedMealTab]
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
    </Overlay>
  );
};

export default BodyTuneMealDetails;
