import Link from "next/link";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";

// Actions
import { mutatePlanUserFavorites } from "@/actions/planActions";

// Components
import FavoritesButton from "../reusableComponents/FavoritesButton";

// Icons
import SolarEyeOutline from "@/icons/SolarEyeOutline";
import SolarHeartAngleOutline from "@/icons/SolarHeartAngleOutline";
import MdiFoodDrumstickOutline from "@/icons/MdiFoodDrumstickOutline";
import TablerEdit from "@/icons/TablerEdit";
import TablerTrashX from "@/icons/TablerTrashX";

// Types
import { mealPlanTag } from "@/types/mealTypes";
import { explorePageContentInterface, mealPlanQuery } from "@/types/planTypes";
import { formReturnType } from "@/types/formTypes";
interface props {
  author: string;
  mealPlanName: string;
  planTags: Array<mealPlanTag>;
  views: string;
  likes: string;
  setToggleBodyTuneMealDetails: React.Dispatch<React.SetStateAction<boolean>>;
  mealPlan: mealPlanQuery;
  setSelectedMealPlan: React.Dispatch<
    React.SetStateAction<mealPlanQuery | null>
  >;
  setToggleDeleteWarningPopUp?: React.Dispatch<React.SetStateAction<boolean>>;
  setDataToBeDeleted?: React.Dispatch<
    React.SetStateAction<mealPlanQuery | null>
  >;
  canMutate?: boolean;
  userFavorite?: boolean;
}
const useFormStateInitials: formReturnType<
  [] | number | explorePageContentInterface
> = {
  success: null,
  error: null,
  message: "",
  data: [],
};

const BodyTuneMealCard = ({
  author,
  likes,
  mealPlanName,
  planTags,
  views,
  setToggleBodyTuneMealDetails,
  mealPlan,
  setSelectedMealPlan,
  setDataToBeDeleted,
  setToggleDeleteWarningPopUp,
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
      const resData = formState.data as explorePageContentInterface;
      queryClient.setQueryData(["explorePageContent"], resData);
      queryClient.invalidateQueries({ queryKey: ["explorePageContent"] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);
  return (
    <div className="flex flex-col gap-2 font-quickSand text-sm bg-lightPrimary rounded-lg h-max p-4 phone:w-12/12 tablet:w-[280px]">
      <div className="flex flex-col gap-1 justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <div className="flex gap-1 items-center">
                <MdiFoodDrumstickOutline
                  color="#D3F0D1"
                  width="1.1em"
                  height="1.1em"
                />
                <p className="text-xs">
                  <span className="text-[#5d897b] font-semibold">MEAL</span>{" "}
                  PROGRAM
                </p>
              </div>
              <p className="font-semibold text-[0.8rem]">By: {author}</p>
            </div>
            {canMutate ? (
              <div className="flex items-center justify-center gap-1">
                <Link href={`meals/update/${mealPlan.id}`}>
                  <span title="Edit" className="cursor-pointer">
                    <TablerEdit color="#B58E1C" width="1.3em" height="1.3em" />
                  </span>
                </Link>
                {setDataToBeDeleted && setToggleDeleteWarningPopUp && (
                  <span
                    onClick={() => {
                      setToggleDeleteWarningPopUp(true);
                      setDataToBeDeleted(mealPlan);
                    }}
                    title="Delete"
                    className="cursor-pointer"
                  >
                    <TablerTrashX
                      color="#dc3545"
                      width="1.3em"
                      height="1.3em"
                    />
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
                  planType: "meal",
                  planId: mealPlan.id,
                  planAuthorId: mealPlan.created_by,
                })
              );
              return formAction(fd);
            }}
          >   
              <FavoritesButton userFavorite={userFavorite} />
          </form>
            )}
          </div>
          <div className="flex items-center gap-1">
            <p className="text-[0.9rem] font-bold text-lightSecondary underline">
              {mealPlanName}
            </p>
          </div>
          <div className="flex flex-wrap gap-1 font-dmSans font-semibold text-xs">
            {planTags.map((tag: mealPlanTag) => (
              <p
                key={tag.meal_tags.id}
                className="w-max border-[1px] border-lightSecondary px-1 py-[0.3rem] cursor-pointer"
              >
                {tag.meal_tags.mealTagName}
              </p>
            ))}
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

      <motion.button
        onClick={() => {
          setSelectedMealPlan(mealPlan);
          setToggleBodyTuneMealDetails(true);
        }}
        className="w-max flex gap-1 items-center bg-[#5d897b] text-white font-quickSand font-semibold rounded-md p-1 px-2 transition duration-200 hover:bg-secondary"
      >
        View Program
        {/* <MdiFoodDrumstickOutline color="#D3F0D1" width="1.3em" height="1.3em" /> */}
      </motion.button>
    </div>
  );
};

export default BodyTuneMealCard;
