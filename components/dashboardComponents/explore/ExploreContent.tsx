"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Components
import BodyTuneCard from "../bodytuneStudio/BodyTuneCard";
import BodyTuneWorkoutCard from "../bodytuneWorkouts/BodyTuneWorkoutCard";
import BodyTuneMealCard from "../bodytuneMeals/BodyTuneMealsCard";
import BodyTuneWorkoutDetails from "../bodytuneWorkouts/BodyTuneWorkoutDetails";
import BodyTuneDetails from "../bodytuneStudio/BodyTuneDetails";
import BodyTuneMealDetails from "../bodytuneMeals/BodyTuneMealDetails";

// Icons
import SolarRoundedMagniferLinear from "@/icons/SolarRoundedMagniferLinear";

// Fixed values
const sortByValues: Array<string> = ["Relevance", "Followers", "Hearts"];
const explorePlanValues: Array<string> = ["BodyTunes", "Workouts", "Meals"];
const difficultyValues: Array<string> = ["Beginner", "Amateur", "Export"];
const bmiClassificationValues: Array<string> = [
  "Underweight",
  "Healthy weight",
  "Overweight",
];
const pageResultPreferences: Array<number | string> = [
  10,
  20,
  30,
  40,
  50,
  "All",
];

// Variants
const containerAnimationVariant = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};
const childAnimationVariant = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};

const ExploreContent = () => {
  // States
  const [sortBy, setSortBy] = useState<string>("Relevance");
  const [searchText, setSearchText] = useState<string>("");
  const [resultsPerPage, setResultsPerPage] = useState<number | string>(10);
  const [selectedPlan, setSelectedPlan] = useState<string>("BodyTunes");
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<string>("Beginner");
  const [selectedBmiClassification, setSelectedBmiClassification] =
    useState<string>("Underweight");

  const [toggleBodyTuneWorkoutDetails, setToggleBodyTuneWorkoutDetails] =
    useState<boolean>(false);
  const [toggleBodyTuneDetails, setToggleBodyTuneDetails] =
    useState<boolean>(false);
  const [toggleBodyTuneMealDetails, setToggleBodyTuneMealDetails] =
    useState<boolean>(false);
  console.log(toggleBodyTuneWorkoutDetails);
  console.log(toggleBodyTuneDetails);
  console.log(toggleBodyTuneMealDetails);

  // Events
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchText(value);
  };
  const selectOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    if (name === "sortBy") {
      setSortBy(value);
    } else if (name === "resultsPerPage") {
      setResultsPerPage(value);
    } else if (name === "selectedPlan") {
      setSelectedPlan(value);
    } else if (name === "selectedDifficulty") {
      setSelectedDifficulty(value);
    } else if (name === "selectedBmiClassification") {
      setSelectedBmiClassification(value);
    }
  };
  return (
    <>
      <div className="flex-1 bg-black h-[80%] w-full p-4 rounded-lg">
        <div className="w-full h-full">
          <div className="flex flex-col w-full h-full justify-between">
            <div className="flex gap-1 items-center justify-center">
              <div className="rounded-md bg-lightPrimary flex flex-col items-center py-2 px-2 laptop:w-[90%] desktop:w-[70%] ">
                <div className={`flex flex-col w-full laptop:w-[70%] gap-1`}>
                  <label className="phone:text-sm laptop:text-lg font-quickSand font-semibold">
                    Search Plan Name
                  </label>
                  <div className="w-full flex items-center gap-1">
                    <div className="relative w-full bg-primary overflow-hidden p-1">
                      <input
                        type="text"
                        name="searchText"
                        className={`bg-transparent w-[92%] text-white px-2 py-2 phone:text-sm font-quickSand`}
                        value={searchText}
                        onChange={onChange}
                      />
                    </div>
                    <button className="bg-[#5d897b] text-white text-sm font-quickSand font-semibold px-4 py-2 rounded-md flex items-center justify-center gap-1 transition duration-200 hover:bg-secondary">
                      Search
                      <SolarRoundedMagniferLinear
                        color="#D3F0D1"
                        width="1.3em"
                        height="1.3em"
                      />
                    </button>
                  </div>
                </div>
                <div className="w-full flex items-center justify-center flex-wrap">
                  <div className={`px-2 py-1 flex  items-center gap-2`}>
                    <label className="phone:text-sm font-quickSand font-semibold">
                      Sort By:
                    </label>
                    <select
                      className={`bg-black flex-1 p-1 text-white h-[2.7rem] phone:text-sm font-quickSand`}
                      onChange={selectOnChange}
                      name="sortBy"
                      defaultValue={sortBy}
                    >
                      {sortByValues.map((sortBy: string) => (
                        <option
                          className="bg-primary font-quickSand"
                          key={sortBy}
                          value={sortBy}
                        >
                          {sortBy}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={`px-2 py-1 flex  items-center gap-2`}>
                    <label className="phone:text-sm font-quickSand font-semibold">
                      Plan Types:
                    </label>
                    <select
                      className={`bg-black flex-1 p-1 text-white h-[2.7rem] phone:text-sm font-quickSand`}
                      onChange={selectOnChange}
                      name="selectedPlan"
                      defaultValue={selectedPlan}
                    >
                      {explorePlanValues.map((explorePlan: string) => (
                        <option
                          className="bg-primary font-quickSand"
                          key={explorePlan}
                          value={explorePlan}
                        >
                          {explorePlan}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={`px-2 py-1 flex  items-center gap-2`}>
                    <label className="phone:text-sm font-quickSand font-semibold">
                      Difficulties:
                    </label>
                    <select
                      className={`bg-black flex-1 p-1 text-white h-[2.7rem] phone:text-sm font-quickSand`}
                      onChange={selectOnChange}
                      name="selectedDifficulty"
                      defaultValue={selectedDifficulty}
                    >
                      {difficultyValues.map((difficulty: string) => (
                        <option
                          className="bg-primary font-quickSand"
                          key={difficulty}
                          value={difficulty}
                        >
                          {difficulty}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={`px-2 py-1 flex  items-center gap-2`}>
                    <label className="phone:text-sm font-quickSand font-semibold">
                      BMI Classification:
                    </label>
                    <select
                      className={`bg-black flex-1 p-1 text-white h-[2.7rem] phone:text-sm font-quickSand`}
                      onChange={selectOnChange}
                      name="selectedBmiClassification"
                      defaultValue={selectedBmiClassification}
                    >
                      {bmiClassificationValues.map(
                        (bmiClassification: string) => (
                          <option
                            className="bg-primary font-quickSand"
                            key={bmiClassification}
                            value={bmiClassification}
                          >
                            {bmiClassification}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                  <div
                    className={`bg-lightPrimary px-2 py-1 flex w-[190px] items-center gap-2`}
                  >
                    <label className="phone:text-sm font-quickSand font-semibold">
                      Results Per Page:
                    </label>
                    <select
                      className={`bg-black flex-1 p-1 text-white h-[2.7rem] phone:text-sm font-quickSand`}
                      onChange={selectOnChange}
                      name="resultsPerPage"
                      defaultValue={resultsPerPage}
                    >
                      {pageResultPreferences.map(
                        (pageResult: string | number) => (
                          <option
                            className="bg-primary font-quickSand"
                            key={pageResult}
                            value={pageResult}
                          >
                            {pageResult}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[70%] w-full overflow-auto">
              <motion.div
                variants={containerAnimationVariant}
                initial="hidden"
                animate="show"
                className="w-full gap-2 flex flex-wrap mt-2"
              >
                <motion.div variants={childAnimationVariant}>
                  <BodyTuneCard
                    bodyTunePlanName="Beginner Friendly Plan"
                    exercisePlanName="Exercise Plan Name"
                    mealPlanName="Meal Plan Name"
                    likes="44521"
                    views="4451"
                    setToggleBodyTuneDetails={setToggleBodyTuneDetails}
                  />
                </motion.div>
                <motion.div variants={childAnimationVariant}>
                  <BodyTuneCard
                    bodyTunePlanName="Beginner Friendly Plan"
                    exercisePlanName="Exercise Plan Name"
                    mealPlanName="Meal Plan Name"
                    likes="44521"
                    views="4451"
                    setToggleBodyTuneDetails={setToggleBodyTuneDetails}
                  />
                </motion.div>
                <motion.div variants={childAnimationVariant}>
                  <BodyTuneCard
                    bodyTunePlanName="Beginner Friendly Plan"
                    exercisePlanName="Exercise Plan Name"
                    mealPlanName="Meal Plan Name"
                    likes="44521"
                    views="4451"
                    setToggleBodyTuneDetails={setToggleBodyTuneDetails}
                  />
                </motion.div>
                <motion.div variants={childAnimationVariant}>
                  <BodyTuneCard
                    bodyTunePlanName="Beginner Friendly Plan"
                    exercisePlanName="Exercise Plan Name"
                    mealPlanName="Meal Plan Name"
                    likes="44521"
                    views="4451"
                    setToggleBodyTuneDetails={setToggleBodyTuneDetails}
                  />
                </motion.div>
                <motion.div variants={childAnimationVariant}>
                  <BodyTuneCard
                    bodyTunePlanName="Beginner Friendly Plan"
                    exercisePlanName="Exercise Plan Name"
                    mealPlanName="Meal Plan Name"
                    likes="44521"
                    views="4451"
                    setToggleBodyTuneDetails={setToggleBodyTuneDetails}
                  />
                </motion.div>
                <motion.div variants={childAnimationVariant}>
                  <BodyTuneCard
                    bodyTunePlanName="Beginner Friendly Plan"
                    exercisePlanName="Exercise Plan Name"
                    mealPlanName="Meal Plan Name"
                    likes="44521"
                    views="4451"
                    setToggleBodyTuneDetails={setToggleBodyTuneDetails}
                  />
                </motion.div>
                <motion.div variants={childAnimationVariant}>
                  <BodyTuneCard
                    bodyTunePlanName="Beginner Friendly Plan"
                    exercisePlanName="Exercise Plan Name"
                    mealPlanName="Meal Plan Name"
                    likes="44521"
                    views="4451"
                    setToggleBodyTuneDetails={setToggleBodyTuneDetails}
                  />
                </motion.div>
                <motion.div variants={childAnimationVariant}>
                  <BodyTuneWorkoutCard
                    exercisePlanName="Exercise Plan Name"
                    likes="44521"
                    views="4451"
                    setToggleBodyTuneWorkoutDetails={
                      setToggleBodyTuneWorkoutDetails
                    }
                  />
                </motion.div>
                <motion.div variants={childAnimationVariant}>
                  <BodyTuneWorkoutCard
                    exercisePlanName="Exercise Plan Name"
                    likes="44521"
                    views="4451"
                    setToggleBodyTuneWorkoutDetails={
                      setToggleBodyTuneWorkoutDetails
                    }
                  />
                </motion.div>
                <motion.div variants={childAnimationVariant}>
                  <BodyTuneWorkoutCard
                    exercisePlanName="Exercise Plan Name"
                    likes="44521"
                    views="4451"
                    setToggleBodyTuneWorkoutDetails={
                      setToggleBodyTuneWorkoutDetails
                    }
                  />
                </motion.div>
                <motion.div variants={childAnimationVariant}>
                  <BodyTuneMealCard
                    mealPlanName="Meal Plan Name"
                    likes="44521"
                    views="4451"
                    setToggleBodyTuneMealDetails={setToggleBodyTuneMealDetails}
                  />
                </motion.div>
                <motion.div variants={childAnimationVariant}>
                  <BodyTuneMealCard
                    mealPlanName="Meal Plan Name"
                    likes="44521"
                    views="4451"
                    setToggleBodyTuneMealDetails={setToggleBodyTuneMealDetails}
                  />
                </motion.div>
                <motion.div variants={childAnimationVariant}>
                  <BodyTuneMealCard
                    mealPlanName="Meal Plan Name"
                    likes="44521"
                    views="4451"
                    setToggleBodyTuneMealDetails={setToggleBodyTuneMealDetails}
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {toggleBodyTuneMealDetails && (
          <BodyTuneMealDetails
            setToggleBodyTuneMealDetails={setToggleBodyTuneMealDetails}
          />
        )}
        {toggleBodyTuneDetails && (
          <BodyTuneDetails
            setToggleBodyTuneDetails={setToggleBodyTuneDetails}
          />
        )}
        {toggleBodyTuneWorkoutDetails && (
          <BodyTuneWorkoutDetails
            setToggleBodyTuneWorkoutDetails={setToggleBodyTuneWorkoutDetails}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ExploreContent;
