import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Explore",
    description: "Browse workouts, meal plans, and BodyTunes crafted by others",
};

export default function ExploreLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className="w-full h-screen relative tablet:flex">
        {children}
    </div>
  );
}
