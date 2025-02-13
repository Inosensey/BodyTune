"use client";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// Icons
import MdiFoodDrumstickOutline from "@/icons/MdiFoodDrumstickOutline";
import SolarStarsMinimalisticLineDuotone from "@/icons/SolarStarsMinimalisticLineDuotone";
import TablerBarbell from "@/icons/TablerBarbellLight";

const WeeklyActivity = () => {
  return (
    <div className="w-full phone:px-2 laptop:px-4">
      <div className="flex phone:gap-1 phone:flex-col tablet:flex-row laptop:gap-3 w-full">
        <div
          data-testid="weekly-summary-container"
          className="bg-black flex flex-col rounded-md px-4 p-3 phone:w-12/12 tablet:max-w-[950px]"
        >
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
                  <p className="font-quickSand text-[0.9rem]">
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
                  </p>
                </div>
              </div>
              <div data-testid="meals-logged">
                <p className="underline font-dmSans text-[0.9rem] font-semibold text-lightSecondary">
                  Completed Meals
                </p>
                <div className="flex flex-col">
                  <p className="font-quickSand text-[0.9rem]">
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
                  </p>
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
                999
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
                999
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
                  Overall meal added
                </p>
              </div>
              <p className="text-3xl text-lightSecondary font-dmSans font-semibold">
                999
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
                999
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
                999
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-2 phone:h-full phone:flex-col laptop:flex-1">
          <div className="flex flex-col justify-center rounded-md gap-1 bg-black p-4 phone:w-12/12">
            <div data-testid="progress-made-this-week" className="flex flex-col">
              <p className="font-dmSans text-[1rem] font-semibold text-lightSecondary">
                Week&apos;s Progress
              </p>
              <p className="font-quickSand text-[0.8rem] text-[#b3b3b3]">
                Progress Achieved This Week
              </p>
            </div>
            <div className="w-[140px] h-28 flex justify-center mx-auto mt-4">
              <CircularProgressbar
                value={90}
                text={`${90}%`}
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
            <div data-testid="current-bodytune-progress" className="flex flex-col">
              <p className="font-dmSans text-[1rem] font-semibold text-lightSecondary">
                BodyTune Progress
              </p>
              <p className="font-quickSand text-[0.8rem] text-[#b3b3b3]">
                Current Selected BodyTune Progress
              </p>
            </div>
            <div className="w-[140px] h-28 flex justify-center mx-auto mt-4">
              <CircularProgressbar
                value={22}
                text={`${22}%`}
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
  );
};

export default WeeklyActivity;
