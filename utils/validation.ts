import { stepValidationResult } from "@/types/inputTypes";

type params = {
  value: string;
  stateName: string;
  confirmPassword?: string;
  currentEmail?: string;
};
type validationInfo = {
  validationName: string;
  valid: boolean;
  validationMessage: string;
};

const FormValidation = (data: params): validationInfo => {
  switch (data.stateName) {
    case "name":
      return validateName(data);
    case "birthDay":
    case "birthMonth":
    case "birthYear":
      return validateDate(data);
    case "weight":
    case "height":
      return validateNumber(data);
    //   case "date":
    //   case "timeStart":
    //   case "timeEnd":
    //     return validateTimeOrDate(data);
    case "gender":
    case "country":
    case "state":
    case "city":
    case "note":
      return validateString(data);
    case "email":
      return validateEmail(data);
    case "password":
      return validatePassword(data);
    default:
      return {
        validationName: "",
        valid: false,
        validationMessage: "State name is undefined",
      };
  }
};

export const validateRegistrationStep = (
  values: Record<string, string>,
  validationRules: Record<
    string,
    (value: string) => {
      valid: boolean;
      validationMessage: string;
      validationName: string;
    }
  >
): stepValidationResult => {
  const results: stepValidationResult = {};
  for (const [key, value] of Object.entries(values)) {
    const validationResult = validationRules[key](value);
    results[key] = {
      validationName: key,
      valid: validationResult.valid,
      validationMessage: validationResult.validationMessage,
    };
  }
  return results;
};

let validationInfo: validationInfo = {
  validationName: "",
  valid: false,
  validationMessage: "",
};

const validateDate = (data: params): validationInfo => {
  const numberRegex = /^\d*$/;

  if (data.stateName === "birthDay") {
    if (
      data.value.length === 0 ||
      data.value === "0" ||
      !numberRegex.test(data.value)
    ) {
      return (validationInfo = {
        validationName: data.stateName,
        valid: false,
        validationMessage:
          "Please enter the day of your birth date by entering a number between 1 and 31.",
      });
    }
  }
  if (data.stateName === "birthMonth") {
    if (data.value.length === 0) {
      return (validationInfo = {
        validationName: data.stateName,
        valid: false,
        validationMessage: "Select your birth month.",
      });
    }
  }
  if (data.stateName === "birthYear") {
    if (
      data.value.length === 0 ||
      data.value === "0" ||
      !numberRegex.test(data.value)
    ) {
      return (validationInfo = {
        validationName: data.stateName,
        valid: false,
        validationMessage: "Please enter a birth year from 1900 onwards.",
      });
    }
  }

  return (validationInfo = {
    validationName: data.stateName,
    valid: true,
    validationMessage: "",
  });
};
const validateNumber = (data: params): validationInfo => {
  const numberRegex = /^\d*$/;
  if (data.value.length === 0 || data.value === "0") {
    return (validationInfo = {
      validationName: data.stateName,
      valid: false,
      validationMessage: `${data.stateName.charAt(0).toUpperCase() + data.stateName.slice(1)
      } field is required`,
    });
  }
  if (!numberRegex.test(data.value)) {
    return (validationInfo = {
      validationName: data.stateName,
      valid: false,
      validationMessage: `Invalid format (${
        data.stateName.charAt(0).toUpperCase() + data.stateName.slice(1)
      }:  Contains a character)`,
    });
  }
  return (validationInfo = {
    validationName: data.stateName,
    valid: true,
    validationMessage: "",
  });
};

const validateString = (data: params): validationInfo => {
  const numbersRegex = /[0-9]/;
  if (data.value.length === 0) {
    return (validationInfo = {
      validationName: data.stateName,
      valid: false,
      validationMessage: "This field is required",
    });
  }
  if (!numbersRegex.test(data.value)) {
    return (validationInfo = {
      validationName: data.stateName,
      valid: true,
      validationMessage: "",
    });
  }
  return (validationInfo = {
    validationName: data.stateName,
    valid: false,
    validationMessage: "Invalid format (contains a number)",
  });
};

const validateName = (data: params): validationInfo => {
  const nameRegex =
    /^(?!.*\d)(?:[A-Za-z\s]+(?:[.,](?![\s]))?)*(?:\s(?:Sr\.|Jr\.))?$/;
  if (data.value.length === 0) {
    return (validationInfo = {
      validationName: data.stateName,
      valid: false,
      validationMessage: "This field is required",
    });
  }
  if (nameRegex.test(data.value)) {
    return (validationInfo = {
      validationName: data.stateName,
      valid: true,
      validationMessage: "",
    });
  }
  return (validationInfo = {
    validationName: data.stateName,
    valid: false,
    validationMessage:
      "Invalid Input. (contains numbers / title before space / Special Characters)",
  });
};

const validateEmail = (data: params): validationInfo => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(data.value)) {
    return (validationInfo = {
      validationName: data.stateName,
      valid: false,
      validationMessage:
        "This email is invalid. Make sure it's written like example@email.com",
    });
  }

  if (data.stateName === "currentEmail") {
    if (data.value !== data.currentEmail) {
      return (validationInfo = {
        validationName: data.stateName,
        valid: false,
        validationMessage: "Email is not the same as the Current Email",
      });
    }
  }

  return (validationInfo = {
    validationName: data.stateName,
    valid: true,
    validationMessage: "",
  });
};

const validatePassword = (data: params): validationInfo => {
  const minLength = 8;
  const uppercaseRegex = /[A-Z]/;
  const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
  const numberRegex = /\d/;

  if (data.value.length < minLength) {
    return (validationInfo = {
      validationName: data.stateName,
      valid: false,
      validationMessage: "Password is too weak. (Minimum of 8 characters)",
    });
  }
  if (!uppercaseRegex.test(data.value)) {
    return (validationInfo = {
      validationName: data.stateName,
      valid: false,
      validationMessage: "Password must contain one uppercase letter.",
    });
  }
  if (!specialCharRegex.test(data.value)) {
    return (validationInfo = {
      validationName: data.stateName,
      valid: false,
      validationMessage: "Password must contain one special character.",
    });
  }

  if (!numberRegex.test(data.value)) {
    return (validationInfo = {
      validationName: data.stateName,
      valid: false,
      validationMessage: "Password must contain at least one number.",
    });
  }

  return (validationInfo = {
    validationName: data.stateName,
    valid: true,
    validationMessage: "",
  });
};

export default FormValidation;
