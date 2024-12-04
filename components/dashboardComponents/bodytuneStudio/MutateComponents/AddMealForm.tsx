"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// Components
import Overlay from "@/components/reusableComponent/Overlay";
import { Input } from "@/components/reusableComponent/formInputs/input";

// Utils
import FormValidation from "@/utils/validation";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmarkCircle,
  faPlusSquare,
} from "@fortawesome/free-regular-svg-icons";

// Types
import { stepValidationResult, validation } from "@/types/inputTypes";
interface props {
  setToggleAddMealForm: React.Dispatch<React.SetStateAction<boolean>>;
}
interface MealFormInputTypes {
  title: string;
}
interface MealFormValidations {
  title: {
    valid: boolean | null;
    validationMessage: string;
  };
}
interface IngredientInputTypes {
  [key: string]: { id: string; name: string; value: string };
}
interface IngredientInputValidation {
  [key: string]: {
    valid: boolean | null;
    validationMessage: string;
  };
}

// Initials
const MealFormInputValInitial: MealFormInputTypes = {
  title: "",
};
const MealFormValidationInitials: MealFormValidations = {
  title: {
    valid: null,
    validationMessage: "",
  },
};

const AddMealForm = ({ setToggleAddMealForm }: props) => {
  // States
  const initUUID = crypto.randomUUID();
  const [mealValidations, setMealStepValidations] =
    useState<MealFormValidations>(MealFormValidationInitials);
  const [MealFormInputVal, setMealFormInputVal] = useState<MealFormInputTypes>(
    MealFormInputValInitial
  );
  const [ingredientInputVal, setIngredientInputVal] =
    useState<IngredientInputTypes>({
      [`ingredient${initUUID}`]: {
        id: initUUID,
        name: `Ingredients 1`,
        value: "",
      },
    });
  const [ingredientValidations, setIngredientValidations] =
    useState<IngredientInputValidation>({
      [`ingredient${initUUID}`]: { valid: null, validationMessage: "" },
    });

  // Events
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const validationParams = {
      stateName: name,
      value: value,
    };

    const validationResult: validation = FormValidation(validationParams);

    setMealStepValidations((prev) => ({
      ...prev,
      [validationResult.validationName!]: {
        valid: validationResult.valid,
        validationMessage: validationResult.validationMessage,
      },
    }));

    // const allInputValidationResult = checkAllInputValidations();
    checkValidations(validationResult);

    setMealFormInputVal((prev) => ({ ...prev, [name]: value }));
  };
  const onChangeIngredientInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    const validationParams = {
      stateName: name,
      value: value,
    };

    const validationResult: validation = FormValidation(validationParams);

    setIngredientValidations((prev) => ({
      ...prev,
      [validationResult.validationName!]: {
        valid: validationResult.valid,
        validationMessage: validationResult.validationMessage,
      },
    }));

    checkValidations(validationResult);

    setIngredientInputVal((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        value: value,
      },
    }));
  };

  const checkValidations = (
    validationInfo: stepValidationResult | validation
  ) => {
    let isValid = true; // Track overall validation state
    for (const [key, value] of Object.entries(validationInfo)) {
      setMealStepValidations((prev) => ({
        ...prev,
        [key]: {
          valid: value.valid,
          validationMessage: value.validationMessage,
        },
      }));
      if (value.valid === false) {
        isValid = false; // If any validation fails, set isValid to false
      }
    }

    return isValid;
  };
  return (
    <Overlay>
      <div className="w-full h-screen flex items-center justify-center">
        <div className="bg-lightPrimary rounded-lg laptop:w-[25%] p-4">
          <div className="w-full flex justify-between items-center">
            <p className="text-[#a3e09f] font-dmSans text-lg font-semibold">
              Add Meal
            </p>
            <div
              onClick={() => setToggleAddMealForm(false)}
              className="cursor-pointer group"
            >
              <FontAwesomeIcon
                icon={faXmarkCircle}
                className="text-[#D3F0D1] text-2xl transition duration-200 group-hover:text-[#a3e09f]"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 mt-4">
            <motion.div className="w-full">
              <Input
                name="title"
                placeholder="Enter the title of the Breakfast Meal"
                state={MealFormInputVal.title}
                type="text"
                label="Breakfast Meal Name"
                onChange={onChange}
                onBlur={onChange}
                autoComplete="off"
                valid={mealValidations.title.valid}
                validationMessage={mealValidations.title.validationMessage}
              />
            </motion.div>
            <div>
              <p className="font-dmSans font-semibold text-[#a3e09f] underline">
                Ingredients
              </p>
              <div className="flex flex-col gap-1 mt-2">
                {Object.entries(ingredientInputVal!).map(([key, value]) => (
                  <div className="w-full" key={key}>
                    <Input
                      name={`${key}`}
                      placeholder="Enter the Ingredient Name"
                      state={value.value}
                      type="text"
                      label={value.name}
                      onChange={onChangeIngredientInput}
                      onBlur={onChangeIngredientInput}
                      autoComplete="off"
                      valid={ingredientValidations[key].valid}
                      validationMessage={
                        ingredientValidations[key].validationMessage
                      }
                    />
                  </div>
                ))}
                <div className="w-max group">
                  <button
                    onClick={() => {
                      const ingredientCount =
                        Object.keys(ingredientInputVal).length + 1;
                      const uuid = crypto.randomUUID();
                      setIngredientInputVal((prev) => ({
                        ...prev,
                        [`ingredient${uuid}`]: {
                          id: `ingredient${uuid}`,
                          name: `Ingredient ${ingredientCount}`,
                          value: "",
                        },
                      }));
                      setIngredientValidations((prev) => ({
                        ...prev,
                        [`ingredient${uuid}`]: {
                          valid: null,
                          validationMessage: "",
                        },
                      }));
                    }}
                    className="bg-[#5d897b] text-white font-quickSand font-semibold text-sm w-full rounded-md py-1 px-2 flex items-center justify-center gap-1 mt-2 transition duration-200 group-hover:bg-secondary"
                  >
                    Add More Ingredient
                    <FontAwesomeIcon
                      icon={faPlusSquare}
                      className="text-white text-lg"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export default AddMealForm;
