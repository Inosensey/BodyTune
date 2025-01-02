"use client";
import { useState } from "react";
import {motion} from "framer-motion"

// components
import { Input } from "@/components/reusableComponent/formInputs/input";

// Icons
import IcOutlineArrowBackIosNew from "@/icons/IcOutlineArrowBackIosNew";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";

// Types
interface thirdStepInterface {
  selectedExercisePlan: number;
  exercisePlanName: string;
}
import { InterfaceBreadCrumbs } from "@/types/inputTypes";
import Image from "next/image";
interface props {
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  setSelectedBreadCrumb: React.Dispatch<
    React.SetStateAction<InterfaceBreadCrumbs>
  >;
}

// Initials
import { weekDates } from "@/utils/initials";
const thirdStepInitials: thirdStepInterface = {
  selectedExercisePlan: 0,
  exercisePlanName: "",
};
const ThirdStep = ({
  setSelectedOption,
  setProgress,
  setSelectedBreadCrumb,
}: props) => {
  // States
  const [selectedWeekDate, setSelectedWeekDate] = useState<string>("Monday");
  const [showExercisePlanHtml, setShowExercisePanHtml] =
    useState<boolean>(false);
  const [thirdStepFieldsVal, setThirdStepFieldsVal] =
    useState<thirdStepInterface>(thirdStepInitials);

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
    setThirdStepFieldsVal((prev) => ({ ...prev, [name]: value }));
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
      setThirdStepFieldsVal((prev) => ({
        ...prev,
        exercisePlanName: options[event.target.selectedIndex].text,
      }));
    } else {
      setThirdStepFieldsVal((prev) => ({ ...prev, [name]: value }));
    }
    setShowExercisePanHtml(true);
  };
  return (
    <>
      <div className="flex flex-col h-full w-min-[350px]">
        <div
          className="bg-black rounded-t-lg pt-4 py-2 w-full"
        >
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
            <div className="relative pl-2 phone:w-[96%] mdphone:w-11/12 laptop:w-[270px]">
              <label className="phone:text-sm font-quickSand font-semibold">
                Choose a Exercise Plan
              </label>
              <div className={`flex flex-col w-full gap-2 bg-primary`}>
                <select
                  className={`bg-transparent w-[92%] text-white h-[2.7rem] phone:text-sm font-quickSand`}
                  onChange={selectOnChange}
                  name="exercisePlan"
                  defaultValue={thirdStepFieldsVal.selectedExercisePlan}
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
          <div className="flex flex-col gap-1 bg-black flex-1 rounded-b-lg pt-2 pb-4 px-2 h-[70%] w-[1150px]">
            <div className="flex flex-col gap-2 phone:h-[35%] tablet:h-[25%] ">
              <motion.div className="phone:w-3/12">
                <Input
                  name="exercisePlanName"
                  placeholder="Enter the name of the Exercise Plan"
                  state={thirdStepFieldsVal.exercisePlanName}
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
            <div className="flex-1 flex gap-1 justify-between phone:h-[69%] tablet:h-[89%]">
              <div className="w-[33%] h-[100%] overflow-auto flex flex-1 border-[1.5px] border-lightSecondary">
                <div className="w-[100%] flex flex-col justify-center items-center">
                  <Image
                    src="/assets/svg/dumbbell-2.svg"
                    width={200}
                    height={200}
                    alt="Logo"
                  />
                  <p
                    className="font-dmSans font-semibold text-lightSecondary underline cursor-pointer"
                  >
                    Make a Breakfast Meal
                  </p>
                </div>
              </div>
              <div className="w-[33%] h-[100%] overflow-auto flex flex-1 border-[1.5px] border-lightSecondary">
                <div className="w-[100%] flex flex-col justify-center items-center">
                  <Image
                    src="/assets/svg/dumbbell-2.svg"
                    width={200}
                    height={200}
                    alt="Logo"
                  />
                  <p
                    className="font-dmSans font-semibold text-lightSecondary underline cursor-pointer"
                  >
                    Make a Lunch Meal
                  </p>
                </div>
              </div>
              <div className="w-[33%] h-[100%] overflow-auto flex flex-1 border-[1.5px] border-lightSecondary">
                <div className="w-[100%] flex flex-col justify-center items-center">
                  <Image
                    src="/assets/svg/dumbbell-2.svg"
                    width={200}
                    height={200}
                    alt="Logo"
                  />
                  <p
                    className="font-dmSans font-semibold text-lightSecondary underline cursor-pointer"
                  >
                    Make a Dinner Meal
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ThirdStep;
