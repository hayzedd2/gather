import type { Metadata } from "next";
import { Newsreader } from "next/font/google";
import "./globals.css";
import Aside from "@/components/Aside";

const newsReader = Newsreader({
  variable: "--font-news-reader",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gather",
  description: "Build your form and collect your response.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${newsReader.className} antialiased`}>
        <div className="flex">
          <Aside />
          <main className="flex-1 p-4 min-h-screen max-w-7xl mx-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
