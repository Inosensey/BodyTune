import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "BodyTune Meals",
    description: "Plan and personalize your meal choices",
};

export default function BodyTuneWorkoutLayout({
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
