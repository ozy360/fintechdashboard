import "@mantine/core/styles.css";
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";
import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const body = IBM_Plex_Mono({
  variable: "--font-body-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fintech dashboard",
  description: "Demo fintech dashboard built uisng Next.js and Mantine ui",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`${body.variable} antialiased`}>
        <main className="2xl:mx-auto 2xl:max-w-7xl bg-white">
          <MantineProvider>{children}</MantineProvider>
        </main>
      </body>
    </html>
  );
}
