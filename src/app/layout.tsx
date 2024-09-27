import type { Metadata } from "next";
import localFont from "next/font/local";
import "./styles/globals.css";

import { Nunito } from 'next/font/google'

const nunito = Nunito({ subsets: ['latin'] })

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Anthony Campos",
  description: "Anthony's Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${nunito.className} bg-[#121212] text-white`}>{children}</body>
    </html>
  )
}
