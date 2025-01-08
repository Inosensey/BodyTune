"use client";
import {  useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// components
import { Input } from "@/components/reusableComponent/formInputs/input";
import AddExerciseForm from "./AddExerciseForm";

// Icons
import IcOutlineArrowBackIosNew from "@/icons/IcOutlineArrowBackIosNew";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";

// Types
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
import { weekDates } from "@/utils/initials";
const exercisePlanInitials: exercisePlanInterface = {
  selectedExercisePlan: 0,
  exercisePlanName: "",
};
const SetExercisePlan = ({
  setSelectedOption,
  setProgress,
  setSelectedBreadCrumb,
}: props) => {
  // States
  const [selectedWeekDate, setSelectedWeekDate] = useState<string>("Monday");
  // const [isZoomed, setIsZoomed] = useState<number | null>(null);
  const [showExercisePlanHtml, setShowExercisePanHtml] =
    useState<boolean>(false);
  const [toggleAddExerciseForm, setTogglAddExerciseForm] =
    useState<boolean>(false);
  const [exercisePlanFieldsVal, setExercisePlanFieldsVal] =
    useState<exercisePlanInterface>(exercisePlanInitials);
  // const [initialPositions, setInitialPositions] = useState<
  //   { x: number; y: number }[]
  // >([]);
  // const [divs, setDivs] = useState<number[]>([]);

  // Refs for each motion.div
  // const motionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // const addMotionDiv = () => {
  //   setDivs((prev) => [...prev, prev.length]); // Adds new div identifier to trigger re-render
  // };

  // useEffect(() => {
  //   // Capture initial positions when the motion divs are added
  //   motionRefs.current.forEach((ref, index) => {
  //     if (ref) {
  //       const rect = ref.getBoundingClientRect();
  //       setInitialPositions((prev) => {
  //         const newPositions = [...prev];
  //         newPositions[index] = { x: rect.left, y: rect.top };
  //         return newPositions;
  //       });
  //     }
  //   });
  // }, [divs]);

  // Events
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    // const validationParams = {
    //   stateName: name,
    //   value: value,
    // };

    // const validationResult: validation = FormValidation(validationParams);

    // setMealStepValidations((prev) => ({
    //   ...prev,
    //   [validationResult.validationName!]: {
    //     valid: validationResult.valid,
    //     validationMessage: validationResult.validationMessage,
    //   },
    // }));

    // const allInputValidationResult = checkAllInputValidations();
    // checkValidations(validationResult);
    setExercisePlanFieldsVal((prev) => ({ ...prev, [name]: value }));
  };
  const selectOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value, options } = event.target;

    // const validationParams = {
    //   stateName: name,
    //   value: value,
    // };

    // const validationResult: validation = FormValidation(validationParams);

    // setFirstStepValidation((prev) => ({
    //   ...prev,
    //   [validationResult.validationName!]: {
    //     valid: validationResult.valid,
    //     validationMessage: validationResult.validationMessage,
    //   },
    // }));

    // const allInputValidationResult = checkAllInputValidations();
    // checkValidations(validationResult);
    if (name === "exercisePlan") {
      setExercisePlanFieldsVal((prev) => ({
        ...prev,
        exercisePlanName: options[event.target.selectedIndex].text,
      }));
    } else {
      setExercisePlanFieldsVal((prev) => ({ ...prev, [name]: value }));
    }
    setShowExercisePanHtml(true);
  };
  return (
    <>
      <div className="flex flex-col h-full w-min-[350px]">
        <div className="bg-black rounded-t-lg pt-4 py-2 w-full">
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
          <div className="mt-2 flex flex-col gap-2">
            {!showExercisePlanHtml && (
              <>
                <div className="px-2 phone:w-[96%] mdphone:w-11/12 laptop:w-[270px] group">
                  <button
                    onClick={() => setShowExercisePanHtml(true)}
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
              </>
            )}
            <div className="pl-2 phone:w-[96%] mdphone:w-11/12 laptop:w-[270px]">
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
        </div>
        {showExercisePlanHtml && (
          <div className="flex flex-col gap-1 bg-black flex-1 rounded-b-lg pt-2 pb-4 px-3 h-[70%]">
            <div className="flex flex-col gap-2 phone:h-[35%] tablet:h-[25%] ">
              <motion.div className="phone:w-5/12">
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
              <div className="flex gap-1">
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
            <div className="flex flex-col gap-1 overflow-auto justify-start phone:h-[69%] tablet:h-[89%]">
              <div className="flex flex-wrap gap-1 w-full h-full overflow-auto">
              <div className="h-[125px] phone:w-[96%] mdphone:w-11/12 laptop:w-[120px] group">
                  <button
                    onClick={() => setTogglAddExerciseForm(true)}
                    className="bg-[#5d897b] text-white font-quickSand font-semibold text-sm w-full h-full rounded-md py-1 px-2 flex flex-col-reverse items-center justify-center gap-1 mt-2 transition duration-200 group-hover:bg-secondary"
                  >
                    Add an Exercise
                    <FontAwesomeIcon
                      icon={faPlusSquare}
                      className="text-white text-xl"
                    />
                  </button>
                </div>
                <div></div>
                {/* {divs.map((_, index) => (
                  <div
                    key={index}
                    className="w-[80px] flex border-[1.5px] border-lightSecondary"
                  >
                    <motion.div
                      className={`w-[80px] flex font-dmSans text-sm cursor-pointer absolute`}
                      animate={
                        isZoomed === index
                          ? {
                              x: "-50%", // Compensate for alignment
                              y: "-50%", // Adjust vertical alignment
                              top: "50%", // Center vertically
                              left: "50%", // Center horizontally
                              height: "50%",
                              transition: { duration: 0.5, ease: "linear" },
                            }
                          : isZoomed === null
                          ? {} // No animation when unzoomed and in flex
                          : {
                              x: initialPositions[index]?.x ?? 0,
                              y: initialPositions[index]?.y ?? 0,
                              transition: { duration: 0.5, ease: "linear" },
                            }
                      }
                      onClick={() =>
                        setIsZoomed((prev) => (prev === index ? null : index))
                      }
                    >
                      <p>
                        The container of this text will scale to the center of
                        the screen when clicked
                      </p>
                    </motion.div>
                  </div>
                ))} */}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {toggleAddExerciseForm && (
          <AddExerciseForm setToggleAddExerciseForm={setTogglAddExerciseForm} />
        )}
      </AnimatePresence>
    </>
  );
};

export default SetExercisePlan;
