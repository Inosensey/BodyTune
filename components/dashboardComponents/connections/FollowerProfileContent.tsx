"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

// lib
import {
  getUserBodyTunes,
  getUserExercisePlans,
  getUserMealPlans,
} from "@/lib/supabaseQueries";

// utils
import { arrangeExercisePlan, arrangeMealPlan } from "@/utils/dashboardUtils";

// Components
import Overlay from "@/components/reusableComponent/Overlay";
import BodyTuneCard from "../bodytuneStudio/BodyTuneCard";
import BodyTuneDetails from "../bodytuneStudio/BodyTuneDetails";
import BodyTuneWorkoutCard from "../bodytuneWorkouts/BodyTuneWorkoutCard";
import BodyTuneWorkoutDetails from "../bodytuneWorkouts/BodyTuneWorkoutDetails";
import BodyTuneMealCard from "../bodytuneMeals/BodyTuneMealsCard";
import BodyTuneMealDetails from "../bodytuneMeals/BodyTuneMealDetails";

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

// Types
import {
  bodyTunePlan,
  exercisePlan,
  exercisePlanQuery,
  mealPlanQuery,
} from "@/types/planTypes";
import { mealPlanType } from "@/types/mealTypes";
interface props {
  followerId: string;
}

const FollowerProfileContent = ({ followerId }: props) => {
  // useQuery
  const { data: bodyTuneList } = useQuery({
    queryKey: ["followerBodyTunes"],
    queryFn: () => {
      return getUserBodyTunes(followerId);
    },
  });
  const { data: exercisePlanList } = useQuery({
    queryKey: ["followerExercisePlans"],
    queryFn: () => {
      return getUserExercisePlans(followerId);
    },
  });
  const { data: mealPlanList } = useQuery({
    queryKey: ["followerMealPlans"],
    queryFn: () => {
      return getUserMealPlans(followerId);
    },
  });

  // States
  const [sortBy, setSortBy] = useState<string>("Relevance");
  const [selectedContentTab, setSelectedContentTab] =
    useState<string>("BodyTunes");

  const [toggleBodyTuneDetails, setToggleBodyTuneDetails] =
    useState<boolean>(false);
  const [selectedBodyTunePlan, setSelectedBodyTunePlan] = useState<{
    bodyTuneId?: number;
    exercisePlan?: exercisePlan;
    mealPlan?: mealPlanType;
  }>({});

  const [toggleBodyTuneWorkoutDetails, setToggleBodyTuneWorkoutDetails] =
    useState<boolean>(false);
  const [selectedExercisePlan, setSelectedExercisePlan] =
    useState<exercisePlanQuery | null>(null);

  const [toggleBodyTuneMealDetails, setToggleBodyTuneMealDetails] =
    useState<boolean>(false);
  const [selectedMealPlan, setSelectedMealPlan] =
    useState<mealPlanQuery | null>(null);

  const [resultsPerPage, setResultsPerPage] = useState<number | string>(10);

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
    <>
      <div className="flex-1 bg-black w-full p-4 rounded-lg mdtablet:h-[80%]">
        <div className="flex justify-between h-full w-full phone:flex-col phone:gap-2 phone:items-center mdtablet:flex-row">
          <div className="h-full flex flex-col items-center justify-center gap-1 font-quickSand bg-lightPrimary rounded-lg phone:w-[100%] mdphone:w-[90%] mdtablet:w-[30%]">
            <div className="w-[95%] flex flex-col items-center justify-center gap-2 rounded-md px-2 py-3 phone:h-[650px] mdtablet:h-full ">
              <div className="flex flex-col items-center w-[100%] border-2 phone:h-[40%] mdtablet:h-[50%] laptop:h-[40%]">
                <div className="border-2 border-lightSecondary rounded-full h-[80%] phone:w-[70%] mdphone:w-[40%] mdtablet:w-[50%] laptop:w-[45%] desktop:w-[50%] flex items-center justify-center mb-2">
                  <p className="text-center">Profile Image here</p>
                </div>
                <p className="font-bold laptop:text-sm desktop:text-xl text-lightSecondary">
                  John Doe
                </p>
                <p className="font-semibold text-[#ccc]">John</p>
              </div>
              <div className="max-h-[100px] overflow-auto">
                <p className="text-justify font-quickSand h-full text-sm">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Nihil, perspiciatis nostrum? Quasi magnam vitae tempora
                  architecto, reprehenderit dolorum numquam facere blanditiis
                  labore libero doloremque, quam asperiores dolorem nihil
                  molestiae aspernatur officiis earum eligendi quidem totam
                  distinctio ipsum quibusdam. Minus, quae.
                </p>
              </div>
              <div className="flex flex-col gap-3 w-full">
                <div className="flex justify-between items-center border-b-[1px] border-secondary pb-1">
                  <p className="flex gap-1 items-center text-lightSecondary font-semibold phone:text-sm tablet:text-base">
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
                  <p className="flex gap-1 items-center text-lightSecondary font-semibold phone:text-sm tablet:text-base">
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
                  <p className="flex gap-1 items-center text-lightSecondary font-semibold phone:text-sm tablet:text-base">
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
                  <p className="flex gap-1 items-center text-lightSecondary font-semibold phone:text-sm tablet:text-base">
                    Workouts
                    <TablerBarbell
                      color="#D3F0D1"
                      width="1.3em"
                      height="1.3em"
                    />
                  </p>
                  <p className="font-semibold">20</p>
                </div>
                <div className="flex justify-between items-center border-b-[1px] border-secondary pb-1">
                  <p className="flex gap-1 items-center text-lightSecondary font-semibold phone:text-sm tablet:text-base">
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
          <div className="flex flex-col gap-1 h-full phone:w-[100%] mdphone:w-[90%] mdtablet:w-[69%]">
            <div className="flex gap-1 items-center justify-between border-b-[1px] border-lightSecondary pb-1 phone:flex-col mdtablet:flex-row">
              <div className="flex flex-wrap items-center gap-1">
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
              <div className="flex flex-wrap justify-center gap-1">
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
                      ),
                    )}
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

            <div className="w-full h-[93%] overflow-auto">
              {selectedContentTab === "BodyTunes" && (
                <motion.div
                  variants={containerAnimationVariant}
                  initial="hidden"
                  animate="show"
                  className="w-full h-[100%] gap-2 flex flex-wrap overflow-auto phone:justify-center desktop:justify-start"
                >
                  {bodyTuneList && bodyTuneList.length !== 0 ? (
                    bodyTuneList.map(
                      (bodyTune: bodyTunePlan, index: number) => {
                        if (bodyTune.exercise_plan && bodyTune.meal_plan)
                          return (
                            <motion.div
                              variants={childAnimationVariant}
                              className="w-max"
                              key={index}
                            >
                              <BodyTuneCard
                                bodyTunePlan={bodyTune}
                                author={bodyTune.personal_information.name}
                                exercisePlanName={
                                  bodyTune.exercise_plan.planName
                                }
                                mealPlanName={bodyTune.meal_plan.planName}
                                exercise_plan_tag={
                                  bodyTune.exercise_plan.exercise_plan_tag
                                }
                                meal_plan_tags={
                                  bodyTune.meal_plan.meal_plan_tags
                                }
                                likes="44521"
                                views="4451"
                                setToggleBodyTuneDetails={
                                  setToggleBodyTuneDetails
                                }
                                setSelectedBodyTunePlan={
                                  setSelectedBodyTunePlan
                                }
                              />
                            </motion.div>
                          );
                      },
                    )
                  ) : (
                    <div className="flex flex-col w-full h-full font-dmSans justify-center items-center">
                      <Image
                        src="/assets/svg/dumbbell-2.svg"
                        width={300}
                        height={300}
                        alt="Logo"
                      />
                      <p className="w-max text-xl">
                        User don&apos;t have a{" "}
                        <span className="font-bold font-quickSand text-secondary">
                          BodyTune
                        </span>{" "}
                        yet.
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
              {selectedContentTab === "Workouts" && (
                <motion.div
                  className="w-full max-h-[100%] gap-2 flex flex-wrap overflow-auto"
                  variants={containerAnimationVariant}
                  initial="hidden"
                  animate="show"
                >
                  {exercisePlanList && exercisePlanList?.length !== 0 ? (
                    exercisePlanList.map((exercisePlan: exercisePlanQuery) => (
                      <motion.div
                        variants={childAnimationVariant}
                        key={exercisePlan.id}
                      >
                        <BodyTuneWorkoutCard
                          author={exercisePlan.personal_information.name}
                          exercisePlanName={exercisePlan.planName}
                          planTags={exercisePlan.exercise_plan_tag}
                          likes="44521"
                          views="4451"
                          exercisePlan={exercisePlan}
                          setToggleBodyTuneWorkoutDetails={
                            setToggleBodyTuneWorkoutDetails
                          }
                          setSelectedExercisePlan={setSelectedExercisePlan}
                        />
                      </motion.div>
                    ))
                  ) : (
                    <div className="flex flex-col w-full h-full font-dmSans justify-center items-center">
                      <Image
                        src="/assets/svg/dumbbell-2.svg"
                        width={300}
                        height={300}
                        alt="Logo"
                      />
                      <p className="w-max text-xl">
                        User don&apos;t have any{" "}
                        <span className="font-bold font-quickSand text-secondary">
                          Workout Plans
                        </span>{" "}
                        yet.
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
              {selectedContentTab === "Meals" && (
                <motion.div
                  className="w-full max-h-[100%] gap-2 flex flex-wrap overflow-auto"
                  variants={containerAnimationVariant}
                  initial="hidden"
                  animate="show"
                >
                  {mealPlanList && mealPlanList.length !== 0 ? (
                    mealPlanList.map((mealPlan: mealPlanQuery) => (
                      <motion.div
                        key={mealPlan.id}
                        variants={childAnimationVariant}
                      >
                        <BodyTuneMealCard
                          author={mealPlan.personal_information.name}
                          mealPlanName={mealPlan.planName}
                          planTags={mealPlan.meal_plan_tags}
                          likes="44521"
                          views="4451"
                          setToggleBodyTuneMealDetails={
                            setToggleBodyTuneMealDetails
                          }
                          mealPlan={mealPlan}
                          setSelectedMealPlan={setSelectedMealPlan}
                        />
                      </motion.div>
                    ))
                  ) : (
                    <div className="flex flex-col w-full h-full font-dmSans justify-center items-center">
                      <Image
                        src="/assets/svg/healthy-1.svg"
                        width={300}
                        height={300}
                        alt="Logo"
                      />
                      <p className="w-max text-xl">
                        You don&apos;t have any{" "}
                        <span className="font-bold font-quickSand text-secondary">
                          Meal Plans
                        </span>{" "}
                        yet.
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {toggleBodyTuneDetails && (
          <Overlay>
            <BodyTuneDetails
              setToggleBodyTuneDetails={setToggleBodyTuneDetails}
              bodyTuneId={selectedBodyTunePlan.bodyTuneId!}
              mealPlan={selectedBodyTunePlan.mealPlan}
              exercisePlan={selectedBodyTunePlan.exercisePlan}
            />
          </Overlay>
        )}
        {toggleBodyTuneWorkoutDetails && (
          <Overlay>
            <BodyTuneWorkoutDetails
              exercisePlan={{
                planName: selectedExercisePlan!.planName,
                exercise_tags: selectedExercisePlan!.exercise_plan_tag.map(
                  (tag) => tag.exercise_tags.exerciseTagName,
                ),
                exercises: arrangeExercisePlan(selectedExercisePlan!),
              }}
              setToggleBodyTuneWorkoutDetails={setToggleBodyTuneWorkoutDetails}
            />
          </Overlay>
        )}
        {toggleBodyTuneMealDetails && (
          <BodyTuneMealDetails
            mealPlan={{
              planName: selectedMealPlan!.planName,
              bmi_classification: selectedMealPlan!.meal_plan_tags.map(
                (tag) => tag.meal_tags.mealTagName,
              ),
              meals: arrangeMealPlan(selectedMealPlan!),
            }}
            setToggleBodyTuneMealDetails={setToggleBodyTuneMealDetails}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default FollowerProfileContent;
