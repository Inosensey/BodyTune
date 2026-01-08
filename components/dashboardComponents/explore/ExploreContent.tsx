"use client";

// import { useQuery } from "@tanstack/react-query";
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
import {
  exercisePlan,
  exercisePlanQuery,
  exploreBodyTuneInterface,
  exploreExercisePlanInterface,
  exploreMealPlanInterface,
  mealPlanQuery,
} from "@/types/planTypes";
import { mealPlanType } from "@/types/mealTypes";
import Overlay from "@/components/reusableComponent/Overlay";
import { arrangeExercisePlan, arrangeMealPlan } from "@/utils/dashboardUtils";
import { useQuery } from "@tanstack/react-query";
import { getExplorePageContent } from "@/lib/supabaseQueries";

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

// types

const ExploreContent = () => {
  // Use query
  const {data: explorePageContentData} = useQuery({
    queryKey: ["explorePageContent"],
    queryFn: () => {
      return getExplorePageContent();
    }
  });

  // States
  const [searchText, setSearchText] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("0");
  const [resultsPerPage, setResultsPerPage] = useState<number | string>("0");
  const [selectedPlan, setSelectedPlan] = useState<string>("0");
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<string>("0");
  const [selectedBmiClassification, setSelectedBmiClassification] =
    useState<string>("0");

  const [selectedBodyTunePlan, setSelectedBodyTunePlan] = useState<{
    bodyTuneId?: number;
    exercisePlan?: exercisePlan;
    mealPlan?: mealPlanType;
  }>({});

  const [selectedExercisePlan, setSelectedExercisePlan] =
    useState<exercisePlanQuery | null>(null);
  const [selectedMealPlan, setSelectedMealPlan] =
    useState<mealPlanQuery | null>(null);
  const [toggleBodyTuneWorkoutDetails, setToggleBodyTuneWorkoutDetails] =
    useState<boolean>(false);
  const [toggleBodyTuneDetails, setToggleBodyTuneDetails] =
    useState<boolean>(false);
  const [toggleBodyTuneMealDetails, setToggleBodyTuneMealDetails] =
    useState<boolean>(false);

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
              <div className="rounded-md bg-lightPrimary flex flex-col items-center gap-1 py-2 px-2 laptop:w-[90%] desktop:w-[60%]">
                <div className={`flex flex-col w-full laptop:w-[70%] gap-1`}>
                  <div className="w-full flex items-center gap-1">
                    <div className="relative w-full bg-primary overflow-hidden p-1">
                      <input
                        type="text"
                        name="searchText"
                        placeholder="Search Plan Name"
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
                    <select
                      className={`bg-black flex-1 p-1 text-white h-[2.7rem] phone:text-sm font-quickSand`}
                      onChange={selectOnChange}
                      name="selectedPlan"
                      defaultValue={selectedPlan}
                    >
                      <option value="0" disabled selected hidden>Plan Types</option>
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
                    <select
                      className={`bg-black flex-1 p-1 text-white h-[2.7rem] phone:text-sm font-quickSand`}
                      onChange={selectOnChange}
                      name="selectedDifficulty"
                      defaultValue={selectedDifficulty}
                    >
                      <option value="0" disabled selected hidden>Difficulties</option>
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
                    <select
                      className={`bg-black flex-1 p-1 text-white h-[2.7rem] phone:text-sm font-quickSand`}
                      onChange={selectOnChange}
                      name="selectedBmiClassification"
                      defaultValue={selectedBmiClassification}
                    >
                      <option value="0" disabled selected hidden>BMI Classification</option>
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
                  <div className={`px-2 py-1 flex  items-center gap-2`}>
                    <select
                      className={`bg-black flex-1 p-1 text-white h-[2.7rem] phone:text-sm font-quickSand`}
                      onChange={selectOnChange}
                      name="sortBy"
                      defaultValue={sortBy}
                    >
                      <option value="0" disabled selected hidden>Sort By</option>
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
                  <div
                    className={`bg-lightPrimary px-2 py-1 flex w-[190px] items-center gap-2`}
                  >
                    <select
                      className={`bg-black flex-1 p-1 text-white h-[2.7rem] phone:text-sm font-quickSand`}
                      onChange={selectOnChange}
                      name="resultsPerPage"
                      defaultValue={resultsPerPage}
                    >
                      <option value="0" disabled selected hidden>Results Per Page</option>
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
            <div className="h-[80%] w-full overflow-auto mt-[0.5rem]">
              <motion.div
                variants={containerAnimationVariant}
                initial="hidden"
                animate="show"
                className="w-full gap-2 flex flex-wrap mt-2"
              >
                {explorePageContentData?.bodyTunes &&
                  explorePageContentData.bodyTunes.length !== 0 &&
                  explorePageContentData.bodyTunes.map(
                    (
                      bodyTune: exploreBodyTuneInterface,
                      index: number
                    ) => {
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
                              exercisePlanName={bodyTune.exercise_plan.planName}
                              mealPlanName={bodyTune.meal_plan.planName}
                              exercise_plan_tag={
                                bodyTune.exercise_plan.exercise_plan_tag
                              }
                              meal_plan_tags={bodyTune.meal_plan.meal_plan_tags}
                              likes="44521"
                              views="4451"
                              setToggleBodyTuneDetails={
                                setToggleBodyTuneDetails
                              }
                              setSelectedBodyTunePlan={setSelectedBodyTunePlan}
                              canMutate={bodyTune.canMutate}
                              userFavorite={bodyTune.userFavorite}
                            />
                          </motion.div>
                        );
                    }
                  )}
                {explorePageContentData?.exercisePlans &&
                  explorePageContentData.exercisePlans.length !== 0 &&
                  explorePageContentData.exercisePlans.map(
                    (
                      exercisePlan: exploreExercisePlanInterface
                    ) => (
                      <motion.div
                        key={exercisePlan.id}
                        variants={childAnimationVariant}
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
                          canMutate={exercisePlan.canMutate}
                          userFavorite={exercisePlan.userFavorite}
                        />
                      </motion.div>
                    )
                  )}
                {explorePageContentData?.mealPlans &&
                  explorePageContentData.mealPlans.length !== 0 &&
                  explorePageContentData.mealPlans.map(
                    (mealPlan: exploreMealPlanInterface) => (
                      <motion.div
                        variants={childAnimationVariant}
                        key={mealPlan.id}
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
                          canMutate={mealPlan.canMutate}
                          userFavorite={mealPlan.userFavorite}
                        />
                      </motion.div>
                    )
                  )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {toggleBodyTuneMealDetails && (
          <BodyTuneMealDetails
            mealPlan={{
              planName: selectedMealPlan!.planName,
              bmi_classification: selectedMealPlan!.meal_plan_tags.map(
                (tag) => tag.meal_tags.mealTagName
              ),
              meals: arrangeMealPlan(selectedMealPlan!),
            }}
            setToggleBodyTuneMealDetails={setToggleBodyTuneMealDetails}
          />
        )}
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
                  (tag) => tag.exercise_tags.exerciseTagName
                ),
                exercises: arrangeExercisePlan(selectedExercisePlan!),
              }}
              setToggleBodyTuneWorkoutDetails={setToggleBodyTuneWorkoutDetails}
            />
          </Overlay>
        )}
      </AnimatePresence>
    </>
  );
};

export default ExploreContent;
