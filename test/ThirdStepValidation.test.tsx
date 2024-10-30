import { render, fireEvent } from '@testing-library/react';
import ThirdStep from '@/components/authComponents/signUp/steps/ThirdStep';
import { validateRegistrationStep } from '@/utils/validation';

jest.mock('@/utils/validation'); // Mock the validateStep function

describe('ThirdStep', () => {
  const mockSetProgress = jest.fn();
  const updateProgress = jest.fn();
  const setStepValidation = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call validateRegistrationStep with correct values when clicking the next step button', () => {
    const mockValues = {
      name: 'Philip',
      birthDay: '1',
      birthMonth: 'January',
      birthYear: '2000',
      height: '180',
      weight: '70',
    };

    (validateRegistrationStep as jest.Mock).mockReturnValueOnce({
      name: { valid: true, validationMessage: '' },
      birthDay: { valid: true, validationMessage: '' },
      birthMonth: { valid: true, validationMessage: '' },
      birthYear: { valid: true, validationMessage: '' },
      height: { valid: true, validationMessage: '' },
      weight: { valid: true, validationMessage: '' },
    });

    const { getByTestId } = render(
      <ThirdStep
        name="Philip"
        birthDay="1"
        birthMonth="January"
        birthYear="2000"
        height="180"
        weight="70"
        gender='male'
        setRegisterInput={jest.fn()}
        progressTitle="Test Progress"
        currentProgress={1}
        totalProgress={5}
        setProgress={mockSetProgress}
        setStepValidation={setStepValidation}
        updateProgress={updateProgress}
      />
    );

    fireEvent.click(getByTestId('next-step-button'));

    expect(validateRegistrationStep).toHaveBeenCalledWith(mockValues, expect.any(Object));
  });

  it('should not proceed if validation fails', () => {
    (validateRegistrationStep as jest.Mock).mockReturnValueOnce({
      name: { valid: false, validationMessage: 'Name is required' },
      birthDay: { valid: true, validationMessage: '' },
      birthMonth: { valid: true, validationMessage: '' },
      birthYear: { valid: true, validationMessage: '' },
      height: { valid: true, validationMessage: '' },
      weight: { valid: true, validationMessage: '' },
    });

    const { getByTestId } = render(
      <ThirdStep
        name=""
        birthDay="1"
        birthMonth="January"
        birthYear="2000"
        height="180"
        weight="70"
        gender='male'
        setRegisterInput={jest.fn()}
        progressTitle="Test Progress"
        currentProgress={1}
        totalProgress={5}
        setProgress={mockSetProgress}
        setStepValidation={setStepValidation}
        updateProgress={updateProgress}
      />
    );

    fireEvent.click(getByTestId('next-step-button'));

    // expect(setStepValidation).toHaveBeenCalledWith(expect.objectContaining({ isThirdStepValid: false }));
    expect(mockSetProgress).not.toHaveBeenCalled();
  });
});
