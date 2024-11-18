import React from "react";

const Suggestions = () => {
  return (
    <div className="w-full px-4 mt-4">
      <div
        data-testid="news-feed-container"
        className="bg-black flex flex-col rounded-md px-4 p-3 phone:w-9/12 tablet:w-full"
      >
        <div className="flex flex-col">
          <p className="font-dmSans font-semibold text-lightSecondary">
            Personalized Suggestions
          </p>
          <p className="font-quickSand text-[0.8rem] text-[#b3b3b3]">
            Tailored recommendations to boost your fitness journey
          </p>
        </div>
        <div className="mt-2 flex justify-between phone:flex-col tablet:flex-row">
          <div className="h-[300px] phone:w-11/12 tablet:w-[32%] p-1 bg-primary rounded-lg">
            <div className="flex flex-col">
              <p className="font-dmSans font-semibold text-[0.9rem] text-lightSecondary">
                Exercise Plans
              </p>
            </div>
          </div>
          <div className="h-[300px] phone:w-11/12 tablet:w-[32%] p-1 bg-primary rounded-lg">
            <div className="flex flex-col">
              <p className="font-dmSans font-semibold text-[0.9rem] text-lightSecondary">
                Meal Plans
              </p>
            </div>
          </div>
          <div className="h-[300px] phone:w-11/12 tablet:w-[32%] p-1 bg-primary rounded-lg">
            <div className="flex flex-col">
              <p className="font-dmSans font-semibold text-[0.9rem] text-lightSecondary">
                BodyTune&apos;s
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
