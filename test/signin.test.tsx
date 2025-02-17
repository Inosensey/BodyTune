import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import SignIn from "@/components/authComponents/signIn/SignIn";
import { describe } from "node:test";

jest.mock("next/navigation", () => ({
    useRouter() {
      return {
        prefetch: () => null
      };
    }
  }));

  jest.mock("react-dom", () => {
    const originalModule = jest.requireActual("react-dom");
  
    return {
      ...originalModule,
      useFormState: () => [
        [
          {
            // Return a mock state object
            success: null,
            error: null,
            message: "",
            data: [],
          },
          // Mock setState function
          jest.fn(),
        ],
      ],
    };
  });

describe("Sign In Component", () => {
    it("Renders the sign in component and its contents", () => {
        render(<SignIn />)

        
        // check if all components are rendered
        expect(screen.getByTestId("signIn-container")).toBeInTheDocument();
        expect(screen.getByTestId("third-party-container")).toBeInTheDocument();
        expect(screen.getByTestId("google-third-party-login")).toBeInTheDocument();
        // expect(screen.getByTestId("facebook-third-party-login")).toBeInTheDocument();
        // expect(screen.getByTestId("instagram-third-party-login")).toBeInTheDocument();
        expect(screen.getByTestId("credentials-login-form")).toBeInTheDocument();
        expect(screen.getByTestId("email-input")).toBeInTheDocument();
        expect(screen.getByTestId("password-input")).toBeInTheDocument();
        expect(screen.getByTestId("remember-me")).toBeInTheDocument();
        expect(screen.getByTestId("credentials-login-button")).toBeInTheDocument();
        expect(screen.getByTestId("forgot-password")).toBeInTheDocument();
        expect(screen.getByTestId("create-account-link")).toBeInTheDocument();
    })
})