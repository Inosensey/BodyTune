import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { useQueryClient } from "@tanstack/react-query";

// Actions
import { deletePlan } from "@/actions/planActions";

// Components
import Overlay from "@/components/reusableComponent/Overlay";
import LoadingPopUp from "@/components/reusableComponent/loadingAnimation/LoadingPopUp";
import { Oval } from "react-loader-spinner";

// Fonts
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmarkCircle,
  faCheckCircle,
} from "@fortawesome/free-regular-svg-icons";

// Props
import {
  bodyTunePlan,
  exercisePlanQuery,
  mealPlanQuery,
} from "@/types/planTypes";
import { formReturnType } from "@/types/formTypes";
interface props {
  setToggleDeleteWarningPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  typeOfDataToBeDeleted: string;
  id: number;
  bodyTunes?: bodyTunePlan[] | undefined;
  exercisePlansRes?: exercisePlanQuery[] | undefined;
  mealPlansRes?: mealPlanQuery[] | undefined;
  children: React.ReactNode;
}

// Form State Initials
const useFormStateInitials: formReturnType<[] | number> = {
  success: null,
  error: null,
  message: "",
  data: [],
};

const DeleteWarningPopup = ({
  bodyTunes,
  exercisePlansRes,
  mealPlansRes,
  setToggleDeleteWarningPopUp,
  typeOfDataToBeDeleted,
  id,
  children,
}: props) => {
  const queryClient = useQueryClient();
  const formData = new FormData();

  // States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  // Form State
  const [formState, formAction] = useFormState(
    deletePlan,
    useFormStateInitials
  );

  // UseEffect
  // Handles form submission success or error
  useEffect(() => {
    if (formState.success === null && formState.error === null) return;
    console.log(formState);
    if (formState.success) {
      switch (typeOfDataToBeDeleted) {
        case "BodyTune":
          setSubmitMessage("BodyTune deleted successfully! ✅");
          queryClient.invalidateQueries({ queryKey: ["bodyTunes"] });
          if (bodyTunes) {
            const filteredBodyTunes = bodyTunes.filter(
              (bodyTune: bodyTunePlan) => bodyTune.id !== id
            );
            queryClient.setQueryData(["bodyTunes"], filteredBodyTunes);
            setIsSubmitting(false);
          }
          break;

        case "meal":
          setSubmitMessage("Meal Plan deleted successfully! ✅");
          queryClient.invalidateQueries({ queryKey: ["mealPlans"] });
          if (mealPlansRes) {
            const filteredMealPlans = mealPlansRes.filter(
              (mealPlan: mealPlanQuery) => mealPlan.id !== id
            );
            queryClient.setQueryData(["mealPlans"], filteredMealPlans);
            setIsSubmitting(false);
          }
          break;

        case "exercise":
          setSubmitMessage("Exercise Plan deleted successfully! ✅");
          queryClient.invalidateQueries({ queryKey: ["exercisePlans"] });
          if (exercisePlansRes) {
            const filteredBodyTunes = exercisePlansRes.filter(
              (exercisePlan: exercisePlanQuery) => exercisePlan.id !== id
            );
            queryClient.setQueryData(["exercisePlans"], filteredBodyTunes);
            setIsSubmitting(false);
          }
          break;

        default:
          break;
      }
      queryClient.invalidateQueries({ queryKey: ["userOverAllStatistics"] });
    } else {
      setIsSubmitting(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  // Events
  const handleSubmit = () => {
    formData.append(
      "payload",
      JSON.stringify({
        planId: id,
        planType: typeOfDataToBeDeleted,
      })
    );
    setSubmitMessage(
      `Deleting ${typeOfDataToBeDeleted.charAt(0).toUpperCase() + typeOfDataToBeDeleted.slice(1)} Plan... 🗑️ Hang tight while we clean things up.`
    );
    setIsSubmitting(true);
  };

  return (
    <Overlay>
      {!isSubmitting && (
        <div className="w-full h-screen flex items-center justify-center">
          <div className="bg-black rounded-lg p-4 overflow-auto phone:w-[95%] mdphone:w-[65%] mdtablet:w-[45%] laptop:max-w-[30%] desktop:max-w-[25%]">
            <div className="w-full flex justify-between items-center">
              <p className="text-[#B58E1C] font-dmSans text-lg font-semibold">
                {formState.success === null || formState.error === true
                  ? "Warning"
                  : "Notification"}
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
              {formState.success === null || formState.error === true ? (
                <>
                  <p className="font-quickSand font-semibold text-sm">
                    Are you sure want to Delete{" "}
                    <span className="font-bold text-[#a3e09f]">
                      {typeOfDataToBeDeleted.charAt(0).toUpperCase() + typeOfDataToBeDeleted.slice(1)} Plan #{id}
                    </span>
                  </p>
                  {children}
                </>
              ) : (
                <p className="font-quickSand font-semibold text-sm">
                  {submitMessage}
                </p>
              )}

              <div className="flex gap-3 justify-center items-center">
                {formState.success === null || formState.error === true ? (
                  <>
                    <form
                      action={() => formAction(formData)}
                      onSubmit={handleSubmit}
                    >
                      <button className="bg-[#5d897b] text-white font-quickSand font-semibold px-6 py-1 text-sm rounded-md flex items-center justify-center gap-1 transition duration-200 hover:bg-secondary">
                        Yes
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className="text-white text-sm"
                        />
                      </button>
                    </form>
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
                  </>
                ) : (
                  <button
                    onClick={() => setToggleDeleteWarningPopUp(false)}
                    className="bg-[#5d897b] text-white font-quickSand font-semibold px-6 py-1 text-sm rounded-md flex items-center justify-center gap-1 transition duration-200 hover:bg-secondary"
                  >
                    Okay
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="text-white text-sm"
                    />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <LoadingPopUp
        message={submitMessage}
        isLoading={isSubmitting}
        LoadingAnimationIcon={
          <Oval
            visible={true}
            height="60"
            width="60"
            color="#4fa94d"
            secondaryColor="#4B6F64"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        }
      />
    </Overlay>
  );
};

export default DeleteWarningPopup;
