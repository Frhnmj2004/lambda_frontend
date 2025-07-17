import { apiCall } from './client';
import { Job, JobSubmission, PaginatedResponse } from '@/types';

export const jobAPI = {
  // Submit a new job
  createJob: async (jobData: JobSubmission): Promise<Job> => {
    const response = await apiCall.post<Job>('/jobs', jobData);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || 'Failed to create job');
  },

  // Get job by ID
  getJob: async (id: string): Promise<Job> => {
    const response = await apiCall.get<Job>(`/jobs/${id}`);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || 'Failed to fetch job');
  },

  // Get user's jobs
  getUserJobs: async (page = 1, limit = 10): Promise<PaginatedResponse<Job>> => {
    const response = await apiCall.get<PaginatedResponse<Job>>('/user/jobs', {
      page,
      limit,
    });
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || 'Failed to fetch user jobs');
  },

  // Cancel a job
  cancelJob: async (id: string): Promise<Job> => {
    const response = await apiCall.post<Job>(`/jobs/${id}/cancel`);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || 'Failed to cancel job');
  },

  // Get job logs
  getJobLogs: async (id: string): Promise<string[]> => {
    const response = await apiCall.get<string[]>(`/jobs/${id}/logs`);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || 'Failed to fetch job logs');
  },

  // Confirm job completion (for payment release)
  confirmJob: async (id: string): Promise<Job> => {
    const response = await apiCall.post<Job>(`/jobs/${id}/confirm`);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || 'Failed to confirm job');
  },

  // Dispute a job
  disputeJob: async (id: string, reason: string): Promise<Job> => {
    const response = await apiCall.post<Job>(`/jobs/${id}/dispute`, { reason });
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || 'Failed to dispute job');
  },

  // Retry a failed job
  retryJob: async (id: string): Promise<Job> => {
    const response = await apiCall.post<Job>(`/jobs/${id}/retry`);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || 'Failed to retry job');
  },
};
