"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";

// Lib
import { getBodyTunes } from "@/lib/supabaseQueries";

// Components
import BodyTuneCard from "./BodyTuneCard";
import BodyTuneDetails from "./BodyTuneDetails";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";

// Types
import { bodyTunePlan, exercisePlan } from "@/types/planTypes";
import { mealPlanType } from "@/types/mealTypes";
import Overlay from "@/components/reusableComponent/Overlay";

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
const BodyTuneStudioContents = () => {
  // UseQuery
  const { data: bodyTunes } = useQuery({
    queryKey: ["bodyTunes"],
    queryFn: () => {
      return getBodyTunes();
    },
  });

  const [sortBy, setSortBy] = useState<string>("Relevance");
  const [resultsPerPage, setResultsPerPage] = useState<number | string>(10);
  const [toggleBodyTuneDetails, setToggleBodyTuneDetails] =
    useState<boolean>(false);
  const [selectedBodyTunePlan, setSelectedBodyTunePlan] = useState<{
    exercisePlan?: exercisePlan;
    mealPlan?: mealPlanType;
  }>({});

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
        <div className="hidden flex-col w-full h-full font-dmSans justify-center items-center">
          <Image
            src="/assets/svg/dumbbell-2.svg"
            width={300}
            height={300}
            alt="Logo"
          />
          <p className="w-max text-xl">
            You don&apos;t have a{" "}
            <span className="font-bold font-quickSand text-secondary">
              BodyTune
            </span>{" "}
            yet.
          </p>
          <Link href={"bodytune/create"}>
            <p className="w-max text-lg text-lightSecondary underline cursor-pointer">
              Create your first one now!
            </p>
          </Link>
        </div>
        <div className="w-full h-full">
          <div className="flex flex-col w-full h-full">
            <div className="flex gap-1 items-center justify-between phone:flex-col laptop:flex-row">
              <div className="w-max flex gap-1 items-center phone:flex-col mdphone:flex-row">
                <p className="text-lg font-dmSans font-bold text-lightSecondary">
                  BodyTune Lists
                </p>
                <Link href={"bodytune/create"}>
                  <button className="bg-[#5d897b] text-white font-quickSand font-semibold px-2 py-1 text-sm rounded-md flex items-center justify-center gap-1 transition duration-200 hover:bg-secondary">
                    Add a BodyTune
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
            <div className="w-full max-h-[95%] gap-2 flex flex-wrap mt-2 overflow-auto phone:justify-center desktop:justify-start">
              {bodyTunes && bodyTunes.length !== 0 ? (
                bodyTunes.map((bodyTune: bodyTunePlan, index: number) => (
                  <div className="w-max" key={index}>
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
                      setToggleBodyTuneDetails={setToggleBodyTuneDetails}
                      setSelectedBodyTunePlan={setSelectedBodyTunePlan}
                    />
                  </div>
                ))
              ) : (
                <p>No BodyTunes</p>
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
              mealPlan={selectedBodyTunePlan.mealPlan}
              exercisePlan={selectedBodyTunePlan.exercisePlan}
            />
          </Overlay>
        )}
      </AnimatePresence>
    </>
  );
};

export default BodyTuneStudioContents;
