import { motion } from "framer-motion";

// Icons
import SolarEyeOutline from "@/icons/SolarEyeOutline";
import SolarHeartAngleOutline from "@/icons/SolarHeartAngleOutline";
import SolarStarsMinimalisticLineDuotone from "@/icons/SolarStarsMinimalisticLineDuotone";

// Types
interface props {
  bodyTunePlanName: string;
  mealPlanName: string;
  exercisePlanName: string;
  views: string;
  likes: string;
  setToggleBodyTuneDetails: React.Dispatch<React.SetStateAction<boolean>>;
}

const BodyTuneCard = ({
  bodyTunePlanName,
  exercisePlanName,
  likes,
  mealPlanName,
  views,
  setToggleBodyTuneDetails,
}: props) => {
  return (
    <div className="flex flex-col gap-2 font-quickSand text-sm bg-lightPrimary rounded-lg w-[280px] h-max p-4">
      <p className="text-base font-bold text-lightSecondary underline">
        {bodyTunePlanName}
      </p>
      <div className="flex gap-1 justify-between">
        <p className="font-sm font-bold text-sm">{exercisePlanName}</p>
        <p className="font-sm font-bold text-sm">{mealPlanName}</p>
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
