"use client";

import Overlay from "@/components/reusableComponent/Overlay";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import React from "react";

// Types
interface props {
    setToggleAddMealForm: React.Dispatch<React.SetStateAction<boolean>>
}
const AddMealForm = ({setToggleAddMealForm}: props) => {
  return (
    <Overlay>
        <div onClick={() => setToggleAddMealForm(false)}>
            <FontAwesomeIcon icon={faXmarkCircle} className="text-lightSecondary text-lg" />
        </div>
      <div>AddMealForm</div>
    </Overlay>
  );
};

export default AddMealForm;
