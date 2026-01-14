"use client";

import SolarSettingsLinear from "@/icons/SolarSettingsLinear";
import TablerBarbell from "@/icons/TablerBarbellLight";

// Types
interface props {
  setSelectOption: React.Dispatch<React.SetStateAction<string>>;
  label: string
}

const ActivityCreationOption = ({ setSelectOption, label }: props) => {
  return (
    <div className="flex flex-col gap-1">
      <p className="font-quickSand text-secondary font-bold phone:text-base phone:text-center laptop:text-xl ">
        {label}
      </p>
      <div className="flex gap-2 phone:flex-col tablet:flex-row">
        <div
          className="bg-black rounded-lg flex flex-col justify-center items-center gap-1 text-center cursor-pointer p-2 transition duration-200 group hover:shadow-xl hover:shadow-[#1E1E1E] phone:h-[200px] phone:w-[100%] tablet:max-w-[250px] tablet:h-[250px]"
          onClick={() => setSelectOption("BodyTune")}
        >
          <TablerBarbell color="#D3F0D1" width="2.0em" height="2.0em" />
          <p className="text-lg font-dmSans font-semibold text-lightSecondary transition duration-200 group-hover:text-[#a3e09f]">
            BodyTune List
          </p>
          <p className="font-quickSand text-[0.8rem] text-[#b3b3b3] transition duration-200 group-hover:text-[#ffffff]">
            Pick from your curated BodyTune plans
          </p>
        </div>
        <div
          className="bg-black rounded-lg flex flex-col justify-center items-center gap-1 text-center cursor-pointer p-2 transition duration-200 group hover:shadow-xl hover:shadow-[#1E1E1E] phone:h-[200px] phone:w-[100%] tablet:max-w-[250px] tablet:h-[250px]"
          onClick={() => setSelectOption("custom")}
        >
          <SolarSettingsLinear color="#D3F0D1" width="2.0em" height="2.0em" />
          <p className="text-lg font-dmSans font-semibold text-lightSecondary transition duration-200 group-hover:text-[#a3e09f]">
            Custom Activity
          </p>
          <p className="font-quickSand text-[0.8rem] text-[#b3b3b3] transition duration-200 group-hover:text-[#ffffff]">
            Create your own activity by combining exercises and meal plans
          </p>
        </div>
      </div>
    </div>
  );
};

export default ActivityCreationOption;
