import { motion } from "framer-motion";

// Icons
import SolarEyeOutline from "@/icons/SolarEyeOutline";
import SolarHeartAngleOutline from "@/icons/SolarHeartAngleOutline";
import SolarStarsMinimalisticLineDuotone from "@/icons/SolarStarsMinimalisticLineDuotone";
import TablerBarbell from "@/icons/TablerBarbellLight";
import MdiFoodDrumstickOutline from "@/icons/MdiFoodDrumstickOutline";
import TablerEdit from "@/icons/TablerEdit";
import TablerTrashX from "@/icons/TablerTrashX";

// Types
interface props {
  author: string;
  bodyTunePlanName: string;
  mealPlanName: string;
  exercisePlanName: string;
  views: string;
  likes: string;
  setToggleBodyTuneDetails: React.Dispatch<React.SetStateAction<boolean>>;
}

const BodyTuneCard = ({
  author,
  bodyTunePlanName,
  exercisePlanName,
  likes,
  mealPlanName,
  views,
  setToggleBodyTuneDetails,
}: props) => {
  return (
    <div className="flex flex-col gap-2 font-quickSand text-sm bg-lightPrimary rounded-lg h-max p-4 phone:w-12/12 tablet:w-[280px]">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <p className="text-base font-bold text-lightSecondary underline">
            {bodyTunePlanName}
          </p>
          <p className="font-semibold text-sm">{author}</p>
        </div>
        <div className="flex items-center justify-center gap-1">
          <span title="Edit" className="cursor-pointer">
            <TablerEdit color="#B58E1C" width="1.5em" height="1.5em" />
          </span>
          <span title="Delete" className="cursor-pointer">
            <TablerTrashX color="#dc3545" width="1.5em" height="1.5em" />
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2 justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <p className="font-sm font-bold text-sm underline">
              {exercisePlanName}
            </p>
            <TablerBarbell color="#D3F0D1" width="1.3em" height="1.3em" />
          </div>
          <div className="flex flex-wrap gap-1 font-dmSans font-semibold text-xs">
            <p className="w-max border-[1px] border-lightSecondary px-1 py-[0.3rem] cursor-pointer">
              Beginner
            </p>
            <p className="w-max border-[1px] border-lightSecondary px-1 py-[0.3rem] cursor-pointer">
              Underweight
            </p>
            <p className="w-max border-[1px] border-lightSecondary px-1 py-[0.3rem] cursor-pointer">
              Healthy weight
            </p>
            <p className="w-max border-[1px] border-lightSecondary px-1 py-[0.3rem] cursor-pointer">
              Overweight
            </p>
            <p className="w-max border-[1px] border-lightSecondary px-1 py-[0.3rem] cursor-pointer">
              Obesity
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <p className="font-sm font-bold text-sm underline">
              {mealPlanName}
            </p>
            <MdiFoodDrumstickOutline
              color="#D3F0D1"
              width="1.3em"
              height="1.3em"
            />
          </div>
          <div className="flex flex-wrap gap-1 font-dmSans font-semibold text-xs">
            <p className="w-max border-[1px] border-lightSecondary px-1 py-[0.3rem] cursor-pointer">
              Beginner
            </p>
            <p className="w-max border-[1px] border-lightSecondary px-1 py-[0.3rem] cursor-pointer">
              Underweight
            </p>
            <p className="w-max border-[1px] border-lightSecondary px-1 py-[0.3rem] cursor-pointer">
              Healthy weight
            </p>
            <p className="w-max border-[1px] border-lightSecondary px-1 py-[0.3rem] cursor-pointer">
              Overweight
            </p>
            <p className="w-max border-[1px] border-lightSecondary px-1 py-[0.3rem] cursor-pointer">
              Obesity
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <div className="flex gap-1 items-center">
          <SolarEyeOutline color="#D3F0D1" width="1.3em" height="1.3em" />
          <p className="text-lightSecondary text-sm font-semibold">{likes}</p>
        </div>
        <div className="flex gap-1 items-center">
          <SolarHeartAngleOutline
            color="#D3F0D1"
            width="1.3em"
            height="1.3em"
          />
          <p className="text-lightSecondary text-sm font-semibold">{views}</p>
        </div>
      </div>

      <motion.button
        onClick={() => setToggleBodyTuneDetails(true)}
        className="w-max flex gap-1 items-center bg-[#5d897b] text-white font-quickSand font-semibold rounded-md p-1 px-2 transition duration-200 hover:bg-secondary"
      >
        View Full Details
        <SolarStarsMinimalisticLineDuotone
          color="#D3F0D1"
          width="1.3em"
          height="1.3em"
        />
      </motion.button>
    </div>
  );
};

export default BodyTuneCard;
