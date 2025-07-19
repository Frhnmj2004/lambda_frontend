"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/marketplace", label: "Marketplace" },
  { href: "/provider", label: "Providers" },
  { href: "/dashboard", label: "Dashboard" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress] = useState("0x1234...5678");

  const connectWallet = async () => {
    // TODO: Implement actual wallet connection
    setIsWalletConnected(true);
  };

  const disconnectWallet = () => {
    setIsWalletConnected(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-100">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold tracking-tight text-academy-black">
              LAMBDA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "font-medium text-lg tracking-tight transition-colors duration-200 relative",
                    isActive
                      ? "text-academy-black"
                      : "text-gray-600 hover:text-academy-black"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-academy-yellow"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Wallet Connection & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Wallet Button */}
            {isWalletConnected ? (
              <div className="hidden md:flex items-center space-x-2">
                <span className="text-sm text-gray-600">{walletAddress}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={disconnectWallet}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button
                onClick={connectWallet}
                variant="default"
                className="hidden md:flex items-center gap-2"
              >
                Connect Wallet
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden py-6 border-t border-gray-100"
          >
            <div className="flex flex-col space-y-6">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "font-medium text-xl tracking-tight transition-colors duration-200",
                      isActive
                        ? "text-academy-black"
                        : "text-gray-600"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
              
              {/* Mobile Wallet Button */}
              {isWalletConnected ? (
                <div className="flex flex-col space-y-2 pt-4">
                  <span className="text-sm text-gray-600">{walletAddress}</span>
                  <Button
                    variant="outline"
                    onClick={disconnectWallet}
                    className="w-full border-gray-300 text-gray-700"
                  >
                    Disconnect Wallet
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={connectWallet}
                  variant="default"
                  className="w-full mt-4"
                >
                  Connect Wallet
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
