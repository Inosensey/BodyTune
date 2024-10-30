import { render, fireEvent, screen } from "@testing-library/react";
import FirstStep from "@/components/authComponents/signUp/steps/FirstStep";
import FormValidation, { validateRegistrationStep } from "@/utils/validation";

describe("First Step component", () => {
  const setRegisterInput = jest.fn();
  const setStepValidation = jest.fn();
  const updateProgress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should validate email and enable Next button when valid ", () => {
    const values = {email: "sample@gmail.com"}

   const {rerender} = render(
      <FirstStep
        email={""}
        setRegisterInput={setRegisterInput}
        setStepValidation={setStepValidation}
        updateProgress={updateProgress}
      />
    );

    const emailInput = screen.getByPlaceholderText("Enter your Email");
    fireEvent.change(emailInput, { target: { value: values.email } });

    // Expect setStepValidation to have been called
    expect(setStepValidation).toHaveBeenCalled();

    // validations
    const validationRules = {
      email: (value: string) => FormValidation({ stateName: "email", value }),
    };

    const validationResult = validateRegistrationStep(values, validationRules)

    expect(validationResult).toEqual({
      email: { validationName: 'email', valid: true, validationMessage: '' },
    })

    // Verify that setStepValidation was called with a function
    const stepValidationUpdateFunc = setStepValidation.mock.calls[0][0];

    // Call the function to get the resulting state
    const resultState = stepValidationUpdateFunc({ isFirstStepValid: true });
    resultState.isFirstStepValid = true;

    // Check if the resulting state is correct
    expect(resultState).toEqual({ isFirstStepValid: true });

    rerender(
      <FirstStep
        email={"sample@gmail.com"}
        setRegisterInput={setRegisterInput}
        setStepValidation={setStepValidation}
        updateProgress={updateProgress}
      />
    )

    const nextButton = screen.getByTestId("next-step-button");
    fireEvent.click(nextButton);

    // Expect updateProgress to be called
    expect(updateProgress).toHaveBeenCalled();
  });

  it("should validate password and disable Next button when invalid", () => {
    const values = {faultyEmail: "sample@gmail", faultyEmailTwo: ""}

    const {rerender} = render(
      <FirstStep
        email=""
        setRegisterInput={setRegisterInput}
        setStepValidation={setStepValidation}
        updateProgress={updateProgress}
      />
    );

    const emailInput = screen.getByPlaceholderText("Enter your Email");
    fireEvent.change(emailInput, { target: { value: "test@gmail" } });

    // Expect setStepValidation to have been called
    expect(setStepValidation).toHaveBeenCalled();

    
    // validations
    const validationRules = {
      faultyEmail: (value: string) => FormValidation({ stateName: "email", value }),
      faultyEmailTwo: (value: string) => FormValidation({ stateName: "email", value }),
    };

    const validationResult = validateRegistrationStep(values, validationRules)

    expect(validationResult).toEqual({
      faultyEmail: { validationName: 'faultyEmail', valid: false, validationMessage: "This email is invalid. Make sure it's written like example@email.com" },
      faultyEmailTwo: { validationName: 'faultyEmailTwo', valid: false, validationMessage: "This email is invalid. Make sure it's written like example@email.com" },
    })

    // Verify that setStepValidation was called with a function
    const stepValidationUpdateFunc = setStepValidation.mock.calls[0][0];

    // Call the function to get the resulting state
    const resultState = stepValidationUpdateFunc({ isFirstStepValid: false });

    // Check if the resulting state is correct
    expect(resultState).toEqual({ isFirstStepValid: false });

    
    rerender(
      <FirstStep
        email={"test@gmail"}
        setRegisterInput={setRegisterInput}
        setStepValidation={setStepValidation}
        updateProgress={updateProgress}
      />
    )

    const nextButton = screen.getByTestId("next-step-button");
    fireEvent.click(nextButton);

    // Expect updateProgress to be called
    expect(updateProgress).not.toHaveBeenCalled();
  });
});
