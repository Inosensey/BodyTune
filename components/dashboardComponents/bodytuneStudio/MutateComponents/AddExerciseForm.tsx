"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// Components
import Overlay from "@/components/reusableComponent/Overlay";
import {
  Input,
  TextareaInput,
  RadioButtonGroup,
  CustomFileInput,
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
  measurement: string;
  exerciseDemo: string;
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
  measurement: {
    valid: boolean | null;
    validationMessage: string;
  };
  exerciseDemo: {
    valid: boolean | null;
    validationMessage: string;
  };
}
interface radioButtonInfo {
  name: string;
  value: string;
  label: string;
}

// Initials
const ExerciseFormInputValInitial: ExerciseFormInputTypes = {
  title: "",
  shortDescription: "",
  difficulty: "",
  measurementType: "",
  measurement: "",
  exerciseDemo: "",
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
  measurement: {
    valid: null,
    validationMessage: "",
  },
  exerciseDemo: {
    valid: null,
    validationMessage: "",
  },
};

// Fixed values
const difficultyRadioButtons: radioButtonInfo[] = [
  {
    label: "Beginner",
    name: "difficulty",
    value: "Beginner",
  },
  {
    label: "Amateur",
    name: "difficulty",
    value: "Amateur",
  },
  {
    label: "Expert",
    name: "difficulty",
    value: "Expert",
  },
];
const measurementTypeRadioButtons: radioButtonInfo[] = [
  {
    label: "Reps (Repetition-Based)",
    name: "measurementType",
    value: "Reps",
  },
  {
    label: "Time (Time-Based)",
    name: "measurementType",
    value: "Time",
  },
];

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
  const fileInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target);
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
            <RadioButtonGroup
              radioOnChangeFn={radioOnChange}
              radioButtonGroupLabel="Difficulty"
              radioButtons={difficultyRadioButtons}
              selectedRadio={exerciseFormInputVal.difficulty}
            />

            <RadioButtonGroup
              radioOnChangeFn={radioOnChange}
              radioButtonGroupLabel="Measurement Type"
              radioButtons={measurementTypeRadioButtons}
              selectedRadio={exerciseFormInputVal.measurementType}
            />
            {exerciseFormInputVal.measurementType === "Reps" && (
              <motion.div className="w-1/2">
                <Input
                  name="measurement"
                  placeholder="Reps per set"
                  state={exerciseFormInputVal.measurement}
                  type="text"
                  label="Repitition"
                  onChange={onChange}
                  onBlur={onChange}
                  autoComplete="off"
                  valid={exerciseValidations.measurement.valid}
                  validationMessage={
                    exerciseValidations.measurement.validationMessage
                  }
                />
              </motion.div>
            )}
            {exerciseFormInputVal.measurementType === "Time" && (
              <motion.div className="w-1/2">
                <Input
                  name="measurement"
                  placeholder="Duration per set"
                  state={exerciseFormInputVal.measurement}
                  type="text"
                  label="Time"
                  onChange={onChange}
                  onBlur={onChange}
                  autoComplete="off"
                  valid={exerciseValidations.measurement.valid}
                  validationMessage={
                    exerciseValidations.measurement.validationMessage
                  }
                />
              </motion.div>
            )}
            <motion.div className="w-1/2">
              <CustomFileInput
                customButtonName="Choose a File"
                label="Upload an image or GIF to show the exercise."
                name="exerciseDemo"
                state={exerciseFormInputVal.exerciseDemo}
                valid={exerciseValidations.exerciseDemo.valid}
                validationMessage={
                  exerciseValidations.exerciseDemo.validationMessage
                }
                onChange={fileInputOnChange}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export default AddExerciseForm;
