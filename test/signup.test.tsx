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
    expect(screen.getByTestId("second-step-container")).toBeInTheDocument();
    expect(screen.getByTestId("third-step-container")).toBeInTheDocument();
    expect(screen.getByTestId("fourth-step-container")).toBeInTheDocument();
  });
});
