"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";

// Actions
import { signOut } from "@/actions/authActions";

// Icons
import MaterialSymbolsLightOverviewOutline from "@/icons/MaterialSymbolsLightOverviewOutline";
import SolarStarsMinimalisticLineDuotone from "@/icons/SolarStarsMinimalisticLineDuotone";
import TablerBarbell from "@/icons/TablerBarbell";
import MdiFoodDrumstickOutline from "@/icons/MdiFoodDrumstickOutline";
import SolarSettingsLinear from "@/icons/SolarSettingsLinear";
import IcBaselinePeopleOutline from "@/icons/IcBaselinePeopleOutline";
import SolarExitLineDuotone from "@/icons/SolarExitLineDuotone";
import SolarRoundedMagniferLinear from "@/icons/SolarRoundedMagniferLinear";
import { useState } from "react";

// Variants
const sidebarVariant = {
  hidden: {
    left: "-100%",
    transition: {
      type: "tween",
    },
  },
  show: {
    left: "0%",
    transition: {
      type: "tween",
    },
  },
};

const Sidebar = () => {
  // states
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);

  // useAnimation
  const sidebarAnimation = useAnimation();

  const animateSidebar = (toggleSidebar: boolean) => {
    if (toggleSidebar) {
      sidebarAnimation.start("show");
    } else {
      sidebarAnimation.start("hidden");
    }
  };

  return (
    <>
      <div
        style={{
          width: toggleSidebar ? "100%" : "max-content",
          height: "100vh",
          backgroundColor: toggleSidebar ? "rgb(0, 0, 0, .54)" : "transparent",
        }}
        className="fixed z-50 top-0 left-0 h-full bg-black/[.54] phone:fixed laptop:relative"
      >
        <motion.div
          variants={sidebarVariant}
          animate={sidebarAnimation}
          className="top-0 left-0 h-full bg-black w-[280px] overflow-auto phone:fixed phone:-left-[100%] laptop:relative laptop:-left-[0%]"
        >
          <div
            className="py-4 flex flex-col items-center gap-1"
            data-testid="header-container"
          >
            <Image
              src="/assets/img/logo.png"
              width={34}
              height={34}
              alt="Logo"
            />
            <header className="text-xl font-quickSand text-lightSecondary font-bold">
              BodyTune
            </header>
          </div>
          <div
            className="mt-6 flex flex-col gap-2"
            data-testid="links-container"
          >
            <Link
              data-testid="overview-link"
              onClick={() => {
                if (window.innerWidth <= 991) {
                  setToggleSidebar(false);
                  animateSidebar(false);
                }
              }}
              href={"/dashboard"}
            >
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
            <Link
              data-testid="bodytune-studio-link"
              onClick={() => {
                if (window.innerWidth <= 991) {
                  setToggleSidebar(false);
                  animateSidebar(false);
                }
              }}
              href={"/dashboard/explore"}
            >
              <motion.div
                whileHover={{
                  x: "10px",
                  transition: { duration: 0.2 },
                }}
                className="flex flex-col py-2 px-[0.6rem]"
              >
                <div className="flex gap-1">
                  <p className="font-dmSans font-semibold text-lightSecondary">
                    Explore Community Plans
                  </p>
                  <SolarRoundedMagniferLinear
                    color="#D3F0D1"
                    width="1.3em"
                    height="1.3em"
                  />
                </div>
                <p
                  data-testid="bodytune-studio-link-description"
                  className="font-quickSand text-[0.8rem] text-[#b3b3b3]"
                >
                  Browse workouts, meal plans, and BodyTunes crafted by others
                </p>
              </motion.div>
            </Link>
            <Link
              data-testid="bodytune-studio-link"
              onClick={() => {
                if (window.innerWidth <= 991) {
                  setToggleSidebar(false);
                  animateSidebar(false);
                }
              }}
              href={"/dashboard/bodytune"}
            >
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
                <p
                  data-testid="bodytune-studio-link-description"
                  className="font-quickSand text-[0.8rem] text-[#b3b3b3]"
                >
                  Combine workouts and meals into your ideal regimen
                </p>
              </motion.div>
            </Link>
            <Link
              data-testid="bodytune-workouts-link"
              onClick={() => {
                if (window.innerWidth <= 991) {
                  setToggleSidebar(false);
                  animateSidebar(false);
                }
              }}
              href={"/dashboard/workouts"}
            >
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
                <p
                  data-testid="bodytune-workouts-link-description"
                  className="font-quickSand text-[0.8rem] text-[#b3b3b3]"
                >
                  Customize and track your exercise routines.
                </p>
              </motion.div>
            </Link>
            <Link
              data-testid="bodytune-nutrition-link"
              onClick={() => {
                if (window.innerWidth <= 991) {
                  setToggleSidebar(false);
                  animateSidebar(false);
                }
              }}
              href={"/dashboard/meals"}
            >
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
                <p
                  data-testid="bodytune-nutrition-link-description"
                  className="font-quickSand text-[0.8rem] text-[#b3b3b3]"
                >
                  Plan and personalize your meal choices
                </p>
              </motion.div>
            </Link>
            <Link
              data-testid="bodytune-connections-link"
              onClick={() => {
                if (window.innerWidth <= 991) {
                  setToggleSidebar(false);
                  animateSidebar(false);
                }
              }}
              href={"/dashboard/connections"}
            >
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
                <p
                  data-testid="bodytune-connections-link-description"
                  className="font-quickSand text-[0.8rem] text-[#b3b3b3]"
                >
                  Your Fitness Network
                </p>
              </motion.div>
            </Link>
            <Link
              data-testid="settings-link"
              onClick={() => {
                if (window.innerWidth <= 991) {
                  setToggleSidebar(false);
                  animateSidebar(false);
                }
              }}
              href={"#"}
            >
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
                <p
                  data-testid="settings-link-description"
                  className="font-quickSand text-[0.8rem] text-[#b3b3b3]"
                >
                  Adjust preferences and settings
                </p>
              </motion.div>
            </Link>
            <motion.div
              whileHover={{
                x: "10px",
                transition: { duration: 0.2 },
              }}
              className="flex flex-col py-2 px-[0.6rem] cursor-pointer"
              onClick={() => signOut()}
            >
              <div className="flex gap-1">
                <p className="font-dmSans font-semibold text-lightSecondary">
                  Sign Out
                </p>
                <SolarExitLineDuotone
                  color="#D3F0D1"
                  width="1.3em"
                  height="1.3em"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Hamburger Icon */}
      <div
        onClick={() => {
          setToggleSidebar((prev) => !prev);
          animateSidebar(!toggleSidebar);
        }}
        className="fixed w-8 h-8 bottom-5 right-5 flex flex-col justify-center items-center gap-2 cursor-pointer z-50 mobile:block laptop:hidden"
      >
        <span
          style={{ transform: toggleSidebar ? "rotate(45deg)" : "rotate(0)" }}
          className="w-[100%] h-[3px] bg-lightSecondary rounded-md origin-top-left transition-all duration-100 ease-in-out"
        ></span>
        <span
          style={{ opacity: toggleSidebar ? "0" : "1" }}
          className="w-[100%] h-[3px] bg-lightSecondary rounded-md origin-center transition-all duration-100 ease-in-out"
        ></span>
        <span
          style={{ transform: toggleSidebar ? "rotate(-45deg)" : "rotate(0)" }}
          className="w-[100%] h-[3px] bg-lightSecondary rounded-md origin-bottom-left transition-all duration-100 ease-in-out"
        ></span>
      </div>
    </>
  );
};

export default Sidebar;
