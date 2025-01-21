"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Components
import BodyTuneMealCard from "./BodyTuneMealsCard";
import BodyTuneMealDetails from "./BodyTuneMealDetails";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import { AnimatePresence } from "framer-motion";

// Fixed values
const sortByValues: Array<string> = ["Relevance", "Latest", "Views", "Hearts"];
const pageResultPreferences: Array<number | string> = [
  10,
  20,
  30,
  40,
  50,
  "All",
];

const BodyTuneMealsContent = () => {
  const [sortBy, setSortBy] = useState<string>("Relevance");
  const [resultsPerPage, setResultsPerPage] = useState<number | string>(10);
  const [toggleBodyTuneMealDetails, setToggleBodyTuneMealDetails] =
    useState<boolean>(false);

  // Events
  const selectOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    if (name === "sortBy") {
      setSortBy(value);
    } else if (name === "resultsPerPage") {
      setResultsPerPage(value);
    }
  };
  return (
    <>
      <div className="flex-1 bg-black h-[80%] w-full p-4 rounded-lg">
        <div className="w-full h-full">
          <div className="flex flex-col w-full h-full">
            <div className="flex gap-1 items-center justify-between">
              <div className="w-max flex gap-1 items-center">
                <p className="text-lg font-dmSans font-bold text-lightSecondary">
                  BodyTune Meal Lists
                </p>
                <Link href={"meals/create"}>
                  <button className="bg-[#5d897b] text-white font-quickSand font-semibold px-2 py-1 text-sm rounded-md flex items-center justify-center gap-1 transition duration-200 hover:bg-secondary">
                    Add a Meal
                    <FontAwesomeIcon
                      icon={faPlusSquare}
                      className="text-white text-xl"
                    />
                  </button>
                </Link>
              </div>
              <div className="flex gap-1">
                <div
                  className={`bg-lightPrimary px-2 py-1 flex w-[190px] items-center gap-2`}
                >
                  <label className="phone:text-sm font-quickSand font-semibold">
                    Results Per Page:
                  </label>
                  <select
                    className={`bg-black flex-1 p-1 text-white h-[2.7rem] phone:text-sm font-quickSand`}
                    onChange={selectOnChange}
                    name="resultsPerPage"
                    defaultValue={resultsPerPage}
                  >
                    {pageResultPreferences.map(
                      (pageResult: string | number) => (
                        <option
                          className="bg-primary font-quickSand"
                          key={pageResult}
                          value={pageResult}
                        >
                          {pageResult}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <div
                  className={`bg-lightPrimary px-2 py-1 flex w-[220px] items-center gap-2`}
                >
                  <label className="phone:text-sm font-quickSand font-semibold">
                    Sort By:
                  </label>
                  <select
                    className={`bg-black flex-1 p-1 text-white h-[2.7rem] phone:text-sm font-quickSand`}
                    onChange={selectOnChange}
                    name="sortBy"
                    defaultValue={sortBy}
                  >
                    {sortByValues.map((sortBy: string) => (
                      <option
                        className="bg-primary font-quickSand"
                        key={sortBy}
                        value={sortBy}
                      >
                        {sortBy}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="w-full max-h-[95%] gap-2 flex flex-wrap mt-2 overflow-auto">
              <BodyTuneMealCard
                mealPlanName="Meal Plan Name"
                likes="44521"
                views="4451"
                setToggleBodyTuneMealDetails={setToggleBodyTuneMealDetails}
              />
              <BodyTuneMealCard
                mealPlanName="Meal Plan Name"
                likes="44521"
                views="4451"
                setToggleBodyTuneMealDetails={setToggleBodyTuneMealDetails}
              />
              <BodyTuneMealCard
                mealPlanName="Meal Plan Name"
                likes="44521"
                views="4451"
                setToggleBodyTuneMealDetails={setToggleBodyTuneMealDetails}
              />
              <BodyTuneMealCard
                mealPlanName="Meal Plan Name"
                likes="44521"
                views="4451"
                setToggleBodyTuneMealDetails={setToggleBodyTuneMealDetails}
              />
              <BodyTuneMealCard
                mealPlanName="Meal Plan Name"
                likes="44521"
                views="4451"
                setToggleBodyTuneMealDetails={setToggleBodyTuneMealDetails}
              />
            </div>
            <div className="hidden flex-col w-full h-full font-dmSans justify-center items-center">
              <Image
                src="/assets/svg/healthy-1.svg"
                width={300}
                height={300}
                alt="Logo"
              />
              <p className="w-max text-xl">
                You don&apos;t have any{" "}
                <span className="font-bold font-quickSand text-secondary">
                  Meal Plans
                </span>{" "}
                yet.
              </p>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {toggleBodyTuneMealDetails && (
          <BodyTuneMealDetails
            setToggleBodyTuneMealDetails={setToggleBodyTuneMealDetails}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default BodyTuneMealsContent;
