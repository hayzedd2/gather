import type { Metadata } from "next";
import { Newsreader } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import QueryProvider from "@/providers/QueryProvider";
import { Analytics } from "@vercel/analytics/react";
import { TooltipProvider } from "@/components/ui/tooltip";

const newsReader = Newsreader({
  variable: "--font-news-reader",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gather | Create Forms & Collect Responses Easily",
  description:
    "Build professional forms, surveys, and questionnaires in minutes. Gather responses, analyze results, and make data-driven decisions with our intuitive form builder.",

  keywords: [
    "form builder",
    "online forms",
    "surveys",
    "data collection",
    "questionnaires",
    "feedback forms",
    "Google Forms alternative",
    "gather forms",
    "gather",
  ],

  authors: [
    {
      name: "Azeez alhameen",
      url: "https://www.alhameen.xyz",
    },
  ],
  openGraph: {
    title: "Gather | The Simple Way to Create Forms & Collect Data",
    description:
      "Build beautiful forms in minutes, collect responses, and analyze data with our powerful yet easy-to-use form builder.",
    url: "https://trygather.vercel.app",
    siteName: "Gather",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Gather homepage image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gather | Create Forms & Collect Responses",
    description:
      "The easiest way to build forms, collect responses, and analyze data.",
    images:["/og.png"],
    creator: "@xylogeist_",
  },
  icons: {
    icon: "/gather-logo.png",
    apple: "/gather-logo.png",
  },
  category: "Productivity",
  creator: "Alhameen",
  metadataBase: new URL("https://trygather.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <TooltipProvider delayDuration={0}>
        <html lang="en">
          <body className={`${newsReader.className} antialiased`}>
            {children}

            <Toaster richColors />
            <Analytics />
          </body>
        </html>
      </TooltipProvider>
    </QueryProvider>
  );
}
