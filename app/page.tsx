"use server";

import Image from "next/image";
import Link from 'next/link'

import TablerBarbell from "@/icons/TablerBarbell";
export default async function Home() {
  return (
    <main className="w-full h-full flex justify-center items-center">
      <section className="flex bg-black rounded-lg max-w-[800px] min-w-[250px] phone:w-11/12 phone:flex-col phone:items-center tablet:flex-row tablet:items-stretch tablet:h-[480px]">
        <div className="flex flex-col justify-end border-secondary px-2 py-4 bg-[url('/assets/img/home-page-first-col-img.jpg')] bg-center bg-no-repeat phone:border-b-[1px] phone:rounded-t-lg phone:w-12/12 tablet:border-b-0 tablet:rounded-t-none tablet:w-6/12 tablet:rounded-l-lg tablet:border-r-[1px]">
          <header className="font-quickSand text-lightSecondary font-bold text-xl">
            How We Support Your Journey:
          </header>
          <div>
            <div>
              <label className="underline font-quickSand font-bold text-base text-secondary">
                Personalized Fitness & Nutrition Plans:
              </label>
              <p className="font-dmSans text-xs">
                Tailored exercise and meal plans based on your BMI, age, and
                gender for a unique approach to your wellness journey.
              </p>
            </div>
            <div>
              <label className="underline font-quickSand font-bold text-base text-secondary">
                Fully Customizable Routines:
              </label>
              <p className="font-dmSans text-xs">
                Easily create and adjust workout and meal plans on a
                user-friendly dashboard, giving you full control over your
                fitness and nutrition.
              </p>
            </div>
            <div>
              <label className="underline font-quickSand font-bold text-base text-secondary">
                Recipe Creation & Exercise Design:
              </label>
              <p className="font-dmSans text-xs">
                Develop new recipes or craft custom workout routines that meet
                your preferences and goals.
              </p>
            </div>
            <div>
              <label className="underline font-quickSand font-bold text-base text-secondary">
                Share Your Health Journey:
              </label>
              <p className="font-dmSans text-xs">
                Connect with friends and family by sharing your custom fitness
                and meal plans, fostering community and motivation.
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-2 flex-col justify-center items-center px-2 py-4 bg-[url('/assets/img/home-page-second-col-img.jpg')] bg-center bg-no-repeat phone:rounded-b-lg phone:w-12/12 tablet:w-6/12 tablet:rounded-b-none tablet:rounded-r-lg">
          <div className="flex flex-col items-center gap-1">
            <Image
              src="/assets/img/logo.png"
              width={48}
              height={48}
              alt="Logo"
            />
            <header className="text-2xl font-quickSand text-lightSecondary font-bold">
              BodyTune
            </header>
          </div>
          <p className="text-justify p-2 text-sm font-dmSans font-semibold">
            BodyTune is your personalized health companion, fine-tuning your
            fitness and nutrition to fit your unique needs. With tailored
            exercise and meal plans based on your BMI, gender, and age, BodyTune
            helps you hit your wellness goals effortlessly. Customize your plans
            in the user-friendly dashboard, create new recipes, or design your
            own exercise routines. Share your custom plans with friends and
            family to spread the health vibes!
          </p>
          <div className="w-32 mx-auto mt-4">
            <Link href={"/login"}>
              <button className="bg-secondary text-white font-quickSand font-bold w-full rounded-md p-1 flex items-center justify-center gap-1">
                <TablerBarbell height="1.2em" width="1.2em" color="#D3F0D1" />
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
