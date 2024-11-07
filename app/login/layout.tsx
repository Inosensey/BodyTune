import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "BodyTune - Login",
    description: "Start your Fitness Journey with BodyTune",
};

export default function LoginLayout({
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
