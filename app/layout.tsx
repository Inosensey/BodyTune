import type { Metadata } from "next";
import { Quicksand, DM_Sans } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";

const QuicksandFont = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  variable: "--font-quicksand",
});
const DMSansFont = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "BodyTune - Home",
  description: "Home page of BodyTune",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${QuicksandFont.variable} ${DMSansFont.variable} antialiased bg-gradient-to-b from-lightBackground to-primary bg-no-repeat h-screen overflow-auto text-textGray`}
      >
        <NextTopLoader color="#D3F0D1" showSpinner={true} />
        {children}
      </body>
    </html>
  );
}
