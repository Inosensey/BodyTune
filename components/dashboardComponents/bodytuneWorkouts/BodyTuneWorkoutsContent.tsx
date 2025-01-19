"use client";

import Image from "next/image";
import Link from "next/link";

const BodyTuneWorkoutsContent = () => {
  return (
    <div className="flex-1 bg-black w-full p-4 rounded-lg">
      <div className="flex flex-col w-full h-full font-dmSans justify-center items-center">
        <Image
          src="/assets/svg/dumbbell-2.svg"
          width={300}
          height={300}
          alt="Logo"
        />
        <p className="w-max text-xl">
          You don&apos;t have any{" "}
          <span className="font-bold font-quickSand text-secondary">
            Workout Plans
          </span>{" "}
          yet.
        </p>
        <Link href={"workouts/create"}>
          <p className="w-max text-lg text-lightSecondary underline cursor-pointer">
            Create your first one now!
          </p>
        </Link>
      </div>
    </div>
  );
};

export default BodyTuneWorkoutsContent;
