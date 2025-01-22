"use client";

import { useState } from "react";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import IcBaselinePeopleOutline from "@/icons/IcBaselinePeopleOutline";
import IcOutlinePerson from "@/icons/IcOutlinePerson";
import Link from "next/link";

// Fixed values
const sortByValues: Array<string> = ["Relevance", "Followers", "Hearts"];
const connectionTabValues: Array<string> = [
  "Suggestions",
  "Followed",
  "Your Followers",
];
const pageResultPreferences: Array<number | string> = [
  10,
  20,
  30,
  40,
  50,
  "All",
];

const ConnectionsContent = () => {
  // States
  const [sortBy, setSortBy] = useState<string>("Relevance");
  const [selectedConnectionTab, setSelectedConnectionTab] =
    useState<string>("Suggestions");
  const [resultsPerPage, setResultsPerPage] = useState<number | string>(10);

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
    <div className="flex-1 bg-black h-[80%] w-full p-4 rounded-lg">
      <div className="w-full h-full">
        <div className="flex flex-col w-full h-full">
          <div className="flex gap-1 items-center justify-between border-b-[1px] border-lightSecondary pb-1">
            <div className="flex items-center gap-1">
              {connectionTabValues.map((tab: string, index: number) => (
                <p
                  onClick={() => setSelectedConnectionTab(tab)}
                  key={index}
                  style={{
                    background:
                      selectedConnectionTab === tab ? "#1E1E1E" : "#333333",
                  }}
                  className="px-3 py-2 rounded-md font-quickSand font-semibold text-sm cursor-pointer transition ease-in"
                >
                  {tab}
                </p>
              ))}
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
                  {pageResultPreferences.map((pageResult: string | number) => (
                    <option
                      className="bg-primary font-quickSand"
                      key={pageResult}
                      value={pageResult}
                    >
                      {pageResult}
                    </option>
                  ))}
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
          <div className="w-full max-h-[95%] flex flex-wrap mt-2 overflow-auto">
            <div className="flex flex-col gap-6 p-2 rounded-lg bg-lightPrimary h-[330px] w-[350px]">
              <div className="flex items-center gap-4">
                <div className="font-quickSand font-semibold">
                  <p className="text-lightSecondary">Philip Mathew Dingcong</p>
                  <p className="text-[#ccc]">Mat2x</p>
                </div>
                <div className="flex flex-col">
                  <p className="flex gap-1 items-center font-quickSand font-semibold text-sm text-lightSecondary">
                    <IcBaselinePeopleOutline
                      color="#D3F0D1"
                      width="1.3em"
                      height="1.3em"
                    />
                    999999
                  </p>
                  <button className="bg-[#5d897b] text-white font-quickSand font-semibold px-4 py-1 text-sm rounded-md flex items-center justify-center gap-1 transition duration-200 hover:bg-secondary">
                    Follow
                    <FontAwesomeIcon
                      icon={faPlusSquare}
                      className="text-white text-xl"
                    />
                  </button>
                </div>
              </div>
              <div className="flex gap-1">
                <div className="flex flex-col gap-1 items-center justify-center w-[34%] font-quickSand border-r-[1px] border-lightSecondary">
                  <p className="font-semibold">999</p>
                  <p className="font-bold text-lightSecondary">BodyTunes</p>
                </div>
                <div className="flex flex-col gap-1 items-center justify-center w-[34%] font-quickSand">
                  <p className="font-semibold">999</p>
                  <p className="font-bold text-lightSecondary">Workouts</p>
                </div>
                <div className="flex flex-col gap-1 items-center justify-center w-[34%] font-quickSand border-l-[1px] border-lightSecondary">
                  <p className="font-semibold">999</p>
                  <p className="font-bold text-lightSecondary">Meals</p>
                </div>
              </div>
              <div className="h-[100px]">
                <p className="text-justify font-quickSand h-full line-clamp-5 text-sm">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Nihil, perspiciatis nostrum? Quasi magnam vitae tempora
                  architecto, reprehenderit dolorum numquam facere blanditiis
                  labore libero doloremque, quam asperiores dolorem nihil
                  molestiae aspernatur officiis earum eligendi quidem totam
                  distinctio ipsum quibusdam. Minus, quae.
                </p>
              </div>
              <div className="w-full">
                <Link href={"connections/1"}>
                  <button className="bg-[#5d897b] text-white font-quickSand font-semibold px-4 py-2 rounded-md flex items-center justify-center gap-1 transition duration-200 hover:bg-secondary">
                    View Profile
                    <IcOutlinePerson
                      color="#D3F0D1"
                      width="1.3em"
                      height="1.3em"
                    />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionsContent;
