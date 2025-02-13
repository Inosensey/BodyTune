import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Profile & Preferences",
    description: "Manage your profile, and preferences",
};

export default function ProfileLayout({
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
