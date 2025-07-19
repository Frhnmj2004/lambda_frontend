"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";

const jobSchema = z.object({
  name: z.string().min(1, "Job name is required"),
  description: z.string().optional(),
  dockerImage: z.string().min(1, "Docker image is required"),
  inputDataType: z.enum(["none", "ipfs", "url", "inline"]),
  inputDataSource: z.string().optional(),
  minVRAM: z.number().min(4, "Minimum 4GB VRAM required"),
  maxDuration: z.number().min(1, "Duration must be at least 1 hour"),
  gpuModel: z.string().optional(),
  region: z.string().optional(),
  maxBudget: z.number().min(0.1, "Budget must be at least $0.10"),
});

type JobFormData = z.infer<typeof jobSchema>;

export default function RentPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [estimatedCost, setEstimatedCost] = useState(0);
  const [vramRequirement, setVramRequirement] = useState([16]);
  const [duration, setDuration] = useState([24]);
  const [budget, setBudget] = useState([50]);

  const form = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      name: "",
      description: "",
      dockerImage: "",
      inputDataType: "none",
      inputDataSource: "",
      minVRAM: 16,
      maxDuration: 24,
      gpuModel: "",
      region: "",
      maxBudget: 50,
    },
  });

  const { register, handleSubmit, formState: { errors }, setValue } = form;

  // Calculate estimated cost based on requirements
  const calculateEstimatedCost = () => {
    const vram = vramRequirement[0];
    const hours = duration[0];
    const baseRate = vram >= 40 ? 4.5 : vram >= 24 ? 2.5 : vram >= 16 ? 1.8 : 1.2;
    const cost = baseRate * hours;
    setEstimatedCost(cost);
  };

  // Update form values when sliders change
  const handleVramChange = (value: number[]) => {
    setVramRequirement(value);
    setValue("minVRAM", value[0]);
    calculateEstimatedCost();
  };

  const handleDurationChange = (value: number[]) => {
    setDuration(value);
    setValue("maxDuration", value[0]);
    calculateEstimatedCost();
  };

  const handleBudgetChange = (value: number[]) => {
    setBudget(value);
    setValue("maxBudget", value[0]);
  };

  const onSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert("Job submitted successfully!");
      
    } catch (error) {
      console.error("Failed to submit job:", error);
      alert("Failed to submit job. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-8">
      <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h1 className="academy-section-heading mb-6">
            SUBMIT COMPUTE JOB
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Configure your compute job requirements. We&apos;ll match you with the best available GPU 
            based on your specifications and budget.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
          {/* Job Details */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="academy-box bg-academy-gray-light p-8 border border-gray-200"
          >
            <h2 className="text-2xl font-bold text-academy-black mb-8 uppercase tracking-tight">
              Job Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <Label className="academy-form-label">Job Name *</Label>
                <Input
                  {...register("name")}
                  placeholder="e.g., AI Model Training"
                  className="academy-form-input"
                />
                {errors.name && (
                  <p className="text-academy-red text-sm mt-2 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <Label className="academy-form-label">Docker Image *</Label>
                <Input
                  {...register("dockerImage")}
                  placeholder="e.g., tensorflow/tensorflow:latest-gpu"
                  className="academy-form-input"
                />
                {errors.dockerImage && (
                  <p className="text-academy-red text-sm mt-2 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.dockerImage.message}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <Label className="academy-form-label">Description</Label>
                <Textarea
                  {...register("description")}
                  placeholder="Describe your compute job..."
                  className="academy-form-input min-h-[100px] resize-none"
                />
              </div>
            </div>
          </motion.section>

          {/* Input Data */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="academy-box bg-white p-8 border border-gray-200"
          >
            <h2 className="text-2xl font-bold text-academy-black mb-8 uppercase tracking-tight">
              Input Data
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <Label className="academy-form-label">Data Source</Label>
                <Select onValueChange={(value) => setValue("inputDataType", value as "none" | "ipfs" | "url" | "inline")}>
                  <SelectTrigger className="academy-form-input">
                    <SelectValue placeholder="No input data" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No input data</SelectItem>
                    <SelectItem value="ipfs">IPFS Hash</SelectItem>
                    <SelectItem value="url">HTTP URL</SelectItem>
                    <SelectItem value="inline">Inline data</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="academy-form-label">Source Location</Label>
                <Input
                  {...register("inputDataSource")}
                  placeholder="Enter URL, IPFS hash, or leave empty"
                  className="academy-form-input"
                />
              </div>
            </div>
          </motion.section>

          {/* Requirements */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-academy-yellow p-8 text-academy-black"
          >
            <h2 className="text-2xl font-bold mb-8 uppercase tracking-tight">
              Hardware Requirements
            </h2>

            <div className="space-y-8">
              {/* VRAM Requirement */}
              <div>
                <Label className="academy-form-label text-academy-black">
                  Minimum VRAM: {vramRequirement[0]}GB
                </Label>
                <Slider
                  value={vramRequirement}
                  onValueChange={handleVramChange}
                  max={80}
                  min={4}
                  step={4}
                  className="mt-4"
                />
                <div className="flex justify-between text-sm text-academy-black/70 mt-2">
                  <span>4GB</span>
                  <span>80GB</span>
                </div>
              </div>

              {/* Duration */}
              <div>
                <Label className="academy-form-label text-academy-black">
                  Maximum Duration: {duration[0]} hours
                </Label>
                <Slider
                  value={duration}
                  onValueChange={handleDurationChange}
                  max={72}
                  min={1}
                  step={1}
                  className="mt-4"
                />
                <div className="flex justify-between text-sm text-academy-black/70 mt-2">
                  <span>1 hour</span>
                  <span>72 hours</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <Label className="academy-form-label text-academy-black">Preferred GPU Model</Label>
                  <Select onValueChange={(value) => setValue("gpuModel", value)}>
                    <SelectTrigger className="academy-form-input bg-white">
                      <SelectValue placeholder="Any compatible GPU" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any compatible GPU</SelectItem>
                      <SelectItem value="RTX 4090">RTX 4090 (24GB)</SelectItem>
                      <SelectItem value="RTX 3090">RTX 3090 (24GB)</SelectItem>
                      <SelectItem value="A100">A100 (40GB/80GB)</SelectItem>
                      <SelectItem value="V100">V100 (16GB/32GB)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="academy-form-label text-academy-black">Preferred Region</Label>
                  <Select onValueChange={(value) => setValue("region", value)}>
                    <SelectTrigger className="academy-form-input bg-white">
                      <SelectValue placeholder="Any region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any region</SelectItem>
                      <SelectItem value="NA-East">North America East</SelectItem>
                      <SelectItem value="NA-West">North America West</SelectItem>
                      <SelectItem value="EU-Central">Europe Central</SelectItem>
                      <SelectItem value="APAC">Asia Pacific</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Budget */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="academy-box bg-white p-8 border border-gray-200"
          >
            <h2 className="text-2xl font-bold text-academy-black mb-8 uppercase tracking-tight">
              Budget & Pricing
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <Label className="academy-form-label">
                  Maximum Budget: ${budget[0]}
                </Label>
                <Slider
                  value={budget}
                  onValueChange={handleBudgetChange}
                  max={500}
                  min={5}
                  step={5}
                  className="mt-4"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>$5</span>
                  <span>$500</span>
                </div>
              </div>

              <div className="academy-stats-card academy-interactive bg-academy-gray-light">
                <h3 className="font-bold text-academy-black mb-2 uppercase text-sm tracking-wider">
                  Estimated Cost
                </h3>
                <div className="text-3xl font-bold text-academy-black">
                  ${estimatedCost.toFixed(2)}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Based on {vramRequirement[0]}GB VRAM for {duration[0]} hours
                </p>
              </div>
            </div>
          </motion.section>

          {/* Submit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center py-8"
          >
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="destructive"
              size="lg"
              className="px-12"
            >
              {isSubmitting ? (
                "Submitting Job..."
              ) : (
                <span className="flex items-center gap-2">
                  Submit Job
                  <ArrowRight className="w-5 h-5" />
                </span>
              )}
            </Button>
            
            <p className="text-sm text-gray-600 mt-4">
              Your job will be queued and matched with the best available GPU
            </p>
          </motion.div>
        </form>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center py-16 mt-16 border-t border-gray-200"
        >
          <h2 className="text-3xl font-bold text-academy-black mb-4 uppercase">
            Need Help?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Check our documentation for examples and best practices for Docker images and job configuration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              variant="outline"
            >
              <a href="/docs" className="flex items-center gap-2">
                View Documentation
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
            >
              <a href="/examples" className="flex items-center gap-2">
                See Examples
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
