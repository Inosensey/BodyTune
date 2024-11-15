"use client";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// Icons
import MdiFoodDrumstickOutline from "@/icons/MdiFoodDrumstickOutline";
import SolarStarsMinimalisticLineDuotone from "@/icons/SolarStarsMinimalisticLineDuotone";
import TablerBarbell from "@/icons/TablerBarbellLight";

const WeeklyActivity = () => {
  return (
    <div className="w-full px-4 mt-4">
      <div>
        <div
          data-testid="weekly-summary-container"
          className="bg-black flex flex-col rounded-md px-4 p-3 phone:w-9/12 tablet:max-w-[950px]"
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
              <div data-testid="completed-workout">
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
            <div className="flex flex-col justify-center gap-1">
              <div data-testid="exercises-added" className="flex flex-col">
                <p className="font-dmSans text-[1rem] font-semibold text-lightSecondary">
                  BodyTune Progress
                </p>
                <p className="font-quickSand text-[0.8rem] text-[#b3b3b3]">
                  Current Selected BodyTune Progress
                </p>
              </div>
              <div className="w-[140px] h-28 flex justify-center mx-auto mt-4">
                <CircularProgressbar
                  value={66}
                  text={`${66}%`}
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
          <div
            data-testid="stats-container"
            className="flex phone:flex-col tablet:flex-row gap-4 mt-4"
          >
            <div className="bg-primary flex flex-col justify-center gap-4 rounded-lg px-3 py-2 phone:w-[22%] tablet:h-40 tablet:max-w-[180px]">
              <div data-testid="exercises-added" className="flex flex-col">
                <TablerBarbell color="#D3F0D1" width="1.7em" height="1.7em" />
                <p className="font-dmSans text-[0.8rem] font-semibold text-lightSecondary">
                  Exercise Added
                </p>
                <p className="font-quickSand text-[0.7rem] text-[#b3b3b3]">
                  Overall exercise added
                </p>
              </div>
              <p className="text-3xl text-lightSecondary font-dmSans font-semibold">
                999
              </p>
            </div>
            <div
              data-testid="meals-added"
              className="bg-primary flex flex-col justify-center gap-4 rounded-lg px-3 py-2 phone:w-[22%] tablet:h-40 tablet:max-w-[180px]"
            >
              <div className="flex flex-col">
                <TablerBarbell color="#D3F0D1" width="1.7em" height="1.7em" />
                <p className="font-dmSans text-[0.8rem] font-semibold text-lightSecondary">
                  Exercise Completed
                </p>
                <p className="font-quickSand text-[0.7rem] text-[#b3b3b3]">
                  Overall exercise competed
                </p>
              </div>
              <p className="text-3xl text-lightSecondary font-dmSans font-semibold">
                999
              </p>
            </div>
            <div
              data-testid="exercises-completed"
              className="bg-primary flex flex-col justify-center gap-4 rounded-lg px-3 py-2 phone:w-[22%] tablet:h-40 tablet:max-w-[180px]"
            >
              <div className="flex flex-col">
                <MdiFoodDrumstickOutline
                  color="#D3F0D1"
                  width="1.7em"
                  height="1.7em"
                />
                <p className="font-dmSans text-[0.8rem] font-semibold text-lightSecondary">
                  Meal Added
                </p>
                <p className="font-quickSand text-[0.7rem] text-[#b3b3b3]">
                  Overall meal added
                </p>
              </div>
              <p className="text-3xl text-lightSecondary font-dmSans font-semibold">
                999
              </p>
            </div>
            <div
              data-testid="meals-logged"
              className="bg-primary flex flex-col justify-center gap-4 rounded-lg px-3 py-2 phone:w-[22%] tablet:h-40 tablet:max-w-[180px]"
            >
              <div className="flex flex-col">
                <MdiFoodDrumstickOutline
                  color="#D3F0D1"
                  width="1.7em"
                  height="1.7em"
                />
                <p className="font-dmSans text-[0.8rem] font-semibold text-lightSecondary">
                  Meal Completed
                </p>
                <p className="font-quickSand text-[0.7rem] text-[#b3b3b3]">
                  Overall meal completed
                </p>
              </div>
              <p className="text-3xl text-lightSecondary font-dmSans font-semibold">
                999
              </p>
            </div>
            <div
              data-testid="meals-logged"
              className="bg-primary flex flex-col justify-center gap-4 rounded-lg px-3 py-2 phone:w-[22%] tablet:h-40 tablet:max-w-[180px]"
            >
              <div className="flex flex-col">
                <SolarStarsMinimalisticLineDuotone
                  color="#D3F0D1"
                  width="1.7em"
                  height="1.7em"
                />
                <p className="font-dmSans text-[0.8rem] font-semibold text-lightSecondary">
                  BodyTune Created
                </p>
                <p className="font-quickSand text-[0.7rem] text-[#b3b3b3]">
                  Overall BodyTune created
                </p>
              </div>
              <p className="text-3xl text-lightSecondary font-dmSans font-semibold">
                999
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyActivity;
