import { apiCall } from './client';
import { ProviderStats, GPUNode } from '@/types';

export const providerAPI = {
  // Register as a provider
  register: async (nodeSpecs: Partial<GPUNode>): Promise<GPUNode> => {
    const response = await apiCall.post<GPUNode>('/provider/register', nodeSpecs);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || 'Failed to register as provider');
  },

  // Get provider stats
  getStats: async (): Promise<ProviderStats> => {
    const response = await apiCall.get<ProviderStats>('/provider/stats');
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || 'Failed to fetch provider stats');
  },

  // Update node availability
  updateAvailability: async (nodeId: string, isAvailable: boolean) => {
    const response = await apiCall.put(`/provider/nodes/${nodeId}/availability`, {
      isAvailable,
    });
    return response;
  },

  // Update pricing
  updatePricing: async (nodeId: string, pricePerHour: number) => {
    const response = await apiCall.put(`/provider/nodes/${nodeId}/pricing`, {
      pricePerHour,
    });
    return response;
  },

  // Send heartbeat (node is still online)
  heartbeat: async (nodeId: string, systemStats?: Record<string, unknown>) => {
    const response = await apiCall.post(`/provider/heartbeat`, {
      nodeId,
      timestamp: new Date().toISOString(),
      systemStats,
    });
    return response;
  },

  // Withdraw earnings
  withdraw: async (amount: number, walletAddress: string) => {
    const response = await apiCall.post('/provider/withdraw', {
      amount,
      walletAddress,
    });
    return response;
  },

  // Get withdrawal history
  getWithdrawals: async () => {
    const response = await apiCall.get('/provider/withdrawals');
    return response;
  },

  // Get provider's nodes
  getNodes: async (): Promise<GPUNode[]> => {
    const response = await apiCall.get<GPUNode[]>('/provider/nodes');
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || 'Failed to fetch provider nodes');
  },
};
