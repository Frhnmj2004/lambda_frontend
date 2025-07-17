import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins}m`;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(price);
}

export function formatGPUSpecs(vram: number, model: string): string {
  return `${model} (${vram}GB VRAM)`;
}

export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'online':
    case 'running':
    case 'completed':
      return 'text-green-400';
    case 'offline':
    case 'failed':
    case 'error':
      return 'text-red-400';
    case 'pending':
    case 'queued':
      return 'text-bnb-yellow';
    case 'starting':
    case 'stopping':
      return 'text-blue-400';
    default:
      return 'text-gray-400';
  }
}

export function calculateEarnings(hours: number, rate: number): number {
  return hours * rate;
}

export function truncateAddress(address: string, chars = 4): string {
  if (!address) return '';
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}
