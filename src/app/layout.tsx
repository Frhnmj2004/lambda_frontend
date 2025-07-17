import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/navbar";
import { Toaster } from "@/components/ui/sonner";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Lambda - Decentralized GPU Renting Platform",
  description: "Professional decentralized compute marketplace for creators and innovators. Rent or share GPU power on demand.",
  keywords: ["GPU", "decentralized", "cloud computing", "creators", "innovators", "compute"],
  authors: [{ name: "Lambda Team" }],
  openGraph: {
    title: "Lambda - Decentralized GPU Renting Platform",
    description: "Professional decentralized compute marketplace for creators and innovators",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <body
        className={`${plusJakartaSans.variable} ${manrope.variable} antialiased min-h-screen bg-white`}
      >
        <Navbar />
        <main className="relative">
          {children}
        </main>
        <Toaster 
          theme="light" 
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#FFFFFF',
              border: '1px solid #e0e0e0',
              color: '#1A1A1A',
            },
          }}
        />
      </body>
    </html>
  );
}
