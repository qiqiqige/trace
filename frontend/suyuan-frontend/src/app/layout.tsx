import type { Metadata } from "next";
import "./globals.css";
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
import Providers from "./Providers";

export const metadata: Metadata = {
  title: '溯源',
  description: '高效工作与知识管理平台',
};

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