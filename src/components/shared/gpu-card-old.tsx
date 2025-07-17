"use client";

import { motion } from "framer-motion";
import { Cpu, MapPin, Clock, Star, Zap } from "lucide-react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GPUNode } from "@/types";
import { cn, formatPrice, formatGPUSpecs, getStatusColor } from "@/lib/utils";

interface GpuCardProps {
  node: GPUNode;
  onRent?: (nodeId: string) => void;
  className?: string;
}

export function GpuCard({ node, onRent, className }: GpuCardProps) {
  const isAvailable = node.status === "online";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={cn("w-full", className)}
    >
      <Card className="card-dark gpu-glow hover:gpu-glow group">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Cpu className="h-8 w-8 text-bnb-yellow animate-gpu-spin" />
                <div className="absolute -inset-1 bg-bnb-yellow/20 blur rounded" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white group-hover:text-bnb-yellow transition-colors">
                  {node.name}
                </h3>
                <p className="text-sm text-gray-400">
                  {formatGPUSpecs(node.specs.vram, node.specs.model)}
                </p>
              </div>
            </div>
            <div className={cn("px-2 py-1 rounded-full text-xs font-medium", getStatusColor(node.status))}>
              <div className="flex items-center space-x-1">
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  node.status === "online" ? "bg-green-400" : 
                  node.status === "busy" ? "bg-bnb-yellow" : "bg-red-400"
                )} />
                <span className="capitalize">{node.status}</span>
              </div>
            </div>
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-3 rounded-lg bg-black/50 border border-bnb-yellow/10">
              <div className="text-2xl font-bold text-bnb-yellow">{node.specs.vram}GB</div>
              <div className="text-xs text-gray-400">VRAM</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-black/50 border border-bnb-yellow/10">
              <div className="text-2xl font-bold text-bnb-yellow">{node.specs.cores}</div>
              <div className="text-xs text-gray-400">Cores</div>
            </div>
          </div>

          {/* Location & Performance */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <MapPin className="h-4 w-4 text-bnb-yellow" />
              <span>{node.location.city}, {node.location.country}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <Clock className="h-4 w-4 text-bnb-yellow" />
              <span>{node.performance.uptime.toFixed(1)}% uptime</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <Star className="h-4 w-4 text-bnb-yellow" />
              <span>{node.performance.rating.toFixed(1)}/5.0 ({node.performance.completedJobs} jobs)</span>
            </div>
          </div>

          {/* Provider Info */}
          <div className="flex items-center justify-between text-sm text-gray-400 mb-4 pt-4 border-t border-bnb-yellow/10">
            <span>Provider: {node.provider.name}</span>
            <span>Rep: {node.provider.reputation}/100</span>
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0">
          <div className="flex items-center justify-between w-full">
            <div className="text-left">
              <div className="text-2xl font-bold text-bnb-yellow">
                {formatPrice(node.pricing.pricePerHour)}
              </div>
              <div className="text-sm text-gray-400">per hour</div>
            </div>
            
            <Button
              onClick={() => onRent?.(node.id)}
              disabled={!isAvailable}
              className={cn(
                "min-w-[100px] font-semibold transition-all duration-200",
                isAvailable
                  ? "bnb-gradient text-black hover:opacity-90 hover:scale-105"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
              )}
            >
              {isAvailable ? (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Rent Now
                </>
              ) : (
                "Unavailable"
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
