"use client";

import { motion } from "framer-motion";
import { Cpu, MapPin, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GPUNode } from "@/types";
import { cn, formatPrice, formatGPUSpecs, getStatusColor } from "@/lib/utils";

interface GpuCardProps {
  node: GPUNode;
  onRent?: (nodeId: string) => void;
  className?: string;
  variant?: 'card' | 'list';
}

export function GpuCard({ node, onRent, className, variant = 'card' }: GpuCardProps) {
  const isAvailable = node.status === "online";
  
  if (variant === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ x: 5 }}
        transition={{ duration: 0.2 }}
        className={cn("w-full academy-list-item", className)}
      >
        <div className="flex items-center justify-between p-6 bg-white border border-gray-200 hover:bg-gray-50 transition-colors">
          <div className="flex items-center space-x-6">
            <div className="bg-academy-yellow p-3">
              <Cpu className="h-6 w-6 text-academy-black" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-academy-black uppercase tracking-tight">
                {node.name}
              </h3>
              <p className="text-gray-600">
                {formatGPUSpecs(node.specs.vram, node.specs.model)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-8">
            <div className="text-center">
              <div className="text-sm text-gray-600 uppercase tracking-wider">Location</div>
              <div className="font-semibold text-academy-black flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {node.location.region}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-sm text-gray-600 uppercase tracking-wider">Status</div>
              <div className={cn("font-semibold flex items-center", getStatusColor(node.status))}>
                <div className={cn(
                  "w-2 h-2 rounded-full mr-2",
                  node.status === "online" ? "bg-green-500" : 
                  node.status === "busy" ? "bg-yellow-500" : "bg-red-500"
                )} />
                {node.status}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-sm text-gray-600 uppercase tracking-wider">Rate</div>
              <div className="font-bold text-academy-black text-lg">
                {formatPrice(node.pricing.pricePerHour)}/hr
              </div>
            </div>
            
            <Button
              onClick={() => onRent?.(node.id)}
              disabled={!isAvailable}
              variant="default"
              className="px-6"
            >
              {isAvailable ? 'Rent Now' : 'Unavailable'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }
  
  // Card variant (for backward compatibility)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className={cn("w-full", className)}
    >
      <div className="academy-overlay-card white">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-academy-yellow p-3">
              <Cpu className="h-6 w-6 text-academy-black" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-academy-black uppercase tracking-tight">
                {node.name}
              </h3>
              <p className="text-gray-600">
                {formatGPUSpecs(node.specs.vram, node.specs.model)}
              </p>
            </div>
          </div>
          <div className={cn("px-3 py-1 border border-gray-300 text-xs font-semibold uppercase tracking-wider", getStatusColor(node.status))}>
            <div className="flex items-center space-x-2">
              <div className={cn(
                "w-2 h-2 rounded-full",
                node.status === "online" ? "bg-green-500" : 
                node.status === "busy" ? "bg-yellow-500" : "bg-red-500"
              )} />
              <span>{node.status}</span>
            </div>
          </div>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <div className="text-sm text-gray-600 uppercase tracking-wider mb-1">VRAM</div>
            <div className="font-semibold text-academy-black">{node.specs.vram}GB</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 uppercase tracking-wider mb-1">CUDA Cores</div>
            <div className="font-semibold text-academy-black">{node.specs.cores?.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 uppercase tracking-wider mb-1">Location</div>
            <div className="font-semibold text-academy-black flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {node.location.region}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600 uppercase tracking-wider mb-1">Uptime</div>
            <div className="font-semibold text-academy-black">{node.performance.uptime}%</div>
          </div>
        </div>

        {/* Rating */}
        {node.performance.rating && (
          <div className="flex items-center space-x-2 mb-6">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < Math.floor(node.performance.rating!) ? "text-academy-yellow fill-current" : "text-gray-300"
                  )}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {node.performance.rating.toFixed(1)} ({node.performance.completedJobs} jobs)
            </span>
          </div>
        )}

        {/* Pricing */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm text-gray-600 uppercase tracking-wider">Rate</div>
              <div className="text-2xl font-bold text-academy-black">
                {formatPrice(node.pricing.pricePerHour)}
                <span className="text-sm text-gray-600 font-normal">/hour</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Est. for 8hrs</div>
              <div className="font-semibold text-academy-black">
                {formatPrice(node.pricing.pricePerHour * 8)}
              </div>
            </div>
          </div>

          <Button
            onClick={() => onRent?.(node.id)}
            disabled={!isAvailable}
            variant="default"
            className="w-full"
          >
            {isAvailable ? 'Rent This GPU' : 'Currently Unavailable'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
