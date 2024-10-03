import type { Metadata } from "next";
import "./styles/globals.css";

import { Nunito } from 'next/font/google';

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Anthony Campos",
  description: "Anthony's Portfolio",
  icons: {
    icon: '/myface2.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${nunito.className} bg-[#1E1E1E] text-white`}>{children}</body>
    </html>
  )
}
