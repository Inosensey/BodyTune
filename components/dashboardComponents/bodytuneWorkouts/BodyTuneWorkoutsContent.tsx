"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getUserExercisePlans } from "@/lib/supabaseQueries";

// Components
import BodyTuneWorkoutDetails from "./BodyTuneWorkoutDetails";
import Overlay from "@/components/reusableComponent/Overlay";
import BodyTuneWorkoutCard from "./BodyTuneWorkoutCard";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import { AnimatePresence } from "framer-motion";

// Fixed values
const sortByValues: Array<string> = ["Relevance", "Latest", "Views", "Hearts"];
const pageResultPreferences: Array<number | string> = [
  10,
  20,
  30,
  40,
  50,
  "All",
];

// types
import { exercisePlanQuery } from "@/types/planTypes";
import { useQuery } from "@tanstack/react-query";
import { arrangeExercisePlan } from "@/utils/dashboardUtils";
import DeleteWarningPopup from "../reusableComponents/DeleteWarningPopup";

const BodyTuneWorkoutsContent = () => {
  // UseQuery
  const { data: exercisePlans } = useQuery({
    queryKey: ["userExercisePlans"],
    queryFn: () => {
      return getUserExercisePlans();
    },
  });

  // States
  const [sortBy, setSortBy] = useState<string>("Relevance");
  const [resultsPerPage, setResultsPerPage] = useState<number | string>(10);
  const [toggleBodyTuneWorkoutDetails, setToggleBodyTuneWorkoutDetails] =
    useState<boolean>(false);
  const [selectedExercisePlan, setSelectedExercisePlan] = useState<exercisePlanQuery | null>(null);
  const [toggleDeleteWarningPopUp, setToggleDeleteWarningPopUp] =
    useState<boolean>(false);
  const [dataToBeDeleted, setDataToBeDeleted] = useState<exercisePlanQuery | null>(null)

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
      <div className="flex-1 bg-black h-[80%] w-full p-4 rounded-lg">
        <div className="w-full h-full">
          <div className="flex flex-col w-full h-full">
            <div className="flex gap-1 items-center justify-between phone:flex-col laptop:flex-row">
              <div className="w-max flex gap-1 items-center phone:flex-col mdphone:flex-row">
                <p className="text-lg font-dmSans font-bold text-lightSecondary">
                  BodyTune Workout Lists
                </p>
                <Link href={"workouts/create"}>
                  <button className="bg-[#5d897b] text-white font-quickSand font-semibold px-2 py-1 text-sm rounded-md flex items-center justify-center gap-1 transition duration-200 hover:bg-secondary">
                    Add a Workout
                    <FontAwesomeIcon
                      icon={faPlusSquare}
                      className="text-white text-xl"
                    />
                  </button>
                </Link>
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
                      )
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
            <div className="w-full max-h-[95%] gap-2 flex flex-wrap mt-2 overflow-auto">
              {exercisePlans && exercisePlans?.length !== 0 ? (
                exercisePlans.map((exercisePlan: exercisePlanQuery) => (
                  <div key={exercisePlan.id}>
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
                      setDataToBeDeleted={setDataToBeDeleted}
                      setToggleDeleteWarningPopUp={setToggleDeleteWarningPopUp}
                      setSelectedExercisePlan={setSelectedExercisePlan}
                    />
                  </div>
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
                    You don&apos;t have any{" "}
                    <span className="font-bold font-quickSand text-secondary">
                      Workout Plans
                    </span>{" "}
                    yet.
                  </p>
                  <Link href={"workouts/create"}>
                    <p className="w-max text-lg text-lightSecondary underline cursor-pointer">
                      Create your first one now!
                    </p>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {toggleBodyTuneWorkoutDetails && (
          <Overlay>
            <BodyTuneWorkoutDetails
              exercisePlan={{
                planName: selectedExercisePlan!.planName,
                exercise_tags: selectedExercisePlan!.exercise_plan_tag.map(tag => tag.exercise_tags.exerciseTagName),
                exercises: arrangeExercisePlan(selectedExercisePlan!)
              }}
              setToggleBodyTuneWorkoutDetails={setToggleBodyTuneWorkoutDetails}
            />
          </Overlay>
        )}
        
        {toggleDeleteWarningPopUp && (
          <DeleteWarningPopup
            setToggleDeleteWarningPopUp={setToggleDeleteWarningPopUp}
            typeOfDataToBeDeleted="exercise"
            id={dataToBeDeleted!.id!}
            exercisePlansRes={exercisePlans}
          >
            <BodyTuneWorkoutCard
              author={dataToBeDeleted!.personal_information.name}
              exercisePlanName={dataToBeDeleted!.planName}
              planTags={dataToBeDeleted!.exercise_plan_tag}
              likes="44521"
              views="4451"
              exercisePlan={dataToBeDeleted!}
              setToggleBodyTuneWorkoutDetails={
                setToggleBodyTuneWorkoutDetails
              }
              setSelectedExercisePlan={setSelectedExercisePlan}
            />
          </DeleteWarningPopup>
        )}
      </AnimatePresence>
    </>
  );
};

export default BodyTuneWorkoutsContent;
