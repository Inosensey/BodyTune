// __tests__/validateStep.test.ts

import FormValidation, { validateRegistrationStep } from "@/utils/validation";

describe('validateStep', () => {
  const mockValidationRules = {
    name: jest.fn().mockReturnValue({
      validationName: 'name',
      valid: false,
      validationMessage: 'This field is required',
    }),
    birthDay: jest.fn().mockReturnValue({
      validationName: 'birthDay',
      valid: false,
      validationMessage: 'This field is required',
    }),
    birthMonth: jest.fn().mockReturnValue({
      validationName: 'birthMonth',
      valid: false,
      validationMessage: 'Invalid month',
    }),
    birthYear: jest.fn().mockReturnValue({
      validationName: 'birthYear',
      valid: false,
      validationMessage: 'Invalid year',
    }),
    height: jest.fn().mockReturnValue({
      validationName: 'height',
      valid: false,
      validationMessage: 'Invalid height',
    }),
    weight: jest.fn().mockReturnValue({
      validationName: 'weight',
      valid: false,
      validationMessage: 'Invalid weight',
    }),
  };
      

  it('should return valid results when all inputs are correct', () => {
    const values = {
      name: 'John',
      birthDay: '1',
      birthMonth: 'January',
      birthYear: '2000',
      height: '180',
      weight: '70',
    };

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

    const result = validateRegistrationStep(values, validationRules);

    expect(result).toEqual({
        name: { validationName: 'name', valid: true, validationMessage: '' },
        birthDay: { validationName: 'birthDay', valid: true, validationMessage: '' },
        birthMonth: { validationName: 'birthMonth', valid: true, validationMessage: '' },
        birthYear: { validationName: 'birthYear', valid: true, validationMessage: '' },
        height: { validationName: 'height', valid: true, validationMessage: '' },
        weight: { validationName: 'weight', valid: true, validationMessage: '' },
    });

  });

  it('should return invalid results for incorrect inputs', () => {
    const values = {
      name: '',
      birthDay: '31',
      birthMonth: 'February',
      birthYear: '1990',
      height: '170',
      weight: '60',
    };

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

    const result = validateRegistrationStep(values, validationRules);

    expect(result).toEqual({
        name: { validationName: 'name', valid: false, validationMessage: 'This field is required' },
        birthDay: { validationName: 'birthDay', valid: true, validationMessage: '' },
        birthMonth: { validationName: 'birthMonth', valid: true, validationMessage: '' },
        birthYear: { validationName: 'birthYear', valid: true, validationMessage: '' },
        height: { validationName: 'height', valid: true, validationMessage: '' },
        weight: { validationName: 'weight', valid: true, validationMessage: '' },
    });

  });

  it('should call each validation rule with the correct value', () => {
    const values = {
      name: 'John',
      birthDay: '1',
      birthMonth: 'January',
      birthYear: '2000',
      height: '180',
      weight: '70',
    };    
    validateRegistrationStep(values, mockValidationRules);

    expect(mockValidationRules.name).toHaveBeenCalledWith('John');
    expect(mockValidationRules.birthDay).toHaveBeenCalledWith('1');
    expect(mockValidationRules.birthMonth).toHaveBeenCalledWith('January');
    expect(mockValidationRules.birthYear).toHaveBeenCalledWith('2000');
    expect(mockValidationRules.height).toHaveBeenCalledWith('180');
    expect(mockValidationRules.weight).toHaveBeenCalledWith('70');
  });
});
