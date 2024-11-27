export interface registerInputType {
  email: string;
  password: string;
  name: string,
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  gender: string
  weight: string,
  height: string,
}

export interface termsAndConditionTypes {
  marketingMessages: string;
  remainders: string;
  termsAndCondition: string;
}

export interface stepsValidation {
  isFirstStepValid: boolean,
  isSecondStepValid: boolean,
  isThirdStepValid: boolean,
  isFourthStepValid: boolean
}
export interface validation {
  validationName?: string;
  valid: null | boolean;
  validationMessage: string;
}

export interface stepValidationResult {
  [key: string]: {
    validationName: string;
    valid: boolean | null;
    validationMessage: string;
  };
}

export interface InterfaceBreadCrumbs {
  id: number,
  title: string,
  shortDescription: string,
}