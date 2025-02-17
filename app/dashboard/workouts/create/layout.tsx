import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "BodyTune Workouts",
    description: "Customize and track your exercise routines",
};

export default function CreateBodyTuneWorkoutLayout({
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
