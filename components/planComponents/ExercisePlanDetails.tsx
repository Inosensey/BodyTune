"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Icons
import TablerBarbell from "@/icons/TablerBarbellLight";

// types
import { exercisePlanGeneralInfo } from "@/types/exerciseTypes";
import { exercisePlan } from "@/types/planTypes";
import { TableInsert } from "@/types/database.types";
interface props {
  exercisePlanGeneralInfo: exercisePlanGeneralInfo;
  exercisePlan?: exercisePlan;
}

// Initials
import { weekDates } from "@/utils/initials";

// Variants
const exerciseContainerAnimationVariant = {
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
const exerciseAnimationVariant = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};

const ExercisePlanDetails = ({
  exercisePlan,
  exercisePlanGeneralInfo,
}: props) => {
  // States
  const [selectedExerciseDate, setSelectedExerciseDate] =
    useState<string>("Monday");

  return (
    <div className="w-full flex flex-col justify-center phone:h-full laptop:h-[98%] tablet:items-center">
      <div className="mt-5 mb-2 px-2 phone:w-full tablet:w-[98%]">
        <Link href={"/dashboard/workouts"}>
          <div className="w-max flex flex-col py-1 px-[0.6rem] cursor-pointer border-2 border-lightSecondary rounded-lg">
            <div className="flex gap-1 text-base">
              <p className="font-dmSans font-semibold text-lightSecondary">
                Workout Plans
              </p>
              <TablerBarbell
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
              Exercise Difficulty:{" "}
              <span className="font-normal text-lightSecondary">
                Suitable for{" "}
                {exercisePlanGeneralInfo.tags
                  .map(
                    (tagInfo: {
                      exercise_tags: { id: number; exerciseTagName: string };
                    }) => tagInfo.exercise_tags.exerciseTagName
                  )
                  .join(", ")}
              </span>
            </p>
          </div>
          <div className="w-full flex gap-2 phone:flex-col laptop:flex-1 laptop:h-[80%] laptop:flex-row">
            <div className="p-4 flex flex-col  gap-1 laptop:h-[100%] laptop:w-[50%] desktop:w-[100%] bg-lightPrimary">
              <div className="flex flex-col gap-1 laptop:h-[25%] laptop:overflow-auto">
                <p className="font-quickSand font-bold">
                  Exercise Plan Name:
                  <span className="font-normal text-lightSecondary">
                    {" "}
                    {exercisePlanGeneralInfo.planName}
                  </span>
                </p>
                {exercisePlanGeneralInfo.shortDescription && (
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
              <div className="w-full flex flex-col gap-1 phone:h-[650px] laptop:h-[70%]">
                <label className="font-dmSans font-bold">Select Date:</label>
                <div className="flex flex-wrap h-max gap-1">
                  {weekDates.map((date: string, index: number) => (
                    <div
                      className="group border-[1.5px] border-secondary px-4 py-1 cursor-pointer"
                      key={index}
                      onClick={() => setSelectedExerciseDate(date)}
                    >
                      <p
                        className={`text-sm font-semibold font-quickSand transition duration-200 ${
                          selectedExerciseDate === date
                            ? "text-[#ffffff]"
                            : "text-[#b3b3b3] group-hover:text-[#ffffff]"
                        }`}
                      >
                        {date}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="py-1 flex flex-col gap-[0.1rem h-[100%] w-[100%] overflow-auto">
                  <motion.div
                    variants={exerciseContainerAnimationVariant}
                    initial="hidden"
                    animate="show"
                    className="flex flex-wrap gap-2 h-[100%] w-[100%] overflow-auto"
                  >
                    {exercisePlan &&
                    exercisePlan[selectedExerciseDate] &&
                    exercisePlan[selectedExerciseDate].length > 0 ? (
                      exercisePlan[selectedExerciseDate].map(
                        (exercise: TableInsert<"exercise">, index: number) => (
                          <motion.div
                            key={index}
                            variants={exerciseAnimationVariant}
                            className="font-dmSans flex flex-col gap-1 h-max p-2  rounded-md phone:w-[95%] tablet:w-[200px]"
                          >
                            <div className="flex flex-col">
                              <p className="font-bold text-[#a3e09f]">
                                {exercise.exerciseName}
                              </p>
                              {/* <p className="font-semibold laptop:text-sm">
                                  {exercise.exerciseDifficulty === 1 &&
                                    "Beginner"}
                                  {exercise.exerciseDifficulty === 2 &&
                                    "Amateur"}
                                  {exercise.exerciseDifficulty === 3 &&
                                    "Expert"}
                                </p> */}
                              <p className="font-semibold laptop:text-sm">
                                {exercise.bmiClassification === 1 &&
                                  "Under Weight"}
                                {exercise.bmiClassification === 2 &&
                                  "Healthy Weight"}
                                {exercise.bmiClassification === 3 &&
                                  "Over Weight"}
                              </p>
                              <p className="font-semibold laptop:text-sm">
                                {exercise.measurement}
                              </p>
                              <p className="font-semibold laptop:text-sm">
                                {exercise.equipment}
                              </p>
                              {exercise.youtubeLink !== "" && (
                                <p className="font-semibold cursor-pointer underline laptop:text-sm">
                                  {exercise.youtubeLink}
                                </p>
                              )}
                            </div>
                            <div className="w-[100%] h-36">
                              <Image
                                data-loaded="false"
                                onLoad={(event) => {
                                  event.currentTarget.setAttribute(
                                    "data-loaded",
                                    "true"
                                  );
                                }}
                                className="w-full h-full object-contain data-[loaded=false]:animate-pulse data-[loaded=false]:bg-gray-100/10"
                                width={200}
                                height={200}
                                src={
                                  exercise.exerciseDemo
                                    ? exercise.exerciseDemo
                                    : "/assets/svg/healthy-1.svg"
                                }
                                alt="Preview"
                              />
                            </div>
                          </motion.div>
                        )
                      )
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <p className="font-dmSans font-bold text-[#a3e09f] text-lg m-0 p-0">
                          Rest day
                        </p>
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExercisePlanDetails;
