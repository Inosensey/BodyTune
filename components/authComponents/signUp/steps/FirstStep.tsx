"use client";
import { motion } from "framer-motion";
import { useState } from "react";

// Component
import { Input } from "@/components/reusableComponent/formInputs/input";

// Utils
import FormValidation, { validateRegistrationStep } from "@/utils/validation";

//Types
import {
  registerInputType,
  stepsValidation,
  stepValidationResult,
  validation,
} from "@/types/inputTypes";
interface props {
  email: string;
  setRegisterInput: React.Dispatch<React.SetStateAction<registerInputType>>;
  setStepValidation: React.Dispatch<React.SetStateAction<stepsValidation>>;
  updateProgress: () => void;
}

const FirstStep = ({
  email,
  setRegisterInput,
  setStepValidation,
  updateProgress,
}: props) => {
  // States
  const [validation, setValidation] = useState<validation>({
    valid: null,
    validationMessage: "",
    validationName: "",
  });

  // validations
  const validationRules = {
    email: (value: string) => FormValidation({ stateName: "email", value }),
  };
  const checkValidations = (validationInfo: stepValidationResult) => {
    let valid = true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const [key, value] of Object.entries(validationInfo)) {
      // Additional note for removing the typescript is that the key is not being used and its giving a typescript error
      setValidation(value);
      if (!value.valid) {
        setStepValidation((prev) => ({ ...prev, isFirstStepValid: false }));
        valid = false;
      }
    }
    if(valid) {
      setStepValidation((prev) => ({ ...prev, isFirstStepValid: true }));
      updateProgress();
    }
  };

  // events
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const validationParams = {
      value: value,
      stateName: name,
    };
    
    setRegisterInput((prev) => ({ ...prev, [name]: value }));

    const result: validation = FormValidation(validationParams);

    setValidation(result);

    if (result.valid) {
      setStepValidation((prev) => ({ ...prev, isFirstStepValid: true }));
    } else {
      setStepValidation((prev) => ({ ...prev, isFirstStepValid: false }));
    }
  };

  return (
    <>
      <motion.div className="flex flex-col justify-center mx-auto gap-4 max-w-[350px]">
        <motion.div className="w-full">
          <Input
            name="email"
            dataTestId="email-input"
            placeholder="Enter your Email"
            state={email}
            type="email"
            label="Email"
            onChange={onChange}
            onBlur={onChange}
            autoComplete="off"
            valid={validation.valid}
            validationMessage={validation.validationMessage}
          />
        </motion.div>
      </motion.div>

      <div className="w-28 mx-auto">
        <motion.button
          data-testid="next-step-button"
          onClick={() => {
            const values = { email };
            const validationResults = validateRegistrationStep(
              values,
              validationRules
            );
            checkValidations(validationResults);
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

export default FirstStep;
