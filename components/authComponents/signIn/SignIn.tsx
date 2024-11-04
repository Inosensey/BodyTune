"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// Components
import ThirdPartyLogin from "@/components/authComponents/ThirdPartyLogin";
import { Input } from "@/components/reusableComponent/formInputs/input";

// Utils
import FormValidation from "@/utils/validation";

// Icons
import PhFacebookLogoBold from "@/icons/PhFacebookLogoBold";
import PhGoogleLogoBold from "@/icons/PhGoogleLogoBold";
import PhInstagramLogoBold from "@/icons/PhInstagramLogoBold";

// Types
import { validation } from "@/types/inputTypes";
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
  const [validation, setValidation] = useState<validation>({
    valid: null,
    validationMessage: "",
    validationName: "",
  });

  // Events
  const toggleRememberMe = () => setRememberMe(!rememberMe);
  const inputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const validationParams = {
      value: value,
      stateName: name,
    };

    const result: validation = FormValidation(validationParams);

    setValidation(result);

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
        <div className=" phone:w-7/12 flex-col items-center gap-3">
          <div className="phone:w-full">
            <ThirdPartyLogin
              testId="facebook-third-party-login"
              Icon={PhFacebookLogoBold}
              action="Login with"
              buttonName="Facebook"
              backgroundColor="#1877F2"
              textBackground="linear-gradient(90deg, #1877F2, #1877F2)"
            />
          </div>
          <div className="phone:w-full">
            <ThirdPartyLogin
              testId="google-third-party-login"
              Icon={PhGoogleLogoBold}
              action="Login with"
              buttonName="Google"
              backgroundColor="#DB4437"
              textBackground="linear-gradient(90deg, #4285F4, #DB4437, #F4B400, #0F9D58)"
            />
          </div>
          <div className="phone:w-full">
            <ThirdPartyLogin
              testId="instagram-third-party-login"
              Icon={PhInstagramLogoBold}
              action="Login with"
              buttonName="Instagram"
              backgroundColor="#FD1D1D"
              textBackground="linear-gradient(90deg, #833AB4, #E1306C, #FD1D1D, #FCAF45)"
            />
          </div>
        </div>
      </div>
      <hr
        style={{ borderColor: "#b3b3b3" }}
        className="max-w-[450px] phone:w-10/12 my-4 mx-auto"
      />
      <div className="flex flex-col justify-center mx-auto gap-4 max-w-[450px] phone:w-8/12">
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
              valid={validation.valid}
              validationMessage={validation.validationMessage}
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
              valid={null}
            />
          </div>
        </form>
        <div className="flex justify-between items-center">
          {/* switch */}
          <div className="flex items-center gap-2">
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
            <label className="phone:text-sm font-semibold font-dmSans">
              Remember Me
            </label>
          </div>
          <p
            data-testid="forgot-password"
            className="text-sm font-dmSans underline cursor-pointer font-semibold"
          >
            Forgot your password?
          </p>
        </div>
        <div className="w-28 mx-auto" data-testid="credentials-login-button">
          <motion.button
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
        <div className="text-center" data-testid="create-account-link">
          <p className="text-sm font-dmSans">
            Don&apos;t have an account yet?{" "}
            <Link href={"/register"}>
              <span className=" underline cursor-pointer font-bold text-secondary">
                Create an Account
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
