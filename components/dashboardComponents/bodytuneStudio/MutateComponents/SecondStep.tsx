"use client";

// Components
import IcOutlineArrowBackIosNew from "@/icons/IcOutlineArrowBackIosNew";

// Types
import { InterfaceBreadCrumbs } from "@/types/inputTypes";
interface props {
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  setSelectedBreadCrumb: React.Dispatch<
    React.SetStateAction<InterfaceBreadCrumbs>
  >;
}
const SecondStep = ({ setSelectedOption, setProgress, setSelectedBreadCrumb }: props) => {
  return (
    <div className="bg-black rounded-lg py-4 px-2 tablet:w-[350px]">
      <div
        className="flex items-center gap-1 cursor-pointer w-max group"
        onClick={() => {
            
          setSelectedOption("")
          setProgress(1);
          setSelectedBreadCrumb({
            id: 1,
            title: "Body Metrics",
            shortDescription: "Set weight, height, and experience",
          });
        }}
      >
        <IcOutlineArrowBackIosNew
          color="#4B6F64"
          width="1.7em"
          height="1.7em"
        />
        <div>
          <p className="font-dmSans font-semibold text-sm text-[#b3b3b3] transition duration-200 group-hover:text-[#ffffff]">
            Return to BodyTune creation options
          </p>
        </div>
      </div>
      SecondStep
    </div>
  );
};

export default SecondStep;
