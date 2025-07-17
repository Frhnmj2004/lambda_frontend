"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, SlidersHorizontal, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { GpuCard } from "@/components/shared/gpu-card";
import { GPUNode, MarketplaceFilters } from "@/types";

// Mock data - replace with actual API calls
const mockGPUNodes: GPUNode[] = [
  {
    id: "1",
    name: "GPU-Beast-001",
    specs: {
      model: "RTX 4090",
      vram: 24,
      cores: 16384,
      memory: 128,
      storage: 1000,
    },
    location: {
      country: "USA",
      city: "New York",
      region: "NA-East",
    },
    performance: {
      uptime: 99.8,
      avgResponseTime: 45,
      completedJobs: 1247,
      rating: 4.9,
    },
    pricing: {
      pricePerHour: 2.45,
      currency: "USD",
    },
    status: "online",
    provider: {
      id: "prov1",
      name: "TechMiner",
      walletAddress: "0x1234567890123456789012345678901234567890",
      reputation: 98,
    },
    availability: {
      maxDuration: 720,
      minDuration: 1,
    },
  },
  {
    id: "2",
    name: "Crypto-Power-X",
    specs: {
      model: "RTX 3090",
      vram: 24,
      cores: 10496,
      memory: 64,
      storage: 500,
    },
    location: {
      country: "Germany",
      city: "Berlin",
      region: "EU-Central",
    },
    performance: {
      uptime: 97.5,
      avgResponseTime: 38,
      completedJobs: 892,
      rating: 4.7,
    },
    pricing: {
      pricePerHour: 1.89,
      currency: "USD",
    },
    status: "online",
    provider: {
      id: "prov2",
      name: "EuroCloud",
      walletAddress: "0x2345678901234567890123456789012345678901",
      reputation: 95,
    },
    availability: {
      maxDuration: 480,
      minDuration: 1,
    },
  },
  {
    id: "3",
    name: "AI-Forge-Pro",
    specs: {
      model: "A100",
      vram: 80,
      cores: 6912,
      memory: 256,
      storage: 2000,
    },
    location: {
      country: "Singapore",
      city: "Singapore",
      region: "APAC",
    },
    performance: {
      uptime: 99.9,
      avgResponseTime: 28,
      completedJobs: 2156,
      rating: 5.0,
    },
    pricing: {
      pricePerHour: 4.99,
      currency: "USD",
    },
    status: "online",
    provider: {
      id: "prov3",
      name: "SingaporeAI",
      walletAddress: "0x3456789012345678901234567890123456789012",
      reputation: 100,
    },
    availability: {
      maxDuration: 1440,
      minDuration: 2,
    },
  },
];

export default function MarketplacePage() {
  const [gpuNodes, setGpuNodes] = useState<GPUNode[]>(mockGPUNodes);
  const [filteredNodes, setFilteredNodes] = useState<GPUNode[]>(mockGPUNodes);
  const [filters, setFilters] = useState<MarketplaceFilters>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const [priceRange, setPriceRange] = useState([0, 10]);
  const [vramRange, setVramRange] = useState([8, 80]);

  useEffect(() => {
    applyFilters();
  }, [filters, searchQuery, gpuNodes]);

  const applyFilters = () => {
    let filtered = [...gpuNodes];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(node => 
        node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.specs.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.location.country.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Price filter
    if (filters.priceMin !== undefined || filters.priceMax !== undefined) {
      filtered = filtered.filter(node => 
        node.pricing.pricePerHour >= (filters.priceMin || 0) &&
        node.pricing.pricePerHour <= (filters.priceMax || Infinity)
      );
    }

    // VRAM filter
    if (filters.vramMin !== undefined || filters.vramMax !== undefined) {
      filtered = filtered.filter(node => 
        node.specs.vram >= (filters.vramMin || 0) &&
        node.specs.vram <= (filters.vramMax || Infinity)
      );
    }

    // GPU Model filter
    if (filters.gpuModel && filters.gpuModel.length > 0) {
      filtered = filtered.filter(node => 
        filters.gpuModel!.includes(node.specs.model)
      );
    }

    // Location filter
    if (filters.location && filters.location.length > 0) {
      filtered = filtered.filter(node => 
        filters.location!.includes(node.location.country)
      );
    }

    // Status filter
    if (filters.status && filters.status.length > 0) {
      filtered = filtered.filter(node => 
        filters.status!.includes(node.status)
      );
    }

    // Sorting
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        let aValue, bValue;
        
        switch (filters.sortBy) {
          case 'price':
            aValue = a.pricing.pricePerHour;
            bValue = b.pricing.pricePerHour;
            break;
          case 'performance':
            aValue = a.performance.rating;
            bValue = b.performance.rating;
            break;
          case 'availability':
            aValue = a.performance.uptime;
            bValue = b.performance.uptime;
            break;
          default:
            return 0;
        }

        if (filters.sortOrder === 'desc') {
          return bValue - aValue;
        }
        return aValue - bValue;
      });
    }

    setFilteredNodes(filtered);
  };

  const handleRentGPU = (nodeId: string) => {
    // TODO: Implement rent GPU functionality
    console.log("Renting GPU:", nodeId);
    // Redirect to rent page with pre-selected GPU
    window.location.href = `/rent?gpu=${nodeId}`;
  };

  const refreshData = async () => {
    setIsLoading(true);
    // TODO: Fetch fresh data from API
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const clearFilters = () => {
    setFilters({});
    setSearchQuery("");
    setPriceRange([0, 10]);
    setVramRange([8, 80]);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            GPU <span className="text-gradient">Marketplace</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Find the perfect GPU for your compute needs from our global network of providers
          </p>
        </motion.div>

        {/* Search and Filters Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="card-dark">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search GPUs, models, locations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-black/50 border-bnb-yellow/30 text-white placeholder-gray-400"
                  />
                </div>

                <div className="flex gap-2">
                  <Dialog open={showFilters} onOpenChange={setShowFilters}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="border-bnb-yellow/50 text-bnb-yellow">
                        <SlidersHorizontal className="h-4 w-4 mr-2" />
                        Filters
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="card-dark max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-bnb-yellow">Filter GPUs</DialogTitle>
                      </DialogHeader>
                      
                      <div className="space-y-6 py-4">
                        {/* Price Range */}
                        <div>
                          <Label className="text-white mb-2 block">Price per Hour</Label>
                          <Slider
                            value={priceRange}
                            onValueChange={(value) => {
                              setPriceRange(value);
                              setFilters(prev => ({
                                ...prev,
                                priceMin: value[0],
                                priceMax: value[1],
                              }));
                            }}
                            max={10}
                            min={0}
                            step={0.1}
                            className="mb-2"
                          />
                          <div className="flex justify-between text-sm text-gray-400">
                            <span>${priceRange[0]}</span>
                            <span>${priceRange[1]}</span>
                          </div>
                        </div>

                        {/* VRAM Range */}
                        <div>
                          <Label className="text-white mb-2 block">VRAM (GB)</Label>
                          <Slider
                            value={vramRange}
                            onValueChange={(value) => {
                              setVramRange(value);
                              setFilters(prev => ({
                                ...prev,
                                vramMin: value[0],
                                vramMax: value[1],
                              }));
                            }}
                            max={80}
                            min={8}
                            step={4}
                            className="mb-2"
                          />
                          <div className="flex justify-between text-sm text-gray-400">
                            <span>{vramRange[0]}GB</span>
                            <span>{vramRange[1]}GB</span>
                          </div>
                        </div>

                        {/* GPU Model */}
                        <div>
                          <Label className="text-white mb-2 block">GPU Model</Label>
                          <Select
                            onValueChange={(value) => 
                              setFilters(prev => ({
                                ...prev,
                                gpuModel: value ? [value] : undefined,
                              }))
                            }
                          >
                            <SelectTrigger className="bg-black/50 border-bnb-yellow/30 text-white">
                              <SelectValue placeholder="Any Model" />
                            </SelectTrigger>
                            <SelectContent className="card-dark">
                              <SelectItem value="RTX 4090">RTX 4090</SelectItem>
                              <SelectItem value="RTX 3090">RTX 3090</SelectItem>
                              <SelectItem value="A100">A100</SelectItem>
                              <SelectItem value="V100">V100</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Sort By */}
                        <div>
                          <Label className="text-white mb-2 block">Sort By</Label>
                          <Select
                            onValueChange={(value) => 
                              setFilters(prev => ({
                                ...prev,
                                sortBy: value as any,
                              }))
                            }
                          >
                            <SelectTrigger className="bg-black/50 border-bnb-yellow/30 text-white">
                              <SelectValue placeholder="Default" />
                            </SelectTrigger>
                            <SelectContent className="card-dark">
                              <SelectItem value="price">Price (Low to High)</SelectItem>
                              <SelectItem value="performance">Performance</SelectItem>
                              <SelectItem value="availability">Availability</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            onClick={clearFilters}
                            variant="outline"
                            className="flex-1 border-gray-600 text-gray-300"
                          >
                            Clear
                          </Button>
                          <Button
                            onClick={() => setShowFilters(false)}
                            className="flex-1 bnb-gradient text-black"
                          >
                            Apply
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button
                    onClick={refreshData}
                    disabled={isLoading}
                    variant="outline"
                    className="border-bnb-yellow/50 text-bnb-yellow"
                  >
                    <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-between items-center mb-6"
        >
          <div className="text-white">
            <span className="text-2xl font-bold text-bnb-yellow">{filteredNodes.length}</span>
            <span className="text-gray-300 ml-2">GPUs available</span>
          </div>
        </motion.div>

        {/* GPU Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {filteredNodes.map((node, index) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <GpuCard
                node={node}
                onRent={handleRentGPU}
                className="h-full"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredNodes.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">No GPUs Found</h3>
            <p className="text-gray-400 mb-4">
              Try adjusting your search criteria or filters
            </p>
            <Button onClick={clearFilters} className="bnb-gradient text-black">
              Clear All Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
