"use client";
import { useState } from "react";

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

  // Events
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
          className="max-w-[450px] phone:w-10/12"
        />
        <div data-testid="credentials-login-form" className="flex flex-col justify-center gap-3 max-w-[450px] phone:w-6/12">
          <div className="w-full">
            <Input
              name="email"
              placeholder="Enter your Email"
              state={credentials.email}
              type="email"
              label="Email"
              onChange={inputOnChange}
            />
          </div>
          <div className="w-full">
            <Input
              name="password"
              placeholder="Enter your Password"
              state={credentials.password}
              type="password"
              label="Password"
              onChange={inputOnChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
