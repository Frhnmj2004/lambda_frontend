export interface GPUNode {
  id: string;
  name: string;
  specs: {
    model: string;
    vram: number;
    cores: number;
    memory: number;
    storage: number;
  };
  location: {
    country: string;
    city: string;
    region: string;
  };
  performance: {
    uptime: number;
    avgResponseTime: number;
    completedJobs: number;
    rating: number;
  };
  pricing: {
    pricePerHour: number;
    currency: string;
  };
  status: 'online' | 'offline' | 'busy' | 'maintenance';
  provider: {
    id: string;
    name: string;
    walletAddress: string;
    reputation: number;
  };
  availability: {
    maxDuration: number;
    minDuration: number;
    scheduledDowntime?: Date[];
  };
}

export interface Job {
  id: string;
  name: string;
  description?: string;
  status: 'pending' | 'queued' | 'running' | 'completed' | 'failed' | 'cancelled';
  dockerImage: string;
  inputData?: {
    type: 'ipfs' | 'url' | 'inline';
    source: string;
    size?: number;
  };
  outputData?: {
    type: 'ipfs' | 'url';
    source: string;
    size?: number;
  };
  requirements: {
    minVRAM: number;
    maxDuration: number;
    estimatedDuration?: number;
    gpuModel?: string;
    region?: string;
  };
  assignedNode?: GPUNode;
  pricing: {
    maxBudget: number;
    actualCost?: number;
    currency: string;
  };
  timestamps: {
    created: Date;
    started?: Date;
    completed?: Date;
    lastUpdate: Date;
  };
  progress?: {
    percentage: number;
    stage: string;
    logs?: string[];
  };
  user: {
    id: string;
    walletAddress: string;
  };
  smartContract?: {
    address: string;
    transactionHash: string;
  };
}

export interface User {
  id: string;
  walletAddress: string;
  profile: {
    username?: string;
    email?: string;
    avatar?: string;
  };
  stats: {
    totalJobs: number;
    completedJobs: number;
    totalSpent: number;
    averageRating?: number;
  };
  provider?: {
    isActive: boolean;
    totalEarnings: number;
    totalRuntime: number;
    nodes: GPUNode[];
    reputation: number;
  };
  wallet: {
    balance: number;
    currency: string;
  };
  preferences: {
    notifications: boolean;
    autoRenew: boolean;
    theme: 'light' | 'dark';
  };
}

export interface MarketplaceFilters {
  [key: string]: unknown;
  vramMin?: number;
  vramMax?: number;
  priceMin?: number;
  priceMax?: number;
  gpuModel?: string[];
  location?: string[];
  minUptime?: number;
  status?: GPUNode['status'][];
  sortBy?: 'price' | 'performance' | 'rating' | 'availability';
  sortOrder?: 'asc' | 'desc';
}

export interface JobSubmission {
  name: string;
  description?: string;
  dockerImage: string;
  inputData?: {
    type: 'ipfs' | 'url' | 'inline';
    source: string;
  };
  requirements: {
    minVRAM: number;
    maxDuration: number;
    gpuModel?: string;
    region?: string;
  };
  maxBudget: number;
}

export interface ProviderStats {
  totalEarnings: number;
  totalRuntime: number;
  jobsCompleted: number;
  currentJobs: number;
  uptime: number;
  rating: number;
  totalWithdrawn: number;
  pendingPayments: number;
}

export interface WalletConnection {
  isConnected: boolean;
  address?: string;
  chainId?: number;
  balance?: number;
  ensName?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}
