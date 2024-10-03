"use client";
import { useState } from "react";
import { motion } from "framer-motion";

import Image from "next/image";

// Components
import ThirdPartyLogin from "@/components/authComponents/signIn/ThirdPartyLogin";

// Icons
import PhFacebookLogoBold from "@/icons/PhFacebookLogoBold";
import PhGoogleLogoBold from "@/icons/PhGoogleLogoBold";
import PhInstagramLogoBold from "@/icons/PhInstagramLogoBold";
import { Input } from "@/components/reusableComponent/formInputs/input";

// Types
interface credentials {
  email: string;
  password: string;
}

// Initials
const credentialsInitial: credentials = {
  email: "",
  password: "",
};
const SignIn = () => {
  // useState
  const [credentials, setCredentials] =
    useState<credentials>(credentialsInitial);
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  // Events
  const toggleRememberMe = () => setRememberMe(!rememberMe);
  const inputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setCredentials((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div
      data-testid="signIn-container"
      className="bg-black max-w-[550px] phone:w-[95%] py-3 px-2 rounded-sm"
    >
      <div className="flex flex-col items-center gap-3">
        <Image src="/assets/img/logo.png" width={38} height={38} alt="Logo" />
        <header className="text-center font-dmSans text-xl font-semibold">
          Log in to{" "}
          <span className="font-quickSand text-secondary font-bold">
            BodyTune
          </span>
        </header>
      </div>
      <div
        className="mt-5 flex flex-col items-center gap-3"
        data-testid="third-party-container"
      >
        <div className="phone:w-6/12">
          <ThirdPartyLogin
            testId="facebook-third-party-login"
            Icon={PhFacebookLogoBold}
            buttonName="Facebook"
            backgroundColor="#1877F2"
            textBackground="linear-gradient(90deg, #1877F2, #1877F2)"
          />
        </div>
        <div className="phone:w-6/12">
          <ThirdPartyLogin
            testId="google-third-party-login"
            Icon={PhGoogleLogoBold}
            buttonName="Google"
            backgroundColor="#DB4437"
            textBackground="linear-gradient(90deg, #4285F4, #DB4437, #F4B400, #0F9D58)"
          />
        </div>
        <div className="phone:w-6/12">
          <ThirdPartyLogin
            testId="instagram-third-party-login"
            Icon={PhInstagramLogoBold}
            buttonName="Instagram"
            backgroundColor="#FD1D1D"
            textBackground="linear-gradient(90deg, #833AB4, #E1306C, #FD1D1D, #FCAF45)"
          />
        </div>
        <hr
          style={{ borderColor: "#b3b3b3" }}
          className="max-w-[450px] phone:w-8/12 my-4"
        />
        <div className="flex flex-col justify-center gap-4 max-w-[450px] phone:w-6/12">
          <form
            data-testid="credentials-login-form"
            className="flex flex-col gap-2"
          >
            <div className="w-full">
              <Input
                name="email"
                dataTestId="email-input"
                placeholder="Enter your Email"
                state={credentials.email}
                type="email"
                label="Email"
                onChange={inputOnChange}
                autoComplete="off"
              />
            </div>
            <div className="w-full relative">
              <Input
                dataTestId="password-input"
                name="password"
                placeholder="Enter your Password"
                state={credentials.password}
                type="password"
                label="Password"
                onChange={inputOnChange}
                autoComplete="off"
              />
            </div>
          </form>
          <div className="flex gap-2 items-center">
            {/* switch */}
            <div
              data-testid="remember-me"
              style={{
                justifyContent: rememberMe ? "flex-end" : "flex-start",
                background: rememberMe ? "#4B6F64" : "#FFFFFF66",
              }}
              className="w-[40px] h-[20px] bg-[#FFFFFF66] flex justify-start rounded-[50px] py-[3px] px-[5px] cursor-pointer"
              onClick={toggleRememberMe}
            >
              <motion.div
                className="w-[15px] h-[15px] bg-white rounded-[40px]"
                layout
                transition={{ type: "spring", stiffness: 700, damping: 50 }}
              />
            </div>
            <label className="phone:text-sm font-semibold font-dmSans">Remember Me</label>
          </div>
          <div className="w-28 mx-auto">
            <motion.button
              data-testid="credentials-login-button"
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.9 }}
              className="bg-secondary text-white font-quickSand font-bold w-full rounded-md p-1"
            >
              Login
            </motion.button>
          </div>
          <div className="mx-auto">
            <p data-testid="forgot-password" className="text-sm font-dmSans underline cursor-pointer font-semibold">Forgot your password?</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
