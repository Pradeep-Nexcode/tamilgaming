import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

import { Press_Start_2P, VT323 } from "next/font/google";

const pressStart = Press_Start_2P({
  variable: "--font-press",
  weight: "400",
  subsets: ["latin"],
});

const vt323 = VT323({
  variable: "--font-vt323",
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "Murugesan Portfolio - Tamil Gaming Legend",
  description:
    "Explore Murugesan's greatest gaming adventures across Tamil Gaming's channel - from Among Us to Minecraft and beyond!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${pressStart.variable} ${vt323.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
