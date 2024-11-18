"use client";

// Components
import NewsFeed from "./NewsFeed";
import Suggestions from "./Suggestions";
import WeeklyActivity from "./WeeklyActivity";

const Overview = () => {
  return (
    <div className="w-full h-full">
      <div className="phone:w-11/12 laptop:max-w-[1200px]">
        <WeeklyActivity />
      </div>
      <div className="phone:w-11/12 laptop:max-w-[1200px]">
        <Suggestions />
      </div>
      <div className="phone:w-11/12 laptop:max-w-[1200px]">
        <NewsFeed />
      </div>
    </div>
  );
};

export default Overview;
