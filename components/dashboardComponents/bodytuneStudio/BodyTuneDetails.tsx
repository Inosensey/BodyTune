// Components
import Overlay from "@/components/reusableComponent/Overlay";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons/faXmarkCircle";

// types
interface props {
  setToggleBodyTuneDetails: React.Dispatch<React.SetStateAction<boolean>>;
}

const BodyTuneDetails = ({ setToggleBodyTuneDetails }: props) => {
  return (
    <Overlay>
      <div className="w-full h-screen flex items-center justify-center">
        <div className="bg-lightPrimary laptop:w-[95%] laptop:h-[85%] rounded-lg p-4">
          <div className="flex justify-center gap-4 laptop:w-[100%] laptop:h-[5%]">
            <p className="text-[#a3e09f] font-dmSans text-lg font-semibold">
              BodyTune Details
            </p>
            <div
              onClick={() => setToggleBodyTuneDetails(false)}
              className="cursor-pointer group"
            >
              <FontAwesomeIcon
                icon={faXmarkCircle}
                className="text-[#D3F0D1] text-2xl transition duration-200 group-hover:text-[#a3e09f]"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1 laptop:h-[95%]">
            <div className="flex flex-col gap-2 bg-primary w-max p-4 rounded-md font-quickSand font-bold">
              <p className="font-dmSans">
                Plan Name:{" "}
                <span className="font-normal text-lightSecondary">
                  A Beginner-Friendly Plan
                </span>
              </p>
              <p className="font-dmSans">
                Recommended BMI Categories:{" "}
                <span className="font-normal text-lightSecondary">
                  From Underweight to Obesity
                </span>
              </p>
              <p className="font-dmSans">
                Exercise Difficulty:{" "}
                <span className="font-normal text-lightSecondary">
                  Suitable for Beginners
                </span>
              </p>
            </div>
            <div className="w-full flex gap-2 flex-1">
              <div className="p-4 w-[50%] flex flex-col bg-primary gap-1">
                <div className="flex flex-col gap-1 max-h-[30%] overflow-auto">
                  <p className="font-quickSand font-bold">
                    Meal Plan Name:<span className="font-normal text-lightSecondary"> A Beginner-Friendly meal plan</span>
                  </p>
                  <div className="font-dmSans">
                    <label className="font-bold">Short Description:</label>
                    <p className="font-normal text-lightSecondary text-sm text-justify">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Porro numquam corporis nisi facere, nihil sint accusantium
                      ullam quod explicabo quis temporibus sequi ratione modi
                      dolorum?
                      Porro numquam corporis nisi facere, nihil sint accusantium
                      ullam quod explicabo quis temporibus sequi ratione modi
                      dolorum?
                    </p>
                  </div>
                </div>
                <div className="w-full h-[70%] border-2">

                </div>
              </div>
              <div className="w-[50%] bg-primary"></div>
            </div>
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export default BodyTuneDetails;
