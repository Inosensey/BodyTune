"use client";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

// Action
import { profileSetUp } from "@/actions/authActions";

// utils
import FormValidation, { validateRegistrationStep } from "@/utils/validation";
import { breakDownDate } from "@/utils/date";

// Components
import DashboardHeader from "../../DashboardHeader";
import { Input } from "@/components/reusableComponent/formInputs/input";

// icons
import IcOutlinePerson from "@/icons/IcOutlinePerson";

// Loading Components
import LoadingPopUp from "@/components/reusableComponent/loadingAnimation/LoadingPopUp";

// Types
import { formReturnType } from "@/types/formTypes";
import { TableRow } from "@/types/database.types";
import { stepValidationResult } from "@/types/inputTypes";
interface props {
  personalInfo: TableRow<"personal_information">;
}
interface profileInputType {
  name: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  gender: string;
  weight: string;
  height: string;
}
interface profileInputValidation {
  name: {
    valid: boolean | null;
    validationMessage: string;
  };
  birthDay: {
    valid: boolean | null;
    validationMessage: string;
  };
  birthMonth: {
    valid: boolean | null;
    validationMessage: string;
  };
  birthYear: {
    valid: boolean | null;
    validationMessage: string;
  };
  height: {
    valid: boolean | null;
    validationMessage: string;
  };
  weight: {
    valid: boolean | null;
    validationMessage: string;
  };
}

// Initials
const profileInputValidationInitials: profileInputValidation = {
  name: {
    valid: null,
    validationMessage: "",
  },
  birthDay: {
    valid: null,
    validationMessage: "",
  },
  birthMonth: {
    valid: null,
    validationMessage: "",
  },
  birthYear: {
    valid: null,
    validationMessage: "",
  },
  height: {
    valid: null,
    validationMessage: "",
  },
  weight: {
    valid: null,
    validationMessage: "",
  },
};
type validationInfo = {
  validationName: string;
  valid: boolean;
  validationMessage: string;
};

// Initials
const months: Array<string> = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const profileInputInitials: profileInputType = {
  name: "",
  birthDay: "",
  birthMonth: "",
  birthYear: "",
  gender: "",
  height: "",
  weight: "",
};
// Initials
const useFormStateInitials: formReturnType<[]> = {
  success: null,
  error: null,
  message: "",
  data: [],
};
// Variants
const containerVariant = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};
const childContainer = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};
const MutateForm = ({ personalInfo }: props) => {
  const router = useRouter();

  // State
  const [profileInput, setProfileInput] =
    useState<profileInputType>(profileInputInitials);
  const [profileInputValidation, setProfileInputValidation] =
    useState<profileInputValidation>(profileInputValidationInitials);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitMessage, setSubmitMessage] = useState<string>(
    "Setting up your profile... 🏋️‍♀️ Your fitness journey begins in just a moment!"
  );
  // UseFormState
  const [formState, formAction] = useFormState(
    profileSetUp,
    useFormStateInitials
  );

  const setInitials = () => {
    const { year, month, day } = breakDownDate(
      new Date(personalInfo.birth_date!)
    );
    setProfileInput({
      name: personalInfo.name!,
      birthDay: `${day}`,
      birthMonth: months[month - 1],
      birthYear: `${year}`,
      gender: personalInfo.gender!,
      height: `${personalInfo.height}`,
      weight: `${personalInfo.weight}`,
    });
  };

  // Events
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const validationParams = {
      stateName: name,
      value: value,
    };

    const validationResult: validationInfo = FormValidation(validationParams);

    setProfileInputValidation((prev) => ({
      ...prev,
      [validationResult.validationName]: {
        valid: validationResult.valid,
        validationMessage: validationResult.validationMessage,
      },
    }));

    // const allInputValidationResult = checkAllInputValidations();
    checkValidations(validationResult);

    setProfileInput((prev) => ({ ...prev, [name]: value }));
  };

  const radioOnChange = (value: string, name: string) => {
    setProfileInput((prev) => ({ ...prev, [name]: value }));
  };
  const selectOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    const validationParams = {
      stateName: name,
      value: value,
    };

    const validationResult: validationInfo = FormValidation(validationParams);

    setProfileInputValidation((prev) => ({
      ...prev,
      [validationResult.validationName]: {
        valid: validationResult.valid,
        validationMessage: validationResult.validationMessage,
      },
    }));

    // const allInputValidationResult = checkAllInputValidations();
    checkValidations(validationResult);

    setProfileInput((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const validationResult = checkAllInputValidations();
    const isValid = checkValidations(validationResult);
    if (!isValid) {
      event.preventDefault();
    }
  };

  // Validations
  const validationRules = {
    name: (value: string) => FormValidation({ stateName: "name", value }),
    birthDay: (value: string) =>
      FormValidation({ stateName: "birthDay", value }),
    birthMonth: (value: string) =>
      FormValidation({ stateName: "birthMonth", value }),
    birthYear: (value: string) =>
      FormValidation({ stateName: "birthYear", value }),
    height: (value: string) => FormValidation({ stateName: "height", value }),
    weight: (value: string) => FormValidation({ stateName: "weight", value }),
  };
  const checkValidations = (
    validationInfo: stepValidationResult | validationInfo
  ) => {
    let isValid = true; // Track overall validation state
    for (const [key, value] of Object.entries(validationInfo)) {
      setProfileInputValidation((prev) => ({
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
  const checkAllInputValidations = () => {
    const values = {
      name: profileInput.name,
      birthDay: profileInput.birthDay,
      birthMonth: profileInput.birthMonth,
      birthYear: profileInput.birthYear,
      height: profileInput.height,
      weight: profileInput.weight,
    };
    const validationResult = validateRegistrationStep(values, validationRules);

    return validationResult;
  };

  // useEffect
  useEffect(() => {
    if (formState.success !== null || formState.error !== null) {
      if (formState.success) {
        setSubmitMessage(
          "You're in! 🎯 Taking you to your dashboard—let’s crush some goals today! 💪"
        );
        router.push("/dashboard");
      } else {
        setIsSubmitting(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);
  useEffect(() => {
    setInitials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="flex flex-col h-[99%] relative">
        <div className="phone:h-[13%] laptop:h-[12%]">
          <DashboardHeader
            headerText="Profile"
            headerDescription="Manage your profile, and preferences"
            Icon={IcOutlinePerson}
          />
        </div>
        <div className="bg-black mx-auto max-w-[550px] overflow-auto py-3 px-2 rounded-sm phone:h-[83%] phone:w-[100%] laptop:h-[85%]">
          <form action={formAction} onSubmit={handleSubmit} className="mt-4">
            <div className="flex flex-col justify-center mx-auto gap-8 max-w-[450px] phone:w-12/12 mt-4">
              <motion.div
                variants={containerVariant}
                initial="hidden"
                animate="show"
                className="flex flex-col gap-3"
              >
                <motion.div variants={childContainer} className="w-full">
                  <div className="w-full relative">
                    <Input
                      name="name"
                      placeholder="Enter your Name"
                      state={profileInput.name}
                      type="text"
                      label="Name"
                      shortDescription="This name will appear on your profile"
                      onChange={onChange}
                      onBlur={onChange}
                      autoComplete="off"
                      valid={profileInputValidation.name.valid}
                      validationMessage={
                        profileInputValidation.name.validationMessage
                      }
                    />
                  </div>
                </motion.div>
                <motion.div variants={childContainer} className="w-full">
                  <div className="flex flex-col">
                    <label className="phone:text-sm font-quickSand font-semibold">
                      Date of birth
                    </label>
                    <p className="text-[#999999] text-xs font-semibold font-dmSans">
                      Why do we need your date of birth? Learn more.
                    </p>
                  </div>
                  <div className="flex items-center gap-1 w-full">
                    <div className="w-4/12 relative">
                      <Input
                        name={"birthDay"}
                        placeholder="dd"
                        state={profileInput.birthDay}
                        type="text"
                        onChange={onChange}
                        autoComplete="off"
                        valid={profileInputValidation.birthDay.valid}
                      />
                    </div>
                    <div
                      style={{
                        border:
                          profileInputValidation.birthMonth.valid === null ||
                          profileInputValidation.birthMonth.valid
                            ? ""
                            : "1px solid rgb(239 68 68)",
                      }}
                      className="w-full relative mt-[0.05rem] phone:w-[96%] mdphone:w-11/12 laptop:w-full"
                    >
                      <div className={`flex flex-col w-full gap-2 bg-primary`}>
                        <select
                          className={`bg-transparent w-[92%] text-white h-[2.7rem] phone:text-sm font-quickSand`}
                          onChange={selectOnChange}
                          name="birthMonth"
                          defaultValue={profileInput.birthMonth}
                        >
                          <option
                            className="bg-primary font-quickSand"
                            value=""
                            disabled
                          >
                            Month
                          </option>
                          {months.map((month: string) => (
                            <option
                              className="bg-primary font-quickSand"
                              key={month}
                              value={month}
                              selected={profileInput.birthMonth === month}
                            >
                              {month}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="w-5/12/12 relative">
                      <Input
                        name={"birthYear"}
                        placeholder="yyyy"
                        state={profileInput.birthYear}
                        type="text"
                        onChange={onChange}
                        autoComplete="off"
                        valid={profileInputValidation.birthYear.valid}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 mt-1">
                    <p className="text-[0.75rem] text-red-500 font-bold font-dmSans">
                      {profileInputValidation.birthDay.validationMessage}
                    </p>
                    <p className="text-[0.75rem] text-red-500 font-bold font-dmSans">
                      {profileInputValidation.birthMonth.validationMessage}
                    </p>
                    <p className="text-[0.75rem] text-red-500 font-bold font-dmSans">
                      {profileInputValidation.birthYear.validationMessage}
                    </p>
                  </div>
                </motion.div>
                <motion.div variants={childContainer} className="w-full">
                  <div className="flex flex-col">
                    <label className="phone:text-sm font-quickSand font-semibold">
                      Height & Weight
                    </label>
                    <p className="text-[#999999] text-xs font-semibold font-dmSans">
                      This information helps us create a personalized exercise
                      and diet plan tailored to your body’s needs.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <div className="min-w-[10px] max-w-[100px] relative">
                      <Input
                        name="weight"
                        placeholder="Weight"
                        state={profileInput.weight}
                        type="text"
                        label="Weight (kg)"
                        onChange={onChange}
                        autoComplete="off"
                        valid={profileInputValidation.weight.valid}
                      />
                    </div>
                    <div className="min-w-[10px] max-w-[100px] relative">
                      <Input
                        name="height"
                        placeholder="Height"
                        state={profileInput.height}
                        type="text"
                        label="Height (cm)"
                        onChange={onChange}
                        autoComplete="off"
                        valid={profileInputValidation.height.valid}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 mt-1">
                    <p className="text-[0.75rem] text-red-500 font-bold font-dmSans">
                      {profileInputValidation.weight.validationMessage}
                    </p>
                    <p className="text-[0.75rem] text-red-500 font-bold font-dmSans">
                      {profileInputValidation.height.validationMessage}
                    </p>
                  </div>
                </motion.div>
                <motion.div variants={childContainer} className="w-full">
                  <div className="flex flex-col">
                    <label className="phone:text-sm font-quickSand font-semibold">
                      Gender
                    </label>
                    <p className="text-[#999999] text-xs font-semibold font-dmSans">
                      Why do we need your date of birth? We use your gender to
                      help personalize our content recommendations for you.
                    </p>
                  </div>
                  <div className="w-full flex items-center flex-wrap gap-2 mt-2">
                    <div
                      className="flex items-center gap-1 cursor group font-dmSans"
                      onClick={() => radioOnChange("Male", "gender")}
                    >
                      <div
                        style={{
                          boxShadow:
                            profileInput.gender === "Male"
                              ? "0px 0px 0px 3.5px #4B6F64 inset"
                              : "",
                        }}
                        className="w-4 h-4 rounded-2xl shadow-[0px_0px_0px_2px_#fff_inset] group-hover:shadow-[0px_0px_0px_2px_#4B6F64_inset]"
                      ></div>
                      <label>Male</label>
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        className="hidden"
                        onChange={() => console.log("wew")}
                        checked={profileInput.gender === "Male" ? true : false}
                      />
                    </div>
                    <div
                      className="flex items-center gap-1 cursor group font-dmSans"
                      onClick={() => radioOnChange("Female", "gender")}
                    >
                      <div
                        style={{
                          boxShadow:
                            profileInput.gender === "Female"
                              ? "0px 0px 0px 3.5px #4B6F64 inset"
                              : "",
                        }}
                        className="w-4 h-4 rounded-2xl shadow-[0px_0px_0px_2px_#fff_inset] group-hover:shadow-[0px_0px_0px_2px_#4B6F64_inset]"
                      ></div>
                      <label>Female</label>
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        className="hidden"
                        onChange={() => console.log("wew")}
                        checked={
                          profileInput.gender === "Female" ? true : false
                        }
                      />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            <div className="w-28 mx-auto">
              <motion.button
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.9 }}
                className="bg-secondary text-white font-quickSand font-bold w-full rounded-md p-1 mt-2"
                type="submit"
              >
                Update
              </motion.button>
            </div>
          </form>
        </div>
      </div>

      <LoadingPopUp isLoading={isSubmitting} message={submitMessage} />
    </>
  );
};

export default MutateForm;
