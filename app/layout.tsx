import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jo's Portfolio",
  description:
    "Portfolio of Jo - Front-end Developer & CS Student passionate in UI/UX design and modern web development.",
  keywords: [
    "Jo",
    "Portfolio",
    "Front-end Developer",
    "Web Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "UI/UX",
  ],
  authors: [{ name: "Jo" }],
  openGraph: {
    title: "Jo's Portfolio",
    description:
      "Portfolio of Jo - Front-end Developer & CS Student passionate in UI/UX design and modern web development.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full w-full">
      <body className={`${inter.className} bg-[#0E131F] text-white antialiased h-full w-full`}>
        {children}
      </body>
    </html>
  );
}
