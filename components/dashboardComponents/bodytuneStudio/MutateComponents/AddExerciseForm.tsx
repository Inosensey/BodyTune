"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// Components
import Overlay from "@/components/reusableComponent/Overlay";
import {
  Input,
  TextareaInput,
} from "@/components/reusableComponent/formInputs/input";

// Utils
import FormValidation from "@/utils/validation";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmarkCircle,
  //   faPlusSquare,
} from "@fortawesome/free-regular-svg-icons";

// Types
import { stepValidationResult, validation } from "@/types/inputTypes";
interface props {
  setToggleAddExerciseForm: React.Dispatch<React.SetStateAction<boolean>>;
}
interface ExerciseFormInputTypes {
  title: string;
  shortDescription: string;
  difficulty: string;
  measurementType: string;
}
interface ExerciseFormValidations {
  title: {
    valid: boolean | null;
    validationMessage: string;
  };
  shortDescription: {
    valid: boolean | null;
    validationMessage: string;
  };
  difficulty: {
    valid: boolean | null;
    validationMessage: string;
  };
  measurementType: {
    valid: boolean | null;
    validationMessage: string;
  };
}

// Initials
const ExerciseFormInputValInitial: ExerciseFormInputTypes = {
  title: "",
  shortDescription: "",
  difficulty: "",
  measurementType: "",
};
const ExerciseFormValidationInitials: ExerciseFormValidations = {
  title: {
    valid: null,
    validationMessage: "",
  },
  shortDescription: {
    valid: null,
    validationMessage: "",
  },
  difficulty: {
    valid: null,
    validationMessage: "",
  },
  measurementType: {
    valid: null,
    validationMessage: "",
  },
};

// Variants
const childContainer = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};

const AddExerciseForm = ({ setToggleAddExerciseForm }: props) => {
  // States
  const [exerciseValidations, setExerciseStepValidations] =
    useState<ExerciseFormValidations>(ExerciseFormValidationInitials);
  const [exerciseFormInputVal, setExerciseFormInputVal] =
    useState<ExerciseFormInputTypes>(ExerciseFormInputValInitial);

  // Events
  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setExerciseFormInputVal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const validationParams = {
      stateName: name,
      value: value,
    };

    const validationResult: validation = FormValidation(validationParams);

    setExerciseStepValidations((prev) => ({
      ...prev,
      [validationResult.validationName!]: {
        valid: validationResult.valid,
        validationMessage: validationResult.validationMessage,
      },
    }));

    // const allInputValidationResult = checkAllInputValidations();
    checkValidations(validationResult);

    setExerciseFormInputVal((prev) => ({ ...prev, [name]: value }));
  };
  const radioOnChange = (value: string, name: string) => {
    setExerciseFormInputVal((prev) => ({ ...prev, [name]: value }));
  };

  const checkValidations = (
    validationInfo: stepValidationResult | validation
  ) => {
    let isValid = true; // Track overall validation state
    for (const [key, value] of Object.entries(validationInfo)) {
      setExerciseStepValidations((prev) => ({
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
    <Overlay>
      <div className="w-full h-screen flex items-center justify-center">
        <div className="bg-lightPrimary rounded-lg laptop:w-[25%] p-4">
          <div className="w-full flex justify-between items-center">
            <p className="text-[#a3e09f] font-dmSans text-lg font-semibold">
              Add Exercise
            </p>
            <div
              onClick={() => setToggleAddExerciseForm(false)}
              className="cursor-pointer group"
            >
              <FontAwesomeIcon
                icon={faXmarkCircle}
                className="text-[#D3F0D1] text-2xl transition duration-200 group-hover:text-[#a3e09f]"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 mt-4">
            <motion.div className="w-full">
              <Input
                name="title"
                placeholder="Enter the Name of the Exercise"
                state={exerciseFormInputVal.title}
                type="text"
                label="Exercise Name"
                onChange={onChange}
                onBlur={onChange}
                autoComplete="off"
                valid={exerciseValidations.title.valid}
                validationMessage={exerciseValidations.title.validationMessage}
              />
            </motion.div>
            <motion.div className="w-full">
              <TextareaInput
                name="shortDescription"
                state={exerciseFormInputVal.shortDescription}
                label="Short Description (Optional)"
                cols={30}
                rows={3}
                onChange={handleTextareaChange}
                onBlur={handleTextareaChange}
                valid={exerciseValidations.shortDescription.valid}
                validationMessage={
                  exerciseValidations.shortDescription.validationMessage
                }
              />
            </motion.div>
            <motion.div variants={childContainer} className="w-full">
              <div className="flex flex-col">
                <label className="phone:text-sm font-quickSand font-semibold">
                  Difficulty:
                </label>
              </div>
              <div className="w-full flex items-center flex-wrap gap-2 mt-2">
                <div
                  className="flex items-center gap-1 cursor group font-dmSans"
                  onClick={() => radioOnChange("Beginner", "difficulty")}
                >
                  <div
                    style={{
                      boxShadow:
                        exerciseFormInputVal.difficulty === "Beginner"
                          ? "0px 0px 0px 3.5px #4B6F64 inset"
                          : "",
                    }}
                    className="w-4 h-4 rounded-2xl shadow-[0px_0px_0px_2px_#fff_inset] group-hover:shadow-[0px_0px_0px_2px_#4B6F64_inset]"
                  ></div>

                  <label className="phone:text-sm font-quickSand">
                    Beginner
                  </label>
                  <input
                    type="radio"
                    name="difficulty"
                    value="Beginner"
                    className="hidden"
                    onChange={() => console.log("wew")}
                    checked={
                      exerciseFormInputVal.difficulty === "Beginner"
                        ? true
                        : false
                    }
                  />
                </div>
                <div
                  className="flex items-center gap-1 cursor group font-dmSans"
                  onClick={() => radioOnChange("Amateur", "difficulty")}
                >
                  <div
                    style={{
                      boxShadow:
                        exerciseFormInputVal.difficulty === "Amateur"
                          ? "0px 0px 0px 3.5px #4B6F64 inset"
                          : "",
                    }}
                    className="w-4 h-4 rounded-2xl shadow-[0px_0px_0px_2px_#fff_inset] group-hover:shadow-[0px_0px_0px_2px_#4B6F64_inset]"
                  ></div>

                  <label className="phone:text-sm font-quickSand">
                    Amateur
                  </label>
                  <input
                    type="radio"
                    name="difficulty"
                    value="Amateur"
                    className="hidden"
                    onChange={() => console.log("wew")}
                    checked={
                      exerciseFormInputVal.difficulty === "Amateur"
                        ? true
                        : false
                    }
                  />
                </div>
                <div
                  className="flex items-center gap-1 cursor group font-dmSans"
                  onClick={() => radioOnChange("Expert", "difficulty")}
                >
                  <div
                    style={{
                      boxShadow:
                        exerciseFormInputVal.difficulty === "Expert"
                          ? "0px 0px 0px 3.5px #4B6F64 inset"
                          : "",
                    }}
                    className="w-4 h-4 rounded-2xl shadow-[0px_0px_0px_2px_#fff_inset] group-hover:shadow-[0px_0px_0px_2px_#4B6F64_inset]"
                  ></div>

                  <label className="phone:text-sm font-quickSand">
                    Expert
                  </label>
                  <input
                    type="radio"
                    name="difficulty"
                    value="Expert"
                    className="hidden"
                    onChange={() => console.log("wew")}
                    checked={
                      exerciseFormInputVal.difficulty === "Expert"
                        ? true
                        : false
                    }
                  />
                </div>
              </div>
            </motion.div>
            <motion.div variants={childContainer} className="w-full">
              <div className="flex flex-col">
                <label className="phone:text-sm font-quickSand font-semibold">
                  Measurement Type:
                </label>
              </div>
              <div className="w-full flex items-center flex-wrap gap-2 mt-2">
                <div
                  className="flex items-center gap-1 cursor group font-dmSans"
                  onClick={() => radioOnChange("Reps", "measurementType")}
                >
                  <div
                    style={{
                      boxShadow:
                        exerciseFormInputVal.measurementType === "Reps"
                          ? "0px 0px 0px 3.5px #4B6F64 inset"
                          : "",
                    }}
                    className="w-4 h-4 rounded-2xl shadow-[0px_0px_0px_2px_#fff_inset] group-hover:shadow-[0px_0px_0px_2px_#4B6F64_inset]"
                  ></div>

                  <label className="phone:text-sm font-quickSand">
                    Reps (Repetition-Based)
                  </label>
                  <input
                    type="radio"
                    name="measurementType"
                    value="Reps"
                    className="hidden"
                    onChange={() => console.log("wew")}
                    checked={
                      exerciseFormInputVal.measurementType === "Reps"
                        ? true
                        : false
                    }
                  />
                </div>
                <div
                  className="flex items-center gap-1 cursor group font-dmSans"
                  onClick={() => radioOnChange("Time", "measurementType")}
                >
                  <div
                    style={{
                      boxShadow:
                        exerciseFormInputVal.measurementType === "Time"
                          ? "0px 0px 0px 3.5px #4B6F64 inset"
                          : "",
                    }}
                    className="w-4 h-4 rounded-2xl shadow-[0px_0px_0px_2px_#fff_inset] group-hover:shadow-[0px_0px_0px_2px_#4B6F64_inset]"
                  ></div>

                  <label className="phone:text-sm font-quickSand">
                    Time (Time-Based)
                  </label>
                  <input
                    type="radio"
                    name="measurementType"
                    value="Time"
                    className="hidden"
                    onChange={() => console.log("wew")}
                    checked={
                      exerciseFormInputVal.measurementType === "Time"
                        ? true
                        : false
                    }
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export default AddExerciseForm;
