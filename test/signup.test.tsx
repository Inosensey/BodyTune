import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import SignUp from "@/components/authComponents/signUp/SignUp";
import { describe } from "node:test";

describe("Sign Up Component", () => {
  it("Renders the sign up component and its content", () => {
    render(<SignUp />);

    expect(screen.getByTestId("sign-up-container")).toBeInTheDocument();
  });
});
