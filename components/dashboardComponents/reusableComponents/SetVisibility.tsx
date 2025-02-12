import { useState } from "react";
import { motion } from "framer-motion";

// Icons
import IcOutlineArrowBackIosNew from "@/icons/IcOutlineArrowBackIosNew";

//Types
import { InterfaceBreadCrumbs } from "@/types/inputTypes";
interface props {
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  setSelectedBreadCrumb: React.Dispatch<
    React.SetStateAction<InterfaceBreadCrumbs>
  >;
  Icon: React.ComponentType<{ color: string; width?: string; height?: string }>;
}

// Variants
const childContainer = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};

const SetVisibility = ({
  setProgress,
  setSelectedBreadCrumb,
  setSelectedOption,
  Icon,
}: props) => {
  // States
  const [visibilityPreference, SetVisibilityPreference] = useState<string>("");
  console.log(visibilityPreference);

  // Events
  const radioOnChange = (value: string) => {
    // SetVisibilityPreference((prev) => ({ ...prev, [name]: value }));
    SetVisibilityPreference(value);
  };
  return (
    <>
      <div className="flex flex-col mx-auto max-w-[400px] phone:w-11/12 mt-4">
        <div
          // style={{ height: `${showMealPlanHtml && "27%"}` }}
          className="bg-black rounded-t-lg pt-4 py-2 w-full"
        >
          <div
            className="flex items-center gap-1 pr-2 cursor-pointer w-max group"
            onClick={() => {
              setSelectedOption("");
              setProgress(1);
              setSelectedBreadCrumb({
                id: 1,
                title: "Body Metrics",
                shortDescription: "Set weight, height, and experience",
              });
            }}
          >
            <IcOutlineArrowBackIosNew
              color="#4B6F64"
              width="1.7em"
              height="1.7em"
            />
            <div>
              <p className="font-dmSans font-semibold text-sm text-[#b3b3b3] transition duration-200 group-hover:text-[#ffffff]">
                Return to BodyTune creation options
              </p>
            </div>
          </div>
        </div>
        <motion.div variants={childContainer} className="bg-black w-full p-2">
          <label className="phone:text-sm font-quickSand font-semibold">
            Visibility Preferences
          </label>
          <div className="w-full flex flex-col flex-wrap gap-4 mt-2">
            <div
              className="flex items-center gap-1 cursor group font-dmSans cursor-pointer"
              onClick={() => radioOnChange("Private")}
            >
              <div
                style={{
                  boxShadow:
                    visibilityPreference === "Private"
                      ? "0px 0px 0px 3.5px #4B6F64 inset"
                      : "",
                }}
                className="w-4 h-4 rounded-2xl shadow-[0px_0px_0px_2px_#fff_inset] group-hover:shadow-[0px_0px_0px_2px_#4B6F64_inset]"
              ></div>

              <label className="phone:text-sm font-quickSand cursor-pointer">
                <span className="font-bold text-lightSecondary">Private:</span>{" "}
                Only you can see this{" "}
                <span className="font-bold text-lightSecondary">BodyTune</span>.
              </label>
              <input
                type="radio"
                name="visibilityPreference"
                value="Private"
                className="hidden"
                onChange={() => console.log("wew")}
                checked={visibilityPreference === "Private" ? true : false}
              />
            </div>
            <div
              className="flex items-center gap-1 cursor group font-dmSans cursor-pointer"
              onClick={() => radioOnChange("Followers")}
            >
              <div
                style={{
                  boxShadow:
                    visibilityPreference === "Followers"
                      ? "0px 0px 0px 3.5px #4B6F64 inset"
                      : "",
                }}
                className="w-4 h-4 rounded-2xl shadow-[0px_0px_0px_2px_#fff_inset] group-hover:shadow-[0px_0px_0px_2px_#4B6F64_inset]"
              ></div>

              <label className="phone:text-sm font-quickSand cursor-pointer">
                <span className="font-bold text-lightSecondary">
                  Followers:
                </span>{" "}
                Only your followers can see this{" "}
                <span className="font-bold text-lightSecondary">BodyTune</span>.
              </label>
              <input
                type="radio"
                name="visibilityPreference"
                value="Followers"
                className="hidden"
                onChange={() => console.log("wew")}
                checked={visibilityPreference === "Followers" ? true : false}
              />
            </div>
            <div
              className="flex items-center gap-1 cursor group font-dmSans cursor-pointer"
              onClick={() => radioOnChange("Public")}
            >
              <div
                style={{
                  boxShadow:
                    visibilityPreference === "Public"
                      ? "0px 0px 0px 3.5px #4B6F64 inset"
                      : "",
                }}
                className="w-4 h-4 rounded-2xl shadow-[0px_0px_0px_2px_#fff_inset] group-hover:shadow-[0px_0px_0px_2px_#4B6F64_inset]"
              ></div>

              <label className="phone:text-sm font-quickSand cursor-pointer">
                <span className="font-bold text-lightSecondary">Public:</span>{" "}
                Everyone can see this{" "}
                <span className="font-bold text-lightSecondary">BodyTune</span>.
              </label>
              <input
                type="radio"
                name="visibilityPreference"
                value="Public"
                className="hidden"
                onChange={() => console.log("wew")}
                checked={visibilityPreference === "Public" ? true : false}
              />
            </div>
          </div>
          <div className="mt-4 mx-auto w-max flex items-center gap-1">
            <button className=" bg-[#5d897b] text-white font-quickSand font-semibold text-sm rounded-md py-1 px-2 flex items-center justify-center gap-1 transition duration-200 hover:bg-secondary">
            <Icon color="#D3F0D1" width="1.2em" height="1.2em" />
              Preview Plan
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default SetVisibility;
