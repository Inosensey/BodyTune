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

// Initials
import { weekDates } from "@/utils/initials";
const mealPlanFieldsInit: meaPlanInterface = {
  selectedMealPlan: 0,
  mealPlanName: "",
};
const ingredientsDummyData: Array<string> = [
  "Chicken",
  "Salt",
  "Pepper",
  "Butter",
  "Paprika",
];

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
    setMealPlanFieldsVal((prev) => ({ ...prev, [name]: value }));
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
      <div className="flex flex-col h-full w-full">
        <div
          // style={{ height: `${showMealPlanHtml && "27%"}` }}
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
        {showMealPlanHtml && (
          <div className="flex flex-col gap-1 bg-black rounded-b-lg pt-2 pb-4 px-2 w-full max-w-[1150px] midtablet:flex-1 mdtabet:h-[70%]">
            <div className="flex flex-col gap-2 phone:h-[35%] tablet:h-[43%]">
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
                <div className="w-[100%] flex flex-col justify-center items-center">
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
              </div>
              <div className="overflow-auto border-[1.5px] border-lightSecondary phone:w-[100%] phone:h-[300px] mdtablet:h-[100%] mdtablet:w-[33%]">
                <div className="w-[100%] flex flex-col justify-center items-center">
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
              </div>
              <div className="overflow-auto border-[1.5px] border-lightSecondary phone:w-[100%] phone:h-[300px] mdtablet:h-[100%] mdtablet:w-[33%]">
                <div className="w-[100%] hidden flex-col justify-center items-center">
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
                <div className="py-1 px-2 flex flex-col gap-[0.1rem]">
                  <div className="flex justify-between w-[100%]">
                    <p className="font-dmSans font-bold text-lightSecondary text-lg m-0 p-0">
                      Delicious Chicken
                    </p>
                    <button className="bg-[#5d897b] text-white font-quickSand font-semibold text-sm rounded-md py-[0.2rem] px-4 w-max transition duration-200 hover:bg-secondary">
                      Edit
                    </button>
                  </div>
                  <div>
                    <label className="text-[#a3e09f] font-dmSans text-base font-semibold underline">
                      Ingredients:
                    </label>
                    <div className="flex gap-1">
                      <p className="font-dmSans text-white text-sm">
                        {ingredientsDummyData.join(", ")}
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
                        <p className="font-quickSand text-sm">0</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <p className="font-dmSans text-white text-sm">
                          Protein:
                        </p>
                        <p className="font-quickSand text-sm">0g</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <p className="font-dmSans text-white text-sm">Carbs:</p>
                        <p className="font-quickSand text-sm">0g</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <p className="font-dmSans text-white text-sm">Fat:</p>
                        <p className="font-quickSand text-sm">0g</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-[#a3e09f] font-dmSans text-base font-semibold underline">
                      Cooking Instructions:
                    </label>
                    <p className="font-dmSans text-white text-sm">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Deserunt sapiente excepturi cupiditate! Maiores eligendi
                      quia voluptatum necessitatibus aut et quos nostrum
                      incidunt iusto sequi laudantium quidem non, provident
                      tenetur qui.
                    </p>
                  </div>
                </div>
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

export default SetMealPlan;
