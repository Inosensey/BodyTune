"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";

// Action
import { signUpWithEmail } from "@/actions/authActions";

// Components
import ThirdPartyLogin from "@/components/authComponents/ThirdPartyLogin";
import FirstStep from "./steps/FirstStep";
import ProgressBar from "./ProgressBar";

// Icons
import PhFacebookLogoBold from "@/icons/PhFacebookLogoBold";
import PhGoogleLogoBold from "@/icons/PhGoogleLogoBold";
import PhInstagramLogoBold from "@/icons/PhInstagramLogoBold";
import SecondStep from "./steps/SecondStep";
import ThirdStep from "./steps/ThirdStep";

// Types
import { registerInputType, stepsValidation } from "@/types/inputTypes";
import FourthStep from "./steps/FourthStep";
import { formReturnType } from "@/types/formTypes";
import { Session, User } from "@supabase/supabase-js";

// Initials
const stepValidationInitials: stepsValidation = {
  isFirstStepValid: false,
  isSecondStepValid: false,
  isThirdStepValid: false,
  isFourthStepValid: false,
};
const registerInputInitials: registerInputType = {
  email: "",
  password: "",
  name: "",
  birthDay: "",
  birthMonth: "",
  birthYear: "",
  gender: "",
  height: "",
  weight: "",
};
// Initials
const useFormStateInitials: formReturnType<
  { user: User | null; session: Session | null } | []
> = {
  success: null,
  error: null,
  message: "",
  data: [],
};
const SignUp = () => {
  // State
  const [registerInput, setRegisterInput] = useState<registerInputType>(
    registerInputInitials
  );
  const [progress, setProgress] = useState<number>(0);
  const [stepValidation, setStepValidation] = useState<stepsValidation>(
    stepValidationInitials
  );
  // UseFormState
  const [state, formAction] = useFormState(
    signUpWithEmail,
    useFormStateInitials
  );

  const updateProgress = () => {
    if (progress === 0) {
      if (stepValidation.isFirstStepValid) setProgress((prev) => prev + 1);
    } else if (progress === 1) {
      if (stepValidation.isSecondStepValid) setProgress((prev) => prev + 1);
    } else if (progress === 2) {
      if (stepValidation.isThirdStepValid) setProgress((prev) => prev + 1);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

    if (!stepValidation.isFourthStepValid) {
      event.preventDefault();
    }
  };

  // useEffect
  useEffect(() => {
    console.log(state);
  }, [state]);
  return (
    <div
      data-testid="sign-up-container"
      className="bg-black max-w-[550px] phone:w-[95%] py-3 px-2 rounded-sm"
    >
      <div className="flex flex-col items-center gap-3">
        <Image src="/assets/img/logo.png" width={38} height={38} alt="Logo" />
        {progress === 0 && (
          <header className="text-center font-dmSans text-xl font-semibold">
            Register to start using{" "}
            <span className="font-quickSand text-secondary font-bold">
              BodyTune
            </span>
          </header>
        )}
      </div>
      <form action={formAction} onSubmit={handleSubmit} className="mt-4">
        <div
          className="phone:w-11/12 mx-auto"
          data-testid="progress-bar-container"
        >
          {progress !== 0 && (
            <ProgressBar currentProgress={progress} totalProgress={3} />
          )}
        </div>
        <div data-testid="steps-container">
          <div
            data-testid="first-step-container"
            className={progress === 0 ? "block" : "hidden"}
          >
            <FirstStep
              email={registerInput.email}
              setRegisterInput={setRegisterInput}
              setStepValidation={setStepValidation}
              updateProgress={updateProgress}
            />
          </div>
          <div
            data-testid="second-step-container"
            className={progress === 1 ? "block" : "hidden"}
          >
            <SecondStep
              progressTitle="Create a Password"
              password={registerInput.password}
              setRegisterInput={setRegisterInput}
              currentProgress={progress}
              totalProgress={3}
              setProgress={setProgress}
              setStepValidation={setStepValidation}
              isSecondStepValid={stepValidation.isSecondStepValid}
              updateProgress={updateProgress}
            />
          </div>
          <div
            data-testid="third-step-container"
            className={progress === 2 ? "block" : "hidden"}
          >
            <ThirdStep
              name={registerInput.name}
              birthDay={registerInput.birthDay}
              birthMonth={registerInput.birthMonth}
              birthYear={registerInput.birthYear}
              gender={registerInput.gender}
              height={registerInput.height}
              weight={registerInput.weight}
              setRegisterInput={setRegisterInput}
              progressTitle="Tell us about Yourself"
              currentProgress={progress}
              totalProgress={3}
              setProgress={setProgress}
              updateProgress={updateProgress}
              setStepValidation={setStepValidation}
            />
          </div>
          <div
            data-testid="fourth-step-container"
            className={progress === 3 ? "block" : "hidden"}
          >
            <FourthStep
              progressTitle="Terms & Conditions"
              currentProgress={progress}
              totalProgress={3}
              setProgress={setProgress}              
              setStepValidation={setStepValidation}
            />
          </div>
        </div>
      </form>
      {progress === 0 && (
        <>
          <hr
            style={{ borderColor: "#b3b3b3" }}
            className="max-w-[450px] phone:w-12/12 my-4 mx-auto"
          />
          <div className="mt-5 flex flex-col items-center gap-3">
            <div className="phone:w-7/12 min-w-[290px] flex-col items-center gap-3">
              <div className="phone:w-full">
                <ThirdPartyLogin
                  testId="facebook-third-party-login"
                  Icon={PhFacebookLogoBold}
                  action="Register with"
                  buttonName="Facebook"
                  backgroundColor="#1877F2"
                  textBackground="linear-gradient(90deg, #1877F2, #1877F2)"
                />
              </div>
              <div className="phone:w-full">
                <ThirdPartyLogin
                  testId="google-third-party-login"
                  Icon={PhGoogleLogoBold}
                  action="Register with"
                  buttonName="Google"
                  backgroundColor="#DB4437"
                  textBackground="linear-gradient(90deg, #4285F4, #DB4437, #F4B400, #0F9D58)"
                />
              </div>
              <div className="phone:w-full">
                <ThirdPartyLogin
                  testId="instagram-third-party-login"
                  Icon={PhInstagramLogoBold}
                  action="Register with"
                  buttonName="Instagram"
                  backgroundColor="#FD1D1D"
                  textBackground="linear-gradient(90deg, #833AB4, #E1306C, #FD1D1D, #FCAF45)"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SignUp;
