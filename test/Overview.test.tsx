import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Overview from "@/components/dashboardComponents/overviewComponents/Overview";
import { describe } from "node:test";

describe("Sidebar Component", () => {
    it("Renders the sidebar component and its contents", () => {
        render(<Overview />)

        
        // check if all components are rendered
        expect(screen.getByTestId("weekly-summary-container")).toBeInTheDocument();
        expect(screen.getByTestId("recent-activities-container")).toBeInTheDocument();
        expect(screen.getByTestId("completed-workouts")).toBeInTheDocument();
        expect(screen.getByTestId("meals-logged")).toBeInTheDocument();
        expect(screen.getByTestId("progress-made-created")).toBeInTheDocument();

        expect(screen.getByTestId("stats-container")).toBeInTheDocument();
        expect(screen.getByTestId("exercises-added")).toBeInTheDocument();
        expect(screen.getByTestId("meals-added")).toBeInTheDocument();
        expect(screen.getByTestId("exercises-completed")).toBeInTheDocument();
        expect(screen.getByTestId("meals-logged")).toBeInTheDocument();
        expect(screen.getByTestId("bodytune-plan-created")).toBeInTheDocument();

        expect(screen.getByTestId("current-bodytune-progress")).toBeInTheDocument();

        expect(screen.getByTestId("news-feed-container")).toBeInTheDocument();
        expect(screen.getByTestId("news-list")).toBeInTheDocument();
        // expect(screen.getByTestId("new-exercise")).toBeInTheDocument();
        // expect(screen.getByTestId("new-meal-container")).toBeInTheDocument();
        // expect(screen.getByTestId("news-bodytune-plan")).toBeInTheDocument();

        expect(screen.getByTestId("suggestions-container")).toBeInTheDocument();

        expect(screen.getByTestId("notifications-container")).toBeInTheDocument();
    })
})