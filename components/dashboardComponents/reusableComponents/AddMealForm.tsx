"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// Components
import Overlay from "@/components/reusableComponent/Overlay";
import {
  Input,
  TextareaInput,
} from "@/components/reusableComponent/formInputs/input";

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
  shortDescription: string;
  cookingInstruction: string;
}
interface MealFormValidations {
  title: {
    valid: boolean | null;
    validationMessage: string;
  };
  shortDescription: {
    valid: boolean | null;
    validationMessage: string;
  };
  cookingInstruction: {
    valid: boolean | null;
    validationMessage: string;
  };
}
interface IngredientInputTypes {
  [key: string]: { 
    id: string; 
    ingredientName: string; 
    ingredientValue: string 
    caloriesName: string; 
    caloriesValue: string 
    proteinsName: string; 
    proteinsValue: string 
    carbsName: string; 
    carbsValue: string 
    fatName: string; 
    fatValue: string 
  };
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
  shortDescription: "",
  cookingInstruction: "",
};
const MealFormValidationInitials: MealFormValidations = {
  title: {
    valid: null,
    validationMessage: "",
  },
  shortDescription: {
    valid: null,
    validationMessage: "",
  },
  cookingInstruction: {
    valid: null,
    validationMessage: "",
  },
};

const AddMealForm = ({ setToggleAddMealForm }: props) => {
  // States
  const initUUID = crypto.randomUUID();
  const [mealValidations, setMealStepValidations] =
    useState<MealFormValidations>(MealFormValidationInitials);
  const [mealFormInputVal, setMealFormInputVal] = useState<MealFormInputTypes>(
    MealFormInputValInitial
  );
  const [ingredientInputVal, setIngredientInputVal] =
    useState<IngredientInputTypes>({
      [`ingredient${initUUID}`]: {
        id: initUUID,
        ingredientName: `Ingredients 1`,
        ingredientValue: "",
        caloriesName: `Calories`,
        caloriesValue: "",
        proteinsName: `Proteins`,
        proteinsValue: "",
        carbsName: `Carbs`,
        carbsValue: "",
        fatName: `Fat`,
        fatValue: "",
      },
    });
  const [ingredientValidations, setIngredientValidations] =
    useState<IngredientInputValidation>({
      [`ingredient${initUUID}`]: { valid: null, validationMessage: "" },
    });

  // Events
  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setMealFormInputVal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
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
        <div className="bg-lightPrimary rounded-lg p-4 overflow-auto desktop:h-[90%] desktop:w-[32%] larger:w-[25%]">
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
                state={mealFormInputVal.title}
                type="text"
                label="Breakfast Meal Name"
                onChange={onChange}
                onBlur={onChange}
                autoComplete="off"
                valid={mealValidations.title.valid}
                validationMessage={mealValidations.title.validationMessage}
              />
            </motion.div>
            <motion.div className="w-full">
              <TextareaInput
                name="shortDescription"
                state={mealFormInputVal.shortDescription}
                label="Short Description (Optional)"
                cols={30}
                rows={3}
                onChange={handleTextareaChange}
                onBlur={handleTextareaChange}
                valid={mealValidations.shortDescription.valid}
                validationMessage={
                  mealValidations.shortDescription.validationMessage
                }
              />
            </motion.div>
            <div className="flex flex-col laptop:w-[100%]">
              <p className="font-dmSans font-semibold text-[#a3e09f] underline">
                Ingredients
              </p>
              <div className="flex flex-col gap-3 mt-2">
                <div className="flex flex-col gap-2 pr-2 overflow-auto max-h-[250px]">
                  {Object.entries(ingredientInputVal!).map(
                    ([key, value], index) => (
                      <div key={key}>
                        <div className="w-full">
                          <Input
                            name={`${key}`}
                            placeholder="Enter the Ingredient Name"
                            state={value.ingredientValue}
                            type="text"
                            label={value.ingredientName}
                            onChange={onChangeIngredientInput}
                            onBlur={onChangeIngredientInput}
                            autoComplete="off"
                            valid={ingredientValidations[key].valid}
                            validationMessage={
                              ingredientValidations[key].validationMessage
                            }
                            deletableInput={index === 0 ? false : true}
                            deleteInputFn={() => {
                              setIngredientInputVal((prev) => {
                                const updatedIngredients = { ...prev };
                                delete updatedIngredients[key];
                                return updatedIngredients;
                              });

                              setIngredientValidations((prev) => {
                                const updatedValidations = { ...prev };
                                delete updatedValidations[key];
                                return updatedValidations;
                              });
                            }}
                          />
                        </div>
                        <div className="w-full flex items-center justify-between mt-2">
                            <div className="w-[24%]">
                              <Input
                                name={`${key}`}
                                state={value.caloriesValue}
                                type="text"
                                label={value.caloriesName}
                                onChange={onChangeIngredientInput}
                                onBlur={onChangeIngredientInput}
                                autoComplete="off"
                                valid={ingredientValidations[key].valid}
                                validationMessage={
                                  ingredientValidations[key].validationMessage
                                }
                              />
                          </div>
                            <div className="w-[24%]">
                              <Input
                                name={`${key}`}
                                state={value.proteinsValue}
                                type="text"
                                label={value.proteinsName}
                                onChange={onChangeIngredientInput}
                                onBlur={onChangeIngredientInput}
                                autoComplete="off"
                                valid={ingredientValidations[key].valid}
                                validationMessage={
                                  ingredientValidations[key].validationMessage
                                }
                              />
                          </div>
                            <div className="w-[24%]">
                              <Input
                                name={`${key}`}
                                state={value.carbsValue}
                                type="text"
                                label={value.carbsName}
                                onChange={onChangeIngredientInput}
                                onBlur={onChangeIngredientInput}
                                autoComplete="off"
                                valid={ingredientValidations[key].valid}
                                validationMessage={
                                  ingredientValidations[key].validationMessage
                                }
                              />
                          </div>
                            <div className="w-[24%]">
                              <Input
                                name={`${key}`}
                                state={value.fatValue}
                                type="text"
                                label={value.fatName}
                                onChange={onChangeIngredientInput}
                                onBlur={onChangeIngredientInput}
                                autoComplete="off"
                                valid={ingredientValidations[key].valid}
                                validationMessage={
                                  ingredientValidations[key].validationMessage
                                }
                              />
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
                <div className="w-max group">
                  <button
                    onClick={() => {
                      const ingredientCount =
                        Object.keys(ingredientInputVal).length + 1;
                      const uuid = crypto.randomUUID();
                      setIngredientInputVal((prev) => ({
                        ...prev,
                        [`ingredient${uuid}`]: {
                          id: uuid,
                          ingredientName: `Ingredient ${ingredientCount}`,
                          ingredientValue: "",
                          caloriesName: `Calories`,
                          caloriesValue: "",
                          proteinsName: `Proteins`,
                          proteinsValue: "",
                          carbsName: `Carbs`,
                          carbsValue: "",
                          fatName: `Fat`,
                          fatValue: "",
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
                <div className="w-max">
                  <label className="text-[#a3e09f] font-dmSans text-base font-semibold underline">
                    Nutrition:
                  </label>
                  <div className="flex flex-wrap gap-2 items-center">
                    <div className="flex items-center gap-1">
                      <p className="font-dmSans font-bold text-lightSecondary text-sm">
                        Calories:
                      </p>
                      <p className="font-quickSand text-sm">0</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <p className="font-dmSans font-bold text-lightSecondary text-sm">
                        Protein:
                      </p>
                      <p className="font-quickSand text-sm">0g</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <p className="font-dmSans font-bold text-lightSecondary text-sm">
                        Carbs:
                      </p>
                      <p className="font-quickSand text-sm">0g</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <p className="font-dmSans font-bold text-lightSecondary text-sm">
                        Fat:
                      </p>
                      <p className="font-quickSand text-sm">0g</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col laptop:w-[100%]">
              <p className="font-dmSans font-semibold text-[#a3e09f] underline">
                How to Prepare
              </p>
              <motion.div className="w-full">
                <TextareaInput
                  name="cookingInstruction"
                  state={mealFormInputVal.cookingInstruction}
                  label="Cooking Instructions:"
                  cols={30}
                  rows={6}
                  onChange={handleTextareaChange}
                  onBlur={handleTextareaChange}
                  valid={mealValidations.cookingInstruction.valid}
                  validationMessage={
                    mealValidations.cookingInstruction.validationMessage
                  }
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export default AddMealForm;