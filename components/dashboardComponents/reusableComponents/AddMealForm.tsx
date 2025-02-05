"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Components
import Overlay from "@/components/reusableComponent/Overlay";
import {
  Input,
  TextareaInput,
} from "@/components/reusableComponent/formInputs/input";

// Utils
import FormValidation, { validateFormInputs } from "@/utils/validation";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MdiFoodDrumstickOutline from "@/icons/MdiFoodDrumstickOutline";
import {
  faXmarkCircle,
  faPlusSquare,
} from "@fortawesome/free-regular-svg-icons";

// Types
import { stepValidationResult, validation } from "@/types/inputTypes";
interface MealFormInputTypes {
  mealName: string;
  shortDescription: string;
  cookingInstruction: string;
}
interface MealFormValidations {
  mealName: {
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
    ingredientValue: string;
    caloriesName: string;
    caloriesValue: string;
    proteinsName: string;
    proteinsValue: string;
    carbsName: string;
    carbsValue: string;
    fatName: string;
    fatValue: string;
  };
}
interface IngredientInputValidation {
  [key: string]: {
    ingredientValid: boolean | null;
    ingredientValidationMessage: string;
    caloriesValid: boolean | null;
    caloriesValidationMessage: string;
    proteinsValid: boolean | null;
    proteinsValidationMessage: string;
    carbsValid: boolean | null;
    carbsValidationMessage: string;
    fatValid: boolean | null;
    fatValidationMessage: string;
  };
}

interface nutritionTypes {
  caloriesValue: number;
  proteinsValue: number;
  carbsValue: number;
  fatValue: number;
}
interface mealPlanType {
  breakFast: {
    mealInfo: MealFormInputTypes | undefined;
    ingredients: IngredientInputTypes | undefined;
    nutrition: nutritionTypes | undefined;
  };
  lunch: {
    mealInfo: MealFormInputTypes | undefined;
    ingredients: IngredientInputTypes | undefined;
    nutrition: nutritionTypes | undefined;
  };
  dinner: {
    mealInfo: MealFormInputTypes | undefined;
    ingredients: IngredientInputTypes | undefined;
    nutrition: nutritionTypes | undefined;
  };
}

interface props {
  setToggleAddMealForm: React.Dispatch<React.SetStateAction<boolean>>;
  selectedMeal: string;
  setMealPlan: React.Dispatch<React.SetStateAction<mealPlanType>>;
  mealPlan: mealPlanType;
  formAction: string;
}

// Initials
const MealFormInputValInitial: MealFormInputTypes = {
  mealName: "",
  shortDescription: "",
  cookingInstruction: "",
};
const MealFormValidationInitials: MealFormValidations = {
  mealName: {
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
const nutritionInitial: nutritionTypes = {
  caloriesValue: 0,
  proteinsValue: 0,
  carbsValue: 0,
  fatValue: 0,
};

const AddMealForm = ({
  setToggleAddMealForm,
  selectedMeal,
  setMealPlan,
  formAction,
  mealPlan,
}: props) => {
  // Init Values
  const initUUID = crypto.randomUUID();

  // Refs
  const ingredientRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const ingredientContainerRef = useRef<HTMLDivElement | null>(null);

  // States
  const [latestIngredientKey, setLatestIngredientKey] = useState<string | null>(
    null
  );
  const [mealValidations, setMealValidations] = useState<MealFormValidations>(
    MealFormValidationInitials
  );
  const [mealFormInputVal, setMealFormInputVal] = useState<MealFormInputTypes>(
    MealFormInputValInitial
  );
  const [nutrition, setNutrition] = useState<nutritionTypes>(nutritionInitial);

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
      [`ingredient${initUUID}`]: {
        ingredientValid: null,
        ingredientValidationMessage: "",
        caloriesValid: null,
        caloriesValidationMessage: "",
        proteinsValid: null,
        proteinsValidationMessage: "",
        carbsValid: null,
        carbsValidationMessage: "",
        fatValid: null,
        fatValidationMessage: "",
      },
    });

  // Events
  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    const validationParams = {
      stateName: name,
      value: value,
    };

    const validationResult: validation = FormValidation(validationParams);

    setMealValidations((prev) => ({
      ...prev,
      [validationResult.validationName!]: {
        valid: validationResult.valid,
        validationMessage: validationResult.validationMessage,
      },
    }));

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

    setMealValidations((prev) => ({
      ...prev,
      [validationResult.validationName!]: {
        valid: validationResult.valid,
        validationMessage: validationResult.validationMessage,
      },
    }));

    setMealFormInputVal((prev) => ({ ...prev, [name]: value }));
  };
  const onChangeIngredientInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, dataset } = event.target;

    const customName = dataset.customname!;

    const validationParams = {
      stateName: customName,
      value: value,
    };

    const validationResult: validation = FormValidation(validationParams);

    setIngredientValidations((prev) => ({
      ...prev,
      [name!]: {
        ...prev[name],
        [`${validationResult.validationName}Valid`!]: validationResult.valid,
        [`${validationResult.validationName}ValidationMessage`!]:
          validationResult.validationMessage,
      },
    }));

    setIngredientInputVal((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        [customName]: value,
      },
    }));
  };

  const setInitialFormValues = () => {
    if (formAction === "Edit") {
      let mealType = "";
      if(selectedMeal === "Breakfast") {
        mealType = "breakFast";
      } else if(selectedMeal === "Lunch") {
        mealType = "lunch";
      } else if(selectedMeal === "Dinner") {
        mealType = "dinner"; 
      }
      setMealFormInputVal(mealPlan[mealType as keyof mealPlanType].mealInfo!);
      setIngredientInputVal(mealPlan[mealType as keyof mealPlanType].ingredients!);
      setNutrition(mealPlan[mealType as keyof mealPlanType].nutrition!);
      Object.entries(mealPlan[mealType as keyof mealPlanType].ingredients!).map(([, value]) => {
        setIngredientValidations((prev) => ({
          ...prev,
          [`ingredient${value.id}`]: {
            ingredientValid: null,
            ingredientValidationMessage: "",
            caloriesValid: null,
            caloriesValidationMessage: "",
            proteinsValid: null,
            proteinsValidationMessage: "",
            carbsValid: null,
            carbsValidationMessage: "",
            fatValid: null,
            fatValidationMessage: "",
          },
        }));
      });
    }
  };
  const calculateNutrition = () => {
    let caloriesValue = 0;
    let proteinsValue = 0;
    let carbsValue = 0;
    let fatValue = 0;
    Object.entries(ingredientInputVal!).map(([, value]) => {
      caloriesValue =
        caloriesValue +
        parseFloat(value.caloriesValue === "" ? "0" : value.caloriesValue);
      proteinsValue =
        proteinsValue +
        parseFloat(value.proteinsValue === "" ? "0" : value.proteinsValue);
      carbsValue =
        carbsValue +
        parseFloat(value.carbsValue === "" ? "0" : value.carbsValue);
      fatValue =
        fatValue + parseFloat(value.fatValue === "" ? "0" : value.fatValue);
      setNutrition(() => ({
        caloriesValue: caloriesValue,
        proteinsValue: proteinsValue,
        carbsValue: carbsValue,
        fatValue: fatValue,
      }));
    });
  };

  const getAllIngredientValues = () => {
    const ingredientsValues: { [key: string]: { [key: string]: string } } = {};
    Object.entries(ingredientInputVal!).map(([parentKey, parentValue]) => {
      Object.entries(parentValue!).map(([childKey, childValue]) => {
        if (childKey.includes("Value")) {
          ingredientsValues[parentKey] = {
            ...(ingredientsValues[parentKey] || {}), // Preserve existing child keys
            [childKey]: childValue as string, // Add the new key-value pair
          };
        }
      });
    });
    return ingredientsValues;
  };

  // Validations
  const checkValidations = (
    validationInfo: stepValidationResult | validation
  ) => {
    let isValid = true;
    for (const [key, value] of Object.entries(validationInfo)) {
      setMealValidations((prev) => ({
        ...prev,
        [key]: {
          valid: value.valid,
          validationMessage: value.validationMessage,
        },
      }));
      if (value.valid === false) {
        isValid = false;
      }
    }

    return isValid;
  };

  const checkIngredientValidations = (validationInfo: {
    [key: string]: stepValidationResult;
  }) => {
    let isValid = true;
    Object.entries(validationInfo!).map(([parentKey, parentValue]) => {
      Object.entries(parentValue!).map(([, childValue]) => {
        setIngredientValidations((prev) => ({
          ...prev,
          [parentKey]: {
            ...prev[parentKey],
            [`${childValue.validationName.replace("Value", "")}Valid`!]:
              childValue.valid,
            [`${childValue.validationName.replace(
              "Value",
              ""
            )}ValidationMessage`!]: childValue.validationMessage,
          },
        }));
        if (childValue.valid === false) {
          isValid = false;
        }
      });
    });
    return isValid;
  };

  const validationRules = {
    mealName: (value: string) =>
      FormValidation({ stateName: "mealName", value }),
    cookingInstruction: (value: string) =>
      FormValidation({ stateName: "cookingInstruction", value }),
    ingredientValue: (value: string) =>
      FormValidation({ stateName: "ingredientValue", value }),
    caloriesValue: (value: string) =>
      FormValidation({ stateName: "caloriesValue", value }),
    proteinsValue: (value: string) =>
      FormValidation({ stateName: "proteinsValue", value }),
    carbsValue: (value: string) =>
      FormValidation({ stateName: "carbsValue", value }),
    fatValue: (value: string) =>
      FormValidation({ stateName: "fatValue", value }),
  };

  const checkAllInputValidations = () => {
    const generalMealDetailsValue = {
      mealName: mealFormInputVal.mealName,
      cookingInstruction: mealFormInputVal.cookingInstruction,
    };
    const ingredientValues = getAllIngredientValues();
    const mealValidationResult = validateFormInputs(
      generalMealDetailsValue,
      validationRules
    );
    let ingredientValidationResult: { [key: string]: stepValidationResult } =
      {};
    Object.entries(ingredientValues).map(([parentKey, parentValue]) => {
      const result = validateFormInputs(parentValue, validationRules);
      ingredientValidationResult = {
        ...ingredientValidationResult,
        [parentKey]: result,
      };
    });
    return { ingredientValidationResult, mealValidationResult };
  };

  // UseEffect
  useEffect(() => {
    if (latestIngredientKey && ingredientRefs.current[latestIngredientKey]) {
      const newIngredientInput = ingredientRefs.current[latestIngredientKey];
      newIngredientInput?.focus();

      // Scroll to the new ingredient
      ingredientContainerRef.current?.scrollTo({
        top: ingredientContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
    setLatestIngredientKey(null);
    calculateNutrition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredientInputVal]);
  useEffect(() => {
    setInitialFormValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Overlay>
      <div className="w-full h-screen flex items-center justify-center">
        <div className="bg-lightPrimary rounded-lg p-4 overflow-auto max-h-[96%] phone:w-[95%] desktop:w-[32%] larger:w-[25%]">
          <div className="w-full flex justify-between items-center">
            <p className="text-[#a3e09f] font-dmSans text-lg font-semibold">
              Add {selectedMeal} Meal
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
                name="mealName"
                placeholder="Enter the title of the Breakfast Meal"
                state={mealFormInputVal.mealName}
                type="text"
                label="Breakfast Meal Name"
                onChange={onChange}
                onBlur={onChange}
                autoComplete="off"
                valid={mealValidations.mealName.valid}
                validationMessage={mealValidations.mealName.validationMessage}
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
                <div
                  ref={ingredientContainerRef}
                  className="flex flex-col gap-2 pr-2 overflow-auto max-h-[250px]"
                >
                  {Object.entries(ingredientInputVal!).map(
                    ([key, value], index) => (
                      <div
                        ref={(el) => {
                          ingredientRefs.current[key] = el;
                        }}
                        key={key}
                      >
                        <div className="w-full">
                          <Input
                            name={`${key}`}
                            customName={"ingredientValue"}
                            placeholder="Enter the Ingredient Name"
                            state={value.ingredientValue}
                            type="text"
                            label={value.ingredientName}
                            onChange={onChangeIngredientInput}
                            onBlur={onChangeIngredientInput}
                            autoComplete="off"
                            valid={ingredientValidations[key].ingredientValid}
                            validationMessage={
                              ingredientValidations[key]
                                .ingredientValidationMessage
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
                              customName={"caloriesValue"}
                              state={value.caloriesValue}
                              type="text"
                              label={value.caloriesName}
                              onChange={onChangeIngredientInput}
                              onBlur={onChangeIngredientInput}
                              autoComplete="off"
                              valid={ingredientValidations[key].caloriesValid}
                              validationMessage={
                                ingredientValidations[key]
                                  .caloriesValidationMessage
                              }
                            />
                          </div>
                          <div className="w-[24%]">
                            <Input
                              name={`${key}`}
                              customName={"proteinsValue"}
                              state={value.proteinsValue}
                              type="text"
                              label={value.proteinsName}
                              onChange={onChangeIngredientInput}
                              onBlur={onChangeIngredientInput}
                              autoComplete="off"
                              valid={ingredientValidations[key].proteinsValid}
                              validationMessage={
                                ingredientValidations[key]
                                  .proteinsValidationMessage
                              }
                            />
                          </div>
                          <div className="w-[24%]">
                            <Input
                              name={`${key}`}
                              customName={"carbsValue"}
                              state={value.carbsValue}
                              type="text"
                              label={value.carbsName}
                              onChange={onChangeIngredientInput}
                              onBlur={onChangeIngredientInput}
                              autoComplete="off"
                              valid={ingredientValidations[key].carbsValid}
                              validationMessage={
                                ingredientValidations[key]
                                  .carbsValidationMessage
                              }
                            />
                          </div>
                          <div className="w-[24%]">
                            <Input
                              name={`${key}`}
                              customName={"fatValue"}
                              state={value.fatValue}
                              type="text"
                              label={value.fatName}
                              onChange={onChangeIngredientInput}
                              onBlur={onChangeIngredientInput}
                              autoComplete="off"
                              valid={ingredientValidations[key].fatValid}
                              validationMessage={
                                ingredientValidations[key].fatValidationMessage
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
                      setLatestIngredientKey(`ingredient${uuid}`);
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
                          ingredientValid: null,
                          ingredientValidationMessage: "",
                          caloriesValid: null,
                          caloriesValidationMessage: "",
                          proteinsValid: null,
                          proteinsValidationMessage: "",
                          carbsValid: null,
                          carbsValidationMessage: "",
                          fatValid: null,
                          fatValidationMessage: "",
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
                <div className="w-12/12 flex gap-1 flex-wrap">
                  <label className="text-[#a3e09f] font-dmSans text-base font-semibold underline">
                    Nutrition:
                  </label>
                  <div className="flex flex-wrap gap-2 items-center">
                    <div className="flex items-center gap-1">
                      <p className="font-dmSans font-bold text-lightSecondary text-sm">
                        Calories:
                      </p>
                      <p className="font-quickSand text-sm">
                        {nutrition.caloriesValue}g
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <p className="font-dmSans font-bold text-lightSecondary text-sm">
                        Protein:
                      </p>
                      <p className="font-quickSand text-sm">
                        {nutrition.proteinsValue}g
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <p className="font-dmSans font-bold text-lightSecondary text-sm">
                        Carbs:
                      </p>
                      <p className="font-quickSand text-sm">
                        {nutrition.carbsValue}g
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <p className="font-dmSans font-bold text-lightSecondary text-sm">
                        Fat:
                      </p>
                      <p className="font-quickSand text-sm">
                        {nutrition.fatValue}g
                      </p>
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
            <div className="w-max mx-auto mt-4">
              <motion.button
                onClick={() => {
                  const validationResults = checkAllInputValidations();
                  const MealInfoValidation = checkValidations(
                    validationResults.mealValidationResult
                  );
                  const ingredientValidationResult = checkIngredientValidations(
                    validationResults.ingredientValidationResult
                  );
                  if (MealInfoValidation && ingredientValidationResult) {
                    if (selectedMeal === "Breakfast") {
                      setMealPlan((prev) => ({
                        ...prev,
                        breakFast: {
                          mealInfo: mealFormInputVal,
                          ingredients: ingredientInputVal,
                          nutrition: nutrition,
                        },
                        dinner: prev!.lunch,
                        lunch: prev!.dinner,
                      }));
                    } else if (selectedMeal === "Lunch") {
                      setMealPlan((prev) => ({
                        ...prev,
                        lunch: {
                          mealInfo: mealFormInputVal,
                          ingredients: ingredientInputVal,
                          nutrition: nutrition,
                        },
                        dinner: prev!.lunch,
                        breakFast: prev!.dinner,
                      }));
                    } else if (selectedMeal === "Dinner") {
                      setMealPlan((prev) => ({
                        ...prev,
                        dinner: {
                          mealInfo: mealFormInputVal,
                          ingredients: ingredientInputVal,
                          nutrition: nutrition,
                        },
                        lunch: prev!.lunch,
                        breakFast: prev!.dinner,
                      }));
                    }
                    setToggleAddMealForm(false);
                  }
                }}
                className="flex gap-1 items-center bg-[#5d897b] text-white font-quickSand font-semibold w-full rounded-md p-1 px-2 transition duration-200 hover:bg-secondary"
                type="button"
              >
                <MdiFoodDrumstickOutline
                  color="#D3F0D1"
                  width="1.3em"
                  height="1.3em"
                />
                Create Meal
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export default AddMealForm;
