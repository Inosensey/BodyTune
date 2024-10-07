import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import SignUp from "@/components/authComponents/signUp/SignUp";
import { describe } from "node:test";

describe("Sign Up Component", () => {
  it("Renders the sign up component and its content", () => {
    render(<SignUp />);

    expect(screen.getByTestId("sign-up-container")).toBeInTheDocument();
    expect(screen.getByTestId("steps-container")).toBeInTheDocument();
    expect(screen.getByTestId("progress-bar-container")).toBeInTheDocument();
    expect(screen.getByTestId("first-step-container")).toBeInTheDocument();
    expect(screen.getByTestId("first-step-title")).toBeInTheDocument();
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("second-step-container")).toBeInTheDocument();
    expect(screen.getByTestId("second-step-title")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-requirements-container")).toBeInTheDocument();
    expect(screen.getByTestId("third-step-container")).toBeInTheDocument();
    expect(screen.getByTestId("third-step-title")).toBeInTheDocument();
    expect(screen.getByTestId("name-input")).toBeInTheDocument();
    expect(screen.getByTestId("birth-container")).toBeInTheDocument();
    expect(screen.getByTestId("birth-day-input")).toBeInTheDocument();
    expect(screen.getByTestId("birth-month-input")).toBeInTheDocument();
    expect(screen.getByTestId("birth-year-input")).toBeInTheDocument();
    expect(screen.getByTestId("gender-container")).toBeInTheDocument();
    expect(screen.getByTestId("male-gender-radio")).toBeInTheDocument();
    expect(screen.getByTestId("female-gender-radio")).toBeInTheDocument();
    expect(screen.getByTestId("fourth-step-container")).toBeInTheDocument();
    expect(screen.getByTestId("fourth-step-title")).toBeInTheDocument();
    expect(screen.getByTestId("third-party-container")).toBeInTheDocument();
    expect(screen.getByTestId("google-third-party-register")).toBeInTheDocument();
    expect(screen.getByTestId("facebook-third-party-register")).toBeInTheDocument();
    expect(screen.getByTestId("instagram-third-party-register")).toBeInTheDocument();
  });
});
