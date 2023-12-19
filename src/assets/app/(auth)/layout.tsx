import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./../globals.css";
import clsx from "clsx";
import Provider from "../utils/Provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, "flex")}>
        <Provider>
        {children}
        </Provider>
      </body>
    </html>
  );
}
