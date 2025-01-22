"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// Components
import BodyTuneWorkoutCard from "../bodytuneWorkouts/BodyTuneWorkoutCard";
import BodyTuneCard from "../bodytuneStudio/BodyTuneCard";
import BodyTuneMealCard from "../bodytuneMeals/BodyTuneMealsCard";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IcBaselinePeopleOutline from "@/icons/IcBaselinePeopleOutline";
import IcBaselineStarBorder from "@/icons/IcBaselineStarBorder";
import MdiFoodDrumstickOutline from "@/icons/MdiFoodDrumstickOutline";
import SolarStarsMinimalisticLineDuotone from "@/icons/SolarStarsMinimalisticLineDuotone";
import TablerBarbell from "@/icons/TablerBarbellLight";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";

// Fixed values
const sortByValues: Array<string> = ["Relevance", "Latest", "Views", "Hearts"];
const contentTabValues: Array<string> = ["BodyTunes", "Workouts", "Meals"];
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

const FollowerProfileContent = () => {
  // States
  const [sortBy, setSortBy] = useState<string>("Relevance");
  const [selectedContentTab, setSelectedContentTab] =
    useState<string>("BodyTunes");
  const [toggleBodyTuneWorkoutDetails, setToggleBodyTuneWorkoutDetails] =
    useState<boolean>(false);
  const [toggleBodyTuneDetails, setToggleBodyTuneDetails] =
    useState<boolean>(false);
  const [toggleBodyTuneMealDetails, setToggleBodyTuneMealDetails] =
    useState<boolean>(false);
  const [resultsPerPage, setResultsPerPage] = useState<number | string>(10);
    console.log(toggleBodyTuneWorkoutDetails)
    console.log(toggleBodyTuneDetails)
    console.log(toggleBodyTuneMealDetails)
  // Events
  const selectOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    if (name === "sortBy") {
      setSortBy(value);
    } else if (name === "resultsPerPage") {
      setResultsPerPage(value);
    }
  };

  return (
    <div className="flex-1 bg-black h-[80%] w-full p-4 rounded-lg">
      <div className="flex justify-between h-full w-full">
        <div className="w-[30%] flex flex-col items-center justify-center gap-1 font-quickSand  bg-lightPrimary rounded-lg">
          <div className="w-[95%] flex flex-col items-center justify-center gap-2 rounded-md px-2 py-3">
            <div className="flex flex-col items-center">
              <div className="border-2 border-lightSecondary rounded-full h-[120px] w-[120px] flex items-center justify-center mb-2">
                <p className="text-center">Profile Image here</p>
              </div>
              <p className="font-bold text-xl text-lightSecondary">
                Philip Mathew Dingcong
              </p>
              <p className="font-semibold text-[#ccc]">Mat2x</p>
            </div>
            <div className="max-h-[100px] overflow-auto">
              <p className="text-justify font-quickSand h-full text-sm">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil,
                perspiciatis nostrum? Quasi magnam vitae tempora architecto,
                reprehenderit dolorum numquam facere blanditiis labore libero
                doloremque, quam asperiores dolorem nihil molestiae aspernatur
                officiis earum eligendi quidem totam distinctio ipsum quibusdam.
                Minus, quae.
              </p>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <div className="flex justify-between items-center border-b-[1px] border-secondary pb-1">
                <p className="flex gap-1 items-center text-base text-lightSecondary font-semibold">
                  Followers
                  <IcBaselinePeopleOutline
                    color="#D3F0D1"
                    width="1.3em"
                    height="1.3em"
                  />
                </p>
                <p className="font-semibold">1234123</p>
              </div>
              <div className="flex justify-between items-center border-b-[1px] border-secondary pb-1">
                <p className="flex gap-1 items-center text-base text-lightSecondary font-semibold">
                  Achievements
                  <IcBaselineStarBorder
                    color="#D3F0D1"
                    width="1.3em"
                    height="1.3em"
                  />
                </p>
                <p className="font-semibold">123</p>
              </div>
              <div className="flex justify-between items-center border-b-[1px] border-secondary pb-1">
                <p className="flex gap-1 items-center text-base text-lightSecondary font-semibold">
                  BodyTunes
                  <SolarStarsMinimalisticLineDuotone
                    color="#D3F0D1"
                    width="1.3em"
                    height="1.3em"
                  />
                </p>
                <p className="font-semibold">12</p>
              </div>
              <div className="flex justify-between items-center border-b-[1px] border-secondary pb-1">
                <p className="flex gap-1 items-center text-base text-lightSecondary font-semibold">
                  Workouts
                  <TablerBarbell color="#D3F0D1" width="1.3em" height="1.3em" />
                </p>
                <p className="font-semibold">20</p>
              </div>
              <div className="flex justify-between items-center border-b-[1px] border-secondary pb-1">
                <p className="flex gap-1 items-center text-base text-lightSecondary font-semibold">
                  Meals
                  <MdiFoodDrumstickOutline
                    color="#D3F0D1"
                    width="1.3em"
                    height="1.3em"
                  />
                </p>
                <p className="font-semibold">10</p>
              </div>
            </div>

            <div className="w-full">
              <button className="w-full bg-[#5d897b] text-white font-quickSand font-semibold py-1 rounded-md flex items-center justify-center gap-1 transition duration-200 hover:bg-secondary">
                Follow
                <FontAwesomeIcon
                  icon={faPlusSquare}
                  className="text-white text-xl"
                />
              </button>
            </div>
          </div>
        </div>
        <div className="w-[69%] flex flex-col gap-1 h-full">
          <div className="flex gap-1 items-center justify-between border-b-[1px] border-lightSecondary pb-1">
            <div className="flex items-center gap-1">
              {contentTabValues.map((tab: string, index: number) => (
                <p
                  onClick={() => setSelectedContentTab(tab)}
                  key={index}
                  style={{
                    background:
                      selectedContentTab === tab ? "#1E1E1E" : "#333333",
                  }}
                  className="px-3 py-2 rounded-md font-quickSand font-semibold text-sm cursor-pointer transition ease-in"
                >
                  {tab}
                </p>
              ))}
            </div>
            <div className="flex gap-1">
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
                  {pageResultPreferences.map((pageResult: string | number) => (
                    <option
                      className="bg-primary font-quickSand"
                      key={pageResult}
                      value={pageResult}
                    >
                      {pageResult}
                    </option>
                  ))}
                </select>
              </div>
              <div
                className={`bg-lightPrimary px-2 py-1 flex w-[220px] items-center gap-2`}
              >
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
            </div>
          </div>

          <div className="w-full max-h-[93%] overflow-auto">
            {selectedContentTab === "BodyTunes" && (
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
              </motion.div>
            )}
            {selectedContentTab === "Workouts" && (
              <motion.div
                variants={containerAnimationVariant}
                initial="hidden"
                animate="show"
                className="w-full gap-2 flex flex-wrap mt-2"
              >
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
              </motion.div>
            )}
            {selectedContentTab === "Meals" && (
              <motion.div
                variants={containerAnimationVariant}
                initial="hidden"
                animate="show"
                className="w-full gap-2 flex flex-wrap mt-2"
              >
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowerProfileContent;
