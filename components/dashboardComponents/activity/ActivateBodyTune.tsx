"use client";

// import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

// libs
import {
  getUserBodyTunes,
  getUserFavBodyTuneView,
} from "@/lib/supabaseQueries";

// Utils
import { arrangeBodyTunePlan } from "@/utils/dashboardUtils";

// Components
import Overlay from "@/components/reusableComponent/Overlay";
import BodyTuneDetails from "../bodytuneStudio/BodyTuneDetails";
import PopUpInformation from "@/components/dashboardComponents/activity/PopUpInformation";
// import BodyTuneMealDetails from "../bodytuneMeals/BodyTuneMealDetails";

// Icons
// import MdiFoodDrumstickOutline from "@/icons/MdiFoodDrumstickOutline";
import SolarStarsMinimalisticLineDuotone from "@/icons/SolarStarsMinimalisticLineDuotone";

// Type
import { bodyTunePlan, exercisePlan } from "@/types/planTypes";
import { mealPlanType } from "@/types/mealTypes";

const ActivateBodyTune = () => {
  // // UseQuery
  // const { data: mealPlanList } = useQuery({
  //   queryKey: ["mealPlans"],
  //   queryFn: () => {
  //     return getMealPlans();
  //   },
  // });
  // UseQuery
  const { data: bodyTunes } = useQuery({
    queryKey: ["userBodyTunes"],
    queryFn: () => {
      return getUserBodyTunes();
    },
  });

  const { data: bodyTunesView } = useQuery({
    queryKey: ["userFavBodyTuneView"],
    queryFn: () => {
      return getUserFavBodyTuneView();
    },
  });

  // const [mealPlans] = useState<Array<mealPlanListType>>(() =>
  //   mealPlanList!.map((mealPlanInfo) => {
  //     return {
  //       mealId: mealPlanInfo.id,
  //       createdBy: mealPlanInfo.created_by,
  //       planName: mealPlanInfo.planName,
  //       planTags: mealPlanInfo.meal_plan_tags,
  //       meals: arrangeMealPlan(mealPlanInfo),
  //     };
  //   })
  // );

  //States
  const [togglePopUpInformation, setTogglePopUpInformation] =
    useState<boolean>(false);
  const [selectedBodyTune, setSelectedBodyTune] = useState<bodyTunePlan | null>(
    null
  );
  const [allBodyTunes] = useState<bodyTunePlan[]>([
    ...(bodyTunes || []),
    ...(bodyTunesView || []),
  ]);
  const [favoriteBodyTunes] = useState<bodyTunePlan[]>(bodyTunesView || []);
  const [createdBodyTunes] = useState<bodyTunePlan[]>(bodyTunes || []);
  const [selectedData, setSelectedData] =
    useState<bodyTunePlan[]>(allBodyTunes);

  // const [togglePlanPopUpList, setTogglePlanPopUpList] = useState<{
  //   listType: string;
  //   toggle: boolean;
  // }>({ listType: "", toggle: false });
  const [toggleBodyTuneDetails, setToggleBodyTuneDetails] =
    useState<boolean>(false);
  const [selectedBodyTunePlan, setSelectedBodyTunePlan] = useState<{
    bodyTuneId?: number;
    exercisePlan?: exercisePlan;
    mealPlan?: mealPlanType;
  } | null>(null);

  // Functions
  const bodyTuneListOnClickFunction = (list: bodyTunePlan) => {
    const { exercisePlan, mealPlan } = arrangeBodyTunePlan(list);
    setSelectedBodyTunePlan((prev) => ({
      ...prev,
      bodyTuneId: list.id,
      mealPlan: mealPlan,
      exercisePlan: exercisePlan,
    }));
  };

  return (
    <>
      <div className="bg-black p-4 rounded-lg h-[100%] phone:w-full mdtablet:w-8/12 desktop:w-6/12">
        <div className="flex flex-col gap-1 h-full">
          {bodyTunes?.length === 0 ? (
            <div className="border-2 h-full w-full flex items-center justify-center">
              <p className="text-white">You have no BodyTunes</p>
            </div>
          ) : (
            <>
              <div className="flex flex-col h-[6%] font-quickSand text-[0.8rem] font-semibold">
                <p>Choose a BodyTune Below</p>
              </div>
              <div className="w-full h-[88%] flex items-center justify-center">
                <div className="bg-black w-full h-full">
                  <div className="w-full flex justify-between items-center">
                    <p className="text-[#a3e09f] font-dmSans text-base font-semibold">
                      BodyTune List
                    </p>
                  </div>
                  <div className="relative w-[270px] mt-2">
                    <label className="phone:text-sm font-quickSand font-semibold">
                      Filter BodyTune Plans
                    </label>
                    <div
                      className={`flex flex-col w-full h-[2.7rem] gap-2 bg-primary px-1`}
                    >
                      <select
                        className={`bg-transparent text-white h-full phone:text-sm font-quickSand`}
                        name="bodyTune"
                        defaultValue={"all"}
                        onChange={(e) => {
                          const selectedOption = e.target.value;
                          switch (selectedOption) {
                            case "all":
                              setSelectedData(allBodyTunes);
                              break;
                            case "favorite":
                              setSelectedData(favoriteBodyTunes);
                              break;
                            case "created":
                              setSelectedData(createdBodyTunes);
                              break;
                            default:
                              setSelectedData(allBodyTunes);
                              break;
                          }
                        }}
                      >
                        <option
                          className="bg-primary font-quickSand"
                          value="all"
                        >
                          All
                        </option>
                        <option
                          className="bg-primary font-quickSand"
                          value="favorite"
                        >
                          Favorite BodyTunes
                        </option>
                        <option
                          className="bg-primary font-quickSand"
                          value="created"
                        >
                          Created BodyTunes
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 mt-2 h-[85%] overflow-auto">
                    {selectedData!.map((list: bodyTunePlan, index) => {
                      return (
                        <div
                          className="flex flex-col gap-1 bg-lightPrimary w-[98%] p-2 rounded-md font-quickSand transition duration-200 group hover:bg-primary hover:shadow-sm hover:shadow-[#595959]"
                          key={index}
                        >
                          <div className="w-12/12">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-bold transition duration-200 group-hover:text-[#a3e09f]">
                                {list.meal_plan.planName}
                              </p>
                              <motion.button
                                onClick={() => {
                                  setTogglePopUpInformation(true);
                                  setSelectedBodyTune(list);
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
                                {list.meal_plan.meal_plan_tags.map((tag) => (
                                  <p
                                    className="font-semibold border-[1.5px] border-secondary py-[0.2rem] px-1 text-[#b3b3b3] transition duration-200 group-hover:text-[#ffffff]"
                                    key={tag.meal_tags.id}
                                  >
                                    {tag.meal_tags.mealTagName}
                                  </p>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="w-12/12">
                            <p className="text-sm font-bold transition duration-200 group-hover:text-[#a3e09f]">
                              {list.exercise_plan.planName}
                            </p>
                            <div className="flex gap-1 mt-1 text-xs flex-col">
                              <p className="text-[#b3b3b3] transition duration-200 group-hover:text-[#ffffff]">
                                Exercise Difficult(ies):
                              </p>
                              <div className="flex gap-1">
                                {list.exercise_plan.exercise_plan_tag.map(
                                  (tag) => (
                                    <p
                                      className="font-semibold border-[1.5px] border-secondary py-[0.2rem] px-1 text-[#b3b3b3] transition duration-200 group-hover:text-[#ffffff]"
                                      key={tag.exercise_tags.id}
                                    >
                                      {tag.exercise_tags.exerciseTagName}
                                    </p>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                          <motion.button
                            onClick={() => {
                              setToggleBodyTuneDetails(true);
                              bodyTuneListOnClickFunction(list);
                            }}
                            className="w-max mt-1 text-xs flex gap-1 items-center bg-[#5d897b] text-white font-semibold rounded-md p-1 transition duration-200 hover:bg-secondary"
                          >
                            View Full Details
                            <SolarStarsMinimalisticLineDuotone
                              color="#D3F0D1"
                              width="1em"
                              height="1em"
                            />
                          </motion.button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {toggleBodyTuneDetails && (
          <Overlay>
            <BodyTuneDetails
              setToggleBodyTuneDetails={setToggleBodyTuneDetails}
              bodyTuneId={selectedBodyTunePlan!.bodyTuneId!}
              mealPlan={selectedBodyTunePlan!.mealPlan}
              exercisePlan={selectedBodyTunePlan!.exercisePlan}
            />
          </Overlay>
        )}
        {togglePopUpInformation && (
          <PopUpInformation
            id={selectedBodyTune!.id}
            planType="BodyTune"
            setTogglePopUpInformation={setTogglePopUpInformation}
          >
            <div className="flex flex-col gap-1 bg-lightPrimary w-[100%] p-2 rounded-md font-quickSand transition duration-200 group">
              <div className="w-12/12">
                <p className="text-sm font-bold text-[#a3e09f]">
                  {selectedBodyTune!.meal_plan.planName}
                </p>
                <div className="flex gap-1 mt-1 text-xs flex-col">
                  <p className="text-[#ffffff]">BMI Classification(s):</p>
                  <div className="flex gap-1">
                    {selectedBodyTune!.meal_plan.meal_plan_tags.map((tag) => (
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
                  {selectedBodyTune!.exercise_plan.planName}
                </p>
                <div className="flex gap-1 mt-1 text-xs flex-col">
                  <p className="text-[#ffffff]">Exercise Difficult(ies):</p>
                  <div className="flex gap-1">
                    {selectedBodyTune!.exercise_plan.exercise_plan_tag.map(
                      (tag) => (
                        <p
                          className="font-semibold border-[1.5px] border-secondary py-[0.2rem] px-1 text-[#ffffff]"
                          key={tag.exercise_tags.id}
                        >
                          {tag.exercise_tags.exerciseTagName}
                        </p>
                      )
                    )}
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

export default ActivateBodyTune;
