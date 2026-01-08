import Overlay from "@/components/reusableComponent/Overlay";

// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";

// Types
import { mealPlanListType } from "@/types/mealTypes";
import { exercisePlanListType } from "@/types/exerciseTypes";
type listStructure = mealPlanListType | exercisePlanListType;
interface props {
  setTogglePlanPopUpList: React.Dispatch<React.SetStateAction<{listType: string, toggle:boolean}>>;
  planList: Array<listStructure>,
  listType: string,
}

const PlanList = ({ 
  setTogglePlanPopUpList, 
  planList, 
  listType,
}: props) => {

  const renderers: Record<typeof listType, (list: listStructure) => JSX.Element> = {
    meal: (lists) => {
      const plan = lists as mealPlanListType;

      return (
        <div>
          <p className="text-sm font-bold text-[#a3e09f]">{plan.planName}</p>
          <div className="flex gap-1 mt-1 text-xs flex-col">
            <p>BMI Classification(s):</p>
            <div className="flex gap-1">
              {plan.planTags.map((tag) => (
                <p className="font-semibold border-[1.5px] border-secondary py-[0.2rem] px-1" key={tag.meal_tags.id}>{tag.meal_tags.mealTagName}</p>
              ))}
            </div>
          </div>
        </div>
      );
    },
    exercise: (lists) => {
      const plan = lists as exercisePlanListType;
      return (
        <div>
          <p className="text-sm font-bold text-[#a3e09f]">{plan.planName}</p>
          <div className="flex gap-1 mt-1 text-xs flex-col">
            <p>BMI Classification(s):</p>
            <div className="flex gap-1">
              {plan.planTags.map((tag) => (
                <p className="font-semibold border-[1.5px] border-secondary py-[0.2rem] px-1" key={tag.exercise_tags.id}>{tag.exercise_tags.exerciseTagName}</p>
              ))}
            </div>
          </div>
        </div>
      );
    },
  };

  return (
    <Overlay>
      <div className="w-full h-screen flex items-center justify-center">
        <div className="bg-black rounded-lg p-4 overflow-auto phone:w-[95%] mdphone:w-[65%] mdtablet:w-[45%] laptop:w-[30%] desktop:w-[25%]">          
          <div className="w-full flex justify-between items-center">
            <p className="text-[#a3e09f] font-dmSans text-lg font-semibold">
              {listType === "meal" ? "Meal" : "Exercise"} List
            </p>
            <div
              onClick={() => setTogglePlanPopUpList({listType: "", toggle: false})}
              className="cursor-pointer group"
            >
              <FontAwesomeIcon
                icon={faXmarkCircle}
                className="text-[#D3F0D1] text-2xl transition duration-200 group-hover:text-[#a3e09f]"
              />
            </div>
          </div>
          <div className="relative w-[270px] mt-2">
            <label className="phone:text-sm font-quickSand font-semibold">
              Filter {listType === "meal" ? "Meal" : "Exercise"} Plans
            </label>
            <div
              className={`flex flex-col w-full h-[2.7rem] gap-2 bg-primary px-1`}
            >
              <select
                className={`bg-transparent text-white h-full phone:text-sm font-quickSand`}
                name="mealPlan"
                defaultValue={1}
              >
                <option className="bg-primary font-quickSand" value="1">
                  All
                </option>
                <option className="bg-primary font-quickSand" value="2">
                  Saved Meal Plans
                </option>
                <option className="bg-primary font-quickSand" value="3">
                  Created Meal Plans
                </option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-2">
            {planList.map((list, index) => (
              <div 
                className="bg-lightPrimary p-2 rounded-md font-quickSand cursor-pointer transition duration-200 hover:bg-primary" key={index}
              >
                {renderers[listType](list)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export default PlanList;
