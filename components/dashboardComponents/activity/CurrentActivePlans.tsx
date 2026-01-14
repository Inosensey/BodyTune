import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";

// Utils
import { arrangeExercisePlan, arrangeMealPlan } from "@/utils/dashboardUtils";

// Props
import { exercisePlanListType } from "@/types/exerciseTypes";
import { mealPlanListType } from "@/types/mealTypes";

// Initials
import { weekDates } from "@/utils/initials";
import Image from "next/image";
import { TableRow, TablesInsert } from "@/types/database.types";
import { useQuery } from "@tanstack/react-query";
import {
  getUserActivePlanData,
  getUserActivePlans,
} from "@/lib/supabaseQueries";
import MarkAsFinishedButton from "./MarkAsFinishedButton";
import { useFormState } from "react-dom";
import { formReturnType } from "@/types/formTypes";
import { userActivePlanInterface } from "@/types/planTypes";
import { updateActivePlanDataStatus } from "@/actions/planActions";
import ActivateExercisePlan from "./ActivateExercisePlan";
import ActivateMealPlan from "./ActivateMealPlan";

// Fixed values
const mealPlanTabs: Array<string> = ["Breakfast", "Lunch", "Dinner"];

// Variants
const fadeVariants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};
const exerciseContainerAnimationVariant = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};
const exerciseAnimationVariant = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};

// Form State Initials
const useFormStateInitials: formReturnType<
  | {
      userActivePlan: Array<userActivePlanInterface>;
      userActivePlanData: Array<TableRow<"user_active_plan_data">>;
    }
  | []
  | number
> = {
  success: null,
  error: null,
  message: "",
  data: [],
};

const CurrentActivePlans = () => {
  const queryClient = useQueryClient();

  // UseQuery
  const { data: userPlanInfo, isLoading } = useQuery({
    queryKey: ["userActivePlans"],
    queryFn: () => {
      return getUserActivePlans();
    },
  });
  const { data: userPlanDataInfo } = useQuery({
    queryKey: ["userActivePlanData"],
    queryFn: () => {
      return getUserActivePlanData(userPlanInfo![0].id);
    },
  });

  const mealPlanInfo: mealPlanListType | undefined = userPlanInfo![0].mealPlanId
    ? {
        mealId: userPlanInfo![0].meal_plan.id,
        createdBy: userPlanInfo![0].meal_plan.created_by,
        planName: userPlanInfo![0].meal_plan.planName,
        planTags: userPlanInfo![0].meal_plan.meal_plan_tags,
        meals: arrangeMealPlan(userPlanInfo![0].meal_plan),
      }
    : undefined;

  const exercisePlanInfo: exercisePlanListType | undefined = userPlanInfo![0]
    .exercisePlanId
    ? {
        exerciseId: userPlanInfo![0].exercise_plan.id,
        createdBy: userPlanInfo![0].exercise_plan.created_by,
        planName: userPlanInfo![0].exercise_plan.planName,
        planTags: userPlanInfo![0].exercise_plan.exercise_plan_tag,
        exercises: arrangeExercisePlan(userPlanInfo![0].exercise_plan),
      }
    : undefined;

  // Initials
  const initialActiveMealPlanData = userPlanDataInfo?.find(
    (data: TableRow<"user_active_plan_data">) =>
      data.planDataId ===
      mealPlanInfo!.meals["Monday"]["breakFast"].mealInfo!.id
  );

  // States
  // const [mealPlanInfo] = useState<mealPlanListType>({
  //   mealId: userPlanInfo![0].meal_plan.id,
  //   createdBy: userPlanInfo![0].meal_plan.created_by,
  //   planName: userPlanInfo![0].meal_plan.planName,
  //   planTags: userPlanInfo![0].meal_plan.meal_plan_tags,
  //   meals: arrangeMealPlan(userPlanInfo![0].meal_plan),
  // });

  // const [exercisePlanInfo] = useState<exercisePlanListType>({
  //   exerciseId: userPlanInfo![0].exercise_plan.id,
  //   createdBy: userPlanInfo![0].exercise_plan.created_by,
  //   planName: userPlanInfo![0].exercise_plan.planName,
  //   planTags: userPlanInfo![0].exercise_plan.exercise_plan_tag,
  //   exercises: arrangeExercisePlan(userPlanInfo![0].exercise_plan),
  // });

  // Form State
  const [mealFormState, mealFormAction] = useFormState(
    updateActivePlanDataStatus,
    useFormStateInitials
  );
  const [exerciseFormState, exerciseFormAction] = useFormState(
    updateActivePlanDataStatus,
    useFormStateInitials
  );

  const [selectedMealTab, setSelectedMealTab] = useState<string>("breakFast");
  const [selectedMealPlanDate, setSelectedMealPlanDate] =
    useState<string>("Monday");
  const [selectedExerciseDate, setSelectedExerciseDate] =
    useState<string>("Monday");
  const [selectedMeal, setSelectedMeal] = useState<
    TableRow<"user_active_plan_data">
  >(initialActiveMealPlanData!);

  // UseEffect
  // Handles form submission success or error
  const activeMealPlanData = userPlanDataInfo?.find(
    (data: TableRow<"user_active_plan_data">) =>
      data.planDataId ===
      mealPlanInfo!.meals[selectedMealPlanDate][selectedMealTab].mealInfo!.id
  );
  useEffect(() => {
    if (mealFormState.success === null && mealFormState.error === null) return;
    if (mealFormState.success) {
      const resData = mealFormState.data as {
        userActivePlan: Array<userActivePlanInterface>;
        userActivePlanData: Array<TableRow<"user_active_plan_data">>;
      };
      queryClient.setQueryData(
        ["userActivePlanData"],
        resData.userActivePlanData
      );
      queryClient.invalidateQueries({ queryKey: ["userActivePlanData", "userWeeklyActivities", "userOverAllStatistics"] });
    }
    const activeMealPlanData = userPlanDataInfo?.find(
      (data: TableRow<"user_active_plan_data">) =>
        data.planDataId ===
        mealPlanInfo!.meals[selectedMealPlanDate][selectedMealTab].mealInfo!.id
    );
    setSelectedMeal(activeMealPlanData!);
    console.log(mealFormState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mealFormState]);
  useEffect(() => {
    if (exerciseFormState.success === null && exerciseFormState.error === null)
      return;
    if (exerciseFormState.success) {
      const resData = exerciseFormState.data as {
        userActivePlan: Array<userActivePlanInterface>;
        userActivePlanData: Array<TableRow<"user_active_plan_data">>;
      };
      queryClient.setQueryData(
        ["userActivePlanData"],
        resData.userActivePlanData
      );
      queryClient.invalidateQueries({ queryKey: ["userActivePlanData", "userWeeklyActivities", "userOverAllStatistics"] });
    }
    console.log(exerciseFormState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exerciseFormState]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center text-white">
        Loading active plans...
      </div>
    );
  }
  return (
    <div className="laptop:h-[87%] w-full flex phone:flex-col laptop:flex-row justify-center gap-2 laptop:text-sm">
      <div className="flex-1 bg-black p-4 rounded-lg phone:w-[100%] laptop:w-[50%] h-[100%]">
        <div className="flex flex-col gap-1 h-full">
          {mealPlanInfo ? (
            <div className="p-4 flex flex-col bg-primary gap-1 h-[100%] laptop:w-[100%]">
              <div className="flex flex-col gap-1 laptop:h-[5%] laptop:overflow-auto">
                <p className="font-quickSand font-bold">
                  Meal Plan Name:
                  <span className="font-normal text-lightSecondary">
                    {" "}
                    {mealPlanInfo!.planName}
                  </span>
                </p>
              </div>
              <div className="w-full flex flex-col gap-1 h-[94%]">
                <div className="flex flex-col gap-1">
                  <label className="font-dmSans font-bold">Select Date:</label>
                  <div className="flex flex-wrap h-max gap-1">
                    {weekDates.map((date: string, index: number) => (
                      <div
                        className="group border-[1.5px] border-secondary px-4 py-1 cursor-pointer"
                        key={index}
                        onClick={() => {
                          const mealPlan =
                            mealPlanInfo.meals[date]["breakFast"];
                          const activeMealPlanData = userPlanDataInfo?.find(
                            (data: TableRow<"user_active_plan_data">) =>
                              data.planDataId === mealPlan.mealInfo!.id
                          );
                          setSelectedMeal(activeMealPlanData!);
                          setSelectedMealPlanDate(date);
                        }}
                      >
                        <p
                          className={`text-sm font-semibold font-quickSand transition duration-200 ${
                            selectedMealPlanDate === date
                              ? "text-[#ffffff]"
                              : "text-[#b3b3b3] group-hover:text-[#ffffff]"
                          }`}
                        >
                          {date}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-dmSans font-bold">
                      Select Meal:
                    </label>
                    <div className="flex flex-wrap h-max gap-1">
                      {mealPlanTabs.map((meal: string, index: number) => {
                        let mealPlan =
                          mealPlanInfo.meals[selectedMealPlanDate][
                            selectedMealTab
                          ];
                        if (meal === "Breakfast") {
                          mealPlan =
                            mealPlanInfo.meals[selectedMealPlanDate][
                              "breakFast"
                            ];
                        } else if (meal === "Lunch") {
                          mealPlan =
                            mealPlanInfo.meals[selectedMealPlanDate]["lunch"];
                        } else if (meal === "Dinner") {
                          mealPlan =
                            mealPlanInfo.meals[selectedMealPlanDate]["dinner"];
                        }
                        const activeMealPlanData = userPlanDataInfo?.find(
                          (data: TableRow<"user_active_plan_data">) =>
                            data.planDataId === mealPlan.mealInfo!.id
                        );
                        const isFinished =
                          activeMealPlanData?.status === 1 ? true : false;
                        return (
                          <div
                            className={`group  px-4 py-1 cursor-pointer transition duration-200 ${
                              isFinished ? "bg-[#4A9B50]" : "bg-[#B07A42]"
                            } ${
                              selectedMealTab.toLowerCase() ===
                              meal.toLowerCase()
                                ? "bg-opacity-100"
                                : "bg-opacity-70 hover:bg-opacity-100"
                            }`}
                            key={index}
                            onClick={() => {
                              let mealType = "";
                              if (meal === "Breakfast") {
                                mealType = "breakFast";
                              } else if (meal === "Lunch") {
                                mealType = "lunch";
                              } else if (meal === "Dinner") {
                                mealType = "dinner";
                              }
                              setSelectedMeal(activeMealPlanData!);
                              setSelectedMealTab(mealType);
                            }}
                          >
                            <p
                              className={`text-sm font-semibold font-quickSand text-[#e0e1dd] select-none`}
                            >
                              {meal}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                {mealPlanInfo &&
                  mealPlanInfo.meals[selectedMealPlanDate] &&
                  mealPlanInfo.meals[selectedMealPlanDate][selectedMealTab] && (
                    <motion.div
                      variants={fadeVariants}
                      initial="hidden"
                      animate="show"
                      className="py-1 flex flex-col gap-[0.1rem] w-[100%] laptop:h-[100%] laptop:overflow-auto"
                    >
                      <div className="flex flex-col justify-between w-[100%]">
                        <div className="flex gap-1 items-center justify-between">
                          <div className="flex items-center gap-3">
                            <p className="font-dmSans font-bold text-lightSecondary text-lg m-0 p-0 underline">
                              {selectedMealTab.charAt(0).toUpperCase() +
                                selectedMealTab.slice(1)}{" "}
                              Meal
                            </p>
                            {activeMealPlanData!.status === 1 && (
                              <p className="bg-[#5d897b] text-white font-semibold rounded-md py-1 px-3 text-xs">
                                Completed
                              </p>
                            )}
                          </div>
                          {activeMealPlanData!.status === 2 && (
                            <form
                              action={() => {
                                const fd = new FormData();
                                fd.append(
                                  "jsonData",
                                  JSON.stringify(selectedMeal!)
                                );
                                return mealFormAction(fd);
                              }}
                            >
                              <MarkAsFinishedButton />
                            </form>
                          )}
                        </div>
                        <p className="font-dmSans font-bold text-[#a3e09f] text-base m-0 p-0">
                          {
                            mealPlanInfo.meals[selectedMealPlanDate][
                              selectedMealTab
                            ].mealInfo?.mealName
                          }
                        </p>
                      </div>
                      <div>
                        <label className="text-[#a3e09f] font-dmSans text-base font-semibold underline">
                          Ingredients:
                        </label>
                        <div className="flex gap-1">
                          <p className="font-dmSans text-white text-sm">
                            {Object.entries(
                              mealPlanInfo.meals[selectedMealPlanDate][
                                selectedMealTab
                              ].ingredients!
                            )
                              .map(([, value]) => value.ingredientValue)
                              .join(", ")}
                          </p>
                        </div>
                      </div>
                      {mealPlanInfo.meals[selectedMealPlanDate][selectedMealTab]
                        .mealInfo?.veganAlternative !== null && (
                        <div className="flex flex-col gap-1">
                          <label className="text-[#a3e09f] font-dmSans text-base font-semibold underline">
                            Vegan Alternative:
                          </label>
                          <div className="flex gap-1">
                            <p className="font-dmSans text-white text-sm">
                              {
                                mealPlanInfo.meals[selectedMealPlanDate][
                                  selectedMealTab
                                ].mealInfo!.veganAlternative
                              }
                            </p>
                          </div>
                        </div>
                      )}
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
                              {mealPlanInfo.meals[selectedMealPlanDate][
                                selectedMealTab
                              ].nutrition?.calories.toFixed(2)}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <p className="font-dmSans text-white text-sm">
                              Protein:
                            </p>
                            <p className="font-quickSand text-sm">
                              {mealPlanInfo.meals[selectedMealPlanDate][
                                selectedMealTab
                              ].nutrition?.protein.toFixed(2)}
                              g
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <p className="font-dmSans text-white text-sm">
                              Carbs:
                            </p>
                            <p className="font-quickSand text-sm">
                              {mealPlanInfo.meals[selectedMealPlanDate][
                                selectedMealTab
                              ].nutrition?.carbs.toFixed(2)}
                              g
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <p className="font-dmSans text-white text-sm">
                              Fat:
                            </p>
                            <p className="font-quickSand text-sm">
                              {mealPlanInfo.meals[selectedMealPlanDate][
                                selectedMealTab
                              ].nutrition?.fat.toFixed(2)}
                              g
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="phone:max-h-[250px]">
                        <label className="text-[#a3e09f] font-dmSans text-base font-semibold underline">
                          Cooking Instructions:
                        </label>
                        <p className="font-dmSans text-white text-sm phone:h-[90%] phone:overflow-auto">
                          {
                            mealPlanInfo.meals[selectedMealPlanDate][
                              selectedMealTab
                            ].mealInfo?.cookingInstruction
                          }
                        </p>
                      </div>
                    </motion.div>
                  )}
              </div>
            </div>
          ) : (
            <ActivateMealPlan />
          )}
        </div>
      </div>
      <div className="flex-1 bg-black p-4 rounded-lg phone:h-[50%] phone:w-[100%] laptop:w-[50%] laptop:h-[100%]">
        <div className="flex flex-col gap-1 h-full">
          {exercisePlanInfo ? (
            <div className="p-4 flex flex-col bg-primary gap-1 laptop:h-[100%] laptop:w-[100%]">
              <div className="flex flex-col gap-1 laptop:h-[5%] laptop:overflow-auto">
                <p className="font-quickSand font-bold">
                  Exercise Plan Name:
                  <span className="font-normal text-lightSecondary">
                    {" "}
                    {exercisePlanInfo!.planName}
                  </span>
                </p>
              </div>
              <div className="w-full flex flex-col gap-1 phone:h-[650px] laptop:h-[94%]">
                <label className="font-dmSans font-bold">Select Date:</label>
                <div className="flex flex-wrap h-max gap-1">
                  {weekDates.map((date: string, index: number) => (
                    <div
                      className="group border-[1.5px] border-secondary px-4 py-1 cursor-pointer"
                      key={index}
                      onClick={() => setSelectedExerciseDate(date)}
                    >
                      <p
                        className={`text-sm font-semibold font-quickSand transition duration-200 ${
                          selectedExerciseDate === date
                            ? "text-[#ffffff]"
                            : "text-[#b3b3b3] group-hover:text-[#ffffff]"
                        }`}
                      >
                        {date}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="py-1 flex flex-col gap-[0.1rem h-[100%] w-[100%] overflow-auto">
                  <motion.div
                    variants={exerciseContainerAnimationVariant}
                    initial="hidden"
                    animate="show"
                    className="flex flex-wrap gap-2 h-[100%] w-[100%] overflow-auto"
                  >
                    {exercisePlanInfo &&
                    exercisePlanInfo.exercises[selectedExerciseDate] &&
                    exercisePlanInfo.exercises[selectedExerciseDate].length >
                      0 ? (
                      exercisePlanInfo.exercises[selectedExerciseDate].map(
                        (exercise: TablesInsert<"exercise">, index: number) => {
                          const activeExercisePlanData = userPlanDataInfo?.find(
                            (data: TableRow<"user_active_plan_data">) =>
                              data.planDataId === exercise.id!
                          );
                          const isFinished =
                            activeExercisePlanData?.status === 1 ? true : false;
                          return (
                            <motion.div
                              key={index}
                              variants={exerciseAnimationVariant}
                              className="font-dmSans flex flex-col gap-1 h-max p-2 bg-lightPrimary rounded-md phone:w-[95%] tablet:w-[250px]"
                            >
                              <div className="flex flex-col">
                                <div className="flex justify-between mb-1">
                                  <p
                                    className={`group px-2 py-1 text-xs rounded-md transition duration-200 ${
                                      isFinished
                                        ? "bg-[#4A9B50]"
                                        : "bg-[#B07A42]"
                                    }`}
                                  >
                                    {isFinished ? "Finished" : "In Progress"}
                                  </p>
                                  {!isFinished && (
                                    <form
                                      action={() => {
                                        const fd = new FormData();
                                        fd.append(
                                          "jsonData",
                                          JSON.stringify(activeExercisePlanData)
                                        );
                                        return exerciseFormAction(fd);
                                      }}
                                    >
                                      <MarkAsFinishedButton />
                                    </form>
                                  )}
                                </div>
                                <p className="font-bold text-[#a3e09f]">
                                  {exercise.exerciseName}
                                </p>

                                <p className="font-semibold laptop:text-sm">
                                  {exercise.bmiClassification === 1 &&
                                    "Under Weight"}
                                  {exercise.bmiClassification === 2 &&
                                    "Healthy Weight"}
                                  {exercise.bmiClassification === 3 &&
                                    "Over Weight"}
                                </p>
                                <p className="font-semibold laptop:text-sm">
                                  {exercise.measurement}
                                </p>
                                <p className="font-semibold laptop:text-sm">
                                  {exercise.equipment}
                                </p>
                                {exercise.youtubeLink !== "" && (
                                  <p className="font-semibold cursor-pointer underline laptop:text-sm">
                                    {exercise.youtubeLink}
                                  </p>
                                )}
                              </div>
                              <div className="w-[100%] h-36">
                                <Image
                                  data-loaded="false"
                                  onLoad={(event) => {
                                    event.currentTarget.setAttribute(
                                      "data-loaded",
                                      "true"
                                    );
                                  }}
                                  className="w-full h-full object-contain data-[loaded=false]:animate-pulse data-[loaded=false]:bg-gray-100/10"
                                  width={200}
                                  height={200}
                                  src={
                                    exercise.exerciseDemo
                                      ? `${exercise.exerciseDemo}`
                                      : "/assets/svg/healthy-1.svg"
                                  }
                                  alt="Preview"
                                />
                              </div>
                            </motion.div>
                          );
                        }
                      )
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <p className="font-dmSans font-bold text-[#a3e09f] text-lg m-0 p-0">
                          Rest day
                        </p>
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>
            </div>
          ) : (
            <ActivateExercisePlan />
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrentActivePlans;
