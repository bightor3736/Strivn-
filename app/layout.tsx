import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Strivn — B2B growth intelligence",
  description:
    "Strivn combineert bedrijfsdata, intent signals en verrijking om je sales team sneller de juiste prospects te laten targeten."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body
        className={`${inter.className} min-h-screen bg-bg-900 text-text-100 antialiased`}
      >
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-primary-500/20 blur-[140px]" />
            <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-accent-400/20 blur-[160px]" />
            <div className="noise-overlay absolute inset-0" />
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
