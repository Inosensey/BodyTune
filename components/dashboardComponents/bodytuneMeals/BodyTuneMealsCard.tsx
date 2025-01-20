import { motion } from "framer-motion";

// Icons
import SolarEyeOutline from "@/icons/SolarEyeOutline";
import SolarHeartAngleOutline from "@/icons/SolarHeartAngleOutline";
import MdiFoodDrumstickOutline from "@/icons/MdiFoodDrumstickOutline";

// Types
interface props {
  mealPlanName: string;
  views: string;
  likes: string;
  setToggleBodyTuneMealDetails: React.Dispatch<React.SetStateAction<boolean>>;
}

const BodyTuneMealCard = ({
  likes,
  mealPlanName,
  views,
  setToggleBodyTuneMealDetails,
}: props) => {
  return (
    <div className="flex flex-col gap-2 font-quickSand text-sm bg-lightPrimary rounded-lg w-[280px] h-max p-4">
      <div className="flex flex-col gap-2 justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
          <p className="text-base font-bold text-lightSecondary underline">
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
        onClick={() => setToggleBodyTuneMealDetails(true)}
        className="w-max flex gap-1 items-center bg-[#5d897b] text-white font-quickSand font-semibold rounded-md p-1 px-2 transition duration-200 hover:bg-secondary"
      >
        View Full Details
        <MdiFoodDrumstickOutline color="#D3F0D1" width="1.3em" height="1.3em" />
      </motion.button>
    </div>
  );
};

export default BodyTuneMealCard;
