import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Sidebar from "@/components/dashboardComponents/Sidebar";
import { describe } from "node:test";

describe("Sidebar Component", () => {
    it("Renders the sidebar component and its contents", () => {
        render(<Sidebar />)

        
        // check if all components are rendered
        expect(screen.getByTestId("header-container")).toBeInTheDocument();
        expect(screen.getByTestId("links-container")).toBeInTheDocument();
        expect(screen.getByTestId("overview-link")).toBeInTheDocument();
        expect(screen.getByTestId("overview-link-description")).toBeInTheDocument();
        expect(screen.getByTestId("bodytune-studio-link")).toBeInTheDocument();
        expect(screen.getByTestId("bodytune-studio-link-description")).toBeInTheDocument();
        expect(screen.getByTestId("bodytune-workouts-link")).toBeInTheDocument();
        expect(screen.getByTestId("bodytune-workouts-link-description")).toBeInTheDocument();
        expect(screen.getByTestId("bodytune-nutrition-link")).toBeInTheDocument();
        expect(screen.getByTestId("bodytune-nutrition-link-description")).toBeInTheDocument();
        expect(screen.getByTestId("bodytune-connections-link")).toBeInTheDocument();
        expect(screen.getByTestId("bodytune-connections-link-description")).toBeInTheDocument();
        expect(screen.getByTestId("settings-link")).toBeInTheDocument();
        expect(screen.getByTestId("settings-link-description")).toBeInTheDocument();
        expect(screen.getByTestId("signOut")).toBeInTheDocument();
    })
})