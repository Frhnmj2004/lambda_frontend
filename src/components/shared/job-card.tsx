"use client";

import { motion } from "framer-motion";
import { Clock, Play, Pause, CheckCircle, XCircle, AlertCircle, ExternalLink } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Job } from "@/types";
import { cn, formatPrice, formatDuration, getStatusColor } from "@/lib/utils";

interface JobCardProps {
  job: Job;
  onCancel?: (jobId: string) => void;
  onRetry?: (jobId: string) => void;
  onConfirm?: (jobId: string) => void;
  onViewDetails?: (jobId: string) => void;
  className?: string;
}

export function JobCard({ 
  job, 
  onCancel, 
  onRetry, 
  onConfirm, 
  onViewDetails, 
  className 
}: JobCardProps) {
  const getStatusIcon = (status: Job["status"]) => {
    switch (status) {
      case "running":
        return <Play className="h-4 w-4" />;
      case "pending":
      case "queued":
        return <Pause className="h-4 w-4" />;
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "failed":
        return <XCircle className="h-4 w-4" />;
      case "cancelled":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getProgressColor = (status: Job["status"]) => {
    switch (status) {
      case "running":
        return "bg-blue-500";
      case "completed":
        return "bg-green-500";
      case "failed":
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-bnb-yellow";
    }
  };

  const canCancel = ["pending", "queued"].includes(job.status);
  const canRetry = job.status === "failed";
  const canConfirm = job.status === "completed" && !job.smartContract;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("w-full", className)}
    >
      <Card className="card-dark hover:gpu-glow transition-all duration-200 group">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-lg text-white group-hover:text-bnb-yellow transition-colors">
                {job.name}
              </CardTitle>
              <p className="text-sm text-gray-400">ID: {job.id}</p>
            </div>
            <div className={cn(
              "flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium",
              getStatusColor(job.status)
            )}>
              {getStatusIcon(job.status)}
              <span className="capitalize">{job.status}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Progress Bar */}
          {job.progress && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">{job.progress.stage}</span>
                <span className="text-bnb-yellow">{job.progress.percentage}%</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className={cn("h-full rounded-full", getProgressColor(job.status))}
                  initial={{ width: 0 }}
                  animate={{ width: `${job.progress.percentage}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          )}

          {/* Job Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Docker Image:</span>
              <p className="text-white truncate font-mono text-xs mt-1">
                {job.dockerImage}
              </p>
            </div>
            <div>
              <span className="text-gray-400">GPU Required:</span>
              <p className="text-white mt-1">
                {job.requirements.minVRAM}GB VRAM
                {job.requirements.gpuModel && ` (${job.requirements.gpuModel})`}
              </p>
            </div>
          </div>

          {/* Assigned Node */}
          {job.assignedNode && (
            <div className="p-3 rounded-lg bg-black/50 border border-bnb-yellow/10">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-gray-400">Assigned Node:</span>
                  <p className="text-white font-medium">{job.assignedNode.name}</p>
                  <p className="text-xs text-gray-400">
                    {job.assignedNode.location.city}, {job.assignedNode.location.country}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-bnb-yellow font-bold">
                    {formatPrice(job.assignedNode.pricing.pricePerHour)}/hr
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Timing and Cost */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Duration:</span>
              <p className="text-white mt-1">
                {job.requirements.estimatedDuration 
                  ? formatDuration(job.requirements.estimatedDuration)
                  : `Max ${formatDuration(job.requirements.maxDuration)}`
                }
              </p>
            </div>
            <div>
              <span className="text-gray-400">Cost:</span>
              <p className="text-white mt-1">
                {job.pricing.actualCost 
                  ? formatPrice(job.pricing.actualCost)
                  : `Budget: ${formatPrice(job.pricing.maxBudget)}`
                }
              </p>
            </div>
          </div>

          {/* Timestamps */}
          <div className="text-xs text-gray-400 space-y-1">
            <p>Created: {new Date(job.timestamps.created).toLocaleString()}</p>
            {job.timestamps.started && (
              <p>Started: {new Date(job.timestamps.started).toLocaleString()}</p>
            )}
            {job.timestamps.completed && (
              <p>Completed: {new Date(job.timestamps.completed).toLocaleString()}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-bnb-yellow/10">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails?.(job.id)}
              className="flex-1 border-bnb-yellow/50 text-bnb-yellow hover:bg-bnb-yellow/10"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Details
            </Button>
            
            {canConfirm && (
              <Button
                size="sm"
                onClick={() => onConfirm?.(job.id)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Confirm
              </Button>
            )}

            {canRetry && (
              <Button
                size="sm"
                onClick={() => onRetry?.(job.id)}
                className="flex-1 bnb-gradient text-black"
              >
                <Play className="h-4 w-4 mr-2" />
                Retry
              </Button>
            )}

            {canCancel && (
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onCancel?.(job.id)}
                className="flex-1"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
