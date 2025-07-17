"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Wallet, Cpu, DollarSign, TrendingUp, Shield, CheckCircle, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

const steps = [
  {
    id: 1,
    title: "Download Lambda Agent",
    description: "Install our lightweight node agent on your system",
    icon: Download,
    status: "pending" as const,
  },
  {
    id: 2,
    title: "Connect Wallet",
    description: "Link your BNB Chain wallet for payments",
    icon: Wallet,
    status: "pending" as const,
  },
  {
    id: 3,
    title: "Register GPU",
    description: "Auto-detect and register your GPU specifications",
    icon: Cpu,
    status: "pending" as const,
  },
  {
    id: 4,
    title: "Set Pricing",
    description: "Configure your hourly rates and availability",
    icon: DollarSign,
    status: "pending" as const,
  },
];

const benefits = [
  {
    icon: TrendingUp,
    title: "Passive Income",
    description: "Earn money while your GPU is idle",
    value: "Up to $200/month",
  },
  {
    icon: Shield,
    title: "Secure Platform",
    description: "Smart contract-based payments",
    value: "100% Safe",
  },
  {
    icon: Cpu,
    title: "Auto Management",
    description: "Set and forget automation",
    value: "24/7 Monitoring",
  },
  {
    icon: Wallet,
    title: "Instant Payouts",
    description: "Receive payments immediately",
    value: "Real-time",
  },
];

export default function ProviderPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [gpuDetected, setGpuDetected] = useState(false);
  const [pricing, setPricing] = useState([2.5]);
  const [isAvailable, setIsAvailable] = useState(true);

  const mockGPUSpecs = {
    model: "RTX 4090",
    vram: 24,
    cores: 16384,
    memory: 128,
    driver: "536.23",
  };

  const handleDownloadAgent = () => {
    // TODO: Trigger actual download
    setTimeout(() => {
      setCurrentStep(2);
    }, 1000);
  };

  const handleConnectWallet = () => {
    // TODO: Implement actual wallet connection
    setIsWalletConnected(true);
    setCurrentStep(3);
  };

  const handleDetectGPU = () => {
    // TODO: Implement actual GPU detection
    setTimeout(() => {
      setGpuDetected(true);
      setCurrentStep(4);
    }, 2000);
  };

  const handleRegisterProvider = () => {
    // TODO: Submit provider registration
    alert("Provider registration submitted!");
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Become a <span className="text-gradient">GPU Provider</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Transform your idle GPU into a passive income stream. Join our decentralized 
            network and earn cryptocurrency while helping researchers and developers worldwide.
          </p>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-16"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="card-dark hover:gpu-glow transition-all duration-300 h-full group">
                  <CardContent className="p-6 text-center">
                    <Icon className="h-12 w-12 text-bnb-yellow mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-bnb-yellow transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-3">
                      {benefit.description}
                    </p>
                    <div className="text-bnb-yellow font-bold">
                      {benefit.value}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Setup Steps */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="card-dark">
              <CardHeader>
                <CardTitle className="text-2xl text-bnb-yellow">
                  Setup Your GPU Node
                </CardTitle>
                <p className="text-gray-300">
                  Follow these simple steps to start earning with your GPU
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = step.id === currentStep;
                  const isCompleted = step.id < currentStep;
                  
                  return (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className={`flex items-center space-x-4 p-4 rounded-lg border transition-all duration-300 ${
                        isActive
                          ? "border-bnb-yellow bg-bnb-yellow/5"
                          : isCompleted
                          ? "border-green-500 bg-green-500/5"
                          : "border-gray-600 bg-gray-800/20"
                      }`}
                    >
                      <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                        isCompleted
                          ? "bg-green-500"
                          : isActive
                          ? "bg-bnb-yellow"
                          : "bg-gray-600"
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="h-6 w-6 text-white" />
                        ) : (
                          <Icon className={`h-6 w-6 ${isActive ? "text-black" : "text-white"}`} />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className={`font-semibold ${
                          isActive ? "text-bnb-yellow" : isCompleted ? "text-green-400" : "text-white"
                        }`}>
                          {step.title}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {step.description}
                        </p>
                      </div>

                      {isActive && (
                        <Button
                          onClick={() => {
                            if (step.id === 1) handleDownloadAgent();
                            if (step.id === 2) handleConnectWallet();
                            if (step.id === 3) handleDetectGPU();
                            if (step.id === 4) handleRegisterProvider();
                          }}
                          className="bnb-gradient text-black font-semibold"
                        >
                          {step.id === 1 && "Download"}
                          {step.id === 2 && "Connect"}
                          {step.id === 3 && "Detect"}
                          {step.id === 4 && "Register"}
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      )}
                    </motion.div>
                  );
                })}

                {/* Download Link */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-black/50 p-4 rounded-lg border border-bnb-yellow/20"
                  >
                    <h4 className="text-bnb-yellow font-semibold mb-2">Available Downloads</h4>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start border-gray-600 text-white">
                        <Download className="h-4 w-4 mr-2" />
                        Lambda Agent for Windows (64-bit)
                      </Button>
                      <Button variant="outline" className="w-full justify-start border-gray-600 text-white">
                        <Download className="h-4 w-4 mr-2" />
                        Lambda Agent for Linux (x64)
                      </Button>
                      <Button variant="outline" className="w-full justify-start border-gray-600 text-white">
                        <Download className="h-4 w-4 mr-2" />
                        Docker Image (Recommended)
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Wallet Connection */}
                {currentStep === 2 && !isWalletConnected && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-black/50 p-4 rounded-lg border border-bnb-yellow/20"
                  >
                    <h4 className="text-bnb-yellow font-semibold mb-2">Connect Your Wallet</h4>
                    <p className="text-gray-400 text-sm mb-4">
                      Connect your BNB Chain wallet to receive payments
                    </p>
                    <Button onClick={handleConnectWallet} className="w-full bnb-gradient text-black">
                      <Wallet className="h-4 w-4 mr-2" />
                      Connect BNB Wallet
                    </Button>
                  </motion.div>
                )}

                {/* GPU Detection */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-black/50 p-4 rounded-lg border border-bnb-yellow/20"
                  >
                    <h4 className="text-bnb-yellow font-semibold mb-2">Detected GPU</h4>
                    {gpuDetected ? (
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Model:</span>
                          <span className="text-white">{mockGPUSpecs.model}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">VRAM:</span>
                          <span className="text-white">{mockGPUSpecs.vram}GB</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">CUDA Cores:</span>
                          <span className="text-white">{mockGPUSpecs.cores.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">System RAM:</span>
                          <span className="text-white">{mockGPUSpecs.memory}GB</span>
                        </div>
                      </div>
                    ) : (
                      <Button onClick={handleDetectGPU} className="w-full bnb-gradient text-black">
                        <Cpu className="h-4 w-4 mr-2" />
                        Detect GPU Specifications
                      </Button>
                    )}
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Configuration Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Pricing Configuration */}
            <Card className="card-dark">
              <CardHeader>
                <CardTitle className="text-xl text-bnb-yellow">
                  Pricing & Availability
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-white mb-2 block">Hourly Rate (USD)</Label>
                  <Slider
                    value={pricing}
                    onValueChange={setPricing}
                    max={10}
                    min={0.5}
                    step={0.1}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>$0.50</span>
                    <span className="text-bnb-yellow font-semibold">
                      ${pricing[0].toFixed(2)}/hour
                    </span>
                    <span>$10.00</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Available for Rent</Label>
                    <p className="text-gray-400 text-sm">
                      Allow others to rent your GPU
                    </p>
                  </div>
                  <Switch
                    checked={isAvailable}
                    onCheckedChange={setIsAvailable}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Earnings Projection */}
            <Card className="card-dark">
              <CardHeader>
                <CardTitle className="text-xl text-bnb-yellow">
                  Earnings Projection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg bg-black/50">
                    <div className="text-2xl font-bold text-bnb-yellow">
                      ${(pricing[0] * 24).toFixed(0)}
                    </div>
                    <div className="text-xs text-gray-400">Per Day</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-black/50">
                    <div className="text-2xl font-bold text-bnb-yellow">
                      ${(pricing[0] * 24 * 30).toFixed(0)}
                    </div>
                    <div className="text-xs text-gray-400">Per Month</div>
                  </div>
                </div>
                
                <div className="text-sm text-gray-400 space-y-1">
                  <p>• Based on 100% utilization</p>
                  <p>• Actual earnings depend on demand</p>
                  <p>• Lambda takes 5% platform fee</p>
                </div>
              </CardContent>
            </Card>

            {/* System Requirements */}
            <Card className="card-dark">
              <CardHeader>
                <CardTitle className="text-xl text-bnb-yellow">
                  System Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-gray-300">NVIDIA GPU with 8GB+ VRAM</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-gray-300">CUDA 11.0+ compatible</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-gray-300">Stable internet connection</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-gray-300">Docker installed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-gray-300">BNB Chain wallet</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
