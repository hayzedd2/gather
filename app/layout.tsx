import type { Metadata } from "next";
import { Newsreader } from "next/font/google";
import "./globals.css";
import About from "@/components/About";

const newsReader = Newsreader({
  variable: "--font-news-reader",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Query",
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
        <main className="max-w-[1200px] mx-auto px-4 py-5">
          <About />
          {children}
        </main>
      </body>
    </html>
  );
}
