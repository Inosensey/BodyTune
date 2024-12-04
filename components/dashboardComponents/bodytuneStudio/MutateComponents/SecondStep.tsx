"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";

// Components
import IcOutlineArrowBackIosNew from "@/icons/IcOutlineArrowBackIosNew";

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
}

// Initials
import { weekDates } from "@/utils/initials";
import AddMealForm from "./AddMealForm";

const SecondStep = ({
  setSelectedOption,
  setProgress,
  setSelectedBreadCrumb,
}: props) => {
  const [secondStepFieldsVal, setSecondStepFieldsVal] =
    useState<secondStepInterface>({ selectedMealPlan: 0 });
  const [selectedWeekDate, setSelectedWeekDate] = useState<string>("Monday");
  const [showMealPlanHtml, setShowMealPanHtml] = useState<boolean>(false);
  const [toggleAddMealForm, setToggleAddMealForm] = useState<boolean>(false);

  // Events
  const selectOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

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
    setSecondStepFieldsVal((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      <div className=" flex flex-col w-min-[350px]">
        <div className="bg-black rounded-t-lg pt-4 px-2 w-full">
          <div
            className="flex items-center gap-1 cursor-pointer w-max group"
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
          <div className="relative mt-[1rem] phone:w-[96%] mdphone:w-11/12 laptop:w-[270px]">
            <label className="phone:text-sm font-quickSand font-semibold">
              Choose a Meal Plan
            </label>
            <div className={`flex flex-col w-full gap-2 bg-primary`}>
              <select
                className={`bg-transparent w-[92%] text-white h-[2.7rem] phone:text-sm font-quickSand`}
                onChange={selectOnChange}
                name="birthMonth"
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
        {showMealPlanHtml && (
          <div className="flex flex-col gap-1 bg-black flex-1 rounded-b-lg pt-2 pb-4 px-2 w-[1150px]">
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
