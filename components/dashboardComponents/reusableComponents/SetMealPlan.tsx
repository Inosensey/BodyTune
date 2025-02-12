"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Components
import { Input } from "@/components/reusableComponent/formInputs/input";
import AddMealForm from "./AddMealForm";
import MealPlanCard from "./MealPlanCard";

// Icons
import IcOutlineArrowBackIosNew from "@/icons/IcOutlineArrowBackIosNew";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";

// Utils
import { weekDates, bmiClassifications } from "@/utils/initials";

// Types
import {
  IngredientTypes,
  MealInfoTypes,
  nutritionTypes,
} from "@/types/mealTypes";
import { InterfaceBreadCrumbs } from "@/types/inputTypes";
interface props {
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  setSelectedBreadCrumb: React.Dispatch<
    React.SetStateAction<InterfaceBreadCrumbs>
  >;
}
interface meaPlanInterface {
  selectedMealPlan: number;
  mealPlanName: string;
}
interface mealPlanType {
  breakFast: {
    mealInfo: MealInfoTypes | undefined;
    ingredients: IngredientTypes | undefined;
    nutrition: nutritionTypes | undefined;
  };
  lunch: {
    mealInfo: MealInfoTypes | undefined;
    ingredients: IngredientTypes | undefined;
    nutrition: nutritionTypes | undefined;
  };
  dinner: {
    mealInfo: MealInfoTypes | undefined;
    ingredients: IngredientTypes | undefined;
    nutrition: nutritionTypes | undefined;
  };
}

// Initials
const mealPlanFieldsInit: meaPlanInterface = {
  selectedMealPlan: 0,
  mealPlanName: "",
};
const mealPlanInitial: mealPlanType = {
  breakFast: {
    mealInfo: undefined,
    ingredients: undefined,
    nutrition: undefined,
  },
  lunch: {
    mealInfo: undefined,
    ingredients: undefined,
    nutrition: undefined,
  },
  dinner: {
    mealInfo: undefined,
    ingredients: undefined,
    nutrition: undefined,
  },
};

const SetMealPlan = ({
  setSelectedOption,
  setProgress,
  setSelectedBreadCrumb,
}: props) => {
  const [mealPlanFieldsVal, setMealPlanFieldsVal] =
    useState<meaPlanInterface>(mealPlanFieldsInit);
  const [selectedWeekDate, setSelectedWeekDate] = useState<string>("Monday");
  const [selectedBmis, setSelectedBmis] = useState<string[]>([]);
  const [showMealPlanHtml, setShowMealPanHtml] = useState<boolean>(false);
  const [toggleAddMealForm, setToggleAddMealForm] = useState<boolean>(false);
  const [mealPlan, setMealPlan] = useState<mealPlanType>(mealPlanInitial);
  const [selectedMeal, setSelectedMeal] = useState<string>("");
  const [formAction, setFormAction] = useState<string>("Add");
  const [actionType, setActionType] = useState<string>("");

  // Events
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    // checkValidations(validationResult);
    setMealPlanFieldsVal((prev) => ({ ...prev, [name]: value }));
  };
  const selectOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value, options } = event.target;
    setShowMealPanHtml(true);
    if (name === "mealPlan") {
      setActionType("Select");
      setMealPlanFieldsVal((prev) => ({
        ...prev,
        mealPlanName: options[event.target.selectedIndex].text,
      }));
    } else {
      setMealPlanFieldsVal((prev) => ({ ...prev, [name]: value }));
    }
  };
  return (
    <>
      <div
        className="flex flex-col h-full"
        style={{ width: `${showMealPlanHtml ? "100%" : "320px"}` }}
      >
        <div className="bg-black rounded-t-lg pt-4 py-2 w-full">
          <div className="flex items-center gap-1 pr-2 cursor-pointer w-full">
            <div className="flex phone:flex-col mdtablet:justify-between mdtablet:items-center mdtablet:flex-row group">
              <div
                className="flex items-center gap-1"
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
                  Create Meal Plan
                </button>
              ) : (
                <button
                  onClick={() => setActionType("Select")}
                  className="bg-[#5d897b] text-white font-quickSand font-semibold text-sm rounded-md py-1 px-2 flex items-center justify-center gap-1 transition duration-200 hover:bg-secondary"
                >
                  Select Meal Plan
                </button>
              ))}
          </div>
          <div className="flex flex-col">
            {!showMealPlanHtml && (
              <>
                <div className="flex flex-col justify-center items-center">
                  <div className="px-2 phone:w-[96%] mdphone:w-11/12 laptop:w-[270px] group ">
                    <button
                      onClick={() => {
                        setActionType("New");
                        setShowMealPanHtml(true);
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
                <div className="relative flex flex-col flex-wrap items-center gap-1 w-full">
                  <div className="relative pl-2 w-[270px]">
                    <label className="phone:text-sm font-quickSand font-semibold">
                      Filter Meal Plans
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
                          Saved Meal Plans
                        </option>
                        <option className="bg-primary font-quickSand" value="3">
                          Created Meal Plans
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="relative pl-2 w-[270px]">
                    <label className="phone:text-sm font-quickSand font-semibold">
                      Choose a Meal Plan
                    </label>
                    <div className={`flex flex-col w-full gap-2 bg-primary`}>
                      <select
                        className={`bg-transparent w-[92%] text-white h-[2.7rem] phone:text-sm font-quickSand`}
                        onChange={selectOnChange}
                        name="mealPlan"
                        defaultValue={mealPlanFieldsVal.selectedMealPlan}
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
              </>
            )}
          </div>
        </div>
        {showMealPlanHtml && (
          <div className="flex gap-4 bg-black rounded-b-lg pt-2 pb-4 px-2 flex-col laptop:w-full">
            {actionType === "New" ? (
              <>
                <div className="flex gap-2 phone:flex-col phone:h-[35%] tablet:h-[43%] laptop:h-[39%]">
                  <motion.div className="phone:w-4/12 min-w-[260px]">
                    <Input
                      name="mealPlanName"
                      placeholder="Enter the name of the Meal Plan"
                      state={mealPlanFieldsVal.mealPlanName}
                      type="text"
                      label="Meal Plan Name"
                      onChange={onChange}
                      onBlur={onChange}
                      autoComplete="off"
                      valid={null}
                      validationMessage={""}
                    />
                  </motion.div>
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-col gap-1">
                      <label className="font-dmSans phone:text-sm">
                        Select BMI classifications:
                      </label>
                      <div className="flex flex-wrap gap-1">
                        {bmiClassifications.map(
                          (bmi: string, index: number) => (
                            <div
                              className={`group border-[1.5px] border-secondary px-4 py-1 cursor-pointer ${
                                selectedBmis.includes(bmi)
                                  ? "bg-secondary"
                                  : "bg-none"
                              }`}
                              key={index}
                              onClick={() => {
                                if (selectedBmis.includes(bmi)) {
                                  setSelectedBmis(
                                    selectedBmis.filter(
                                      (bmiClassification: string) =>
                                        bmiClassification !== bmi
                                    )
                                  );
                                } else {
                                  setSelectedBmis((prev) => [...prev, bmi]);
                                }
                              }}
                            >
                              <p
                                className={`text-sm font-semibold font-quickSand select-none transition duration-200 ${
                                  selectedBmis.includes(bmi)
                                    ? "text-[#ffffff]"
                                    : "text-[#b3b3b3] group-hover:text-[#ffffff]"
                                }`}
                              >
                                {bmi}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="font-dmSans phone:text-sm">
                        Select Day:
                      </label>
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
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-1">
                <div className="relative flex flex-wrap items-center gap-1 w-full phone:flex-col mdtablet:flex-row">
                  <div className="relative w-[270px]">
                    <label className="phone:text-sm font-quickSand font-semibold">
                      Filter Meal Plans
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
                          Saved Meal Plans
                        </option>
                        <option className="bg-primary font-quickSand" value="3">
                          Created Meal Plans
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="relative w-[270px]">
                    <label className="phone:text-sm font-quickSand font-semibold">
                      Choose a Meal Plan
                    </label>
                    <div className={`flex flex-col w-full gap-2 bg-primary`}>
                      <select
                        className={`bg-transparent w-[92%] text-white h-[2.7rem] phone:text-sm font-quickSand`}
                        onChange={selectOnChange}
                        name="mealPlan"
                        defaultValue={mealPlanFieldsVal.selectedMealPlan}
                        value={mealPlanFieldsVal.selectedMealPlan}
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
                <div className="flex flex-col gap-1">
                  <div className="flex flex-col gap-1">
                    <label className="font-dmSans phone:text-sm">
                      BMI classifications:
                    </label>
                    <div className="flex flex-wrap gap-1">
                      {bmiClassifications.map((bmi: string, index: number) => (
                        <div
                          className={`group border-[1.5px] border-secondary px-4 py-1 cursor-pointer ${
                            selectedBmis.includes(bmi)
                              ? "bg-secondary"
                              : "bg-none"
                          }`}
                          key={index}
                          onClick={() => {
                            if (selectedBmis.includes(bmi)) {
                              setSelectedBmis(
                                selectedBmis.filter(
                                  (bmiClassification: string) =>
                                    bmiClassification !== bmi
                                )
                              );
                            } else {
                              setSelectedBmis((prev) => [...prev, bmi]);
                            }
                          }}
                        >
                          <p
                            className={`text-sm font-semibold font-quickSand select-none transition duration-200 ${
                              selectedBmis.includes(bmi)
                                ? "text-[#ffffff]"
                                : "text-[#b3b3b3] group-hover:text-[#ffffff]"
                            }`}
                          >
                            {bmi}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-dmSans phone:text-sm">
                      Select Day:
                    </label>
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
                </div>
              </div>
            )}
            <div className="flex gap-1 justify-between phone:flex-col mdtablet:flex-1 mdtablet:flex-row">
              <MealPlanCard
                meal={mealPlan.breakFast}
                mealType="Breakfast"
                setFormAction={setFormAction}
                setSelectedMeal={setSelectedMeal}
                setToggleAddMealForm={setToggleAddMealForm}
              />
              <MealPlanCard
                meal={mealPlan.lunch}
                mealType="Lunch"
                setFormAction={setFormAction}
                setSelectedMeal={setSelectedMeal}
                setToggleAddMealForm={setToggleAddMealForm}
              />
              <MealPlanCard
                meal={mealPlan.dinner}
                mealType="Dinner"
                setFormAction={setFormAction}
                setSelectedMeal={setSelectedMeal}
                setToggleAddMealForm={setToggleAddMealForm}
              />
            </div>
          </div>
        )}
      </div>

      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {toggleAddMealForm && (
          <AddMealForm
            selectedMeal={selectedMeal}
            setMealPlan={setMealPlan}
            setToggleAddMealForm={setToggleAddMealForm}
            formAction={formAction}
            mealPlan={mealPlan}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default SetMealPlan;
