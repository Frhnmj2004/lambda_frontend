"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const stats = [
    { number: "2,847", label: "GPUs Online" },
    { number: "15,234", label: "Jobs Completed" },
    { number: "98.7%", label: "Uptime" },
    { number: "$2.4M", label: "Total Processed" },
  ];

  const features = [
    {
      title: "GPU Marketplace",
      description: "Access thousands of high-performance GPUs from providers worldwide",
      color: "yellow",
      link: "/marketplace"
    },
    {
      title: "Provider Portal", 
      description: "Share your GPU resources and earn passive income",
      color: "red",
      link: "/provider"
    },
    {
      title: "Low Cost Computing",
      description: "Up to 80% cheaper than traditional cloud providers",
      color: "white",
      link: "/rent"
    }
  ];

  const companies = [
    "OPENAI", "NVIDIA", "GOOGLE", "META", "ANTHROPIC", "MICROSOFT", "AMAZON", "APPLE"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-academy-yellow py-24 lg:py-32 overflow-hidden">
        {/* Background Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="academy-background-text">GPU</span>
        </div>
        
        <div className="relative container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="academy-hero-text mb-8"
            >
              DECENTRALIZED COMPUTE.<br />
              FOR CREATORS & INNOVATORS.<br />
              <span className="text-academy-black/60">ON DEMAND.</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl lg:text-2xl text-academy-black/80 mb-12 max-w-2xl leading-relaxed"
            >
              Access distributed GPU power for AI training, 3D rendering, and compute-intensive workloads. 
              Professional-grade infrastructure at a fraction of the cost.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <Link href="/marketplace" className="academy-button-arrow text-academy-black text-lg font-semibold">
                Start Renting
              </Link>
              <Link href="/provider" className="academy-button-arrow text-academy-black/70 text-lg font-medium">
                Become a Provider
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="academy-stats-card academy-interactive text-center"
              >
                <div className="academy-stats-number">{stat.number}</div>
                <div className="academy-stats-label">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-24 bg-academy-gray-light">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="academy-section-heading mb-16"
          >
            PLATFORM FEATURES
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 items-start">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`academy-overlay-card ${feature.color} relative group cursor-pointer h-full flex flex-col`}
              >
                <h3 className="text-2xl lg:text-3xl font-bold mb-4 uppercase tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-lg mb-6 leading-relaxed flex-grow">
                  {feature.description}
                </p>
                <Link 
                  href={feature.link}
                  className={`academy-button-arrow ${
                    feature.color === 'yellow' ? 'text-academy-black' : 
                    feature.color === 'red' ? 'text-white' : 'text-academy-black'
                  } font-semibold group-hover:translate-x-1 transition-transform duration-300 mt-auto`}
                >
                  Learn More
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="academy-section-heading mb-16 text-center"
          >
            POWERING PROJECTS FROM<br />COMPANIES LIKE
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12"
          >
            {companies.map((company, index) => (
              <motion.div
                key={company}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <span className="text-xl lg:text-2xl font-bold text-gray-400 tracking-wider">
                  {company}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-24 bg-academy-black text-white">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-6xl font-bold mb-8 uppercase tracking-tight"
          >
            Ready to Start?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto"
          >
            Join thousands of creators and innovators using Lambda for their compute needs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Button
              asChild
              variant="default"
              size="lg"
            >
              <Link href="/marketplace" className="flex items-center gap-2">
                Browse GPUs
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-academy-black"
            >
              <Link href="/provider" className="flex items-center gap-2">
                Share Your GPU
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
