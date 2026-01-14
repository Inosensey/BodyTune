"use client";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  useQuery,
  // useQueryClient
} from "@tanstack/react-query";

// libs
import {
  getOverAllStatistics,
  getUserActivePlanData,
  getUserActivePlans,
  getUserWeeklyStatistics,
} from "@/lib/supabaseQueries";

// utils
import {
  arrangeIngredientInfo,
  getCompletedExercises,
  getCompletedMeals,
} from "@/utils/dashboardUtils";

// Icons
import MdiFoodDrumstickOutline from "@/icons/MdiFoodDrumstickOutline";
import SolarStarsMinimalisticLineDuotone from "@/icons/SolarStarsMinimalisticLineDuotone";
import TablerBarbell from "@/icons/TablerBarbellLight";

// Types
import { exerciseInfo, mealInterface } from "@/types/planTypes";

const WeeklyActivity = () => {
  // const queryClient = useQueryClient();

  // UseQuery
  const { data: userPlanInfo } = useQuery({
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
  const { data: userWeeklyActivities } = useQuery({
    queryKey: ["userWeeklyActivities"],
    queryFn: () => {
      return getUserWeeklyStatistics(userPlanInfo![0].id);
    },
  });
  const { data: userOverAllStatistics } = useQuery({
    queryKey: ["userOverAllStatistics"],
    queryFn: () => {
      return getOverAllStatistics(userPlanInfo![0].id);
    },
  });

  const exercises = userPlanDataInfo?.length !== 0 ? userPlanDataInfo?.filter(
    (data) => data.planType === "exercise"
  ) : [];
  const meals = userPlanDataInfo?.length !== 0 ? userPlanDataInfo?.filter((data) => data.planType === "meal") : [];

  const completedMeals: Array<mealInterface> = userPlanInfo?.length !== 0 ? getCompletedMeals(
    userPlanInfo![0].meal_plan,
    userWeeklyActivities
  ) : [];
  const completedExercises: Array<exerciseInfo> = userPlanInfo?.length !== 0 ? getCompletedExercises(
    userPlanInfo![0].exercise_plan,
    userWeeklyActivities
  ): [];

  let exerciseProgress = 0
  let mealProgress = 0
  let overAllProgress = 0

  if(completedExercises.length !== 0 || completedMeals.length !== 0) {
    exerciseProgress =
      (completedExercises.length / exercises!.length) * 100;
    mealProgress = (completedMeals.length / meals!.length) * 100;
    overAllProgress =
      ((completedMeals.length + completedExercises.length) /
        (exercises!.length + meals!.length)) *
      100;
  }

  return (
    <div className="w-full phone:px-2 laptop:px-4">
      <div className="flex phone:gap-1 phone:flex-col tablet:flex-row laptop:gap-3 w-full">
        <div
          data-testid="weekly-summary-container"
          className="bg-black flex flex-col justify-between rounded-md px-4 p-3 phone:w-12/12 tablet:max-w-[950px]"
        >
          <div className="flex flex-col">
            <div className="flex flex-col">
              <p className="font-dmSans font-semibold text-lightSecondary">
                Weekly Activity Summary
              </p>
              <p className="font-quickSand text-[0.8rem] text-[#b3b3b3]">
                A snapshot of your week&apos;s progress and achievements
              </p>
            </div>
            <div
              data-testid="recent-activities-container"
              className="flex justify-between"
            >
              <div className="flex flex-col gap-1 mt-2">
                <div data-testid="completed-workouts">
                  <p className="underline font-dmSans text-[0.9rem] font-semibold text-lightSecondary">
                    Completed Workout
                  </p>
                  <div className="flex flex-col">
                    {completedExercises.length === 0 ? (
                      <p className="font-quickSand text-[0.9rem]">
                        No workouts completed this week.{" "}
                      </p>
                    ) : (
                      completedExercises.map((exercise) => (
                        <p
                          key={exercise.id}
                          className="font-quickSand text-[#4A9B50] text-[0.9rem] font-semibold"
                        >
                          {exercise.exerciseName}
                        </p>
                      ))
                    )}
                    {/* <p className="font-quickSand text-[0.9rem]">
                    Completed workout
                  </p>
                  <p className="font-quickSand text-[0.9rem]">
                    Completed workout
                  </p>
                  <p className="font-quickSand text-[0.9rem]">
                    Completed workout
                  </p>
                  <p className="font-quickSand text-[0.9rem]">
                    Completed workout
                  </p> */}
                  </div>
                </div>
                <div data-testid="meals-logged">
                  <p className="underline font-dmSans text-[0.9rem] font-semibold text-lightSecondary">
                    Completed Meals
                  </p>
                  <div className="flex flex-col">
                    {completedMeals.length === 0 ? (
                      <p className="font-quickSand text-[0.9rem]">
                        No meals completed this week.
                      </p>
                    ) : (
                      completedMeals.map((meal) => {
                        const nutritionInfo = arrangeIngredientInfo(
                          meal.meal_ingredients
                        );
                        return (
                          <div key={meal.id}>
                            <p className="font-quickSand text-[0.9rem] text-[#4A9B50] font-semibold">
                              {meal.mealName} Meal{" "}
                              <span className="text-textGray text-[0.8rem]">
                                (kcal:
                                {nutritionInfo.nutritionInfo.calories.toFixed(
                                  2
                                )}
                                , F:{nutritionInfo.nutritionInfo.fat.toFixed(2)}{" "}
                                , C:
                                {nutritionInfo.nutritionInfo.carbs.toFixed(2)},
                                Prot:
                                {nutritionInfo.nutritionInfo.protein.toFixed(2)}
                                )
                              </span>
                            </p>
                          </div>
                        );
                      })
                    )}
                    {/* <p className="font-quickSand text-[0.9rem]">
                    Meals ate, calories, parts of the day
                  </p>
                  <p className="font-quickSand text-[0.9rem]">
                    Meals ate, calories, parts of the day
                  </p>
                  <p className="font-quickSand text-[0.9rem]">
                    Meals ate, calories, parts of the day
                  </p>
                  <p className="font-quickSand text-[0.9rem]">
                    Meals ate, calories, parts of the day
                  </p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            data-testid="stats-container"
            className="flex w-full flex-wrap mt-4 phone:flex-col phone:gap-1 mdphone:flex-row tablet:gap-4"
          >
            <div className="bg-primary flex flex-col justify-center gap-4 rounded-lg px-3 py-2 phone:w-[100%] mdphone:w-[140px] tablet:h-40 tablet:w-[145px]">
              <div data-testid="exercises-added" className="flex flex-col">
                <TablerBarbell color="#D3F0D1" width="1.7em" height="1.7em" />
                <p className="font-dmSans phone:text-[1rem] tablet:text-[0.8rem] font-semibold text-lightSecondary">
                  Exercise Added
                </p>
                <p className="font-quickSand phone:text-[0.9rem] tablet:text-[0.7rem] text-[#b3b3b3]">
                  Overall exercise added
                </p>
              </div>
              <p className="text-3xl text-lightSecondary font-dmSans font-semibold">
                {userOverAllStatistics!.exercisePlansCount}
              </p>
            </div>
            <div
              data-testid="meals-added"
              className="bg-primary flex flex-col justify-center gap-4 rounded-lg px-3 py-2 phone:w-[100%] mdphone:w-[140px] tablet:h-40 tablet:w-[145px]"
            >
              <div className="flex flex-col">
                <TablerBarbell color="#D3F0D1" width="1.7em" height="1.7em" />
                <p className="font-dmSans phone:text-[1rem] tablet:text-[0.8rem] font-semibold text-lightSecondary">
                  Exercise Completed
                </p>
                <p className="font-quickSand phone:text-[0.9rem] tablet:text-[0.7rem] text-[#b3b3b3]">
                  Overall exercise competed
                </p>
              </div>
              <p className="text-3xl text-lightSecondary font-dmSans font-semibold">
                {userOverAllStatistics!.exercisePlanCompleted}
              </p>
            </div>
            <div
              data-testid="exercises-completed"
              className="bg-primary flex flex-col justify-center gap-4 rounded-lg px-3 py-2 phone:w-[100%] mdphone:w-[140px] tablet:h-40 tablet:w-[145px]"
            >
              <div className="flex flex-col">
                <MdiFoodDrumstickOutline
                  color="#D3F0D1"
                  width="1.7em"
                  height="1.7em"
                />
                <p className="font-dmSans phone:text-[1rem] tablet:text-[0.8rem] font-semibold text-lightSecondary">
                  Meal Added
                </p>
                <p className="font-quickSand phone:text-[0.9rem] tablet:text-[0.7rem] text-[#b3b3b3]">
                  Overall meal Added
                </p>
              </div>
              <p className="text-3xl text-lightSecondary font-dmSans font-semibold">
                {userOverAllStatistics!.mealPlansCount}
              </p>
            </div>
            <div
              data-testid="meals-completed"
              className="bg-primary flex flex-col justify-center gap-4 rounded-lg px-3 py-2 phone:w-[100%] mdphone:w-[140px] tablet:h-40 tablet:w-[145px]"
            >
              <div className="flex flex-col">
                <MdiFoodDrumstickOutline
                  color="#D3F0D1"
                  width="1.7em"
                  height="1.7em"
                />
                <p className="font-dmSans phone:text-[1rem] tablet:text-[0.8rem] font-semibold text-lightSecondary">
                  Meal Completed
                </p>
                <p className="font-quickSand phone:text-[0.9rem] tablet:text-[0.7rem] text-[#b3b3b3]">
                  Overall meal completed
                </p>
              </div>
              <p className="text-3xl text-lightSecondary font-dmSans font-semibold">
                {userOverAllStatistics!.mealPlanCompleted}
              </p>
            </div>
            <div
              data-testid="bodytune-plan-created"
              className="bg-primary flex flex-col justify-center gap-4 rounded-lg px-3 py-2 phone:w-[100%] mdphone:w-[140px] tablet:h-40 tablet:w-[145px]"
            >
              <div className="flex flex-col">
                <SolarStarsMinimalisticLineDuotone
                  color="#D3F0D1"
                  width="1.7em"
                  height="1.7em"
                />
                <p className="font-dmSans phone:text-[1rem] tablet:text-[0.8rem] font-semibold text-lightSecondary">
                  BodyTune Created
                </p>
                <p className="font-quickSand phone:text-[0.9rem] tablet:text-[0.7rem] text-[#b3b3b3]">
                  Overall BodyTune created
                </p>
              </div>
              <p className="text-3xl text-lightSecondary font-dmSans font-semibold">
                {userOverAllStatistics!.bodyTunePlansCount}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-2 phone:h-full phone:flex-col laptop:flex-1">
          <div className="flex flex-col justify-center rounded-md gap-1 bg-black p-4 phone:w-12/12">
            <div
              data-testid="progress-made-this-week"
              className="flex flex-col"
            >
              <p className="font-dmSans text-[1rem] font-semibold text-lightSecondary">
                Week&apos;s Progress
              </p>
              <p className="font-quickSand text-[0.8rem] text-[#b3b3b3]">
                Progress Achieved This Week
              </p>
            </div>
            <div className="w-[140px] h-28 flex justify-center mx-auto mt-4">
              <CircularProgressbar
                value={parseFloat(overAllProgress.toFixed(2))}
                text={`${overAllProgress.toFixed(2)}%`}
                styles={buildStyles({
                  textSize: "16px",
                  pathColor: "#D3F0D1",
                  pathTransitionDuration: 0.5,
                  textColor: "#D3F0D1",
                  trailColor: "#121212",
                  backgroundColor: "#D3F0D1",
                })}
              />
            </div>
          </div>
          <div className="flex flex-col justify-center rounded-md gap-1 bg-black p-4 phone:w-12/12">
            <div
              data-testid="current-bodytune-progress"
              className="flex flex-col"
            >
              <p className="font-dmSans text-[1rem] font-semibold text-lightSecondary">
                BodyTune Progress
              </p>
              <p className="font-quickSand text-[0.8rem] text-[#b3b3b3]">
                Current Selected BodyTune Progress
              </p>
            </div>
            <div className="flex gap-1 mt-2">
              <div className="flex flex-col gap-1">
                <p className="font-dmSans text-[0.8rem] font-semibold text-lightSecondary">
                  Meal Plan Progress
                </p>
                <div className="w-[140px] h-28 flex justify-center mx-auto mt-1">
                  <CircularProgressbar
                    value={parseFloat(mealProgress.toFixed(2))}
                    text={`${mealProgress.toFixed(2)}%`}
                    styles={buildStyles({
                      textSize: "16px",
                      pathColor: "#D3F0D1",
                      pathTransitionDuration: 0.5,
                      textColor: "#D3F0D1",
                      trailColor: "#121212",
                      backgroundColor: "#D3F0D1",
                    })}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-dmSans text-[0.8rem] font-semibold text-lightSecondary">
                  Exercise Plan Progress
                </p>
                <div className="w-[140px] h-28 flex justify-center mx-auto mt-1">
                  <CircularProgressbar
                    value={parseFloat(exerciseProgress.toFixed(2))}
                    text={`${exerciseProgress.toFixed(2)}%`}
                    styles={buildStyles({
                      textSize: "16px",
                      pathColor: "#D3F0D1",
                      pathTransitionDuration: 0.5,
                      textColor: "#D3F0D1",
                      trailColor: "#121212",
                      backgroundColor: "#D3F0D1",
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyActivity;
