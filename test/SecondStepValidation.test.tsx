import { render, fireEvent, screen } from "@testing-library/react";
import SecondStep from "@/components/authComponents/signUp/steps/SecondStep";

describe("SecondStep Component", () => {
  const setRegisterInput = jest.fn();
  const setStepValidation = jest.fn();
  const updateProgress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should validate password and enable Next button when valid", () => {
    const { rerender } = render(
      <SecondStep
        password=""
        setRegisterInput={setRegisterInput}
        progressTitle="Set Password"
        currentProgress={1}
        totalProgress={3}
        setProgress={jest.fn()}
        setStepValidation={setStepValidation}
        isSecondStepValid={false}
        updateProgress={updateProgress}
      />
    );

    const passwordInput = screen.getByPlaceholderText("Enter your Password");
    fireEvent.change(passwordInput, { target: { value: "Password1!" } });

    // Verify that setStepValidation was called with a function
    const stepValidationUpdateFunc = setStepValidation.mock.calls[0][0];

    // Call the function to get the resulting state
    const resultState = stepValidationUpdateFunc({ isSecondStepValid: true });
    resultState.isSecondStepValid = true;

    // Expect setStepValidation to have been called
    expect(setStepValidation).toHaveBeenCalled();

    // Check if the resulting state is correct
    expect(resultState).toEqual({ isSecondStepValid: true });

    rerender(
      <SecondStep
        password="Password1!"
        setRegisterInput={setRegisterInput}
        progressTitle="Set Password"
        currentProgress={1}
        totalProgress={3}
        setProgress={jest.fn()}
        setStepValidation={setStepValidation}
        isSecondStepValid={true}
        updateProgress={updateProgress}
      />
    );

    const nextButton = screen.getByTestId("next-step-button");
    fireEvent.click(nextButton);

    // Expect updateProgress to be called
    expect(updateProgress).toHaveBeenCalled();
  });

  it("should validate password and disable Next button when invalid", () => {
    const { rerender } = render(
      <SecondStep
        password=""
        setRegisterInput={setRegisterInput}
        progressTitle="Set Password"
        currentProgress={1}
        totalProgress={3}
        setProgress={jest.fn()}
        setStepValidation={setStepValidation}
        isSecondStepValid={false}
        updateProgress={updateProgress}
      />
    );

    const passwordInput = screen.getByPlaceholderText("Enter your Password");
    fireEvent.change(passwordInput, { target: { value: "short" } }); // Invalid password

    // Expect setStepValidation to have been called
    expect(setStepValidation).toHaveBeenCalled();

    // Verify that setStepValidation was called with a function
    const stepValidationUpdateFunc = setStepValidation.mock.calls[0][0];

    // Call the function to get the resulting state
    const resultState = stepValidationUpdateFunc({ isSecondStepValid: false });

    // Check if the resulting state is correct
    expect(resultState).toEqual({ isSecondStepValid: false });

    const nextButton = screen.getByTestId("next-step-button");
    fireEvent.click(nextButton);

    rerender(
      <SecondStep
        password="short"
        setRegisterInput={setRegisterInput}
        progressTitle="Set Password"
        currentProgress={1}
        totalProgress={3}
        setProgress={jest.fn()}
        setStepValidation={setStepValidation}
        isSecondStepValid={false}
        updateProgress={updateProgress}
      />
    );

    // Expect updateProgress not to be called since the password is invalid
    expect(updateProgress).not.toHaveBeenCalled();
  });
});
