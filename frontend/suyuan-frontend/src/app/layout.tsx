import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Store } from "@reduxjs/toolkit";
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
import { store } from '@/store';
import Providers from "./Providers";

export const metadata: Metadata = {
  title: '溯源',
  description: '高效工作与知识管理平台',
};

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
       <Providers>
        {children}
       </Providers>
      </body>
    </html>
  );
}