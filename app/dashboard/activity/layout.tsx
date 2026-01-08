import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Activity & Plans",
    description: "Activate and manage your selected exercise or meal plans",
};

export default function ActivityLayout({
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
