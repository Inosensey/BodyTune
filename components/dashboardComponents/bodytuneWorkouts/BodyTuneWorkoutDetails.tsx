import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons/faXmarkCircle";

// types
import { exercisePlan } from "@/types/planTypes";
interface props {
  exercisePlan: {planName: string, exercise_tags: Array<string>, exercises:exercisePlan };
  setToggleBodyTuneWorkoutDetails?: React.Dispatch<
    React.SetStateAction<boolean>
  >;
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

const BodyTuneWorkoutDetails = ({
  exercisePlan,
  setToggleBodyTuneWorkoutDetails,
}: props) => {
  // States
  useState<string>("Monday");
  const [selectedExerciseDate, setSelectedExerciseDate] =
    useState<string>("Monday");
  const [arrangedExercise] = useState<exercisePlan>(exercisePlan.exercises);

  return (
    <div className="w-full phone:h-full laptop:h-[95%] flex flex-col justify-center tablet:items-center">
      <div className="flex items-center justify-center gap-4 w-[100%] h-[8%]">
        <p className="text-[#a3e09f] font-dmSans text-lg font-semibold">
          BodyTune Workout Details
        </p>
        <div
          onClick={() =>
            setToggleBodyTuneWorkoutDetails &&
            setToggleBodyTuneWorkoutDetails(false)
          }
          className="cursor-pointer group"
        >
          <FontAwesomeIcon
            icon={faXmarkCircle}
            className="text-[#D3F0D1] text-2xl transition duration-200 group-hover:text-[#a3e09f]"
          />
        </div>
      </div>
      <div className="bg-lightPrimary rounded-lg h-[100%] overflow-auto phone:w-full phone:px-2 phone:py-4 tablet:p-4 tablet:w-[85%]">
        <div className="flex flex-col gap-2 laptop:h-[95%]">
          <div className="flex flex-col gap-2 bg-primary w-[100%] p-4 rounded-md font-quickSand font-bold h-[30%] overflow-auto">
            <p className="font-dmSans">
              Plan Name:{" "}
              <span className="font-normal text-lightSecondary">
                {exercisePlan.planName}
              </span>
            </p>
            <p className="font-dmSans">
              Exercise Difficulty:{" "}
              <span className="font-normal text-lightSecondary">
                {exercisePlan.exercise_tags.length !== 1
                  ? `Suitable from ${
                      exercisePlan.exercise_tags[0]
                    } to ${
                      exercisePlan.exercise_tags[
                        exercisePlan.exercise_tags.length - 1
                      ]
                    }`
                  : `Suitable for ${exercisePlan.exercise_tags[0]}`}
              </span>
            </p>
            <div className="font-dmSans">
              <label className="font-bold">Short Description:</label>
              <p className="font-normal text-lightSecondary text-sm text-justify">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro
                numquam corporis nisi facere, nihil sint accusantium ullam quod
                explicabo quis temporibus sequi ratione modi dolorum? Porro
                numquam corporis nisi facere, nihil sint accusantium ullam quod
                explicabo quis temporibus sequi ratione modi dolorum?
              </p>
            </div>
          </div>
          <div className="p-4 flex flex-col bg-primary gap-1 laptop:h-[70%] laptop:w-[100%]">
            <div className="w-full flex flex-col gap-1 phone:h-[650px] laptop:h-[100%]">
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
              <div className="py-1 flex flex-col gap-[0.1rem] h-[100%] w-[100%] overflow-auto">
                <motion.div
                  variants={exerciseContainerAnimationVariant}
                  initial="hidden"
                  animate="show"
                  className="flex flex-wrap gap-2 h-[100%] w-[100%] overflow-auto"
                >
                  {arrangedExercise[selectedExerciseDate].map((exercise) => (
                    <motion.div
                      key={exercise.exerciseName}
                      variants={exerciseAnimationVariant}
                      className="font-dmSans flex flex-col gap-1 h-max p-2 bg-lightPrimary rounded-md phone:w-[95%] tablet:w-[200px]"
                    >
                      <div className="flex flex-col">
                        <p className="font-bold text-[#a3e09f]">
                          {exercise.exerciseName}
                        </p>
                        <p className="font-semibold laptop:text-sm">Beginner</p>
                        <p className="font-semibold laptop:text-sm">
                          {exercise.measurement}
                        </p>
                        <p className="font-semibold laptop:text-sm">
                          {exercise.equipment}
                        </p>
                        {exercise.youtubeLink && (
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
                              ? `${exercise.exerciseDemo}`
                              : "/assets/svg/healthy-1.svg"
                          }
                          alt="Preview"
                        />
                      </div>
                    </motion.div>
                  ))}
                  {/* <motion.div
                    variants={exerciseAnimationVariant}
                    className="font-dmSans flex flex-col gap-1 h-max p-2 bg-lightPrimary rounded-md phone:w-[95%] tablet:w-[200px]"
                  >
                    <div className="flex flex-col">
                      <p className="font-bold text-[#a3e09f]">Bench Press</p>
                      <p className="font-semibold laptop:text-sm">Beginner</p>
                      <p className="font-semibold laptop:text-sm">
                        3 sets x 8–10 reps
                      </p>
                      <p className="font-semibold laptop:text-sm">Barbell</p>
                      <p className="font-semibold cursor-pointer underline laptop:text-sm">
                        Bench Press Youtube Link
                      </p>
                    </div>
                    <div className="w-[100%] h-36">
                      <Image
                        width={200}
                        height={200}
                        src="/assets/svg/healthy-1.svg"
                        alt="Preview"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </motion.div>
                  <motion.div
                    variants={exerciseAnimationVariant}
                    className="font-dmSans flex flex-col gap-1 h-max p-2 bg-lightPrimary rounded-md phone:w-[95%] tablet:w-[200px]"
                  >
                    <div className="flex flex-col">
                      <p className="font-bold text-[#a3e09f]">Bench Press</p>
                      <p className="font-semibold laptop:text-sm">Beginner</p>
                      <p className="font-semibold laptop:text-sm">
                        3 sets x 8–10 reps
                      </p>
                      <p className="font-semibold laptop:text-sm">Barbell</p>
                      <p className="font-semibold cursor-pointer underline laptop:text-sm">
                        Bench Press Youtube Link
                      </p>
                    </div>
                    <div className="w-[100%] h-36">
                      <Image
                        width={200}
                        height={200}
                        src="/assets/svg/healthy-1.svg"
                        alt="Preview"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </motion.div>
                  <motion.div
                    variants={exerciseAnimationVariant}
                    className="font-dmSans flex flex-col gap-1 h-max p-2 bg-lightPrimary rounded-md phone:w-[95%] tablet:w-[200px]"
                  >
                    <div className="flex flex-col">
                      <p className="font-bold text-[#a3e09f]">Bench Press</p>
                      <p className="font-semibold laptop:text-sm">Beginner</p>
                      <p className="font-semibold laptop:text-sm">
                        3 sets x 8–10 reps
                      </p>
                      <p className="font-semibold laptop:text-sm">Barbell</p>
                      <p className="font-semibold cursor-pointer underline laptop:text-sm">
                        Bench Press Youtube Link
                      </p>
                    </div>
                    <div className="w-[100%] h-36">
                      <Image
                        width={200}
                        height={200}
                        src="/assets/svg/healthy-1.svg"
                        alt="Preview"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </motion.div>
                  <motion.div
                    variants={exerciseAnimationVariant}
                    className="font-dmSans flex flex-col gap-1 h-max p-2 bg-lightPrimary rounded-md phone:w-[95%] tablet:w-[200px]"
                  >
                    <div className="flex flex-col">
                      <p className="font-bold text-[#a3e09f]">Bench Press</p>
                      <p className="font-semibold laptop:text-sm">Beginner</p>
                      <p className="font-semibold laptop:text-sm">
                        3 sets x 8–10 reps
                      </p>
                      <p className="font-semibold laptop:text-sm">Barbell</p>
                      <p className="font-semibold cursor-pointer underline laptop:text-sm">
                        Bench Press Youtube Link
                      </p>
                    </div>
                    <div className="w-[100%] h-36">
                      <Image
                        width={200}
                        height={200}
                        src="/assets/svg/healthy-1.svg"
                        alt="Preview"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </motion.div> */}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyTuneWorkoutDetails;
