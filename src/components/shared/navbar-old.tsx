"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Zap, Cpu, Wallet, Settings, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: Zap },
  { href: "/marketplace", label: "Marketplace", icon: Cpu },
  { href: "/rent", label: "Rent GPU", icon: Zap },
  { href: "/provider", label: "Become Provider", icon: Cpu },
  { href: "/dashboard", label: "Dashboard", icon: Settings },
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
    <nav className="sticky top-0 z-50 w-full border-b border-bnb-yellow/20 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative">
              <Zap className="h-8 w-8 text-bnb-yellow animate-glow" />
              <div className="absolute -inset-1 bg-bnb-yellow/20 blur rounded-full" />
            </div>
            <span className="text-2xl font-bold text-gradient">Lambda</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200",
                    isActive
                      ? "text-bnb-yellow bg-bnb-yellow/10 neon-border"
                      : "text-gray-300 hover:text-bnb-yellow hover:bg-bnb-yellow/5"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Wallet Connection */}
          <div className="flex items-center space-x-4">
            {isWalletConnected ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-bnb-yellow/50 text-bnb-yellow hover:bg-bnb-yellow/10"
                  >
                    <Wallet className="h-4 w-4 mr-2" />
                    {walletAddress}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 card-dark">
                  <DropdownMenuItem className="text-bnb-yellow">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-bnb-yellow/20" />
                  <DropdownMenuItem
                    onClick={disconnectWallet}
                    className="text-red-400 hover:text-red-300"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Disconnect
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={connectWallet}
                className="bnb-gradient text-black font-semibold hover:opacity-90 transition-opacity"
              >
                <Wallet className="h-4 w-4 mr-2" />
                Connect Wallet
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-bnb-yellow"
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

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-bnb-yellow/20"
          >
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200",
                      isActive
                        ? "text-bnb-yellow bg-bnb-yellow/10 neon-border"
                        : "text-gray-300 hover:text-bnb-yellow hover:bg-bnb-yellow/5"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
