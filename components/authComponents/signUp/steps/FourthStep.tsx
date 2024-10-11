"use client";
import { useState } from "react";

// Components
import { CheckBoxInput } from "@/components/reusableComponent/formInputs/input";

// icons
import IcOutlineArrowBackIosNew from "@/icons/IcOutlineArrowBackIosNew";

interface props {
  progressTitle: string;
  currentProgress: number;
  totalProgress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
}

interface toggleTermsAndConditionType {
  marketingMessages: string,
  termsAndCondition: string,
  remainders: string
}

// Initials
const toggleTermsAndConditionInit:toggleTermsAndConditionType = {
    marketingMessages: "false",
    termsAndCondition: "false",
    remainders: "false"
}

const FourthStep = ({
  currentProgress,
  progressTitle,
  setProgress,
  totalProgress,
}: props) => {
    // States
    const [toggleTermsAndCondition, setToggleTermsAndCondition] = useState<toggleTermsAndConditionType>(toggleTermsAndConditionInit)

    // Events
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target

        setToggleTermsAndCondition((prev) => ({...prev, [name]: value}))
    }
    console.log(toggleTermsAndCondition);
  return (
    <div className="flex flex-col justify-center mx-auto gap-8 max-w-[450px] phone:w-8/12 mt-4">
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => setProgress((prev) => prev - 1)}
      >
        <IcOutlineArrowBackIosNew
          color="#4B6F64"
          width="1.7em"
          height="1.7em"
        />
        <div>
          <p className="text-[#ccc] font-dmSans font-semibold text-sm">
            Step {currentProgress} of {totalProgress}
          </p>
          <p className="font-quickSand font-bold">{progressTitle}</p>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="w-full relative">
          <CheckBoxInput
            name="marketingMessages"
            state={toggleTermsAndCondition.marketingMessages}
            label="I would prefer not to receive marketing messages from BodyTune."
            onChange={onChange}
          />
        </div>
        <div className="w-full relative">
          <CheckBoxInput
            name="remainders"
            state={toggleTermsAndCondition.remainders}
            label="Receive Progress updates and remainders."
            onChange={onChange}
          />
        </div>
        <div className="w-full relative">
          <CheckBoxInput
            name="termsAndCondition"
            state={toggleTermsAndCondition.termsAndCondition}
            label="I agree to the BodyTune Terms and Conditions of Use and Privacy Policy."
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};

export default FourthStep;
