"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// Icons
import MaterialSymbolsLightOverviewOutline from "@/icons/MaterialSymbolsLightOverviewOutline";
import SolarStarsMinimalisticLineDuotone from "@/icons/SolarStarsMinimalisticLineDuotone";
import TablerBarbell from "@/icons/TablerBarbell";
import MdiFoodDrumstickOutline from "@/icons/MdiFoodDrumstickOutline";
import SolarSettingsLinear from "@/icons/SolarSettingsLinear";
import IcBaselinePeopleOutline from "@/icons/IcBaselinePeopleOutline";

const Sidebar = () => {
  return (
    <div className="top-0 left-0 h-full bg-black w-[280px] phone:fixed tablet:relative">
      <div
        className="py-4 flex flex-col items-center gap-1"
        data-testid="header-container"
      >
        <Image src="/assets/img/logo.png" width={34} height={34} alt="Logo" />
        <header className="text-xl font-quickSand text-lightSecondary font-bold">
          BodyTune
        </header>
      </div>
      <div className="mt-6 flex flex-col gap-2" data-testid="links-container">
        <Link data-testid="overview-link" href={"/dashboard"}>
          <motion.div
            whileHover={{
              x: "10px",
              transition: { duration: 0.2 },
            }}
            className="flex flex-col py-2 px-[0.6rem]"
          >
            <div className="flex gap-1">
              <p className="font-dmSans font-semibold text-lightSecondary">
                Dashboard Hub
              </p>
              <MaterialSymbolsLightOverviewOutline
                color="#D3F0D1"
                width="1.3em"
                height="1.3em"
              />
            </div>
            <p
              data-testid="overview-link-description"
              className="font-quickSand text-[0.8rem] text-[#b3b3b3]"
            >
              Your personalized fitness snapshot
            </p>
          </motion.div>
        </Link>
        <Link data-testid="bodytune-studio-link" href={"/dashboard/bodytune"}>
          <motion.div
            whileHover={{
              x: "10px",
              transition: { duration: 0.2 },
            }}
            className="flex flex-col py-2 px-[0.6rem]"
          >
            <div className="flex gap-1">
              <p className="font-dmSans font-semibold text-lightSecondary">
                BodyTune Studio
              </p>
              <SolarStarsMinimalisticLineDuotone
                color="#D3F0D1"
                width="1.3em"
                height="1.3em"
              />
            </div>
            <p data-testid="bodytune-studio-link-description" className="font-quickSand text-[0.8rem] text-[#b3b3b3]">
              Combine workouts and meals into your ideal regimen
            </p>
          </motion.div>
        </Link>
        <Link data-testid="bodytune-workouts-link" href={"/dashboard/workouts"}>
          <motion.div
            whileHover={{
              x: "10px",
              transition: { duration: 0.2 },
            }}
            className="flex flex-col py-2 px-[0.6rem]"
          >
            <div className="flex gap-1">
              <p className="font-dmSans font-semibold text-lightSecondary">
                BodyTune Workouts
              </p>
              <TablerBarbell color="#D3F0D1" width="1.3em" height="1.3em" />
            </div>
            <p data-testid="bodytune-workouts-link-description" className="font-quickSand text-[0.8rem] text-[#b3b3b3]">
              Customize and track your exercise routines.
            </p>
          </motion.div>
        </Link>
        <Link data-testid="bodytune-nutrition-link" href={"/dashboard/meals"}>
          <motion.div
            whileHover={{
              x: "10px",
              transition: { duration: 0.2 },
            }}
            className="flex flex-col py-2 px-[0.6rem]"
          >
            <div className="flex gap-1">
              <p className="font-dmSans font-semibold text-lightSecondary">
                BodyTune Nutrition
              </p>
              <MdiFoodDrumstickOutline
                color="#D3F0D1"
                width="1.3em"
                height="1.3em"
              />
            </div>
            <p data-testid="bodytune-nutrition-link-description" className="font-quickSand text-[0.8rem] text-[#b3b3b3]">
              Plan and personalize your meal choices
            </p>
          </motion.div>
        </Link>
        <Link data-testid="bodytune-connections-link" href={"/dashboard/connections"}>
          <motion.div
            whileHover={{
              x: "10px",
              transition: { duration: 0.2 },
            }}
            className="flex flex-col py-2 px-[0.6rem]"
          >
            <div className="flex gap-1">
              <p className="font-dmSans font-semibold text-lightSecondary">
                Connections
              </p>
              <IcBaselinePeopleOutline
                color="#D3F0D1"
                width="1.3em"
                height="1.3em"
              />
            </div>
            <p data-testid="bodytune-connections-link-description" className="font-quickSand text-[0.8rem] text-[#b3b3b3]">
              Your Fitness Network
            </p>
          </motion.div>
        </Link>
        <Link data-testid="settings-link" href={"#"}>
          <motion.div
            whileHover={{
              x: "10px",
              transition: { duration: 0.2 },
            }}
            className="flex flex-col py-2 px-[0.6rem]"
          >
            <div className="flex gap-1">
              <p className="font-dmSans font-semibold text-lightSecondary">
                Tune-Up Center
              </p>
              <SolarSettingsLinear
                color="#D3F0D1"
                width="1.3em"
                height="1.3em"
              />
            </div>
            <p data-testid="settings-link-description" className="font-quickSand text-[0.8rem] text-[#b3b3b3]">
              Adjust preferences and settings
            </p>
          </motion.div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
