import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/navbar";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Lambda - Decentralized GPU Renting Platform",
  description: "Rent or share GPU compute power on the decentralized cloud. Built on BNB Chain for the future of distributed computing.",
  keywords: ["GPU", "decentralized", "cloud computing", "BNB Chain", "crypto", "blockchain"],
  authors: [{ name: "Lambda Team" }],
  openGraph: {
    title: "Lambda - Decentralized GPU Renting Platform",
    description: "Rent or share GPU compute power on the decentralized cloud",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased min-h-screen bg-gradient-to-br from-black via-gray-900 to-black`}
      >
        <Navbar />
        <main className="relative">
          {children}
        </main>
        <Toaster 
          theme="dark" 
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'rgba(11, 11, 11, 0.8)',
              border: '1px solid rgba(240, 185, 11, 0.2)',
              color: '#F0B90B',
            },
          }}
        />
      </body>
    </html>
  );
}
