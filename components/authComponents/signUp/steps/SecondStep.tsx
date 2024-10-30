"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Components
import { Input } from "@/components/reusableComponent/formInputs/input";

// icons
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IcOutlineArrowBackIosNew from "@/icons/IcOutlineArrowBackIosNew";

// Types
import {
  registerInputType,
  stepsValidation,
  validation,
} from "@/types/inputTypes";
interface props {
  progressTitle: string;
  password: string;
  setRegisterInput: React.Dispatch<React.SetStateAction<registerInputType>>;
  currentProgress: number;
  totalProgress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  setStepValidation: React.Dispatch<React.SetStateAction<stepsValidation>>;
  isSecondStepValid: boolean;
  updateProgress: () => void;
}
interface passwordValidation {
  passwordHaveOneUpperCaseLetter: boolean | null;
  passwordHaveOneNumber: boolean | null;
  passwordHaveOneSpecialCharacter: boolean | null;
  passwordHaveAtLeastEightCharacters: boolean | null;
}

// Initials
const passwordValidationInitials: passwordValidation = {
  passwordHaveOneUpperCaseLetter: null,
  passwordHaveOneNumber: null,
  passwordHaveOneSpecialCharacter: null,
  passwordHaveAtLeastEightCharacters: null,
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

const SecondStep = ({
  password,
  setRegisterInput,
  progressTitle,
  currentProgress,
  totalProgress,
  setProgress,
  setStepValidation,
  isSecondStepValid,
  updateProgress,
}: props) => {
  // States
  const [passwordValidation, setPasswordValidation] =
    useState<passwordValidation>(passwordValidationInitials);
  const [validation, setValidation] = useState<validation>({
    valid: null,
    validationMessage: "",
    validationName: "",
  });

  // validations
  const validatePassword = (password: string) => {
    const minLength = 7;
    const uppercaseRegex = /[A-Z]/;
    const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
    const numberRegex = /\d/;

    const updatedValidation = {
      passwordHaveAtLeastEightCharacters: password.length > minLength,
      passwordHaveOneUpperCaseLetter: uppercaseRegex.test(password),
      passwordHaveOneSpecialCharacter: specialCharRegex.test(password),
      passwordHaveOneNumber: numberRegex.test(password),
    };
    if (
      !updatedValidation.passwordHaveAtLeastEightCharacters ||
      !updatedValidation.passwordHaveOneNumber ||
      !updatedValidation.passwordHaveOneSpecialCharacter ||
      !updatedValidation.passwordHaveOneUpperCaseLetter
    ) {
      setValidation((prev) => ({ ...prev, valid: false }));
      setStepValidation((prev) => ({ ...prev, isSecondStepValid: false }));
    } else {
      setValidation((prev) => ({ ...prev, valid: true }));
      setStepValidation((prev) => ({ ...prev, isSecondStepValid: true }));
    }

    setPasswordValidation((prev) => ({ ...prev, ...updatedValidation }));
  };

  // Events
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    validatePassword(value);

    setRegisterInput((prev) => ({ ...prev, [name]: value }));
  };

  // UseEffect
  useEffect(() => {
    if (password !== "") validatePassword(password);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          initial={isSecondStepValid ? "show" : `hidden`}
          animate="show"
          className="flex flex-col gap-6 w-full"
        >
          <motion.div
            variants={childContainer}
            initial="hidden"
            animate="show"
            className="w-full relative"
          >
            <Input
              dataTestId="password-input"
              name="password"
              placeholder="Enter your Password"
              state={password}
              type="password"
              label="Password"
              onChange={onChange}
              onBlur={onChange}
              autoComplete="off"
              valid={validation.valid}
            />
          </motion.div>
          <motion.div
            variants={childContainer}
            initial="hidden"
            animate="show"
            className="text-sm flex flex-col gap-1"
          >
            <label>Your password must contain at least</label>
            <ul className="flex flex-col gap-1">
              <li className="flex items-center gap-2">
                {passwordValidation.passwordHaveOneUpperCaseLetter && (
                  <FontAwesomeIcon
                    className="text-xs text-secondary"
                    icon={faCircleCheck}
                  />
                )}
                <div
                  style={{
                    border:
                      passwordValidation.passwordHaveOneUpperCaseLetter ===
                        null ||
                      passwordValidation.passwordHaveOneUpperCaseLetter
                        ? ""
                        : "1px solid rgb(239 68 68)",
                    display: passwordValidation.passwordHaveOneUpperCaseLetter
                      ? "none"
                      : "block",
                  }}
                  className="border-2 w-3 h-3 rounded-2xl"
                ></div>{" "}
                1 Upper Case letter
              </li>
              <li className="flex items-center gap-2">
                {passwordValidation.passwordHaveOneNumber && (
                  <FontAwesomeIcon
                    className="text-xs text-secondary"
                    icon={faCircleCheck}
                  />
                )}
                <div
                  style={{
                    border:
                      passwordValidation.passwordHaveOneNumber === null ||
                      passwordValidation.passwordHaveOneNumber
                        ? ""
                        : "1px solid rgb(239 68 68)",
                    display: passwordValidation.passwordHaveOneNumber
                      ? "none"
                      : "block",
                  }}
                  className="border-2 w-3 h-3 rounded-2xl"
                ></div>{" "}
                1 number
              </li>
              <li className="flex items-center gap-2">
                {passwordValidation.passwordHaveOneSpecialCharacter && (
                  <FontAwesomeIcon
                    className="text-xs text-secondary"
                    icon={faCircleCheck}
                  />
                )}
                <div
                  style={{
                    border:
                      passwordValidation.passwordHaveOneSpecialCharacter ===
                        null ||
                      passwordValidation.passwordHaveOneSpecialCharacter
                        ? ""
                        : "1px solid rgb(239 68 68)",
                    display: passwordValidation.passwordHaveOneSpecialCharacter
                      ? "none"
                      : "block",
                  }}
                  className="border-2 w-3 h-3 rounded-2xl"
                ></div>{" "}
                1 number or special character (example: # ? ! &)
              </li>
              <li className="flex items-center gap-2">
                {passwordValidation.passwordHaveAtLeastEightCharacters && (
                  <FontAwesomeIcon
                    className="text-xs text-secondary"
                    icon={faCircleCheck}
                  />
                )}
                <div
                  style={{
                    border:
                      passwordValidation.passwordHaveAtLeastEightCharacters ===
                        null ||
                      passwordValidation.passwordHaveAtLeastEightCharacters
                        ? ""
                        : "1px solid rgb(239 68 68)",
                    display:
                      passwordValidation.passwordHaveAtLeastEightCharacters
                        ? "none"
                        : "block",
                  }}
                  className="border-2 w-3 h-3 rounded-2xl"
                ></div>{" "}
                At least 8 characters
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>

      <div className="w-28 mx-auto">
        <motion.button
          data-testid="next-step-button"
          onClick={() => {
            validatePassword(password);
            if (isSecondStepValid) {
              updateProgress();
            }
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

export default SecondStep;
