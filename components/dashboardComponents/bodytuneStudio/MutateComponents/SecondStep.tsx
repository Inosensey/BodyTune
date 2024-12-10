"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

// Components
import { Input } from "@/components/reusableComponent/formInputs/input";
import AddMealForm from "./AddMealForm";

// Icons
import IcOutlineArrowBackIosNew from "@/icons/IcOutlineArrowBackIosNew";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";

// Types
import { InterfaceBreadCrumbs } from "@/types/inputTypes";
interface props {
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  setSelectedBreadCrumb: React.Dispatch<
    React.SetStateAction<InterfaceBreadCrumbs>
  >;
}
interface secondStepInterface {
  selectedMealPlan: number;
  mealPlanName: string;
}

// Initials
import { weekDates } from "@/utils/initials";
const secondStepFieldsInit: secondStepInterface = {
  selectedMealPlan: 0,
  mealPlanName: "",
};

const SecondStep = ({
  setSelectedOption,
  setProgress,
  setSelectedBreadCrumb,
}: props) => {
  const [secondStepFieldsVal, setSecondStepFieldsVal] =
    useState<secondStepInterface>(secondStepFieldsInit);
  const [selectedWeekDate, setSelectedWeekDate] = useState<string>("Monday");
  const [showMealPlanHtml, setShowMealPanHtml] = useState<boolean>(false);
  const [toggleAddMealForm, setToggleAddMealForm] = useState<boolean>(false);

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
    setSecondStepFieldsVal((prev) => ({ ...prev, [name]: value }));
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
    setShowMealPanHtml(true);
    if (name === "mealPlan") {
      setSecondStepFieldsVal((prev) => ({ ...prev, mealPlanName: options[event.target.selectedIndex].text }));
    } else {
      setSecondStepFieldsVal((prev) => ({ ...prev, [name]: value }));
    }
  };
  return (
    <>
      <div className=" flex flex-col w-min-[350px]">
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
            {!showMealPlanHtml && (
              <>
                <div className="px-2 phone:w-[96%] mdphone:w-11/12 laptop:w-[270px] group">
                  <button
                    onClick={() => setShowMealPanHtml(true)}
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
                Choose a Meal Plan
              </label>
              <div className={`flex flex-col w-full gap-2 bg-primary`}>
                <select
                  className={`bg-transparent w-[92%] text-white h-[2.7rem] phone:text-sm font-quickSand`}
                  onChange={selectOnChange}
                  name="mealPlan"
                  defaultValue={secondStepFieldsVal.selectedMealPlan}
                >
                  <option
                    className="bg-primary font-quickSand"
                    value="0"
                    disabled
                  >
                    Meal Plans
                  </option>
                  <option className="bg-primary font-quickSand" value="1">
                    Meal Plan1
                  </option>
                  <option className="bg-primary font-quickSand" value="2">
                    Meal Plan2
                  </option>
                  <option className="bg-primary font-quickSand" value="3">
                    Meal Plan3
                  </option>
                  <option className="bg-primary font-quickSand" value="4">
                    Meal Plan4
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        {showMealPlanHtml && (
          <div className="flex flex-col gap-1 bg-black flex-1 rounded-b-lg pt-2 pb-4 px-2 w-[1150px]">
            <motion.div className="phone:w-3/12">
              <Input
                name="mealPlanName"
                placeholder="Enter the name of the Meal Plan"
                state={secondStepFieldsVal.mealPlanName}
                type="text"
                label="Meal Plan Name"
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
            <div className="flex-1 flex justify-between">
              <div className="w-[33%] border-[1.5px] border-lightSecondary flex flex-col justify-center items-center">
                <Image
                  src="/assets/svg/healthy-1.svg"
                  width={200}
                  height={200}
                  alt="Logo"
                />
                <p
                  onClick={() => setToggleAddMealForm(true)}
                  className="font-dmSans font-semibold text-lightSecondary underline cursor-pointer"
                >
                  Make a Breakfast Meal
                </p>
              </div>
              <div className="w-[33%] border-[1.5px] border-lightSecondary flex flex-col justify-center items-center">
                <Image
                  src="/assets/svg/healthy-1.svg"
                  width={200}
                  height={200}
                  alt="Logo"
                />
                <p
                  onClick={() => setToggleAddMealForm(true)}
                  className="font-dmSans font-semibold text-lightSecondary underline cursor-pointer"
                >
                  Make a Lunch Meal
                </p>
              </div>
              <div className="w-[33%] border-[1.5px] border-lightSecondary flex flex-col justify-center items-center">
                <Image
                  src="/assets/svg/healthy-1.svg"
                  width={200}
                  height={200}
                  alt="Logo"
                />
                <p
                  onClick={() => setToggleAddMealForm(true)}
                  className="font-dmSans font-semibold text-lightSecondary underline cursor-pointer"
                >
                  Make a Dinner Meal
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {toggleAddMealForm && (
          <AddMealForm setToggleAddMealForm={setToggleAddMealForm} />
        )}
      </AnimatePresence>
    </>
  );
};

export default SecondStep;
