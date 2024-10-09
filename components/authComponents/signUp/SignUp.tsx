"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import React, { useState } from "react";

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
import { registerInputType } from "@/types/inputTypes";

// Initials
const registerInputInitials:registerInputType = {
  email: "",
  password: "",
  name: "",
  birthDay: "",
  birthMonth: "",
  birthYear: "",
  Gender: ""
};
const SignUp = () => {
  // State
  const [registerInput, setRegisterInput] = useState<registerInputType>(
    registerInputInitials
  );
  const [progress, setProgress] = useState<number>(0);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
  };
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
      <form onSubmit={onSubmit} className="mt-4">
        {progress !== 0 && (
          <div className="phone:w-8/12 mx-auto">
            <ProgressBar currentProgress={progress} totalProgress={4} />
          </div>
        )}
        {progress === 0 && (
          <FirstStep
            email={registerInput.email}
            setRegisterInput={setRegisterInput}
          />
        )}
        {progress === 1 && (
          <SecondStep
            progressTitle="Create a Password"
            password={registerInput.password}
            setRegisterInput={setRegisterInput}
            currentProgress={progress}
            totalProgress={4}
            setProgress={setProgress}
          />
        )}
        {progress === 2 && (
          <ThirdStep
            name={registerInput.name}
            birthDay={registerInput.birthDay}
            birthMonth={registerInput.birthMonth}
            birthYear={registerInput.birthYear}
            Gender={registerInput.Gender}
            setRegisterInput={setRegisterInput}
            progressTitle="Tell us about Yourself"
            currentProgress={progress}
            totalProgress={4}
            setProgress={setProgress}
          />
        )}
        <div className="w-28 mx-auto" data-testid="credentials-login-button">
          <motion.button
            onClick={() => setProgress((prev) => prev + 1)}
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
      </form>
      {progress === 0 && (
        <>
          <hr
            style={{ borderColor: "#b3b3b3" }}
            className="max-w-[450px] phone:w-10/12 my-4 mx-auto"
          />
          <div
            className="mt-5 flex flex-col items-center gap-3"
            data-testid="third-party-container"
          >
            <div className="phone:w-7/12 flex-col items-center gap-3">
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
