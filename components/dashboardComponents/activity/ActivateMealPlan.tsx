"use client";

// import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

// libs
import { getUserFavMealView, getUserMealPlans } from "@/lib/supabaseQueries";

// Utils
import { arrangeMealPlan } from "@/utils/dashboardUtils";

// Components
import BodyTuneMealDetails from "../bodytuneMeals/BodyTuneMealDetails";

// Icons
import MdiFoodDrumstickOutline from "@/icons/MdiFoodDrumstickOutline";

// Type
import { mealPlanQuery } from "@/types/planTypes";
import { mealPlanListType } from "@/types/mealTypes";
import PopUpInformation from "./PopUpInformation";
import Image from "next/image";

const ActivateMealPlan = () => {
  // UseQuery
  const { data: mealPlanList } = useQuery({
    queryKey: ["userMealPlans"],
    queryFn: () => {
      return getUserMealPlans();
    },
  });

  const { data: mealPlanViewList } = useQuery({
    queryKey: ["userFavMealView"],
    queryFn: () => {
      return getUserFavMealView();
    },
  });

  //States
  const [createdMealPlans] = useState<Array<mealPlanListType>>(() =>
    mealPlanList!.map((mealPlanInfo) => {
      return {
        mealId: mealPlanInfo.id,
        createdBy: mealPlanInfo.created_by,
        planName: mealPlanInfo.planName,
        planTags: mealPlanInfo.meal_plan_tags,
        meals: arrangeMealPlan(mealPlanInfo),
      };
    })
  );
  const [favoriteMealPlans] = useState<Array<mealPlanListType>>(() =>
    mealPlanViewList!.map((mealPlanInfo) => {
      return {
        mealId: mealPlanInfo.id,
        createdBy: mealPlanInfo.created_by,
        planName: mealPlanInfo.planName,
        planTags: mealPlanInfo.meal_plan_tags,
        meals: arrangeMealPlan(mealPlanInfo),
      };
    })
  );
  const [allMealPlans] = useState<Array<mealPlanListType>>([
    ...createdMealPlans,
    ...favoriteMealPlans,
  ]);
  const [selectedData, setSelectedData] =
    useState<Array<mealPlanListType>>(allMealPlans);

  const [togglePopUpInformation, setTogglePopUpInformation] =
    useState<boolean>(false);
  // const [togglePlanPopUpList, setTogglePlanPopUpList] = useState<{
  //   listType: string;
  //   toggle: boolean;
  // }>({ listType: "", toggle: false });
  const [toggleBodyTuneMealDetails, setToggleBodyTuneMealDetails] =
    useState<boolean>(false);
  const [selectedMealPlan, setSelectedMealPlan] =
    useState<mealPlanQuery | null>(null);

  // Functions
  const mealListOnClickFunction = (mealPlanId: number) => {
    const selectedMealPlan = mealPlanList?.filter(
      (mealPlan) => mealPlan.id === mealPlanId
    );
    setSelectedMealPlan(selectedMealPlan![0]);
  };

  return (
    <>
      <div className="flex-1 bg-black p-4 rounded-lg phone:w-full mdtablet:h-[100%] mdtablet:w-[50%]">
        <div className="flex flex-col gap-1 h-full">
          <div className="flex flex-col h-[6%] font-quickSand text-[0.8rem] font-semibold">
            <p>Choose a Meal Below</p>
          </div>
          <div className="w-full h-[88%] flex items-center justify-center">
            <div className="bg-black w-full h-full">
              <div className="w-full flex justify-between items-center">
                <p className="text-[#a3e09f] font-dmSans text-base font-semibold">
                  Meal List
                </p>
              </div>
              <div className="relative w-[270px] mt-2">
                <label className="phone:text-sm font-quickSand font-semibold">
                  Filter Meal Plans
                </label>
                <div
                  className={`flex flex-col w-full h-[2.7rem] gap-2 bg-primary px-1`}
                >
                  <select
                    className={`bg-transparent text-white h-full phone:text-sm font-quickSand`}
                    name="exercisePlan"
                    defaultValue={"all"}
                    onChange={(e) => {
                      const selectedOption = e.target.value;
                      switch (selectedOption) {
                        case "all":
                          setSelectedData(allMealPlans);
                          break;
                        case "favorite":
                          setSelectedData(favoriteMealPlans);
                          break;
                        case "created":
                          setSelectedData(createdMealPlans);
                          break;
                        default:
                          setSelectedData(allMealPlans);
                          break;
                      }
                    }}
                  >
                    <option className="bg-primary font-quickSand" value="all">
                      All
                    </option>
                    <option
                      className="bg-primary font-quickSand"
                      value="favorite"
                    >
                      Favorite Meal Plans
                    </option>
                    <option
                      className="bg-primary font-quickSand"
                      value="created"
                    >
                      Created Meal Plans
                    </option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-2 h-[85%] overflow-auto">
                {selectedData.length === 0 ? (
                  <div className="flex flex-col w-full h-full font-dmSans justify-center items-center">
                    <Image
                      src="/assets/svg/healthy-1.svg"
                      width={150}
                      height={150}
                      alt="Logo"
                    />
                    <p className="w-max text-base">
                      You don&apos;t have any{" "}
                      <span className="font-semibold font-quickSand text-secondary">
                        Meal Plans
                      </span>{" "}
                      yet.
                    </p>
                  </div>
                ) : (
                  selectedData.map((list, index) => (
                    <div
                      className="bg-lightPrimary w-[98%] p-2 rounded-md font-quickSand transition duration-200 group hover:bg-primary hover:shadow-sm hover:shadow-[#595959]"
                      key={index}
                    >
                      <div className="w-12/12">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-bold text-lightSecondary transition duration-200 group-hover:text-[#a3e09f]">
                            {list.planName}
                          </p>
                          <motion.button
                            onClick={() => {
                              mealListOnClickFunction(list.mealId);
                              setTogglePopUpInformation(true);
                            }}
                            className="w-max mt-1 text-xs flex gap-1 items-center bg-[#5d897b] text-white font-semibold rounded-md py-1 px-3 transition duration-200 hover:bg-secondary"
                          >
                            Activate
                          </motion.button>
                        </div>
                        <div className="flex gap-1 mt-1 text-xs flex-col">
                          <p className="text-[#b3b3b3] transition duration-200 group-hover:text-[#ffffff]">
                            BMI Classification(s):
                          </p>
                          <div className="flex gap-1">
                            {list.planTags.map((tag) => (
                              <p
                                className="font-semibold border-[1.5px] border-secondary py-[0.2rem] px-1 text-[#b3b3b3] transition duration-200 group-hover:text-[#ffffff]"
                                key={tag.meal_tags.id}
                              >
                                {tag.meal_tags.mealTagName}
                              </p>
                            ))}
                          </div>
                        </div>
                        <motion.button
                          onClick={() => {
                            setToggleBodyTuneMealDetails(true);
                            mealListOnClickFunction(list.mealId);
                          }}
                          className="w-max mt-1 text-xs flex gap-1 items-center bg-[#5d897b] text-white font-semibold rounded-md p-1 transition duration-200 hover:bg-secondary"
                        >
                          View Full Details
                          <MdiFoodDrumstickOutline
                            color="#D3F0D1"
                            width="1em"
                            height="1em"
                          />
                        </motion.button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {toggleBodyTuneMealDetails && (
          <BodyTuneMealDetails
            mealPlan={{
              planName: selectedMealPlan!.planName,
              bmi_classification: selectedMealPlan!.meal_plan_tags.map(
                (tag) => tag.meal_tags.mealTagName
              ),
              meals: arrangeMealPlan(selectedMealPlan!),
            }}
            setToggleBodyTuneMealDetails={setToggleBodyTuneMealDetails}
          />
        )}
        {togglePopUpInformation && (
          <PopUpInformation
            id={selectedMealPlan!.id}
            planType="Meal"
            setTogglePopUpInformation={setTogglePopUpInformation}
          >
            <div className="flex flex-col gap-1 bg-lightPrimary w-[100%] p-2 rounded-md font-quickSand transition duration-200 group">
              <div className="w-12/12">
                <p className="text-sm font-bold text-[#a3e09f]">
                  {selectedMealPlan!.planName}
                </p>
                <div className="flex gap-1 mt-1 text-xs flex-col">
                  <p className="text-[#ffffff]">BMI Classification(s):</p>
                  <div className="flex gap-1">
                    {selectedMealPlan!.meal_plan_tags.map((tag) => (
                      <p
                        className="font-semibold border-[1.5px] border-secondary py-[0.2rem] px-1 text-[#ffffff]"
                        key={tag.meal_tags.id}
                      >
                        {tag.meal_tags.mealTagName}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-12/12">
                <p className="text-sm font-bold text-[#a3e09f]">
                  {selectedMealPlan!.planName}
                </p>
                <div className="flex gap-1 mt-1 text-xs flex-col">
                  <p className="text-[#ffffff]">Exercise Difficult(ies):</p>
                  <div className="flex gap-1">
                    {selectedMealPlan!.meal_plan_tags.map((tag) => (
                      <p
                        className="font-semibold border-[1.5px] border-secondary py-[0.2rem] px-1 text-[#ffffff]"
                        key={tag.meal_tags.id}
                      >
                        {tag.meal_tags.mealTagName}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </PopUpInformation>
        )}
        {/* {togglePlanPopUpList.toggle && (
          <PlanList
            planList={mealPlans}
            setTogglePlanPopUpList={setTogglePlanPopUpList}
            listType={togglePlanPopUpList.listType}
          />
        )} */}
      </AnimatePresence>
    </>
  );
};

export default ActivateMealPlan;
