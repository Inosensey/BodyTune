import { useState } from "react";
import { motion } from "framer-motion";

// Components
import Overlay from "@/components/reusableComponent/Overlay";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons/faXmarkCircle";

// types
interface props {
  setToggleBodyTuneMealDetails: React.Dispatch<React.SetStateAction<boolean>>;
}

// Initials
import { weekDates } from "@/utils/initials";

// Fixed values
const ingredientsDummyData: Array<string> = [
  "Chicken",
  "Salt",
  "Pepper",
  "Butter",
  "Paprika",
];
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

const BodyTuneMealDetails = ({ setToggleBodyTuneMealDetails }: props) => {
  // States
  const [selectedMealTab, setSelectedMealTab] = useState<string>("Breakfast");
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
                  A Beginner-Friendly meal plan
                </span>
              </p>
              <p className="font-dmSans">
                Recommended BMI Categories:{" "}
                <span className="font-normal text-lightSecondary">
                  From Underweight to Obesity
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
              <div className="p-4 w-[100%] flex flex-col h-[100%] bg-primary gap-1">
                <div className="w-full flex flex-col gap-1 h-[100%]">
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
                          onClick={() => setSelectedMealTab(meal)}
                        >
                          <p
                            className={`text-sm font-semibold font-quickSand transition duration-200 ${
                              selectedMealTab === meal
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
                  {selectedMealTab === "Breakfast" && (
                    <motion.div
                      variants={fadeVariants}
                      initial="hidden"
                      animate="show"
                      className="py-1 flex flex-col gap-[0.1rem] h-[100%] w-[100%] overflow-auto"
                    >
                      <div className="flex flex-col justify-between w-[100%]">
                        <p className="font-dmSans font-bold text-lightSecondary text-lg m-0 p-0 underline">
                          Breakfast Meal
                        </p>
                        <p className="font-dmSans font-bold text-[#a3e09f] text-base m-0 p-0">
                          Delicious Chicken
                        </p>
                      </div>
                      <div>
                        <label className="text-[#a3e09f] font-dmSans text-base font-semibold underline">
                          Ingredients:
                        </label>
                        <div className="flex gap-1">
                          <p className="font-dmSans text-white text-sm">
                            {ingredientsDummyData.join(", ")}
                          </p>
                        </div>
                      </div>
                      <div>
                        <label className="text-[#a3e09f] font-dmSans text-base font-semibold underline">
                          Nutrition:
                        </label>
                        <div className="flex flex-wrap gap-2 items-center">
                          <div className="flex items-center gap-1">
                            <p className="font-dmSans text-white text-sm">
                              Calories:
                            </p>
                            <p className="font-quickSand text-sm">0</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <p className="font-dmSans text-white text-sm">
                              Protein:
                            </p>
                            <p className="font-quickSand text-sm">0g</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <p className="font-dmSans text-white text-sm">
                              Carbs:
                            </p>
                            <p className="font-quickSand text-sm">0g</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <p className="font-dmSans text-white text-sm">
                              Fat:
                            </p>
                            <p className="font-quickSand text-sm">0g</p>
                          </div>
                        </div>
                      </div>
                      <div className="phone:h-[250px]">
                        <label className="text-[#a3e09f] font-dmSans text-base font-semibold underline">
                          Cooking Instructions:
                        </label>
                        <p className="font-dmSans text-white text-sm phone:h-[90%] phone:overflow-auto">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Deserunt sapiente excepturi cupiditate! Maiores
                          eligendi quia voluptatum necessitatibus aut et quos
                          nostrum incidunt iusto sequi laudantium quidem non,
                          provident tenetur qui. Lorem ipsum dolor sit amet
                          consectetur adipisicing elit. Deserunt sapiente
                          excepturi cupiditate! Maiores eligendi quia voluptatum
                          necessitatibus aut et quos nostrum incidunt iusto
                          sequi laudantium quidem non, provident tenetur qui.
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Deserunt sapiente excepturi cupiditate! Maiores
                          eligendi quia voluptatum necessitatibus aut et quos
                          nostrum incidunt iusto sequi laudantium quidem non,
                          provident tenetur qui. Lorem ipsum dolor sit amet
                          consectetur adipisicing elit. Deserunt sapiente
                          excepturi cupiditate! Maiores eligendi quia voluptatum
                          necessitatibus aut et quos nostrum incidunt iusto
                          sequi laudantium quidem non, provident tenetur qui.
                        </p>
                      </div>
                    </motion.div>
                  )}
                  {selectedMealTab === "Lunch" && (
                    <motion.div
                      variants={fadeVariants}
                      initial="hidden"
                      animate="show"
                      className="py-1 flex flex-col gap-[0.1rem] h-[100%] w-[100%] overflow-auto"
                    >
                      <div className="flex flex-col justify-between w-[100%]">
                        <p className="font-dmSans font-bold text-lightSecondary text-lg m-0 p-0 underline">
                          Lunch Meal
                        </p>
                        <p className="font-dmSans font-bold text-[#a3e09f] text-base m-0 p-0">
                          Delicious Chicken
                        </p>
                      </div>
                      <div>
                        <label className="text-[#a3e09f] font-dmSans text-base font-semibold underline">
                          Ingredients:
                        </label>
                        <div className="flex gap-1">
                          <p className="font-dmSans text-white text-sm">
                            {ingredientsDummyData.join(", ")}
                          </p>
                        </div>
                      </div>
                      <div>
                        <label className="text-[#a3e09f] font-dmSans text-base font-semibold underline">
                          Nutrition:
                        </label>
                        <div className="flex flex-wrap gap-2 items-center">
                          <div className="flex items-center gap-1">
                            <p className="font-dmSans text-white text-sm">
                              Calories:
                            </p>
                            <p className="font-quickSand text-sm">0</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <p className="font-dmSans text-white text-sm">
                              Protein:
                            </p>
                            <p className="font-quickSand text-sm">0g</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <p className="font-dmSans text-white text-sm">
                              Carbs:
                            </p>
                            <p className="font-quickSand text-sm">0g</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <p className="font-dmSans text-white text-sm">
                              Fat:
                            </p>
                            <p className="font-quickSand text-sm">0g</p>
                          </div>
                        </div>
                      </div>
                      <div className="phone:h-[250px]">
                        <label className="text-[#a3e09f] font-dmSans text-base font-semibold underline">
                          Cooking Instructions:
                        </label>
                        <p className="font-dmSans text-white text-sm phone:h-[90%] phone:overflow-auto">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Deserunt sapiente excepturi cupiditate! Maiores
                          eligendi quia voluptatum necessitatibus aut et quos
                          nostrum incidunt iusto sequi laudantium quidem non,
                          provident tenetur qui. Lorem ipsum dolor sit amet
                          consectetur adipisicing elit. Deserunt sapiente
                          excepturi cupiditate! Maiores eligendi quia voluptatum
                          necessitatibus aut et quos nostrum incidunt iusto
                          sequi laudantium quidem non, provident tenetur qui.
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Deserunt sapiente excepturi cupiditate! Maiores
                          eligendi quia voluptatum necessitatibus aut et quos
                          nostrum incidunt iusto sequi laudantium quidem non,
                          provident tenetur qui. Lorem ipsum dolor sit amet
                          consectetur adipisicing elit. Deserunt sapiente
                          excepturi cupiditate! Maiores eligendi quia voluptatum
                          necessitatibus aut et quos nostrum incidunt iusto
                          sequi laudantium quidem non, provident tenetur qui.
                        </p>
                      </div>
                    </motion.div>
                  )}
                  {selectedMealTab === "Dinner" && (
                    <motion.div
                      variants={fadeVariants}
                      initial="hidden"
                      animate="show"
                      className="py-1 flex flex-col gap-[0.1rem] h-[100%] w-[100%] overflow-auto" 
                    >
                      <div className="flex flex-col justify-between w-[100%]">
                        <p className="font-dmSans font-bold text-lightSecondary text-lg m-0 p-0 underline">
                          Dinner Meal
                        </p>
                        <p className="font-dmSans font-bold text-[#a3e09f] text-base m-0 p-0">
                          Delicious Chicken
                        </p>
                      </div>
                      <div>
                        <label className="text-[#a3e09f] font-dmSans text-base font-semibold underline">
                          Ingredients:
                        </label>
                        <div className="flex gap-1">
                          <p className="font-dmSans text-white text-sm">
                            {ingredientsDummyData.join(", ")}
                          </p>
                        </div>
                      </div>
                      <div>
                        <label className="text-[#a3e09f] font-dmSans text-base font-semibold underline">
                          Nutrition:
                        </label>
                        <div className="flex flex-wrap gap-2 items-center">
                          <div className="flex items-center gap-1">
                            <p className="font-dmSans text-white text-sm">
                              Calories:
                            </p>
                            <p className="font-quickSand text-sm">0</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <p className="font-dmSans text-white text-sm">
                              Protein:
                            </p>
                            <p className="font-quickSand text-sm">0g</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <p className="font-dmSans text-white text-sm">
                              Carbs:
                            </p>
                            <p className="font-quickSand text-sm">0g</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <p className="font-dmSans text-white text-sm">
                              Fat:
                            </p>
                            <p className="font-quickSand text-sm">0g</p>
                          </div>
                        </div>
                      </div>
                      <div className="phone:h-[250px]">
                        <label className="text-[#a3e09f] font-dmSans text-base font-semibold underline">
                          Cooking Instructions:
                        </label>
                        <p className="font-dmSans text-white text-sm phone:h-[90%] phone:overflow-auto">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Deserunt sapiente excepturi cupiditate! Maiores
                          eligendi quia voluptatum necessitatibus aut et quos
                          nostrum incidunt iusto sequi laudantium quidem non,
                          provident tenetur qui. Lorem ipsum dolor sit amet
                          consectetur adipisicing elit. Deserunt sapiente
                          excepturi cupiditate! Maiores eligendi quia voluptatum
                          necessitatibus aut et quos nostrum incidunt iusto
                          sequi laudantium quidem non, provident tenetur qui.
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Deserunt sapiente excepturi cupiditate! Maiores
                          eligendi quia voluptatum necessitatibus aut et quos
                          nostrum incidunt iusto sequi laudantium quidem non,
                          provident tenetur qui. Lorem ipsum dolor sit amet
                          consectetur adipisicing elit. Deserunt sapiente
                          excepturi cupiditate! Maiores eligendi quia voluptatum
                          necessitatibus aut et quos nostrum incidunt iusto
                          sequi laudantium quidem non, provident tenetur qui.
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
