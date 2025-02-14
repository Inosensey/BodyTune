"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";

// Action
import { profileSetUp, signOut } from "@/actions/authActions";

// Components
import ThirdStep from "../signUp/steps/ThirdStep";
import FourthStep from "../signUp/steps/FourthStep";
import ProgressBar from "../signUp/ProgressBar";

// Loading Components
import LoadingPopUp from "@/components/reusableComponent/loadingAnimation/LoadingPopUp";

// Icons
// import PhFacebookLogoBold from "@/icons/PhFacebookLogoBold";
// import PhGoogleLogoBold from "@/icons/PhGoogleLogoBold";
// import HugeiconsNewTwitter from "@/icons/HugeiconsNewTwitter";

// Types
import { registerInputType, stepsValidation } from "@/types/inputTypes";
import { formReturnType } from "@/types/formTypes";
import SolarExitLineDuotone from "@/icons/SolarExitLineDuotone";

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
const useFormStateInitials: formReturnType<[]> = {
  success: null,
  error: null,
  message: "",
  data: [],
};
const ProfileSetup = () => {
  const router = useRouter();

  // State
  const [registerInput, setRegisterInput] = useState<registerInputType>(
    registerInputInitials
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitMessage, setSubmitMessage] = useState<string>(
    "Setting up your profile... 🏋️‍♀️ Your fitness journey begins in just a moment!"
  );
  const [progress, setProgress] = useState<number>(0);
  const [stepValidation, setStepValidation] = useState<stepsValidation>(
    stepValidationInitials
  );
  // UseFormState
  const [formState, formAction] = useFormState(
    profileSetUp,
    useFormStateInitials
  );

  const updateProgress = () => {
    if (progress === 0) {
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
    if (formState.success !== null || formState.error !== null) {
      if (formState.success) {
        setSubmitMessage(
          "You're in! 🎯 Taking you to your dashboard—let’s crush some goals today! 💪"
        );
        router.push("/dashboard");
      } else {
        setIsSubmitting(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);
  return (
    <>
      <div
        data-testid="sign-up-container"
        className="bg-black max-w-[550px] phone:w-[95%] py-3 px-2 rounded-sm"
      >
        <div className="flex flex-col items-center gap-3">
          <Image src="/assets/img/logo.png" width={38} height={38} alt="Logo" />
          {progress === 0 && (
            <header className="text-center font-dmSans text-base font-semibold">
              Almost there! 🏋️‍♂️ Let&apos;s fine-tune your profile to personalize
              your{" "}
              <span className="font-quickSand text-secondary font-bold">
                BodyTune
              </span>{" "}
              experience.
            </header>
          )}
        </div>
        <form action={formAction} onSubmit={handleSubmit} className="mt-4">
          <div
            className="phone:w-11/12 mx-auto"
            data-testid="progress-bar-container"
          >
            <ProgressBar currentProgress={progress + 1} totalProgress={2} />
          </div>
          <div data-testid="steps-container">
            <div
              data-testid="third-step-container"
              className={progress === 0 ? "block" : "hidden"}
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
                currentProgress={progress + 1}
                totalProgress={2}
                setProgress={setProgress}
                updateProgress={updateProgress}
                setStepValidation={setStepValidation}
              />
            </div>
            <div
              data-testid="fourth-step-container"
              className={progress === 1 ? "block" : "hidden"}
            >
              <FourthStep
                progressTitle="Terms & Conditions"
                currentProgress={progress + 1}
                totalProgress={2}
                setProgress={setProgress}
                setStepValidation={setStepValidation}
                mutateResult={formState}
                setIsSubmitting={setIsSubmitting}
              />
            </div>
          </div>
        </form>
      </div>

      <div
        className="absolute bottom-[2%] right-[2%] flex flex-col py-2 px-[0.6rem] cursor-pointer border-2 border-lightSecondary rounded-lg"
        onClick={() => {
          setSubmitMessage("Logging you out... 🔄 See you next time! 👋");
          setIsSubmitting(true);
          signOut();
        }}
      >
        <div className="flex gap-1 text-lg">
          <p className="font-dmSans font-semibold text-lightSecondary">
            Sign Out
          </p>
          <SolarExitLineDuotone color="#D3F0D1" width="1.5em" height="1.5em" />
        </div>
      </div>
      <LoadingPopUp isLoading={isSubmitting} message={submitMessage} />
    </>
  );
};

export default ProfileSetup;
