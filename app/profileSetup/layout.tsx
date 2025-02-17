import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "BodyTune - Personal Information Set Up",
    description: "Start your Fitness Journey with BodyTune",
  };

export default function ProfileSetupPageLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className="w-full h-screen">
      {children}
    </div>
  );
}
