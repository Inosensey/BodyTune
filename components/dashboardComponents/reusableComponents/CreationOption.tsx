"use client";

import SolarSettingsLinear from "@/icons/SolarSettingsLinear";
import TablerBarbell from "@/icons/TablerBarbellLight";

// Types
interface props {
  setSelectOption: React.Dispatch<React.SetStateAction<string>>;
  label: string
}

const CreationOption = ({ setSelectOption, label }: props) => {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xl font-quickSand text-secondary font-bold">
        {label}
      </p>
      <div className="flex gap-2">
        <div
          className="bg-black rounded-lg flex flex-col justify-center items-center gap-1 text-center cursor-pointer p-2 h-[250px] transition duration-200 group hover:shadow-xl hover:shadow-[#1E1E1E] tablet:max-w-[250px]"
          onClick={() => setSelectOption("recommendation")}
        >
          <TablerBarbell color="#D3F0D1" width="2.0em" height="2.0em" />
          <p className="text-lg font-dmSans font-semibold text-lightSecondary transition duration-200 group-hover:text-[#a3e09f]">
            Recommendation
          </p>
          <p className="font-quickSand text-[0.8rem] text-[#b3b3b3] transition duration-200 group-hover:text-[#ffffff]">
            Let us create a personalized plan for you based on your BMI and
            exercise experience
          </p>
        </div>
        <div
          className="bg-black rounded-lg flex flex-col justify-center items-center gap-1 text-center cursor-pointer p-2 h-[250px] transition duration-200 group hover:shadow-xl hover:shadow-[#1E1E1E] tablet:max-w-[250px]"
          onClick={() => setSelectOption("custom")}
        >
          <SolarSettingsLinear color="#D3F0D1" width="2.0em" height="2.0em" />
          <p className="text-lg font-dmSans font-semibold text-lightSecondary transition duration-200 group-hover:text-[#a3e09f]">
            Custom
          </p>
          <p className="font-quickSand text-[0.8rem] text-[#b3b3b3] transition duration-200 group-hover:text-[#ffffff]">
            Design your own BodyTune to suit your preferences
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreationOption;
