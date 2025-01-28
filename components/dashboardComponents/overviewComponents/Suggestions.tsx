import React from "react";

const Suggestions = () => {
  return (
    <div className="w-full mt-4 phone:px-2 tablet:px-4">
      <div
        data-testid="suggestions-container"
        className="bg-black flex flex-col rounded-md px-4 py-3 phone:w-full"
      >
        <div className="flex flex-col">
          <p className="font-dmSans font-semibold text-lightSecondary">
            Personalized Suggestions
          </p>
          <p className="font-quickSand text-[0.8rem] text-[#b3b3b3]">
            Tailored recommendations to boost your fitness journey, customized based on your weight, height, and experience level
          </p>
        </div>
        <div className="mt-2 flex justify-between phone:flex-col phone:gap-1 tablet:flex-row">
          <div className="flex flex-col max-h-[300px] phone:w-12/12 tablet:w-[33%] py-1 px-2 bg-primary rounded-lg">
            <div className="flex flex-col">
              <p className="font-dmSans font-semibold text-[0.9rem] text-lightSecondary">
                Exercise Plans
              </p>
            </div>
            <div className="overflow-auto flex-1">
              <table className="w-full">
                <thead>
                  <tr className="font-dmSans text-left font-semibold text-[0.8rem] ">
                    <th className="w-4/12">Author Name</th>
                    <th>Title</th>
                  </tr>
                </thead>
                <tbody className="font-quickSand text-left font-semibold text-[0.8rem] ">
                  <tr>
                    <td>Philip</td>
                    <td className="cursor-pointer hover:underline">
                      Exercise Plan here
                    </td>
                  </tr>
                  <tr>
                    <td>Philip</td>
                    <td className="cursor-pointer hover:underline">
                      Exercise Plan here
                    </td>
                  </tr>
                  <tr>
                    <td>Philip</td>
                    <td className="cursor-pointer hover:underline">
                      Exercise Plan here
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-col max-h-[300px] phone:w-12/12 tablet:w-[33%] py-1 px-2 bg-primary rounded-lg">
            <div className="flex flex-col">
              <p className="font-dmSans font-semibold text-[0.9rem] text-lightSecondary">
                Meal Plans
              </p>
            </div>
            <div className="overflow-auto flex-1">
              <table className="w-full">
                <thead>
                  <tr className="font-dmSans text-left font-semibold text-[0.8rem] ">
                    <th className="w-4/12">Author Name</th>
                    <th>Title</th>
                  </tr>
                </thead>
                <tbody className="font-quickSand text-left font-semibold text-[0.8rem] ">
                  <tr>
                    <td>Philip</td>
                    <td className="cursor-pointer hover:underline">
                      Meal Plan here
                    </td>
                  </tr>
                  <tr>
                    <td>Philip</td>
                    <td className="cursor-pointer hover:underline">
                      Meal Plan here
                    </td>
                  </tr>
                  <tr>
                    <td>Philip</td>
                    <td className="cursor-pointer hover:underline">
                      Meal Plan here
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-col max-h-[300px] phone:w-12/12 tablet:w-[33%] py-1 px-2 bg-primary rounded-lg">
            <div className="flex flex-col">
              <p className="font-dmSans font-semibold text-[0.9rem] text-lightSecondary">
                BodyTune&apos;s
              </p>
            </div>
            <div className="overflow-auto flex-1">
              <table className="w-full">
                <thead>
                  <tr className="font-dmSans text-left font-semibold text-[0.8rem] ">
                    <th className="w-4/12">Author Name</th>
                    <th>Title</th>
                  </tr>
                </thead>
                <tbody className="font-quickSand text-left font-semibold text-[0.8rem] ">
                  <tr>
                    <td>Philip</td>
                    <td className="cursor-pointer hover:underline">
                      BodyTune Plan here
                    </td>
                  </tr>
                  <tr>
                    <td>Philip</td>
                    <td className="cursor-pointer hover:underline">
                      BodyTune Plan here
                    </td>
                  </tr>
                  <tr>
                    <td>Philip</td>
                    <td className="cursor-pointer hover:underline">
                      BodyTune Plan here
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
