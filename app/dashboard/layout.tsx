import Sidebar from "@/components/dashboardComponents/Sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "BodyTune - Dashboard",
    description: "Start your Fitness Journey with BodyTune",
};

export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className="w-full h-screen relative">
      {children}
      <Sidebar />
    </div>
  );
}