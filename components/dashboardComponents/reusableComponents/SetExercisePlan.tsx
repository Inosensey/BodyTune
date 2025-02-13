"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// components
import { Input } from "@/components/reusableComponent/formInputs/input";
import AddExerciseForm from "./AddExerciseForm";

// Icons
import IcOutlineArrowBackIosNew from "@/icons/IcOutlineArrowBackIosNew";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";

// Types
interface ExerciseType {
  exerciseName: string;
  shortDescription: string;
  difficulty: string;
  equipment: string;
  measurementType: string;
  measurement: string;
  exerciseDemo: string;
  youtubeLink: string;
}
interface exercisePlanInterface {
  selectedExercisePlan: number;
  exercisePlanName: string;
}
import { InterfaceBreadCrumbs } from "@/types/inputTypes";
interface props {
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  setSelectedBreadCrumb: React.Dispatch<
    React.SetStateAction<InterfaceBreadCrumbs>
  >;
}

// Initials
import { weekDates, workoutDifficulties } from "@/utils/initials";
import TablerBarbell from "@/icons/TablerBarbellLight";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
const exercisePlanInitials: exercisePlanInterface = {
  selectedExercisePlan: 0,
  exercisePlanName: "",
};
const ExerciseValInitial: ExerciseType = {
  exerciseName: "",
  shortDescription: "",
  difficulty: "",
  equipment: "",
  measurementType: "",
  measurement: "",
  exerciseDemo: "",
  youtubeLink: "",
};
const SetExercisePlan = ({
  setSelectedOption,
  setProgress,
  setSelectedBreadCrumb,
}: props) => {
  // States
  const [selectedWeekDate, setSelectedWeekDate] = useState<string>("Monday");
  const [selectedDifficulties, setSelectedDifficulties] = useState<
    Array<string>
  >([]);
  const [showExercisePlanHtml, setShowExercisePanHtml] =
    useState<boolean>(false);
  const [toggleAddExerciseForm, setToggleAddExerciseForm] =
    useState<boolean>(false);
  const [exercisePlanFieldsVal, setExercisePlanFieldsVal] =
    useState<exercisePlanInterface>(exercisePlanInitials);
  const [exercises, setExercises] = useState<ExerciseType[]>([]);
  const [selectedExercise, setSelectedExercise] =
    useState<ExerciseType>(ExerciseValInitial);
  const [formAction, setFormAction] = useState<string>("");
  const [actionType, setActionType] = useState<string>("");

  // Events
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setExercisePlanFieldsVal((prev) => ({ ...prev, [name]: value }));
  };
  const selectOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value, options } = event.target;
    if (name === "exercisePlan") {
      setExercisePlanFieldsVal((prev) => ({
        ...prev,
        exercisePlanName: options[event.target.selectedIndex].text,
      }));
      setActionType("Select");
    } else {
      setExercisePlanFieldsVal((prev) => ({ ...prev, [name]: value }));
    }
    setShowExercisePanHtml(true);
  };

  const removeAnExercise = (indexToBeRemove: number) => {
    setExercises((prevItems) =>
      prevItems.filter((_, index) => index !== indexToBeRemove)
    );
  };
  return (
    <>
      <div
        className="flex flex-col h-full"
        style={{ width: `${showExercisePlanHtml ? "100%" : "320px"}` }}
      >
        <div className="bg-black rounded-t-lg pt-4 py-2 w-full">
          <div className="flex items-center gap-1 pr-2 cursor-pointer w-full">
            <div
              className="flex items-center gap-1 pr-2 cursor-pointer w-max group"
              onClick={() => {
                setSelectedOption("");
                setProgress(1);
                setSelectedBreadCrumb({
                  id: 1,
                  title: "Body Metrics",
                  shortDescription: "Set weight, height, and experience",
                });
              }}
            >
              <IcOutlineArrowBackIosNew
                color="#4B6F64"
                width="1.7em"
                height="1.7em"
              />
              <div>
                <p className="font-dmSans font-semibold text-sm text-[#b3b3b3] transition duration-200 group-hover:text-[#ffffff]">
                  Return to BodyTune creation options
                </p>
              </div>
            </div>
            {actionType !== "" &&
              (actionType !== "New" ? (
                <button
                  onClick={() => setActionType("New")}
                  className="bg-[#5d897b] text-white font-quickSand font-semibold text-sm rounded-md py-1 px-2 flex items-center justify-center gap-1 transition duration-200 hover:bg-secondary"
                >
                  Create Exercise Plan
                </button>
              ) : (
                <button
                  onClick={() => setActionType("Select")}
                  className="bg-[#5d897b] text-white font-quickSand font-semibold text-sm rounded-md py-1 px-2 flex items-center justify-center gap-1 transition duration-200 hover:bg-secondary"
                >
                  Select Exercise Plan
                </button>
              ))}
          </div>
          <div className="flex flex-col">
            {!showExercisePlanHtml && (
              <>
                <div className="flex flex-col justify-center items-center">
                  <div className="px-2 phone:w-[96%] mdphone:w-11/12 laptop:w-[270px] group">
                    <button
                      onClick={() => {
                        setActionType("New");
                        setShowExercisePanHtml(true);
                      }}
                      className="bg-[#5d897b] text-white font-quickSand font-semibold text-sm w-full rounded-md py-1 px-2 flex items-center justify-center gap-1 mt-2 transition duration-200 group-hover:bg-secondary"
                    >
                      Create a New Plan
                      <FontAwesomeIcon
                        icon={faPlusSquare}
                        className="text-white text-lg"
                      />
                    </button>
                  </div>
                  <p className="text-center pl-2 font-dmSans font-bold text-lightSecondary phone:text-sm phone:w-[96%] mdphone:w-11/12 laptop:w-[270px] laptop:text-base">
                    OR
                  </p>
                </div>
                <div
                  className="relative flex flex-wrap items-center gap-1 w-12/12 mt-1"
                  style={{
                    flexDirection: showExercisePlanHtml ? "row" : "column",
                  }}
                >
                  <div className="relative pl-2 w-[270px]">
                    <label className="phone:text-sm font-quickSand font-semibold">
                      Filter Exercise Plans
                    </label>
                    <div className={`flex flex-col w-full gap-2 bg-primary`}>
                      <select
                        className={`bg-transparent w-[92%] text-white h-[2.7rem] phone:text-sm font-quickSand`}
                        onChange={selectOnChange}
                        name="mealPlan"
                        defaultValue={1}
                      >
                        <option className="bg-primary font-quickSand" value="1">
                          All
                        </option>
                        <option className="bg-primary font-quickSand" value="2">
                          Saved Exercise Plans
                        </option>
                        <option className="bg-primary font-quickSand" value="3">
                          Created Exercise Plans
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="relative pl-2 w-[270px]">
                    <label className="phone:text-sm font-quickSand font-semibold">
                      Choose a Exercise Plan
                    </label>
                    <div className={`flex flex-col w-full gap-2 bg-primary`}>
                      <select
                        className={`bg-transparent w-[92%] text-white h-[2.7rem] phone:text-sm font-quickSand`}
                        onChange={selectOnChange}
                        name="exercisePlan"
                        defaultValue={
                          exercisePlanFieldsVal.selectedExercisePlan
                        }
                      >
                        <option
                          className="bg-primary font-quickSand"
                          value="0"
                          disabled
                        >
                          Exercise Plans
                        </option>
                        <option className="bg-primary font-quickSand" value="1">
                          Exercise Plan1
                        </option>
                        <option className="bg-primary font-quickSand" value="2">
                          Exercise Plan2
                        </option>
                        <option className="bg-primary font-quickSand" value="3">
                          Exercise Plan3
                        </option>
                        <option className="bg-primary font-quickSand" value="4">
                          Exercise Plan4
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {showExercisePlanHtml && (
          <div className="flex gap-1 bg-black rounded-b-lg pt-2 pb-4 px-2 w-full flex-col midtablet:flex-1">
            {actionType === "New" ? (
              <div className="flex flex-col gap-2 ">
                <motion.div className="phone:w-4/12 min-w-[260px]">
                  <Input
                    name="exercisePlanName"
                    placeholder="Enter the name of the Exercise Plan"
                    state={exercisePlanFieldsVal.exercisePlanName}
                    type="text"
                    label="Exercise Plan Name"
                    onChange={onChange}
                    onBlur={onChange}
                    autoComplete="off"
                    valid={null}
                    validationMessage={""}
                  />
                </motion.div>
              </div>
            ) : (
              <div
                className="relative flex flex-wrap items-center gap-1 w-12/12 mt-1"
                style={{
                  flexDirection: showExercisePlanHtml ? "row" : "column",
                }}
              >
                <div className="relative pl-2 w-[270px]">
                  <label className="phone:text-sm font-quickSand font-semibold">
                    Filter Exercise Plans
                  </label>
                  <div className={`flex flex-col w-full gap-2 bg-primary`}>
                    <select
                      className={`bg-transparent w-[92%] text-white h-[2.7rem] phone:text-sm font-quickSand`}
                      onChange={selectOnChange}
                      name="mealPlan"
                      defaultValue={1}
                    >
                      <option className="bg-primary font-quickSand" value="1">
                        All
                      </option>
                      <option className="bg-primary font-quickSand" value="2">
                        Saved Exercise Plans
                      </option>
                      <option className="bg-primary font-quickSand" value="3">
                        Created Exercise Plans
                      </option>
                    </select>
                  </div>
                </div>
                <div className="relative pl-2 w-[270px]">
                  <label className="phone:text-sm font-quickSand font-semibold">
                    Choose a Exercise Plan
                  </label>
                  <div className={`flex flex-col w-full gap-2 bg-primary`}>
                    <select
                      className={`bg-transparent w-[92%] text-white h-[2.7rem] phone:text-sm font-quickSand`}
                      onChange={selectOnChange}
                      name="exercisePlan"
                      defaultValue={exercisePlanFieldsVal.selectedExercisePlan}
                    >
                      <option
                        className="bg-primary font-quickSand"
                        value="0"
                        disabled
                      >
                        Exercise Plans
                      </option>
                      <option className="bg-primary font-quickSand" value="1">
                        Exercise Plan1
                      </option>
                      <option className="bg-primary font-quickSand" value="2">
                        Exercise Plan2
                      </option>
                      <option className="bg-primary font-quickSand" value="3">
                        Exercise Plan3
                      </option>
                      <option className="bg-primary font-quickSand" value="4">
                        Exercise Plan4
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            <div className="flex flex-col gap-1">
              <label className="font-dmSans phone:text-sm">
                Select Workout Difficulties:
              </label>
              <div className="flex flex-wrap gap-1">
                {workoutDifficulties.map(
                  (difficulty: string, index: number) => (
                    <div
                      className={`group border-[1.5px] border-secondary px-4 py-1 cursor-pointer ${
                        selectedDifficulties.includes(difficulty)
                          ? "bg-secondary"
                          : "bg-none"
                      }`}
                      key={index}
                      onClick={() => {
                        if (selectedDifficulties.includes(difficulty)) {
                          setSelectedDifficulties(
                            selectedDifficulties.filter(
                              (workoutDifficulty: string) =>
                                workoutDifficulty !== difficulty
                            )
                          );
                        } else {
                          setSelectedDifficulties((prev) => [
                            ...prev,
                            difficulty,
                          ]);
                        }
                      }}
                    >
                      <p
                        className={`text-sm font-semibold font-quickSand select-none transition duration-200 ${
                          selectedDifficulties.includes(difficulty)
                            ? "text-[#ffffff]"
                            : "text-[#b3b3b3] group-hover:text-[#ffffff]"
                        }`}
                      >
                        {difficulty}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-dmSans phone:text-sm">Select Day:</label>
              <div className="flex flex-wrap gap-1">
                {weekDates.map((date: string, index: number) => (
                  <div
                    className="group border-[1.5px] border-secondary px-4 py-1 cursor-pointer"
                    key={index}
                    onClick={() => setSelectedWeekDate(date)}
                  >
                    <p
                      className={`text-sm font-semibold font-quickSand transition duration-200 ${
                        selectedWeekDate === date
                          ? "text-[#ffffff]"
                          : "text-[#b3b3b3] group-hover:text-[#ffffff]"
                      }`}
                    >
                      {date}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex w-full gap-1 flex-col overflow-auto justify-start">
              {actionType === "New" && (
                <div className="mt-2 phone:h-[30px] phone:w-max laptop:w-[175px] group">
                  <button
                    onClick={() => {
                      setFormAction("Add");
                      setToggleAddExerciseForm(true);
                    }}
                    className="bg-[#5d897b] text-white font-quickSand font-semibold text-sm px-4 w-full h-full rounded-md flex items-center justify-center gap-1 transition duration-200 group-hover:bg-secondary"
                  >
                    Add an Exercise
                    <FontAwesomeIcon
                      icon={faPlusSquare}
                      className="text-white text-xl"
                    />
                  </button>
                </div>
              )}
              {exercises.length !== 0 && (
                <div className="flex flex-wrap gap-1 w-full h-full overflow-auto">
                  <div className="flex flex-wrap gap-1 w-[100%] overflow-auto flex-row">
                    {exercises.map((exercise: ExerciseType, index: number) => (
                      <div
                        key={index}
                        className="rounded-md flex flex-col font-quickSand bg-lightPrimary p-2 h-max phone:w-[160px] phone:text-xs tablet:w-[180px] tablet:text-sm"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <TablerBarbell
                              color="#D3F0D1"
                              width="1.3em"
                              height="1.3em"
                            />
                            <p className="truncate font-bold text-lightSecondary">
                              {exercise.exerciseName}
                            </p>
                          </div>{" "}
                          <button onClick={() => removeAnExercise(index)}>
                            <FontAwesomeIcon
                              icon={faXmarkCircle}
                              className="text-fadedWarningColor text-lg"
                            />
                          </button>
                        </div>
                        <p className="truncate">{exercise.difficulty}</p>
                        <p className="truncate">{exercise.measurement}</p>
                        <p className="truncate">{exercise.equipment}</p>
                        <button
                          onClick={() => {
                            setFormAction("Edit");
                            setToggleAddExerciseForm(true);
                            setSelectedExercise(exercise);
                          }}
                          className="w-max bg-[#5d897b] text-white font-quickSand font-semibold text-xs rounded-md py-1 px-8  transition duration-200 hover:bg-secondary"
                        >
                          View
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {toggleAddExerciseForm && (
          <AddExerciseForm
            setExercises={setExercises}
            formAction={formAction}
            selectedExercise={selectedExercise}
            setToggleAddExerciseForm={setToggleAddExerciseForm}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default SetExercisePlan;
