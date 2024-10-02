"use client";

import Image from "next/image";

// Components
import ThirdPartyLogin from "@/components/authComponents/signIn/ThirdPartyLogin";

// Icons
import PhFacebookLogoBold from "@/icons/PhFacebookLogoBold";
import PhGoogleLogoBold from "@/icons/PhGoogleLogoBold";
import PhInstagramLogoBold from "@/icons/PhInstagramLogoBold";

const SignIn = () => {
  return (
    <div
      data-testid="signIn-container"
      className="bg-black max-w-[500px] phone:w-[95%] py-3 px-2 rounded-sm"
    >
      <div className="flex flex-col items-center gap-3">
        <Image
          src="/assets/img/logo.png"
          width={38}
          height={38}
          alt="Logo"
        />
        <header className="text-center font-dmSans text-xl font-semibold">
          Log in to{" "}
          <span className="font-quickSand text-secondary font-bold">
            BodyTune
          </span>
        </header>
      </div>
      <div
        className="mt-5 flex flex-col items-center gap-3"
      >
        <div className="phone: w-6/12">
          <ThirdPartyLogin
            testId="facebook-third-party-login"
            Icon={PhFacebookLogoBold}
            buttonName="Facebook"
            backgroundColor="#1877F2"
            textBackground="linear-gradient(90deg, #1877F2, #1877F2)"
          />
        </div>
        <div className="phone: w-6/12">
          <ThirdPartyLogin
            testId="google-third-party-login"
            Icon={PhGoogleLogoBold}
            buttonName="Google"
            backgroundColor="#DB4437"
            textBackground="linear-gradient(90deg, #4285F4, #DB4437, #F4B400, #0F9D58)"
          />
        </div>
        <div className="phone: w-6/12">
          <ThirdPartyLogin
            testId="instagram-third-party-login"
            Icon={PhInstagramLogoBold}
            buttonName="Instagram"
            backgroundColor="#FD1D1D"
            textBackground="linear-gradient(90deg, #833AB4, #E1306C, #FD1D1D, #FCAF45)"
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
