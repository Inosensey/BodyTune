import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "BodyTune Studio",
    description: "Combine workouts and meals into your ideal regimen",
};

export default function CreateBodyTuneLayout({
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
