import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";

// Plans
import { activatePlans } from "@/actions/planActions";

// Components
import Overlay from "../../reusableComponent/Overlay";
import LoadingPopUp from "../../reusableComponent/loadingAnimation/LoadingPopUp";

// icnos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { formReturnType } from "@/types/formTypes";
import { Oval } from "react-loader-spinner";
import { userActivePlanInterface } from "@/types/planTypes";
import { TableRow } from "@/types/database.types";

// types
interface props {
  setTogglePopUpInformation: React.Dispatch<React.SetStateAction<boolean>>;
  planType: string;
  id: number;
  children: React.ReactNode;
}

// Form State Initials
const useFormStateInitials: formReturnType<
  | {
      userActivePlan: Array<userActivePlanInterface>;
      userActivePlanData: Array<TableRow<"user_active_plan_data">>;
    }
  | []
  | number
> = {
  success: null,
  error: null,
  message: "",
  data: [],
};

const PopUpInformation = ({
  setTogglePopUpInformation,
  id,
  planType,
  children,
}: props) => {
  const queryClient = useQueryClient();
  const formData = new FormData();

  // States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  // Form State
  const [formState, formAction] = useFormState(
    activatePlans,
    useFormStateInitials
  );

  // Events
  const handleSubmit = () => {
    let jsonData = {};
    if (planType === "BodyTune") {
      jsonData = { bodyTuneId: id, creationType: planType };
    } else if (planType === "Exercise") {
      jsonData = { exercisePlanId: id, creationType: planType };
    } else {
      jsonData = { mealPlanId: id, creationType: planType };
    }
    console.log(jsonData);
    formData.append("jsonData", JSON.stringify(jsonData));
    setSubmitMessage(
      `Activating your ${planType}... ⚙️ Please wait while we set things up.`
    );
    setIsSubmitting(true);
  };

  // UseEffect
  // Handles form submission success or error
  useEffect(() => {
    console.log(formState);
    if (formState.success === null && formState.error === null) return;
    if (formState.success) {
      const resData = formState.data as {
        userActivePlan: Array<userActivePlanInterface>;
        userActivePlanData: Array<TableRow<"user_active_plan_data">>;
      };
      setSubmitMessage("Plan Successfully Activated! ✅");
      queryClient.setQueryData(["userActivePlans"], resData.userActivePlan);
      queryClient.setQueryData(
        ["userActivePlanData"],
        resData.userActivePlanData
      );
      queryClient.invalidateQueries({ queryKey: ["userActivePlans"] });
      queryClient.invalidateQueries({ queryKey: ["userActivePlanData"] });
    }
    setIsSubmitting(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);
  return (
    <Overlay>
      <div className="w-full h-screen flex items-center justify-center">
        <div className="bg-black rounded-lg p-3 overflow-auto phone:w-[95%] mdphone:w-[65%] mdtablet:w-[45%] laptop:w-[30%] desktop:w-[25%]">
          <div className="w-full flex justify-between items-center">
            <p className="text-[#a3e09f] font-dmSans text-lg font-semibold">
              Alert
            </p>
            <div
              onClick={() => setTogglePopUpInformation(false)}
              className="cursor-pointer group"
            >
              <FontAwesomeIcon
                icon={faXmarkCircle}
                className="text-[#D3F0D1] text-2xl transition duration-200 group-hover:text-[#a3e09f]"
              />
            </div>
          </div>
          <p className="text-[#a3e09f] font-quickSand text-sm mt-2">
            Are you sure you want to select this {planType} plan?
          </p>
          <div className="w-full mt-2">{children}</div>
          <div className="flex items-center justify-between mt-2">
            <form action={() => formAction(formData)} onSubmit={handleSubmit}>
              <motion.button className="w-max mt-1 text-sm flex gap-1 items-center bg-[#5d897b] text-white rounded-md py-[0.3rem] px-2 transition duration-200 hover:bg-secondary">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="text-[#D3F0D1] text-lg transition duration-200 group-hover:text-[#a3e09f]"
                />
                Yes
              </motion.button>
            </form>
            <motion.button className="w-max mt-1 text-sm flex gap-1 items-center bg-[#4d4d4d] text-white rounded-md py-[0.3rem] px-2 transition duration-200 hover:bg-primary">
              <FontAwesomeIcon
                icon={faXmarkCircle}
                className="text-[#D3F0D1] text-lg transition duration-200 group-hover:text-[#a3e09f]"
              />
              No
            </motion.button>
          </div>
        </div>
      </div>
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

export default PopUpInformation;
