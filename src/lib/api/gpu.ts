import { apiCall } from './client';
import { GPUNode, MarketplaceFilters, PaginatedResponse } from '@/types';

export const gpuAPI = {
  // Get all available GPU nodes
  getNodes: async (filters?: MarketplaceFilters): Promise<PaginatedResponse<GPUNode>> => {
    const response = await apiCall.get<PaginatedResponse<GPUNode>>('/gpus', filters);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || 'Failed to fetch GPU nodes');
  },

  // Get specific GPU node by ID
  getNode: async (id: string): Promise<GPUNode> => {
    const response = await apiCall.get<GPUNode>(`/gpus/${id}`);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || 'Failed to fetch GPU node');
  },

  // Get GPU availability for a specific time period
  getAvailability: async (nodeId: string, startTime: Date, endTime: Date) => {
    const response = await apiCall.get(`/gpus/${nodeId}/availability`, {
      start: startTime.toISOString(),
      end: endTime.toISOString(),
    });
    return response;
  },

  // Reserve a GPU node
  reserveNode: async (nodeId: string, duration: number, jobId?: string) => {
    const response = await apiCall.post(`/gpus/${nodeId}/reserve`, {
      duration,
      jobId,
    });
    return response;
  },
};
