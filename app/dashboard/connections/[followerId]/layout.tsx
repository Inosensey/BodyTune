import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Connections",
    description: "Your Fitness Network",
};

export default function FollowerProfileLayout({
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
