"use effect";

// Components
import IcOutlineArrowBackIosNew from "@/icons/IcOutlineArrowBackIosNew";

// Types
import { TableRow } from "@/types/database.types";
interface props {
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  personalInfo: TableRow<"personal_information">;
}

const FirstStep = ({ setSelectedOption }: props) => {
  return (
    <div className="bg-black rounded-lg py-3 px-2">
      <div
        className="flex items-center gap-1 cursor-pointer w-max group"
        onClick={() => setSelectedOption("")}
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
    </div>
  );
};

export default FirstStep;
