// Components
import Overlay from "@/components/reusableComponent/Overlay";

// Fonts
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmarkCircle,
  faCheckCircle,
} from "@fortawesome/free-regular-svg-icons";

// Props
import { bodyTunePlan } from "@/types/planTypes";
import BodyTuneCard from "../bodytuneStudio/BodyTuneCard";
interface props {
  setToggleDeleteWarningPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  typeOfDataToBeDeleted: string;
  id: number;
  data: bodyTunePlan;
}
const DeleteWarningPopup = ({
  setToggleDeleteWarningPopUp,
  data,
  typeOfDataToBeDeleted,
  id,
}: props) => {
  return (
    <Overlay>
      <div className="w-full h-screen flex items-center justify-center">
        <div className="bg-black rounded-lg p-4 overflow-auto max-h-[96%] phone:w-[95%] desktop:w-[25%]">
          <div className="w-full flex justify-between items-center">
            <p className="text-[#B58E1C] font-dmSans text-lg font-semibold">
              Warning
            </p>
            <div
              onClick={() => setToggleDeleteWarningPopUp(false)}
              className="cursor-pointer group"
            >
              <FontAwesomeIcon
                icon={faXmarkCircle}
                className="text-[#D3F0D1] text-2xl transition duration-200 group-hover:text-[#a3e09f]"
              />
            </div>
          </div>
          <div className="flex flex-col mt-2 gap-3">
            <p className="font-quickSand font-semibold text-sm">
              Are you sure want to Delete{" "}
              <span className="font-bold text-[#a3e09f]">
                {typeOfDataToBeDeleted} #{id}
              </span>
            </p>
            <BodyTuneCard
              bodyTunePlan={data}
              author={data.personal_information.name}
              exercisePlanName={data.exercise_plan.planName}
              mealPlanName={data.meal_plan.planName}
              exercise_plan_tag={data.exercise_plan.exercise_plan_tag}
              meal_plan_tags={data.meal_plan.meal_plan_tags}
              likes="44521"
              views="4451"
            />
            <div className="flex gap-3 justify-center items-center">
              <button className="bg-[#5d897b] text-white font-quickSand font-semibold px-6 py-1 text-sm rounded-md flex items-center justify-center gap-1 transition duration-200 hover:bg-secondary">
                Yes
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="text-white text-sm"
                />
              </button>
              <button
                onClick={() => setToggleDeleteWarningPopUp(false)}
                className="bg-fadedWarningColor text-white font-quickSand font-semibold px-6 py-1 text-sm rounded-md flex items-center justify-center gap-1 transition duration-200 hover:bg-warningColor"
              >
                No
                <FontAwesomeIcon
                  icon={faXmarkCircle}
                  className="text-white text-sm"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export default DeleteWarningPopup;
