"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Zap, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const mockGPUs = [
  {
    id: "gpu-1",
    model: "NVIDIA RTX 4090",
    vram: "24GB GDDR6X",
    cores: "16,384 CUDA Cores",
    price: 0.85,
    location: "New York, USA",
    provider: "TechMiner",
    uptime: 99.8,
    available: true,
    performance: "Excellent"
  },
  {
    id: "gpu-2", 
    model: "NVIDIA RTX 3090",
    vram: "24GB GDDR6X",
    cores: "10,496 CUDA Cores", 
    price: 0.65,
    location: "Frankfurt, Germany",
    provider: "EuroCompute",
    uptime: 97.5,
    available: true,
    performance: "High"
  },
  {
    id: "gpu-3",
    model: "NVIDIA A100",
    vram: "80GB HBM2e",
    cores: "6,912 CUDA Cores",
    price: 2.50,
    location: "Singapore",
    provider: "AsiaTech",
    uptime: 99.9,
    available: true,
    performance: "Enterprise"
  },
  {
    id: "gpu-4",
    model: "NVIDIA RTX 4080",
    vram: "16GB GDDR6X", 
    cores: "9,728 CUDA Cores",
    price: 0.75,
    location: "London, UK",
    provider: "BritishGPU",
    uptime: 98.2,
    available: false,
    performance: "High"
  },
  {
    id: "gpu-5",
    model: "NVIDIA V100",
    vram: "32GB HBM2",
    cores: "5,120 CUDA Cores",
    price: 1.20,
    location: "Tokyo, Japan", 
    provider: "JapanCloud",
    uptime: 99.1,
    available: true,
    performance: "Professional"
  }
];

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 3]);
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedModel, setSelectedModel] = useState("all");

  const filteredGPUs = mockGPUs.filter(gpu => {
    const matchesSearch = gpu.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gpu.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = gpu.price >= priceRange[0] && gpu.price <= priceRange[1];
    const matchesRegion = selectedRegion === "all" || gpu.location.toLowerCase().includes(selectedRegion.toLowerCase());
    const matchesModel = selectedModel === "all" || gpu.model.toLowerCase().includes(selectedModel.toLowerCase());
    
    return matchesSearch && matchesPrice && matchesRegion && matchesModel;
  });

  return (
    <div className="min-h-screen bg-white pt-8">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h1 className="academy-section-heading mb-6">
            GPU MARKETPLACE
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Browse thousands of high-performance GPUs from providers worldwide. 
            Professional-grade hardware at competitive rates.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 bg-academy-gray-light p-8 border border-gray-200"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Search */}
            <div>
              <label className="academy-form-label block mb-3">Search</label>
              <Input
                placeholder="Search GPUs or providers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="academy-form-input"
              />
            </div>

            {/* GPU Model Filter */}
            <div>
              <label className="academy-form-label block mb-3">GPU Model</label>
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger className="academy-form-input">
                  <SelectValue placeholder="All Models" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Models</SelectItem>
                  <SelectItem value="rtx 4090">RTX 4090</SelectItem>
                  <SelectItem value="rtx 3090">RTX 3090</SelectItem>
                  <SelectItem value="a100">A100</SelectItem>
                  <SelectItem value="v100">V100</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Region Filter */}
            <div>
              <label className="academy-form-label block mb-3">Region</label>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="academy-form-input">
                  <SelectValue placeholder="All Regions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="usa">North America</SelectItem>
                  <SelectItem value="europe">Europe</SelectItem>
                  <SelectItem value="asia">Asia Pacific</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Price Range */}
            <div>
              <label className="academy-form-label block mb-3">
                Price Range: ${priceRange[0]} - ${priceRange[1]}/hour
              </label>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={3}
                min={0}
                step={0.1}
                className="mt-4"
              />
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mb-8"
        >
          <p className="text-lg text-gray-600">
            <span className="font-semibold text-academy-black">{filteredGPUs.length}</span> GPUs available
          </p>
        </motion.div>

        {/* GPU List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-0"
        >
          {filteredGPUs.map((gpu, index) => (
            <motion.div
              key={gpu.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`academy-list-item ${!gpu.available ? 'opacity-60' : ''}`}
            >
              <div className="flex-1 grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-8 items-center">
                {/* GPU Info */}
                <div className="md:col-span-2">
                  <h3 className="text-xl font-bold text-academy-black mb-1">
                    {gpu.model}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {gpu.vram} • {gpu.cores}
                  </p>
                </div>

                {/* Provider & Location */}
                <div>
                  <p className="font-semibold text-academy-black">{gpu.provider}</p>
                  <p className="text-gray-600 text-sm flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    {gpu.location}
                  </p>
                </div>

                {/* Performance & Uptime */}
                <div>
                  <p className="font-semibold text-academy-black">{gpu.performance}</p>
                  <p className="text-gray-600 text-sm flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {gpu.uptime}% uptime
                  </p>
                </div>

                {/* Price */}
                <div className="text-center">
                  <div className="text-2xl font-bold text-academy-black">
                    ${gpu.price}
                  </div>
                  <div className="text-sm text-gray-600">per hour</div>
                </div>

                {/* Action */}
                <div className="text-right">
                  {gpu.available ? (
                    <Button
                      asChild
                      className="bg-academy-yellow text-academy-black hover:bg-yellow-500 font-semibold px-6 py-2 rounded-none"
                    >
                      <a href={`/rent?gpu=${gpu.id}`} className="flex items-center gap-2">
                        Rent Now
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </Button>
                  ) : (
                    <Button
                      disabled
                      className="bg-gray-300 text-gray-500 font-semibold px-6 py-2 rounded-none cursor-not-allowed"
                    >
                      Unavailable
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredGPUs.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <Zap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-academy-black mb-2">No GPUs Found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters to see more results.
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setPriceRange([0, 3]);
                setSelectedRegion("all");
                setSelectedModel("all");
              }}
              variant="outline"
              className="border-academy-black text-academy-black hover:bg-academy-black hover:text-white rounded-none"
            >
              Clear Filters
            </Button>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center py-16 mt-16 border-t border-gray-200"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-academy-black mb-4 uppercase">
            Can&apos;t Find What You Need?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact our team to discuss custom GPU configurations and enterprise solutions.
          </p>
          <Button
            asChild
            className="bg-academy-red text-white hover:bg-red-600 font-semibold px-8 py-4 text-lg rounded-none"
          >
            <a href="mailto:hello@lambda.com" className="flex items-center gap-2">
              Contact Sales
              <ArrowRight className="w-5 h-5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
