"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Download, Zap, Shield, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProviderPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [gpuSpecs, setGpuSpecs] = useState({
    model: "",
    vram: "",
    cores: "",
    power: ""
  });
  const [pricing, setPricing] = useState({
    hourlyRate: 0.75,
    minimumDuration: 1
  });

  const steps = [
    {
      id: 1,
      title: "Download Agent",
      description: "Install Lambda agent on your system"
    },
    {
      id: 2,
      title: "Connect Wallet",
      description: "Link your crypto wallet for payments"
    },
    {
      id: 3,
      title: "Detect Hardware",
      description: "Auto-detect your GPU specifications"
    },
    {
      id: 4,
      title: "Set Pricing",
      description: "Configure your hourly rates"
    }
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: "Passive Income",
      description: "Earn money while your GPU is idle. Average providers make $50-200/month."
    },
    {
      icon: Shield,
      title: "Secure & Safe",
      description: "Sandboxed execution environment protects your system from malicious code."
    },
    {
      icon: Zap,
      title: "Instant Payments",
      description: "Get paid automatically in cryptocurrency after each completed job."
    }
  ];

  const estimatedEarnings = {
    daily: (pricing.hourlyRate * 8).toFixed(2),
    monthly: (pricing.hourlyRate * 8 * 30).toFixed(2),
    yearly: (pricing.hourlyRate * 8 * 365).toFixed(2)
  };

  return (
    <div className="min-h-screen bg-white pt-8">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="academy-section-heading mb-6">
            BECOME A GPU PROVIDER
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your idle GPU into a source of passive income. Join thousands of providers 
            earning cryptocurrency by sharing their compute power with creators and innovators worldwide.
          </p>
        </motion.div>

        {/* Benefits Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="bg-academy-yellow w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                    <Icon className="w-10 h-10 text-academy-black" />
                  </div>
                  <h3 className="text-xl font-bold text-academy-black mb-4 uppercase tracking-tight">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Setup Process */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-academy-black mb-12 text-center uppercase tracking-tight">
            Setup Process
          </h2>

          <div className="max-w-4xl mx-auto">
            {/* Step Navigation */}
            <div className="flex justify-between mb-12 relative">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2"></div>
              <div 
                className="absolute top-1/2 left-0 h-0.5 bg-academy-yellow -translate-y-1/2 transition-all duration-500"
                style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
              ></div>
              
              {steps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={`relative z-10 w-12 h-12 rounded-full border-4 flex items-center justify-center font-bold transition-all duration-300 ${
                    currentStep >= step.id
                      ? 'bg-academy-yellow border-academy-yellow text-academy-black'
                      : 'bg-white border-gray-300 text-gray-400'
                  }`}
                >
                  {currentStep > step.id ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    step.id
                  )}
                </button>
              ))}
            </div>

            {/* Step Content */}
            <div className="bg-academy-gray-light p-8 border border-gray-200 min-h-[400px]">
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="text-2xl font-bold text-academy-black mb-6 uppercase">
                    Download Lambda Agent
                  </h3>
                  <p className="text-gray-600 mb-8 text-lg">
                    The Lambda agent runs on your system and manages GPU job execution safely and securely.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <Button variant="black">
                      <Download className="w-5 h-5 mr-2" />
                      Windows
                    </Button>
                    <Button variant="black">
                      <Download className="w-5 h-5 mr-2" />
                      macOS
                    </Button>
                    <Button variant="black">
                      <Download className="w-5 h-5 mr-2" />
                      Linux
                    </Button>
                  </div>

                  <div className="bg-white p-6 border border-gray-200">
                    <h4 className="font-bold text-academy-black mb-2">System Requirements:</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• NVIDIA GPU with 8GB+ VRAM</li>
                      <li>• 16GB+ System RAM</li>
                      <li>• Stable internet connection</li>
                      <li>• Docker installed</li>
                    </ul>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="text-2xl font-bold text-academy-black mb-6 uppercase">
                    Connect Your Wallet
                  </h3>
                  <p className="text-gray-600 mb-8 text-lg">
                    Link your cryptocurrency wallet to receive payments automatically after each completed job.
                  </p>

                  <div className="space-y-6">
                    <Button variant="default" size="lg" className="w-full">
                      Connect MetaMask Wallet
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                    
                    <div className="text-center">
                      <span className="text-gray-500">or</span>
                    </div>
                    
                    <Button variant="outline" size="lg" className="w-full">
                      Connect WalletConnect
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>

                  <div className="mt-8 bg-yellow-50 p-4 border border-yellow-200">
                    <p className="text-sm text-gray-700">
                      <strong>Note:</strong> Your wallet will be used only for receiving payments. 
                      No funds will ever be withdrawn without your explicit approval.
                    </p>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="text-2xl font-bold text-academy-black mb-6 uppercase">
                    Detect GPU Hardware
                  </h3>
                  <p className="text-gray-600 mb-8 text-lg">
                    The agent will automatically detect your GPU specifications. Review and confirm the details.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="academy-form-label">GPU Model</Label>
                      <Input
                        value={gpuSpecs.model}
                        onChange={(e) => setGpuSpecs({...gpuSpecs, model: e.target.value})}
                        placeholder="e.g., RTX 4090"
                        className="academy-form-input"
                      />
                    </div>
                    <div>
                      <Label className="academy-form-label">VRAM</Label>
                      <Input
                        value={gpuSpecs.vram}
                        onChange={(e) => setGpuSpecs({...gpuSpecs, vram: e.target.value})}
                        placeholder="e.g., 24GB"
                        className="academy-form-input"
                      />
                    </div>
                    <div>
                      <Label className="academy-form-label">CUDA Cores</Label>
                      <Input
                        value={gpuSpecs.cores}
                        onChange={(e) => setGpuSpecs({...gpuSpecs, cores: e.target.value})}
                        placeholder="e.g., 16,384"
                        className="academy-form-input"
                      />
                    </div>
                    <div>
                      <Label className="academy-form-label">Power Consumption</Label>
                      <Input
                        value={gpuSpecs.power}
                        onChange={(e) => setGpuSpecs({...gpuSpecs, power: e.target.value})}
                        placeholder="e.g., 450W"
                        className="academy-form-input"
                      />
                    </div>
                  </div>

                  <Button variant="default" className="mt-6 px-8">
                    <Zap className="w-5 h-5 mr-2" />
                    Auto-Detect Hardware
                  </Button>
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="text-2xl font-bold text-academy-black mb-6 uppercase">
                    Set Your Pricing
                  </h3>
                  <p className="text-gray-600 mb-8 text-lg">
                    Configure your hourly rates and availability. You can adjust these anytime.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <Label className="academy-form-label">
                          Hourly Rate: ${pricing.hourlyRate}
                        </Label>
                        <input
                          type="range"
                          min="0.1"
                          max="5.0"
                          step="0.05"
                          value={pricing.hourlyRate}
                          onChange={(e) => setPricing({...pricing, hourlyRate: parseFloat(e.target.value)})}
                          className="w-full mt-4"
                        />
                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                          <span>$0.10</span>
                          <span>$5.00</span>
                        </div>
                      </div>

                      <div>
                        <Label className="academy-form-label">
                          Minimum Job Duration: {pricing.minimumDuration} hour(s)
                        </Label>
                        <input
                          type="range"
                          min="1"
                          max="24"
                          step="1"
                          value={pricing.minimumDuration}
                          onChange={(e) => setPricing({...pricing, minimumDuration: parseInt(e.target.value)})}
                          className="w-full mt-4"
                        />
                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                          <span>1 hour</span>
                          <span>24 hours</span>
                        </div>
                      </div>
                    </div>

                    <div className="academy-stats-card yellow academy-interactive">
                      <h4 className="font-bold text-academy-black mb-4 uppercase text-sm tracking-wider">
                        Estimated Earnings
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-academy-black">Daily (8h):</span>
                          <span className="font-bold text-academy-black">${estimatedEarnings.daily}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-academy-black">Monthly:</span>
                          <span className="font-bold text-academy-black">${estimatedEarnings.monthly}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-academy-black">Yearly:</span>
                          <span className="font-bold text-academy-black">${estimatedEarnings.yearly}</span>
                        </div>
                      </div>
                      <p className="text-sm text-academy-black/70 mt-4">
                        * Estimates based on 8 hours daily usage at current rate
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-300">
                <Button
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                  variant="outline"
                  className="disabled:opacity-50"
                >
                  Previous
                </Button>
                
                {currentStep < steps.length ? (
                  <Button
                    onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
                    variant="default"
                  >
                    Next Step
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button variant="destructive">
                    Start Providing
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </motion.section>

        {/* FAQ or Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center py-16 border-t border-gray-200"
        >
          <h2 className="text-3xl font-bold text-academy-black mb-4 uppercase">
            Questions?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our community of providers or reach out to our support team for assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              variant="black"
              className="px-8"
            >
              <a href="/discord" className="flex items-center gap-2">
                Join Discord
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
            >
              <a href="/support" className="flex items-center gap-2">
                Contact Support
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
