"use client";
import { motion } from "framer-motion";
import { useState } from "react";

// Components
import { Input } from "@/components/reusableComponent/formInputs/input";

// icons
import IcOutlineArrowBackIosNew from "@/icons/IcOutlineArrowBackIosNew";

// Types
import {
  registerInputType,
  stepsValidation,
  stepValidationResult,
} from "@/types/inputTypes";
import FormValidation, { validateRegistrationStep } from "@/utils/validation";
interface props {
  name: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  gender: string;
  height: string;
  weight: string;
  setRegisterInput: React.Dispatch<React.SetStateAction<registerInputType>>;
  progressTitle: string;
  currentProgress: number;
  totalProgress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  updateProgress: () => void;
  setStepValidation: React.Dispatch<React.SetStateAction<stepsValidation>>;
}
interface thirdStepValidation {
  name: {
    valid: boolean | null;
    validationMessage: string;
  };
  birthDay: {
    valid: boolean | null;
    validationMessage: string;
  };
  birthMonth: {
    valid: boolean | null;
    validationMessage: string;
  };
  birthYear: {
    valid: boolean | null;
    validationMessage: string;
  };
  height: {
    valid: boolean | null;
    validationMessage: string;
  };
  weight: {
    valid: boolean | null;
    validationMessage: string;
  };
}

// Initials
const thirdStepValidationInitials: thirdStepValidation = {
  name: {
    valid: null,
    validationMessage: "",
  },
  birthDay: {
    valid: null,
    validationMessage: "",
  },
  birthMonth: {
    valid: null,
    validationMessage: "",
  },
  birthYear: {
    valid: null,
    validationMessage: "",
  },
  height: {
    valid: null,
    validationMessage: "",
  },
  weight: {
    valid: null,
    validationMessage: "",
  },
};

const months: Array<string> = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

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

const ThirdStep = ({
  name,
  birthDay,
  birthMonth,
  birthYear,
  gender,
  height,
  weight,
  setRegisterInput,
  progressTitle,
  currentProgress,
  totalProgress,
  setProgress,
  updateProgress,
  setStepValidation,
}: props) => {
  // States
  const [thirdStepValidation, setThirdStepValidation] =
    useState<thirdStepValidation>(thirdStepValidationInitials);

  // Events
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const validationParams = {
      stateName: name,
      value: value,
    };

    const validationResult = FormValidation(validationParams);

    setThirdStepValidation((prev) => ({
      ...prev,
      [validationResult.validationName]: {
        valid: validationResult.valid,
        validationMessage: validationResult.validationMessage,
      },
    }));
    setRegisterInput((prev) => ({ ...prev, [name]: value }));
  };
  const radioOnChange = (value: string, name: string) => {
    setRegisterInput((prev) => ({ ...prev, [name]: value }));
  };
  const selectOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    setRegisterInput((prev) => ({ ...prev, [name]: value }));
  };

  // Validations
  const validationRules = {
    name: (value: string) => FormValidation({ stateName: "name", value }),
    birthDay: (value: string) =>
      FormValidation({ stateName: "birthDay", value }),
    birthMonth: (value: string) =>
      FormValidation({ stateName: "birthMonth", value }),
    birthYear: (value: string) =>
      FormValidation({ stateName: "birthYear", value }),
    height: (value: string) => FormValidation({ stateName: "height", value }),
    weight: (value: string) => FormValidation({ stateName: "weight", value }),
  };
  const checkValidations = (validationInfo: stepValidationResult) => {
    let isValid = true; // Track overall validation state
    for (const [key, value] of Object.entries(validationInfo)) {
      setThirdStepValidation((prev) => ({
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
    setStepValidation((prev) => ({ ...prev, isThirdStepValid: isValid }));
  };

  return (
    <>
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
          className="flex flex-col gap-3"
        >
          <motion.div variants={childContainer} className="w-full">
            <div className="w-full relative">
              <Input
                name="name"
                placeholder="Enter your Name"
                state={name}
                type="text"
                label="Name"
                shortDescription="This name will appear on your profile"
                onChange={onChange}
                onBlur={onChange}
                autoComplete="off"
                valid={thirdStepValidation.name.valid}
                validationMessage={thirdStepValidation.name.validationMessage}
              />
            </div>
          </motion.div>
          <motion.div variants={childContainer} className="w-full">
            <div className="flex flex-col">
              <label className="phone:text-sm font-quickSand font-semibold">
                Date of birth
              </label>
              <p className="text-[#999999] text-xs font-semibold font-dmSans">
                Why do we need your date of birth? Learn more.
              </p>
            </div>
            <div className="flex items-center gap-1 w-full">
              <div className="w-4/12 relative">
                <Input
                  name={"birthDay"}
                  placeholder="dd"
                  state={birthDay}
                  type="text"
                  onChange={onChange}
                  autoComplete="off"
                  valid={thirdStepValidation.birthDay.valid}
                />
              </div>
              <div
                style={{
                  border:
                    thirdStepValidation.birthMonth.valid === null ||
                    thirdStepValidation.birthMonth.valid
                      ? ""
                      : "1px solid rgb(239 68 68)",
                }}
                className="w-full relative mt-[0.05rem]"
              >
                <div
                  className={`flex flex-col phone:w-[96%] mdphone:w-11/12 laptop:w-full gap-2 bg-primary`}
                >
                  <select
                    className={`bg-transparent w-[92%] text-white h-[2.7rem] phone:text-sm font-quickSand`}
                    onChange={selectOnChange}
                    name="birthMonth"
                    defaultValue={birthMonth}
                  >
                    <option
                      className="bg-primary font-quickSand"
                      value=""
                      disabled
                    >
                      Month
                    </option>
                    {months.map((month: string) => (
                      <option
                        className="bg-primary font-quickSand"
                        key={month}
                        value={month}
                      >
                        {month}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="w-5/12/12 relative">
                <Input
                  name={"birthYear"}
                  placeholder="yyyy"
                  state={birthYear}
                  type="text"
                  onChange={onChange}
                  autoComplete="off"
                  valid={thirdStepValidation.birthYear.valid}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 mt-1">
              <p className="text-[0.75rem] text-red-500 font-bold font-dmSans">
                {thirdStepValidation.birthDay.validationMessage}
              </p>
              <p className="text-[0.75rem] text-red-500 font-bold font-dmSans">
                {thirdStepValidation.birthMonth.validationMessage}
              </p>
              <p className="text-[0.75rem] text-red-500 font-bold font-dmSans">
                {thirdStepValidation.birthYear.validationMessage}
              </p>
            </div>
          </motion.div>
          <motion.div variants={childContainer} className="w-full">
            <div className="flex flex-col">
              <label className="phone:text-sm font-quickSand font-semibold">
                Height & Weight
              </label>
              <p className="text-[#999999] text-xs font-semibold font-dmSans">
                This information helps us create a personalized exercise and
                diet plan tailored to your body’s needs.
              </p>
            </div>
            <div className="flex gap-2">
              <div className="min-w-[10px] max-w-[100px] relative">
                <Input
                  name="weight"
                  placeholder="Weight"
                  state={weight}
                  type="text"
                  label="Weight (kg)"
                  onChange={onChange}
                  autoComplete="off"
                  valid={thirdStepValidation.weight.valid}
                />
              </div>
              <div className="min-w-[10px] max-w-[100px] relative">
                <Input
                  name="height"
                  placeholder="Height"
                  state={height}
                  type="text"
                  label="Height (cm)"
                  onChange={onChange}
                  autoComplete="off"
                  valid={thirdStepValidation.height.valid}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 mt-1">
              <p className="text-[0.75rem] text-red-500 font-bold font-dmSans">
                {thirdStepValidation.weight.validationMessage}
              </p>
              <p className="text-[0.75rem] text-red-500 font-bold font-dmSans">
                {thirdStepValidation.height.validationMessage}
              </p>
            </div>
          </motion.div>
          <motion.div variants={childContainer} className="w-full">
            <div className="flex flex-col">
              <label className="phone:text-sm font-quickSand font-semibold">
                Gender
              </label>
              <p className="text-[#999999] text-xs font-semibold font-dmSans">
                Why do we need your date of birth? We use your gender to help
                personalize our content recommendations for you.
              </p>
            </div>
            <div className="w-full flex items-center flex-wrap gap-2 mt-2">
              <div
                className="flex items-center gap-1 cursor group font-dmSans"
                onClick={() => radioOnChange("Male", "gender")}
              >
                <div
                  style={{
                    boxShadow:
                      gender === "Male"
                        ? "0px 0px 0px 3.5px #4B6F64 inset"
                        : "",
                  }}
                  className="w-4 h-4 rounded-2xl shadow-[0px_0px_0px_2px_#fff_inset] group-hover:shadow-[0px_0px_0px_2px_#4B6F64_inset]"
                ></div>
                <label>Male</label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  className="hidden"
                  onChange={() => console.log("wew")}
                  checked={gender === "Male" ? true : false}
                />
              </div>
              <div
                className="flex items-center gap-1 cursor group font-dmSans"
                onClick={() => radioOnChange("Female", "gender")}
              >
                <div
                  style={{
                    boxShadow:
                      gender === "Female"
                        ? "0px 0px 0px 3.5px #4B6F64 inset"
                        : "",
                  }}
                  className="w-4 h-4 rounded-2xl shadow-[0px_0px_0px_2px_#fff_inset] group-hover:shadow-[0px_0px_0px_2px_#4B6F64_inset]"
                ></div>
                <label>Female</label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  className="hidden"
                  onChange={() => console.log("wew")}
                  checked={gender === "Female" ? true : false}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="w-28 mx-auto">
        <motion.button
          data-testid="next-step-button"
          onClick={() => {
            const values = {
              name,
              birthDay,
              birthMonth,
              birthYear,
              weight,
              height,
            };
            const validationResult = validateRegistrationStep(
              values,
              validationRules
            );
            checkValidations(validationResult);
            updateProgress();
          }}
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.9 }}
          className="bg-secondary text-white font-quickSand font-bold w-full rounded-md p-1 mt-2"
        >
          Next
        </motion.button>
      </div>
    </>
  );
};

export default ThirdStep;
