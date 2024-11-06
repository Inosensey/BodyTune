"use client";
import { useState } from "react";
import { motion } from "framer-motion";

// Components
import { CheckBoxInput } from "@/components/reusableComponent/formInputs/input";

// icons
import IcOutlineArrowBackIosNew from "@/icons/IcOutlineArrowBackIosNew";
import TablerSquareRoundedPlus from "@/icons/TablerSquareRoundedPlus";


// Types
import { stepsValidation } from "@/types/inputTypes";
interface props {
  progressTitle: string;
  currentProgress: number;
  totalProgress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  setStepValidation: React.Dispatch<React.SetStateAction<stepsValidation>>;
}

interface toggleTermsAndConditionType {
  marketingMessages: string;
  termsAndCondition: string;
  remainders: string;
}

// Initials
const toggleTermsAndConditionInit: toggleTermsAndConditionType = {
  marketingMessages: "false",
  termsAndCondition: "false",
  remainders: "false",
};

// Variants
const containerVariant = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};
const childContainer = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};

const FourthStep = ({
  currentProgress,
  progressTitle,
  setProgress,
  totalProgress,
  setStepValidation
}: props) => {
  // States
  const [toggleTermsAndCondition, setToggleTermsAndCondition] =
    useState<toggleTermsAndConditionType>(toggleTermsAndConditionInit);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  // Events
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    setToggleTermsAndCondition((prev) => ({ ...prev, [name]: `${checked}` }));
  };

  const checkValidation = () => {
    if (toggleTermsAndCondition.termsAndCondition !== "true") {
      setIsValid(false);
      setStepValidation((prev) => ({...prev, isFourthStepValid: false}))
    } else {
      setIsValid(true);
      setStepValidation((prev) => ({...prev, isFourthStepValid: true}))
    }
  };
  return (
    <div className="flex flex-col justify-center mx-auto gap-8 max-w-[450px] phone:w-11/12 mt-4">
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
      <motion.div
        variants={containerVariant}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-6"
      >
        <motion.div variants={childContainer} className="w-full relative">
          <CheckBoxInput
            name="marketingMessages"
            state={toggleTermsAndCondition.marketingMessages}
            label="I would prefer not to receive marketing messages from BodyTune."
            onChange={onChange}
          />
        </motion.div>
        <motion.div variants={childContainer} className="w-full relative">
          <CheckBoxInput
            name="remainders"
            state={toggleTermsAndCondition.remainders}
            label="Receive Progress updates and remainders."
            onChange={onChange}
          />
        </motion.div>
        <motion.div variants={childContainer} className="w-full relative">
          <CheckBoxInput
            name="termsAndCondition"
            state={toggleTermsAndCondition.termsAndCondition}
            label="I agree to the BodyTune Terms and Conditions of Use and Privacy Policy."
            onChange={onChange}
          />
        </motion.div>
      </motion.div>
      {!isValid && isValid !== null && (
        <div className="flex flex-col gap-1 mt-1 mx-auto">
          <p className="text-[0.75rem] text-red-500 font-bold font-dmSans">
            You must agree to the Terms and Conditions
          </p>
        </div>
      )}
      <div className="w-28 mx-auto">
        <motion.button
          data-testid="next-step-button"
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.2 },
          }}
          onClick={() => {
            checkValidation();
          }}
          whileTap={{ scale: 0.9 }}
          className="bg-secondary text-white font-quickSand font-bold w-full rounded-md p-1 mt-2 flex items-center justify-center gap-2"
          type="submit"
        >
          <TablerSquareRoundedPlus height="1.2em" width="1.2em" color="#fff" />
          Submit
        </motion.button>
      </div>
    </div>
  );
};

export default FourthStep;
