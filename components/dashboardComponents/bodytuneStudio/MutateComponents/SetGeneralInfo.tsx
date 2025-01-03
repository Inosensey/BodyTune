"use effect";
import React, { useState } from "react";
import { motion } from "framer-motion";

// Components
import { Input } from "@/components/reusableComponent/formInputs/input";
import IcOutlineArrowBackIosNew from "@/icons/IcOutlineArrowBackIosNew";

// Utils
import FormValidation from "@/utils/validation";

// Types
import { TableRow } from "@/types/database.types";
import {
  InterfaceBreadCrumbs,
  stepValidationResult,
  validation,
} from "@/types/inputTypes";
interface props {
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  setSelectedBreadCrumb: React.Dispatch<
    React.SetStateAction<InterfaceBreadCrumbs>
  >;
  personalInfo: TableRow<"personal_information">;
}
interface generalInfoType {
  weight: string;
  height: string;
  experience: string;
}

interface generalInfoValidation {
  height: {
    valid: boolean | null;
    validationMessage: string;
  };
  weight: {
    valid: boolean | null;
    validationMessage: string;
  };
  experience: {
    valid: boolean | null;
    validationMessage: string;
  };
}

// Initials
const generalInfoValidationInitials: generalInfoValidation = {
  height: {
    valid: null,
    validationMessage: "",
  },
  weight: {
    valid: null,
    validationMessage: "",
  },
  experience: {
    valid: null,
    validationMessage: "",
  },
};
const experiences: Array<string> = ["Beginner", "Intermediate", "Expert"];

const SetGeneralInfo = ({
  setSelectedOption,
  setProgress,
  setSelectedBreadCrumb,
  personalInfo,
}: props) => {
  // State
  const [generalInfoFieldsVal, setGeneralInfoFieldsVal] = useState<generalInfoType>({
    height: personalInfo.height!.toString(),
    weight: personalInfo.weight!.toString(),
    experience: "",
  });
  const [generalInfoValidation, setGeneralInfoValidation] =
    useState<generalInfoValidation>(generalInfoValidationInitials);

  // Events
  const selectOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    const validationParams = {
      stateName: name,
      value: value,
    };

    const validationResult: validation = FormValidation(validationParams);

    setGeneralInfoValidation((prev) => ({
      ...prev,
      [validationResult.validationName!]: {
        valid: validationResult.valid,
        validationMessage: validationResult.validationMessage,
      },
    }));

    // const allInputValidationResult = checkAllInputValidations();
    checkValidations(validationResult);

    setGeneralInfoFieldsVal((prev) => ({ ...prev, [name]: value }));
  };
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const validationParams = {
      stateName: name,
      value: value,
    };

    const validationResult: validation = FormValidation(validationParams);

    setGeneralInfoValidation((prev) => ({
      ...prev,
      [validationResult.validationName!]: {
        valid: validationResult.valid,
        validationMessage: validationResult.validationMessage,
      },
    }));

    // const allInputValidationResult = checkAllInputValidations();
    checkValidations(validationResult);

    setGeneralInfoFieldsVal((prev) => ({ ...prev, [name]: value }));
  };

  const checkValidations = (
    validationInfo: stepValidationResult | validation
  ) => {
    let isValid = true; // Track overall validation state
    for (const [key, value] of Object.entries(validationInfo)) {
      setGeneralInfoValidation((prev) => ({
        ...prev,
        [key]: {
          valid: value.valid,
          validationMessage: value.validationMessage,
        },
      }));
      if (value.valid === false) {
        isValid = false; // If any validation fails, set isValid to false
      }
    }

    return isValid;
  };
  return (
    <div className="bg-black rounded-lg py-4 px-2 max-h tablet:w-[350px]">
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
      <div className="mt-4 flex flex-col items-center gap-4">
        <div className="flex justify-center gap-6">
          <div className="min-w-[10px] max-w-[120px] relative">
            <Input
              name="weight"
              placeholder="Weight"
              state={generalInfoFieldsVal.weight}
              type="text"
              label="Weight (kg)"
              onChange={onChange}
              autoComplete="off"
              valid={generalInfoValidation.weight.valid}
            />
          </div>
          <div className="min-w-[10px] max-w-[120px] relative">
            <Input
              name="height"
              placeholder="Height"
              state={generalInfoFieldsVal.height}
              type="text"
              label="Height (cm)"
              onChange={onChange}
              autoComplete="off"
              valid={generalInfoValidation.height.valid}
            />
          </div>
        </div>
        <div
          style={{
            border:
              generalInfoValidation.experience.valid === null ||
              generalInfoValidation.experience.valid
                ? ""
                : "1px solid rgb(239 68 68)",
          }}
          className="relative mt-[0.05rem] phone:w-[96%] mdphone:w-11/12 laptop:w-[270px]"
        >
          <label className="phone:text-sm font-quickSand font-semibold">
            Choose Exercise Experience
          </label>
          <div className={`flex flex-col w-full gap-2 bg-primary`}>
            <select
              className={`bg-transparent w-[92%] text-white h-[2.7rem] phone:text-sm font-quickSand`}
              onChange={selectOnChange}
              name="birthMonth"
              defaultValue={generalInfoFieldsVal.experience}
            >
              <option className="bg-primary font-quickSand" value="" disabled>
                Experience
              </option>
              {experiences.map((experience: string) => (
                <option
                  className="bg-primary font-quickSand"
                  key={experience}
                  value={experience}
                >
                  {experience}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="w-28 mx-auto mt-2">
        <motion.button
          onClick={() => {
            setProgress((prev) => prev + 1);
            setSelectedBreadCrumb({
              id: 2,
              title: "Meal Plan",
              shortDescription: "Customize your daily meals",
            });
          }}
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.9 }}
          className="bg-secondary text-white font-quickSand font-bold w-full rounded-md p-1 mt-2"
          type="button"
        >
          Next
        </motion.button>
      </div>
    </div>
  );
};

export default SetGeneralInfo;
