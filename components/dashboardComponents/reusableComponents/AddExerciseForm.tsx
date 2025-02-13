"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Components
import Overlay from "@/components/reusableComponent/Overlay";
import {
  Input,
  TextareaInput,
  RadioButtonGroup,
  CustomFileInput,
} from "@/components/reusableComponent/formInputs/input";

// Utils
import FormValidation, { validateFormInputs } from "@/utils/validation";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmarkCircle,
  //   faPlusSquare,
} from "@fortawesome/free-regular-svg-icons";

// Types
import { stepValidationResult, validation } from "@/types/inputTypes";
import TablerBarbell from "@/icons/TablerBarbellLight";
interface ExerciseFormInputTypes {
  exerciseName: string;
  shortDescription: string;
  difficulty: string;
  equipment: string;
  measurementType: string;
  measurement: string;
  exerciseDemo: string;
  youtubeLink: string;
}
interface ExerciseFormValidations {
  exerciseName: {
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
  equipment: {
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
  youtubeLink: {
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
  exerciseName: "",
  shortDescription: "",
  difficulty: "",
  equipment: "",
  measurementType: "",
  measurement: "",
  exerciseDemo: "",
  youtubeLink: "",
};
const ExerciseFormValidationInitials: ExerciseFormValidations = {
  exerciseName: {
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
  equipment: {
    valid: null,
    validationMessage: "",
  },
  measurementType: {
    valid: null,
    validationMessage: "",
  },
  measurement: {
    valid: true,
    validationMessage: "",
  },
  exerciseDemo: {
    valid: null,
    validationMessage: "",
  },
  youtubeLink: {
    valid: null,
    validationMessage: "",
  },
};
interface props {
  setToggleAddExerciseForm: React.Dispatch<React.SetStateAction<boolean>>;
  setExercises: React.Dispatch<React.SetStateAction<ExerciseFormInputTypes[]>>;
  formAction: string;
  selectedExercise: ExerciseFormInputTypes
}

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

const AddExerciseForm = ({ setToggleAddExerciseForm, setExercises, formAction, selectedExercise }: props) => {
  // States
  const [exerciseValidations, setExerciseStepValidations] =
    useState<ExerciseFormValidations>(ExerciseFormValidationInitials);
  const [exerciseFormInputVal, setExerciseFormInputVal] =
    useState<ExerciseFormInputTypes>(ExerciseFormInputValInitial);
  const [demoSrc, setDemoSrc] = useState<string | null>(null);

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
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    const files = event.target.files;

    if (files && files[0]) {
      const file = files[0];
      if (!allowedTypes.includes(file.type)) {
        event.target.value = "";
        setExerciseStepValidations((prev) => ({
          ...prev,
          exerciseDemo: {
            valid: false,
            validationMessage:
              "Invalid file type. Please select a JPEG, PNG, or GIF file",
          },
        }));
        return;
      } else {
        setExerciseStepValidations((prev) => ({
          ...prev,
          exerciseDemo: { valid: true, validationMessage: "" },
        }));
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        console.log("File content as base64:", e.target?.result);
        setExerciseFormInputVal((prev) => ({ ...prev, exerciseDemo: e.target?.result as string }));
        setDemoSrc(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const radioOnChange = (value: string, name: string) => {

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

  // Validations
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
  const validationRules = {
    exerciseName: (value: string) =>
      FormValidation({ stateName: "exerciseName", value }),
    difficulty: (value: string) =>
      FormValidation({ stateName: "difficulty", value }),
    measurementType: (value: string) =>
      FormValidation({ stateName: "measurementType", value }),
    measurement: (value: string) =>
      FormValidation({ stateName: "measurement", value }),
  };
  const checkAllInputValidations = () => {
    const exerciseInputsValues = {
      exerciseName: exerciseFormInputVal.exerciseName,
      difficulty: exerciseFormInputVal.difficulty,
      measurementType: exerciseFormInputVal.measurementType,
      measurement: exerciseFormInputVal.measurement,
    };
    const exerciseValidationResults = validateFormInputs(
      exerciseInputsValues,
      validationRules
    );
    const valid = checkValidations(exerciseValidationResults)
    return valid;
  };

  const setInitials = () => {
    if (formAction === "Edit") {
      setExerciseFormInputVal(selectedExercise);
    } else {
      setExerciseFormInputVal(ExerciseFormInputValInitial);
    }
  }

  // useEffect
  useEffect(() => {
    setInitials();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Overlay>
      <div className="w-full h-screen flex items-center justify-center">
        <div className="bg-lightPrimary rounded-lg p-4 overflow-auto max-h-[96%] phone:w-[95%] tablet:w-[60%] laptop:w-[25%]">
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
            <motion.div className="phone:w-12/12">
              <Input
                name="exerciseName"
                placeholder="Enter the Name of the Exercise"
                state={exerciseFormInputVal.exerciseName}
                type="text"
                label="Exercise Name"
                onChange={onChange}
                onBlur={onChange}
                autoComplete="off"
                valid={exerciseValidations.exerciseName.valid}
                validationMessage={
                  exerciseValidations.exerciseName.validationMessage
                }
              />
            </motion.div>
            <motion.div className="phone:w-12/12">
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
            <motion.div className="phone:w-12/12">
              <Input
                name="equipment"
                placeholder="Enter the Equipment of the Exercise"
                state={exerciseFormInputVal.equipment}
                type="text"
                label="Equipment (Optional)"
                onChange={onChange}
                onBlur={onChange}
                autoComplete="off"
                valid={exerciseValidations.equipment.valid}
                validationMessage={
                  exerciseValidations.equipment.validationMessage
                }
              />
            </motion.div>
            <RadioButtonGroup
              radioOnChangeFn={radioOnChange}
              radioButtonGroupLabel="Difficulty"
              radioButtons={difficultyRadioButtons}
              selectedRadio={exerciseFormInputVal.difficulty}
              valid={exerciseValidations.difficulty.valid}
              validationMessage={
                exerciseValidations.difficulty.validationMessage
              }
            />

            <RadioButtonGroup
              radioOnChangeFn={radioOnChange}
              radioButtonGroupLabel="Measurement Type"
              radioButtons={measurementTypeRadioButtons}
              selectedRadio={exerciseFormInputVal.measurementType}
              valid={exerciseValidations.measurementType.valid}
              validationMessage={
                exerciseValidations.measurementType.validationMessage
              }
            />
            {exerciseFormInputVal.measurementType === "Reps" && (
              <motion.div className="phone:2/2 mdphone:w-6/12 tablet:w-1/2">
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
              <motion.div className="phone:2/2 mdphone:w-6/12 tablet:w-1/2">
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
            <motion.div className="w-2/2 flex flex-col gap-2">
              <CustomFileInput
                customButtonName="Choose a File"
                label="Upload an image or GIF to show the exercise."
                name="exerciseDemo"
                state={""}
                valid={exerciseValidations.exerciseDemo.valid}
                validationMessage={
                  exerciseValidations.exerciseDemo.validationMessage
                }
                onChange={fileInputOnChange}
              />
              {demoSrc && (
                <Image
                  src={demoSrc}
                  width={200}
                  height={200}
                  alt="Preview"
                  className="w-full h-44 object-contain"
                />
              )}
            </motion.div>
            <motion.div className="phone:w-12/12">
              <Input
                name="youtubeLink"
                placeholder="Youtube link to the Exercise"
                state={exerciseFormInputVal.youtubeLink}
                type="text"
                label="Youtube Link (Optional)"
                onChange={onChange}
                onBlur={onChange}
                autoComplete="off"
                valid={exerciseValidations.youtubeLink.valid}
                validationMessage={
                  exerciseValidations.youtubeLink.validationMessage
                }
              />
            </motion.div>
          </div>
          <div className="w-max mx-auto mt-4">
            <motion.button
              onClick={() => {
                const isValid = checkAllInputValidations()
                if(isValid) {
                  setExercises((prev) => [...prev, exerciseFormInputVal]);
                  setToggleAddExerciseForm(false);
                }
              }}
              className="flex gap-1 items-center bg-[#5d897b] text-white font-quickSand font-semibold w-full rounded-md p-1 px-2 transition duration-200 hover:bg-secondary"
              type="button"
            >
              <TablerBarbell color="#D3F0D1" width="1.3em" height="1.3em" />
              Create Exercise
            </motion.button>
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export default AddExerciseForm;
