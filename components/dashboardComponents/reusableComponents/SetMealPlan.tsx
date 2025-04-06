"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Components
import { Input } from "@/components/reusableComponent/formInputs/input";
import AddMealForm from "./AddMealForm";
import MealPlanCard from "./MealPlanCard";

// Icons
import IcOutlineArrowBackIosNew from "@/icons/IcOutlineArrowBackIosNew";
import SolarUndoLeftRoundSquareOutline from "@/icons/SolarUndoLeftRoundSquareOutline";
import SolarRestartSquareLineDuotone from "@/icons/SolarRestartSquareLineDuotone";

// Utils
import { weekDates, bmiClassifications } from "@/utils/initials";
import { arrangeMealPlan } from "@/utils/dashboardUtils";

// Types
import { InterfaceBreadCrumbs } from "@/types/inputTypes";
import { mealPlanGeneralInfo, mealPlanName, mealPlanType } from "@/types/mealTypes";
import { useQuery } from "@tanstack/react-query";
import { getMealPlans } from "@/lib/supabaseQueries";
interface props {
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  setSelectedBreadCrumb: React.Dispatch<
    React.SetStateAction<InterfaceBreadCrumbs>
  >;
  setMealPlanInfo: React.Dispatch<React.SetStateAction<mealPlanType>>;
  originalMealPlanGeneralInfo: mealPlanGeneralInfo | undefined,
  originalFetchedMealPlanInfo: mealPlanType | undefined;
  mealPlanInfo: mealPlanType;
  selectedCreateOption: string;
  mealPlanNameVal: mealPlanName;
  setMealPlanNameVal: React.Dispatch<React.SetStateAction<mealPlanName>>;
  selectedBmis: Array<string>;
  setSelectedBmis: React.Dispatch<React.SetStateAction<Array<string>>>;
}

const SetMealPlan = ({
  setSelectedOption,
  setProgress,
  setSelectedBreadCrumb,
  originalMealPlanGeneralInfo,
  originalFetchedMealPlanInfo,
  mealPlanInfo,
  setMealPlanInfo,
  selectedCreateOption,
  mealPlanNameVal,
  setMealPlanNameVal,
  selectedBmis,
  setSelectedBmis,
}: props) => {
  // UseQuery
  const { data: mealPlanList } = useQuery({
    queryKey: ["mealPlans"],
    queryFn: () => {
      return getMealPlans();
    },
  });
  const selectMealPlans = mealPlanList!.map((mealPlanInfo) => {
    return {
      mealId: mealPlanInfo.id,
      planName: mealPlanInfo.planName,
      planTags: mealPlanInfo.meal_plan_tags,
      meals: arrangeMealPlan(mealPlanInfo),
    };
  });

  // States
  const [selectedWeekDate, setSelectedWeekDate] = useState<string>("Monday");
  const [showMealPlanHtml, setShowMealPanHtml] = useState<boolean>(
    selectedCreateOption === "recommendation" || mealPlanInfo ? true : false
  );
  const [toggleAddMealForm, setToggleAddMealForm] = useState<boolean>(false);
  const [selectedMealType, setSelectedMealType] = useState<string>("");
  const [formAction, setFormAction] = useState<string>("Add");

  // Events
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    // checkValidations(validationResult);
    setMealPlanNameVal((prev) => ({ ...prev, [name]: value }));
  };
  const selectOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name, selectedIndex, options } = event.target;
    setShowMealPanHtml(true);
    if (name === "mealPlan") {
      const selectedMealPlan = mealPlanList!.filter(
        (mealPlan) => mealPlan.id === parseInt(value)
      );
      const arrangedMealPlan: mealPlanType = arrangeMealPlan(
        selectedMealPlan[0]
      );
      setMealPlanNameVal((prev) => ({
        ...prev,
        selectedMealPlan: value,
        mealPlanName: options[selectedIndex].innerHTML,
      }));
      setSelectedBmis(
        selectedMealPlan[0].meal_plan_tags.map(
          (info) => info.meal_tags.mealTagName
        )
      );
      setMealPlanInfo(arrangedMealPlan);
    } else {
      setMealPlanNameVal((prev) => ({
        ...prev,
        [name]: options[selectedIndex].innerHTML,
      }));
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
            <div className="flex w-full phone:flex-col mdphone:justify-between mdphone:items-center mdphone:flex-row">
              <div className="flex items-center gap-1">
                <div
                  className="flex items-center gap-1 group"
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
              <div className="flex phone:justify-center mdphone:items-center">
                {originalFetchedMealPlanInfo && originalMealPlanGeneralInfo ? (
                  <button
                    onClick={() => {
                      setMealPlanInfo(originalFetchedMealPlanInfo);
                      console.log(selectMealPlans)
                      setMealPlanNameVal((prev) => ({
                        ...prev,
                        selectedMealPlan: originalMealPlanGeneralInfo.id,
                        mealPlanName: originalMealPlanGeneralInfo.planName,
                      }));
                      setSelectedBmis(
                        originalMealPlanGeneralInfo.tags.map(
                          (info) => info.meal_tags.mealTagName
                        )
                      );
                      setMealPlanInfo(selectMealPlans[0].meals);
                    }}
                    type="button"
                    className="bg-[#5d897b] text-white font-quickSand font-semibold text-sm w-max rounded-md py-[0.4rem] px-2 flex items-center justify-center gap-1 mt-2 transition duration-200 hover:bg-secondary"
                  >
                    Undo
                    <SolarUndoLeftRoundSquareOutline
                      color="#ffffff"
                      width="1.5em"
                      height="1.5em"
                    />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setMealPlanInfo(mealPlanInfo);
                    }}
                    type="button"
                    className="bg-[#5d897b] text-white font-quickSand font-semibold text-sm w-max rounded-md py-[0.4rem] px-2 flex items-center justify-center gap-1 mt-2 transition duration-200 hover:bg-secondary"
                  >
                    Reset
                    <SolarRestartSquareLineDuotone
                      color="#ffffff"
                      width="1.5em"
                      height="1.5em"
                    />
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            {!showMealPlanHtml && (
              <>
                <div className="relative flex flex-col flex-wrap items-center gap-1 w-full">
                  <div className="relative pl-2 w-[270px]">
                    <label className="phone:text-sm font-quickSand font-semibold">
                      Filter Meal Plans
                    </label>
                    <div
                      className={`flex flex-col w-full h-[2.7rem] gap-2 bg-primary`}
                    >
                      <select
                        className={`bg-transparent w-[92%] text-white h-full phone:text-sm font-quickSand`}
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
                    <label className="phone:text-sm font-quickSand font-semibold"></label>
                    Choose a Meal Plan
                    <div
                      className={`flex flex-col w-full gap-2 h-[2.7rem] bg-primary`}
                    >
                      <select
                        className={`bg-transparent w-full text-white h-full phone:text-sm font-quickSand`}
                        onChange={selectOnChange}
                        name="mealPlan"
                        value={mealPlanNameVal.selectedMealPlan}
                      >
                        <option
                          className="bg-primary font-quickSand"
                          value="0"
                          disabled
                        >
                          Meal Plans
                        </option>
                        {selectMealPlans.map((mealPlanInfo) => (
                          <option
                            key={mealPlanInfo.mealId}
                            className="bg-primary font-quickSand"
                            value={mealPlanInfo.mealId}
                          >
                            {mealPlanInfo.planName}
                          </option>
                        ))}
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
            <div className="flex flex-col gap-1">
              <div className="relative flex flex-wrap items-center gap-1 w-full phone:flex-col mdtablet:flex-row">
                <div className="relative w-[270px]">
                  <label className="phone:text-sm font-quickSand font-semibold">
                    Filter Meal Plans
                  </label>
                  <div
                    className={`flex flex-col w-full h-[2.7rem] gap-2 bg-primary`}
                  >
                    <select
                      className={`bg-transparent w-[92%] text-white h-full phone:text-sm font-quickSand`}
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
                  <div
                    className={`flex flex-col w-full gap-2 h-[2.7rem] bg-primary`}
                  >
                    <select
                      className={`bg-transparent w-full text-white h-full phone:text-sm font-quickSand`}
                      onChange={selectOnChange}
                      name="mealPlan"
                      value={mealPlanNameVal.selectedMealPlan}
                    >
                      <option
                        className="bg-primary font-quickSand"
                        value="0"
                        disabled
                      >
                        Meal Plans
                      </option>
                      {selectMealPlans.map((mealPlanInfo) => (
                        <option
                          key={mealPlanInfo.mealId}
                          className="bg-primary font-quickSand"
                          value={mealPlanInfo.mealId}
                        >
                          {mealPlanInfo.planName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 phone:flex-col">
              <motion.div className="phone:w-4/12 min-w-[260px]">
                <Input
                  name="mealPlanName"
                  placeholder="Enter the name of the Meal Plan"
                  state={mealPlanNameVal.mealPlanName}
                  type="text"
                  label="Meal Plan Name"
                  onChange={onChange}
                  onBlur={onChange}
                  autoComplete="off"
                  valid={null}
                  validationMessage={""}
                />
              </motion.div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-1">
                <label className="font-dmSans phone:text-sm">
                  Select BMI classification Tags:
                </label>
                <div className="flex flex-wrap gap-1">
                  {bmiClassifications.map((bmi: string, index: number) => (
                    <div
                      className={`group border-[1.5px] border-secondary px-4 py-1 cursor-pointer ${
                        selectedBmis.includes(bmi) ? "bg-secondary" : "bg-none"
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
            </div>
            <div className="flex gap-1 justify-between phone:flex-col mdtablet:flex-1 mdtablet:flex-row">
              <MealPlanCard
                meal={mealPlanInfo[selectedWeekDate].breakFast}
                mealType="Breakfast"
                setFormAction={setFormAction}
                setSelectedMealType={setSelectedMealType}
                setToggleAddMealForm={setToggleAddMealForm}
              />
              <MealPlanCard
                meal={mealPlanInfo[selectedWeekDate].lunch}
                mealType="Lunch"
                setFormAction={setFormAction}
                setSelectedMealType={setSelectedMealType}
                setToggleAddMealForm={setToggleAddMealForm}
              />
              <MealPlanCard
                meal={mealPlanInfo[selectedWeekDate].dinner}
                mealType="Dinner"
                setFormAction={setFormAction}
                setSelectedMealType={setSelectedMealType}
                setToggleAddMealForm={setToggleAddMealForm}
              />
            </div>
          </div>
        )}
      </div>

      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {toggleAddMealForm && (
          <AddMealForm
            selectedMealType={selectedMealType}
            setMealPlanInfo={setMealPlanInfo}
            setToggleAddMealForm={setToggleAddMealForm}
            formAction={formAction}
            dailyMealInfo={mealPlanInfo[selectedWeekDate]}
            selectedWeekDate={selectedWeekDate}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default SetMealPlan;
