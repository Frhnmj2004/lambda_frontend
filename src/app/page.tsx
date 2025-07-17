"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Cpu, Zap, Shield, TrendingUp, Users, Clock, DollarSign } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  { label: "GPUs Online", value: "1,247", icon: Cpu },
  { label: "Jobs Completed", value: "23,891", icon: TrendingUp },
  { label: "Active Users", value: "5,649", icon: Users },
  { label: "Avg Cost/Hour", value: "$0.89", icon: DollarSign },
];

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Deploy your workloads instantly on the fastest GPUs available worldwide.",
  },
  {
    icon: Shield,
    title: "Secure & Decentralized",
    description: "Built on BNB Chain with smart contracts ensuring transparent and secure transactions.",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Global network of GPU providers ensures your jobs run around the clock.",
  },
  {
    icon: DollarSign,
    title: "Cost Effective",
    description: "Pay only for what you use with competitive pricing from our provider network.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-bnb-yellow/10 via-transparent to-bnb-gold/10" />
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">Rent or Share</span>
              <br />
              <span className="text-gradient">GPUs on the</span>
              <br />
              <span className="text-gradient">Decentralized Cloud</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Access powerful GPU computing or monetize your hardware on the world's 
              first fully decentralized GPU marketplace.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/marketplace">
                <Button size="lg" className="bnb-gradient text-black font-semibold text-lg px-8 py-6 group">
                  Start Renting GPUs
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link href="/provider">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-bnb-yellow text-bnb-yellow hover:bg-bnb-yellow/10 text-lg px-8 py-6"
                >
                  Become a Provider
                </Button>
              </Link>
            </div>

            {/* Animated GPU */}
            <motion.div
              animate={{ 
                rotateY: [0, 360],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                rotateY: { duration: 8, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
              className="mx-auto w-32 h-32 relative"
            >
              <div className="absolute inset-0 bg-bnb-yellow/20 blur-xl rounded-full" />
              <Cpu className="w-32 h-32 text-bnb-yellow" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-black/20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <Card className="card-dark hover:gpu-glow transition-all duration-300 group">
                    <CardContent className="p-6">
                      <Icon className="h-8 w-8 text-bnb-yellow mx-auto mb-4 group-hover:scale-110 transition-transform" />
                      <div className="text-3xl font-bold text-white mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-400">
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose <span className="text-gradient">Lambda</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience the future of distributed computing with our cutting-edge platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="card-dark hover:gpu-glow transition-all duration-300 h-full group">
                    <CardHeader>
                      <Icon className="h-12 w-12 text-bnb-yellow mb-4 group-hover:scale-110 transition-transform" />
                      <CardTitle className="text-xl text-white group-hover:text-bnb-yellow transition-colors">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-bnb-yellow/10 via-transparent to-bnb-gold/10">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of developers and providers already using Lambda for their GPU computing needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/rent">
                <Button size="lg" className="bnb-gradient text-black font-semibold text-lg px-8 py-6">
                  Submit Your First Job
                </Button>
              </Link>
              
              <Link href="/dashboard">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-bnb-yellow text-bnb-yellow hover:bg-bnb-yellow/10 text-lg px-8 py-6"
                >
                  View Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-bnb-yellow/20 py-12 px-4 bg-black/40">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Zap className="h-6 w-6 text-bnb-yellow" />
              <span className="text-xl font-bold text-gradient">Lambda</span>
            </div>
            
            <div className="flex space-x-6 text-gray-400">
              <Link href="/docs" className="hover:text-bnb-yellow transition-colors">
                Documentation
              </Link>
              <Link href="/support" className="hover:text-bnb-yellow transition-colors">
                Support
              </Link>
              <Link href="/about" className="hover:text-bnb-yellow transition-colors">
                About
              </Link>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-bnb-yellow/10 text-center text-gray-400">
            <p>&copy; 2025 Lambda. Built on BNB Chain. Empowering the decentralized future.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
