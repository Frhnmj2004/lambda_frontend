"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, Cpu, Clock, DollarSign, Zap, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { JobSubmission } from "@/types";

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

  const { register, handleSubmit, formState: { errors }, setValue, watch } = form;

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

  const onSubmit = async (data: JobFormData) => {
    setIsSubmitting(true);
    
    try {
      const jobData: JobSubmission = {
        name: data.name,
        description: data.description,
        dockerImage: data.dockerImage,
        inputData: data.inputDataType !== "none" ? {
          type: data.inputDataType as any,
          source: data.inputDataSource || "",
        } : undefined,
        requirements: {
          minVRAM: data.minVRAM,
          maxDuration: data.maxDuration,
          gpuModel: data.gpuModel && data.gpuModel !== "any" ? data.gpuModel : undefined,
          region: data.region && data.region !== "any" ? data.region : undefined,
        },
        maxBudget: data.maxBudget,
      };

      // TODO: Submit job to API
      console.log("Submitting job:", jobData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirect to job details or dashboard
      alert("Job submitted successfully!");
      
    } catch (error) {
      console.error("Failed to submit job:", error);
      alert("Failed to submit job. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Rent <span className="text-gradient">GPU Power</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Submit your compute job and let our decentralized network handle the processing
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="card-dark">
                <CardHeader>
                  <CardTitle className="text-2xl text-bnb-yellow flex items-center">
                    <Zap className="h-6 w-6 mr-2" />
                    Job Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Basic Info */}
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name" className="text-white">Job Name *</Label>
                        <Input
                          id="name"
                          {...register("name")}
                          placeholder="My AI Training Job"
                          className="bg-black/50 border-bnb-yellow/30 text-white"
                        />
                        {errors.name && (
                          <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="description" className="text-white">Description</Label>
                        <Input
                          id="description"
                          {...register("description")}
                          placeholder="Optional description of your job"
                          className="bg-black/50 border-bnb-yellow/30 text-white"
                        />
                      </div>
                    </div>

                    {/* Docker Configuration */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-bnb-yellow">Container Configuration</h3>
                      
                      <div>
                        <Label htmlFor="dockerImage" className="text-white">Docker Image *</Label>
                        <Input
                          id="dockerImage"
                          {...register("dockerImage")}
                          placeholder="pytorch/pytorch:latest"
                          className="bg-black/50 border-bnb-yellow/30 text-white font-mono"
                        />
                        {errors.dockerImage && (
                          <p className="text-red-400 text-sm mt-1">{errors.dockerImage.message}</p>
                        )}
                        <p className="text-gray-400 text-sm mt-1">
                          Specify the Docker image to run your workload
                        </p>
                      </div>

                      <div>
                        <Label className="text-white">Input Data</Label>
                        <Select onValueChange={(value) => setValue("inputDataType", value as any)}>
                          <SelectTrigger className="bg-black/50 border-bnb-yellow/30 text-white">
                            <SelectValue placeholder="No input data" />
                          </SelectTrigger>
                          <SelectContent className="card-dark">
                            <SelectItem value="none">No input data</SelectItem>
                            <SelectItem value="ipfs">IPFS Hash</SelectItem>
                            <SelectItem value="url">HTTP URL</SelectItem>
                            <SelectItem value="inline">Inline data</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        {watch("inputDataType") !== "none" && (
                          <Input
                            {...register("inputDataSource")}
                            placeholder="Enter IPFS hash, URL, or data"
                            className="bg-black/50 border-bnb-yellow/30 text-white font-mono mt-2"
                          />
                        )}
                      </div>
                    </div>

                    {/* GPU Requirements */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-bnb-yellow">GPU Requirements</h3>
                      
                      <div>
                        <Label className="text-white">VRAM Requirement</Label>
                        <div className="mt-2 mb-4">
                          <Slider
                            value={vramRequirement}
                            onValueChange={handleVramChange}
                            max={80}
                            min={4}
                            step={4}
                            className="mb-2"
                          />
                          <div className="flex justify-between text-sm text-gray-400">
                            <span>4GB</span>
                            <span className="text-bnb-yellow font-semibold">
                              {vramRequirement[0]}GB Required
                            </span>
                            <span>80GB</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label className="text-white">Preferred GPU Model</Label>
                        <Select onValueChange={(value) => setValue("gpuModel", value)}>
                          <SelectTrigger className="bg-black/50 border-bnb-yellow/30 text-white">
                            <SelectValue placeholder="Any compatible GPU" />
                          </SelectTrigger>
                          <SelectContent className="card-dark">
                            <SelectItem value="any">Any compatible GPU</SelectItem>
                            <SelectItem value="RTX 4090">RTX 4090 (24GB)</SelectItem>
                            <SelectItem value="RTX 3090">RTX 3090 (24GB)</SelectItem>
                            <SelectItem value="A100">A100 (40GB/80GB)</SelectItem>
                            <SelectItem value="V100">V100 (16GB/32GB)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-white">Preferred Region</Label>
                        <Select onValueChange={(value) => setValue("region", value)}>
                          <SelectTrigger className="bg-black/50 border-bnb-yellow/30 text-white">
                            <SelectValue placeholder="Any region" />
                          </SelectTrigger>
                          <SelectContent className="card-dark">
                            <SelectItem value="any">Any region</SelectItem>
                            <SelectItem value="NA-East">North America East</SelectItem>
                            <SelectItem value="NA-West">North America West</SelectItem>
                            <SelectItem value="EU-Central">Europe Central</SelectItem>
                            <SelectItem value="APAC">Asia Pacific</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Duration and Budget */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-bnb-yellow">Duration & Budget</h3>
                      
                      <div>
                        <Label className="text-white">Maximum Duration (Hours)</Label>
                        <div className="mt-2 mb-4">
                          <Slider
                            value={duration}
                            onValueChange={handleDurationChange}
                            max={168}
                            min={1}
                            step={1}
                            className="mb-2"
                          />
                          <div className="flex justify-between text-sm text-gray-400">
                            <span>1 hour</span>
                            <span className="text-bnb-yellow font-semibold">
                              {duration[0]} hours max
                            </span>
                            <span>168 hours (1 week)</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label className="text-white">Maximum Budget (USD)</Label>
                        <div className="mt-2 mb-4">
                          <Slider
                            value={budget}
                            onValueChange={handleBudgetChange}
                            max={1000}
                            min={1}
                            step={1}
                            className="mb-2"
                          />
                          <div className="flex justify-between text-sm text-gray-400">
                            <span>$1</span>
                            <span className="text-bnb-yellow font-semibold">
                              ${budget[0]} max budget
                            </span>
                            <span>$1,000</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bnb-gradient text-black font-semibold text-lg py-6"
                    >
                      {isSubmitting ? (
                        "Submitting Job..."
                      ) : (
                        <>
                          <Zap className="h-5 w-5 mr-2" />
                          Submit Job
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Cost Estimation */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="card-dark">
                <CardHeader>
                  <CardTitle className="text-xl text-bnb-yellow flex items-center">
                    <DollarSign className="h-5 w-5 mr-2" />
                    Cost Estimate
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">VRAM Required:</span>
                    <span className="text-white">{vramRequirement[0]}GB</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Duration:</span>
                    <span className="text-white">{duration[0]} hours</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Est. Rate:</span>
                    <span className="text-white">
                      ${(estimatedCost / duration[0]).toFixed(2)}/hour
                    </span>
                  </div>
                  <hr className="border-bnb-yellow/20" />
                  <div className="flex justify-between items-center">
                    <span className="text-white font-semibold">Estimated Cost:</span>
                    <span className="text-bnb-yellow font-bold text-xl">
                      ${estimatedCost.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white font-semibold">Your Budget:</span>
                    <span className="text-bnb-yellow font-bold text-xl">
                      ${budget[0]}
                    </span>
                  </div>
                  
                  {estimatedCost > budget[0] && (
                    <div className="flex items-center space-x-2 text-red-400 text-sm bg-red-500/10 p-2 rounded">
                      <AlertCircle className="h-4 w-4" />
                      <span>Budget may be insufficient</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Job Requirements Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="card-dark">
                <CardHeader>
                  <CardTitle className="text-xl text-bnb-yellow flex items-center">
                    <Cpu className="h-5 w-5 mr-2" />
                    Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-bnb-yellow rounded-full" />
                    <span className="text-gray-300">
                      Minimum {vramRequirement[0]}GB VRAM
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-bnb-yellow rounded-full" />
                    <span className="text-gray-300">
                      Docker container support
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-bnb-yellow rounded-full" />
                    <span className="text-gray-300">
                      Maximum {duration[0]} hour runtime
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-bnb-yellow rounded-full" />
                    <span className="text-gray-300">
                      Automated job termination
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
