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
interface meaPlanInterface {
  selectedMealPlan: number;
  mealPlanName: string;
}

interface MealInfoTypes {
  mealName: string;
  shortDescription: string;
  cookingInstruction: string;
}
interface IngredientTypes {
  [key: string]: {
    id: string;
    ingredientName: string;
    ingredientValue: string;
    caloriesName: string;
    caloriesValue: string;
    proteinsName: string;
    proteinsValue: string;
    carbsName: string;
    carbsValue: string;
    fatName: string;
    fatValue: string;
  };
}
interface nutritionTypes {
  caloriesValue: number;
  proteinsValue: number;
  carbsValue: number;
  fatValue: number;
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
import { weekDates } from "@/utils/initials";
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
  const [showMealPlanHtml, setShowMealPanHtml] = useState<boolean>(false);
  const [toggleAddMealForm, setToggleAddMealForm] = useState<boolean>(false);
  const [mealPlan, setMealPlan] = useState<mealPlanType>(mealPlanInitial);
  const [selectedMeal, setSelectedMeal] = useState<string>("");
  const [formAction, setFormAction] = useState<string>("Add");

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
      <div className="flex flex-col h-full" 
          style={{ width: `${showMealPlanHtml ? "100%" : "max"}` }}>
        <div
          className="bg-black rounded-t-lg pt-4 py-2 w-12/12"
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
            <div
              className="relative flex flex-wrap items-center gap-1 w-12/12"
              style={{ flexDirection: showMealPlanHtml ? "row" : "column" }}
            >
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
          </div>
        </div>
        {showMealPlanHtml && (
          <div className="flex gap-1 bg-black rounded-b-lg pt-2 pb-4 px-2 flex-col midtablet:flex-1 mdtablet:h-[80%] laptop:w-12/12">
            <div className="flex flex-col gap-2 phone:h-[35%] tablet:h-[43%] laptop:h-[34%]">
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
            <div className="flex gap-1 justify-between phone:flex-col mdtablet:flex-1 mdtablet:flex-row">
              <div className="overflow-auto border-[1.5px] border-lightSecondary phone:w-[100%] phone:h-[300px] mdtablet:h-[100%] mdtablet:w-[33%]">
                {mealPlan.breakFast.mealInfo ? (
                  <div className="py-1 px-2 flex flex-col gap-[0.1rem]">
                    <div className="flex justify-between w-[100%]">
                      <p className="font-dmSans font-bold text-lightSecondary text-lg m-0 p-0">
                        {mealPlan.breakFast.mealInfo.mealName}
                      </p>
                      <button
                        onClick={() => {
                          setToggleAddMealForm(true);
                          setFormAction("Edit");
                          setSelectedMeal("Breakfast");
                        }}
                        className="bg-[#5d897b] text-white font-quickSand font-semibold text-sm rounded-md py-[0.2rem] px-4 w-max transition duration-200 hover:bg-secondary"
                      >
                        Edit
                      </button>
                    </div>
                    <div>
                      <label className="text-[#a3e09f] font-dmSans text-base font-semibold underline">
                        Ingredients:
                      </label>
                      <div className="flex gap-1">
                        <p className="font-dmSans text-white text-sm">
                          {Object.entries(mealPlan.breakFast.ingredients!)
                            .map(([, value]) => value.ingredientValue)
                            .join(", ")}
                        </p>
                      </div>
                    </div>
                    <div>
                      <label className="text-[#a3e09f] font-dmSans text-base font-semibold underline">
                        Nutrition:
                      </label>
                      <div className="flex flex-wrap gap-2 items-center">
                        <div className="flex items-center gap-1">
                          <p className="font-dmSans text-white text-sm">
                            Calories:
                          </p>
                          <p className="font-quickSand text-sm">
                            {mealPlan.breakFast.nutrition?.caloriesValue}g
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <p className="font-dmSans text-white text-sm">
                            Protein:
                          </p>
                          <p className="font-quickSand text-sm">
                            {mealPlan.breakFast.nutrition?.proteinsValue}g
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <p className="font-dmSans text-white text-sm">
                            Carbs:
                          </p>
                          <p className="font-quickSand text-sm">
                            {mealPlan.breakFast.nutrition?.carbsValue}g
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <p className="font-dmSans text-white text-sm">Fat:</p>
                          <p className="font-quickSand text-sm">
                            {mealPlan.breakFast.nutrition?.fatValue}g
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="text-[#a3e09f] font-dmSans text-base font-semibold underline">
                        Cooking Instructions:
                      </label>
                      <p className="font-dmSans text-white text-sm">
                        {mealPlan.breakFast.mealInfo.cookingInstruction}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="w-[100%] flex flex-col justify-center items-center">
                    <Image
                      src="/assets/svg/healthy-1.svg"
                      width={200}
                      height={200}
                      alt="Logo"
                    />
                    <p
                      onClick={() => {
                        setToggleAddMealForm(true);
                        setFormAction("Add");
                        setSelectedMeal("Breakfast");
                      }}
                      className="font-dmSans font-semibold text-lightSecondary underline cursor-pointer"
                    >
                      Make a Breakfast Meal
                    </p>
                  </div>
                )}
              </div>
              <div className="overflow-auto border-[1.5px] border-lightSecondary phone:w-[100%] phone:h-[300px] mdtablet:h-[100%] mdtablet:w-[33%]">
                {mealPlan.lunch.mealInfo ? (
                  <div className="py-1 px-2 flex flex-col gap-[0.1rem]">
                    <div className="flex justify-between w-[100%]">
                      <p className="font-dmSans font-bold text-lightSecondary text-lg m-0 p-0">
                        {mealPlan.lunch.mealInfo.mealName}
                      </p>
                      <button
                        onClick={() => {
                          setToggleAddMealForm(true);
                          setFormAction("Edit");
                          setSelectedMeal("Lunch");
                        }}
                        className="bg-[#5d897b] text-white font-quickSand font-semibold text-sm rounded-md py-[0.2rem] px-4 w-max transition duration-200 hover:bg-secondary"
                      >
                        Edit
                      </button>
                    </div>
                    <div>
                      <label className="text-[#a3e09f] font-dmSans text-base font-semibold underline">
                        Ingredients:
                      </label>
                      <div className="flex gap-1">
                        <p className="font-dmSans text-white text-sm">
                          {Object.entries(mealPlan.lunch.ingredients!)
                            .map(([, value]) => value.ingredientValue)
                            .join(", ")}
                        </p>
                      </div>
                    </div>
                    <div>
                      <label className="text-[#a3e09f] font-dmSans text-base font-semibold underline">
                        Nutrition:
                      </label>
                      <div className="flex flex-wrap gap-2 items-center">
                        <div className="flex items-center gap-1">
                          <p className="font-dmSans text-white text-sm">
                            Calories:
                          </p>
                          <p className="font-quickSand text-sm">
                            {mealPlan.lunch.nutrition?.caloriesValue}g
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <p className="font-dmSans text-white text-sm">
                            Protein:
                          </p>
                          <p className="font-quickSand text-sm">
                            {mealPlan.lunch.nutrition?.proteinsValue}g
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <p className="font-dmSans text-white text-sm">
                            Carbs:
                          </p>
                          <p className="font-quickSand text-sm">
                            {mealPlan.lunch.nutrition?.carbsValue}g
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <p className="font-dmSans text-white text-sm">Fat:</p>
                          <p className="font-quickSand text-sm">
                            {mealPlan.lunch.nutrition?.fatValue}g
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="text-[#a3e09f] font-dmSans text-base font-semibold underline">
                        Cooking Instructions:
                      </label>
                      <p className="font-dmSans text-white text-sm">
                        {mealPlan.lunch.mealInfo.cookingInstruction}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="w-[100%] flex flex-col justify-center items-center">
                    <Image
                      src="/assets/svg/healthy-1.svg"
                      width={200}
                      height={200}
                      alt="Logo"
                    />
                    <p
                      onClick={() => {
                        setToggleAddMealForm(true);
                        setFormAction("Add");
                        setSelectedMeal("Lunch");
                      }}
                      className="font-dmSans font-semibold text-lightSecondary underline cursor-pointer"
                    >
                      Make a Lunch Meal
                    </p>
                  </div>
                )}
              </div>
              <div className="overflow-auto border-[1.5px] border-lightSecondary phone:w-[100%] phone:h-[300px] mdtablet:h-[100%] mdtablet:w-[33%]">
                {mealPlan.dinner.mealInfo ? (
                  <div className="py-1 px-2 flex flex-col gap-[0.1rem]">
                    <div className="flex justify-between w-[100%]">
                      <p className="font-dmSans font-bold text-lightSecondary text-lg m-0 p-0">
                        {mealPlan.dinner.mealInfo.mealName}
                      </p>
                      <button
                        onClick={() => {
                          setToggleAddMealForm(true);
                          setFormAction("Edit");
                          setSelectedMeal("Dinner");
                        }}
                        className="bg-[#5d897b] text-white font-quickSand font-semibold text-sm rounded-md py-[0.2rem] px-4 w-max transition duration-200 hover:bg-secondary"
                      >
                        Edit
                      </button>
                    </div>
                    <div>
                      <label className="text-[#a3e09f] font-dmSans text-base font-semibold underline">
                        Ingredients:
                      </label>
                      <div className="flex gap-1">
                        <p className="font-dmSans text-white text-sm">
                          {Object.entries(mealPlan.dinner.ingredients!)
                            .map(([, value]) => value.ingredientValue)
                            .join(", ")}
                        </p>
                      </div>
                    </div>
                    <div>
                      <label className="text-[#a3e09f] font-dmSans text-base font-semibold underline">
                        Nutrition:
                      </label>
                      <div className="flex flex-wrap gap-2 items-center">
                        <div className="flex items-center gap-1">
                          <p className="font-dmSans text-white text-sm">
                            Calories:
                          </p>
                          <p className="font-quickSand text-sm">
                            {mealPlan.dinner.nutrition?.caloriesValue}g
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <p className="font-dmSans text-white text-sm">
                            Protein:
                          </p>
                          <p className="font-quickSand text-sm">
                            {mealPlan.dinner.nutrition?.proteinsValue}g
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <p className="font-dmSans text-white text-sm">
                            Carbs:
                          </p>
                          <p className="font-quickSand text-sm">
                            {mealPlan.dinner.nutrition?.carbsValue}g
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <p className="font-dmSans text-white text-sm">Fat:</p>
                          <p className="font-quickSand text-sm">
                            {mealPlan.dinner.nutrition?.fatValue}g
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="text-[#a3e09f] font-dmSans text-base font-semibold underline">
                        Cooking Instructions:
                      </label>
                      <p className="font-dmSans text-white text-sm">
                        {mealPlan.dinner.mealInfo.cookingInstruction}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="w-[100%] flex flex-col justify-center items-center">
                    <Image
                      src="/assets/svg/healthy-1.svg"
                      width={200}
                      height={200}
                      alt="Logo"
                    />
                    <p
                      onClick={() => {
                        setToggleAddMealForm(true);
                        setFormAction("Add");
                        setSelectedMeal("Dinner");
                      }}
                      className="font-dmSans font-semibold text-lightSecondary underline cursor-pointer"
                    >
                      Make a Dinner Meal
                    </p>
                  </div>
                )}
              </div>
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
