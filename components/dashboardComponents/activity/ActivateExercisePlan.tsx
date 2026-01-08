"use client";

// import Link from "next/link";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";

// libs
import {
  getUserExercisePlans,
  getUserFavExerciseView,
} from "@/lib/supabaseQueries";

// Utils
import { arrangeExercisePlan } from "@/utils/dashboardUtils";

// Components
import Overlay from "@/components/reusableComponent/Overlay";
import BodyTuneWorkoutDetails from "../bodytuneWorkouts/BodyTuneWorkoutDetails";

// Icons
import TablerBarbell from "@/icons/TablerBarbellLight";

// types
import { exercisePlanQuery } from "@/types/planTypes";
import { exercisePlanListType } from "@/types/exerciseTypes";
import PopUpInformation from "./PopUpInformation";
import Image from "next/image";

const ActivateExercisePlan = () => {
  // UseQuery
  const { data: exercisePlanList } = useQuery({
    queryKey: ["userExercisePlans"],
    queryFn: () => {
      return getUserExercisePlans();
    },
  });

  const { data: exercisePlanViewList } = useQuery({
    queryKey: ["userFavExerciseView"],
    queryFn: () => {
      return getUserFavExerciseView();
    },
  });

  //States
  const [createdExercisePlans] = useState<Array<exercisePlanListType>>(() =>
    exercisePlanList!.map((exercisePlanInfo) => {
      return {
        exerciseId: exercisePlanInfo.id,
        createdBy: exercisePlanInfo.created_by,
        planName: exercisePlanInfo.planName,
        planTags: exercisePlanInfo.exercise_plan_tag,
        exercises: arrangeExercisePlan(exercisePlanInfo),
      };
    })
  );
  const [favoriteExercisePlans] = useState<Array<exercisePlanListType>>(() =>
    exercisePlanViewList!.map((exercisePlanInfo) => {
      return {
        exerciseId: exercisePlanInfo.id,
        createdBy: exercisePlanInfo.created_by,
        planName: exercisePlanInfo.planName,
        planTags: exercisePlanInfo.exercise_plan_tag,
        exercises: arrangeExercisePlan(exercisePlanInfo),
      };
    })
  );
  const [allExercisePlans] = useState<Array<exercisePlanListType>>([
    ...createdExercisePlans,
    ...favoriteExercisePlans,
  ]);
  const [selectedData, setSelectedData] =
    useState<Array<exercisePlanListType>>(allExercisePlans);

  const [togglePopUpInformation, setTogglePopUpInformation] =
    useState<boolean>(false);
  // const [togglePlanPopUpList, setTogglePlanPopUpList] = useState<{
  //   listType: string;
  //   toggle: boolean;
  // }>({ listType: "", toggle: false });
  const [toggleBodyTuneWorkoutDetails, setToggleBodyTuneWorkoutDetails] =
    useState<boolean>(false);
  const [selectedExercisePlan, setSelectedExercisePlan] =
    useState<exercisePlanQuery | null>(null);

  // Functions
  const exerciseListOnClickFunction = (exercisePlanId: number) => {
    const selectedExercisePlan = exercisePlanList?.filter(
      (exercisePlan) => exercisePlan.id === exercisePlanId
    );
    setSelectedExercisePlan(selectedExercisePlan![0]);
  };

  return (
    <>
      <div className="flex-1 bg-black p-4 rounded-lg phone:w-full mdtablet:h-[100%]">
        <div className="flex flex-col gap-1 h-full">
          <div className="flex flex-col h-[6%] font-quickSand font-semibold text-[0.8rem]">
            <p>Choose a Exercise Below</p>
          </div>
          <div className="w-full h-[88%] flex items-center justify-center">
            <div className="bg-black w-full h-full">
              <div className="w-full flex justify-between items-center">
                <p className="text-[#a3e09f] font-dmSans text-base font-semibold">
                  Exercise List
                </p>
              </div>
              <div className="relative w-[270px] mt-2">
                <label className="phone:text-sm font-quickSand font-semibold">
                  Filter Exercise Plans
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
                          setSelectedData(allExercisePlans);
                          break;
                        case "favorite":
                          setSelectedData(favoriteExercisePlans);
                          break;
                        case "created":
                          setSelectedData(createdExercisePlans);
                          break;
                        default:
                          setSelectedData(allExercisePlans);
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
                      Favorite Exercise Plans
                    </option>
                    <option
                      className="bg-primary font-quickSand"
                      value="created"
                    >
                      Created Exercise Plans
                    </option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-2 h-[85%] overflow-auto">
                {selectedData.length === 0 ? (
                  <div className="flex flex-col w-full h-full font-dmSans justify-center items-center">
                    <Image
                      src="/assets/svg/dumbbell-2.svg"
                      width={150}
                      height={150}
                      alt="Logo"
                    />
                    <p className="w-max text-base">
                      You don&apos;t have any{" "}
                      <span className="font-semibold font-quickSand text-secondary">
                        Exercise Plans
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
                              exerciseListOnClickFunction(list.exerciseId!);
                              setTogglePopUpInformation(true);
                            }}
                            className="w-max mt-1 text-xs flex gap-1 items-center bg-[#5d897b] text-white font-semibold rounded-md py-1 px-3 transition duration-200 hover:bg-secondary"
                          >
                            Activate
                          </motion.button>
                        </div>
                        <div className="flex gap-1 mt-1 text-xs flex-col">
                          <p className="text-[#b3b3b3] transition duration-200 group-hover:text-[#ffffff]">
                            Exercise Difficult(ies):
                          </p>
                          <div className="flex gap-1">
                            {list.planTags.map((tag) => (
                              <p
                                className="font-semibold border-[1.5px] border-secondary py-[0.2rem] px-1 text-[#b3b3b3] transition duration-200 group-hover:text-[#ffffff]"
                                key={tag.exercise_tags.id}
                              >
                                {tag.exercise_tags.exerciseTagName}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                      <motion.button
                        onClick={() => {
                          setToggleBodyTuneWorkoutDetails(true);
                          exerciseListOnClickFunction(list.exerciseId!);
                        }}
                        className="w-max mt-1 text-xs flex gap-1 items-center bg-[#5d897b] text-white font-semibold rounded-md p-1 transition duration-200 hover:bg-secondary"
                      >
                        View Full Details
                        <TablerBarbell
                          color="#D3F0D1"
                          width="1.3em"
                          height="1.3em"
                        />
                      </motion.button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {/* {togglePlanPopUpList.toggle && (
          <PlanList
            planList={createdExercisePlans}
            setTogglePlanPopUpList={setTogglePlanPopUpList}
            listType={togglePlanPopUpList.listType}
          />
        )} */}
        {togglePopUpInformation && (
          <PopUpInformation
            id={selectedExercisePlan!.id!}
            planType="Exercise"
            setTogglePopUpInformation={setTogglePopUpInformation}
          >
            <div className="flex flex-col gap-1 bg-lightPrimary w-[100%] p-2 rounded-md font-quickSand transition duration-200 group">
              <div className="w-12/12">
                <p className="text-sm font-bold text-[#a3e09f]">
                  {selectedExercisePlan!.planName}
                </p>
                <div className="flex gap-1 mt-1 text-xs flex-col">
                  <p className="text-[#ffffff]">Exercise Difficult(ies):</p>
                  <div className="flex gap-1">
                    {selectedExercisePlan!.exercise_plan_tag.map((tag) => (
                      <p
                        className="font-semibold border-[1.5px] border-secondary py-[0.2rem] px-1 text-[#ffffff]"
                        key={tag.exercise_tags.id}
                      >
                        {tag.exercise_tags.exerciseTagName}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </PopUpInformation>
        )}
        {toggleBodyTuneWorkoutDetails && (
          <Overlay>
            <BodyTuneWorkoutDetails
              exercisePlan={{
                planName: selectedExercisePlan!.planName,
                exercise_tags: selectedExercisePlan!.exercise_plan_tag.map(
                  (tag) => tag.exercise_tags.exerciseTagName
                ),
                exercises: arrangeExercisePlan(selectedExercisePlan!),
              }}
              setToggleBodyTuneWorkoutDetails={setToggleBodyTuneWorkoutDetails}
            />
          </Overlay>
        )}
      </AnimatePresence>
    </>
  );
};

export default ActivateExercisePlan;
