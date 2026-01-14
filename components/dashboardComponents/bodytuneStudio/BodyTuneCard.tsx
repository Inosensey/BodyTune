import { motion } from "framer-motion";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useFormState } from "react-dom";
import Link from "next/link";

// Actions
import { mutatePlanUserFavorites } from "@/actions/planActions";

// Components
import FavoritesButton from "../reusableComponents/FavoritesButton";

// Libs
import { arrangeBodyTunePlan } from "@/utils/dashboardUtils";

// Icons
import SolarEyeOutline from "@/icons/SolarEyeOutline";
import SolarHeartAngleOutline from "@/icons/SolarHeartAngleOutline";
import SolarStarsMinimalisticLineDuotone from "@/icons/SolarStarsMinimalisticLineDuotone";
import TablerBarbell from "@/icons/TablerBarbellLight";
import MdiFoodDrumstickOutline from "@/icons/MdiFoodDrumstickOutline";
import TablerEdit from "@/icons/TablerEdit";
import TablerTrashX from "@/icons/TablerTrashX";

// Types
import { bodyTunePlan, exercisePlan, explorePageContentInterface } from "@/types/planTypes";
import { mealPlanType } from "@/types/mealTypes";
import { formReturnType } from "@/types/formTypes";
interface props {
  author: string;
  mealPlanName: string;
  bodyTunePlan: bodyTunePlan;
  exercisePlanName: string;
  exercise_plan_tag: Array<{
    exercise_tags: {
      id: number;
      exerciseTagName: string;
    };
  }>;
  meal_plan_tags: Array<{
    meal_tags: {
      id: number;
      mealTagName: string;
    };
  }>;
  views: string;
  likes: string;
  setToggleBodyTuneDetails?: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedBodyTunePlan?: React.Dispatch<
    React.SetStateAction<{
      bodyTuneId?: number;
      exercisePlan?: exercisePlan;
      mealPlan?: mealPlanType;
    }>
  >;
  setToggleDeleteWarningPopUp?: React.Dispatch<React.SetStateAction<boolean>>;
  setDataToBeDeleted?: React.Dispatch<
    React.SetStateAction<bodyTunePlan | null>
  >;
  canMutate?: boolean;
  userFavorite?: boolean;
}
const useFormStateInitials: formReturnType<[] | number | explorePageContentInterface> = {
  success: null,
  error: null,
  message: "",
  data: [],
};

const BodyTuneCard = ({
  author,
  exercisePlanName,
  bodyTunePlan,
  mealPlanName,
  exercise_plan_tag,
  meal_plan_tags,
  likes,
  views,
  setToggleBodyTuneDetails,
  setSelectedBodyTunePlan,
  setToggleDeleteWarningPopUp,
  setDataToBeDeleted,
  canMutate = true,
  userFavorite = false,
}: props) => {
  const queryClient = useQueryClient();

  // Form State
  const [formState, formAction] = useFormState(
    mutatePlanUserFavorites,
    useFormStateInitials
  );

  // useEffect
  useEffect(() => {
    console.log(formState);
    if (formState.success === null && formState.error === null) return;
    if (formState.success) {
      const resData = formState.data as explorePageContentInterface
      queryClient.setQueryData(["explorePageContent"], resData);
      queryClient.invalidateQueries({ queryKey: ["explorePageContent"] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);
  return (
    <div className="flex flex-col gap-1 font-quickSand text-sm bg-lightPrimary rounded-lg h-max p-4 phone:w-12/12 tablet:w-[280px]">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <div className="flex gap-1 items-center">
            <SolarStarsMinimalisticLineDuotone
              color="#D3F0D1"
              width="1.1em"
              height="1.1em"
            />
            <p className="text-xs">
              <span className="text-[#5d897b] font-semibold">BODYTUNE</span>{" "}
              PROGRAM
            </p>
          </div>
          <p className="font-semibold text-[0.8rem]">By: {author}</p>
        </div>
        {canMutate ? (
          <div className="flex items-center justify-center gap-1">
            <Link href={`bodytune/update/${bodyTunePlan.id}`}>
              <span title="Edit" className="cursor-pointer">
                <TablerEdit color="#B58E1C" width="1.3em" height="1.3em" />
              </span>
            </Link>
            {setDataToBeDeleted && setToggleDeleteWarningPopUp && (
              <span
                onClick={() => {
                  setToggleDeleteWarningPopUp(true);
                  setDataToBeDeleted(bodyTunePlan);
                }}
                title="Delete"
                className="cursor-pointer"
              >
                <TablerTrashX color="#dc3545" width="1.3em" height="1.3em" />
              </span>
            )}
          </div>
        ) : (
          <form
            action={() => {
              const fd = new FormData();
              fd.append(
                "jsonData",
                JSON.stringify({
                  action: userFavorite ? "remove" : "add",
                  planType: "bodytune",
                  planId: bodyTunePlan.id,
                  planAuthorId: bodyTunePlan.created_by,
                })
              );
              return formAction(fd);
            }}
          >
            <FavoritesButton userFavorite={userFavorite} />
          </form>
        )}
      </div>
      <div className="flex flex-col gap-2 justify-between">
        <div className="flex flex-col">
          <p className="text-sm font-semibold underline">Includes:</p>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <TablerBarbell color="#D3F0D1" width="1em" height="1em" />
              <p className="font-sm text-lightSecondary font-bold text-sm underline">
                {exercisePlanName}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <MdiFoodDrumstickOutline
                color="#D3F0D1"
                width="1em"
                height="1em"
              />
              <p className="font-sm text-lightSecondary font-bold text-sm underline">
                {mealPlanName}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap gap-1 font-dmSans font-semibold text-xs w-max border-[1px] border-lightSecondary">
            {exercise_plan_tag.map(
              (tag: {
                exercise_tags: { id: number; exerciseTagName: string };
              }) => (
                <p
                  key={tag.exercise_tags.id}
                  className="w-max px-1 py-[0.3rem] cursor-pointer"
                >
                  {tag.exercise_tags.exerciseTagName
                    .charAt(0)
                    .toLocaleUpperCase() +
                    tag.exercise_tags.exerciseTagName.slice(1)}
                </p>
              )
            )}
            {meal_plan_tags.map(
              (tag: { meal_tags: { id: number; mealTagName: string } }) => (
                <p
                  key={tag.meal_tags.id}
                  className="w-max px-1 py-[0.3rem] cursor-pointer"
                >
                  {tag.meal_tags.mealTagName}
                </p>
              )
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <div className="flex gap-1 items-center">
          <SolarEyeOutline color="#D3F0D1" width="1.1em" height="1.1em" />
          <p className="text-lightSecondary text-sm font-semibold">{likes}</p>
        </div>
        <div className="flex gap-1 items-center">
          <SolarHeartAngleOutline
            color="#D3F0D1"
            width="1.1em"
            height="1.1em"
          />
          <p className="text-lightSecondary text-sm font-semibold">{views}</p>
        </div>
      </div>

      {setSelectedBodyTunePlan && (
        <motion.button
          onClick={() => {
            setToggleBodyTuneDetails!(true);
            const { exercisePlan, mealPlan } =
              arrangeBodyTunePlan(bodyTunePlan);
            setSelectedBodyTunePlan((prev) => ({
              ...prev,
              bodyTuneId: bodyTunePlan.id,
              mealPlan: mealPlan,
              exercisePlan: exercisePlan,
            }));
          }}
          className="w-max flex gap-1 items-center bg-[#5d897b] text-white font-quickSand font-semibold rounded-md p-1 px-2 transition duration-200 hover:bg-secondary"
        >
          View Program
          {/* <SolarStarsMinimalisticLineDuotone
            color="#D3F0D1"
            width="1.3em"
            height="1.3em"
          /> */}
        </motion.button>
      )}
    </div>
  );
};

export default BodyTuneCard;
