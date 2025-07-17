"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { JobCard } from "@/components/shared/job-card";
import { GpuCard } from "@/components/shared/gpu-card";
import { 
  Activity,
  Cpu,
  DollarSign,
  TrendingUp,
  Zap,
  Server,
  Clock,
  Users,
  BarChart3,
  Wallet,
  Settings,
  Plus
} from "lucide-react";

const mockJobs = [
  {
    id: "job-1",
    name: "AI Model Training",
    description: "Training a neural network for image classification",
    status: "running" as const,
    dockerImage: "tensorflow/tensorflow:latest-gpu",
    requirements: {
      minVRAM: 16,
      maxDuration: 4,
      estimatedDuration: 3,
      gpuModel: "RTX 4090",
      region: "US-East"
    },
    pricing: {
      maxBudget: 50.0,
      actualCost: 12.50,
      currency: "USD"
    },
    timestamps: {
      created: new Date("2024-01-15T10:00:00Z"),
      started: new Date("2024-01-15T10:05:00Z"),
      lastUpdate: new Date("2024-01-15T12:35:00Z")
    },
    progress: {
      percentage: 65,
      stage: "Training epoch 65/100",
      logs: ["Starting training...", "Epoch 1 completed", "Epoch 65 completed"]
    },
    user: {
      id: "user-1",
      walletAddress: "0x1234567890123456789012345678901234567890"
    }
  },
  {
    id: "job-2",
    name: "3D Rendering",
    description: "Rendering architectural visualization",
    status: "completed" as const,
    dockerImage: "blender:latest",
    requirements: {
      minVRAM: 12,
      maxDuration: 2,
      estimatedDuration: 1.25,
      gpuModel: "RTX 3080",
      region: "EU-West"
    },
    pricing: {
      maxBudget: 20.0,
      actualCost: 8.75,
      currency: "USD"
    },
    timestamps: {
      created: new Date("2024-01-14T14:00:00Z"),
      started: new Date("2024-01-14T14:02:00Z"),
      completed: new Date("2024-01-14T15:17:00Z"),
      lastUpdate: new Date("2024-01-14T15:17:00Z")
    },
    progress: {
      percentage: 100,
      stage: "Completed",
      logs: ["Rendering started", "Frame 1000/1000 completed", "Render finished"]
    },
    user: {
      id: "user-1",
      walletAddress: "0x1234567890123456789012345678901234567890"
    }
  },
  {
    id: "job-3",
    name: "Video Processing",
    description: "Converting and optimizing video files",
    status: "pending" as const,
    dockerImage: "ffmpeg:latest",
    requirements: {
      minVRAM: 14,
      maxDuration: 3,
      estimatedDuration: 2,
      gpuModel: "RTX 4080",
      region: "US-West"
    },
    pricing: {
      maxBudget: 30.0,
      currency: "USD"
    },
    timestamps: {
      created: new Date("2024-01-15T16:00:00Z"),
      lastUpdate: new Date("2024-01-15T16:00:00Z")
    },
    user: {
      id: "user-1",
      walletAddress: "0x1234567890123456789012345678901234567890"
    }
  }
];

const mockGpuNodes = [
  {
    id: "gpu-1",
    name: "Gaming Beast",
    specs: {
      model: "RTX 4090",
      vram: 24,
      cores: 16384,
      memory: 32,
      storage: 1000
    },
    location: {
      country: "United States",
      city: "New York",
      region: "us-east-1"
    },
    performance: {
      uptime: 99.8,
      avgResponseTime: 120,
      completedJobs: 247,
      rating: 4.9
    },
    pricing: {
      pricePerHour: 0.85,
      currency: "USD"
    },
    status: "online" as const,
    provider: {
      id: "provider-1",
      name: "TechMiner",
      walletAddress: "0x1234567890123456789012345678901234567890",
      reputation: 4.9
    },
    availability: {
      maxDuration: 24,
      minDuration: 1
    }
  },
  {
    id: "gpu-2",
    name: "Render Farm Node",
    specs: {
      model: "RTX 3080",
      vram: 10,
      cores: 8704,
      memory: 16,
      storage: 500
    },
    location: {
      country: "Germany",
      city: "Frankfurt",
      region: "eu-west-1"
    },
    performance: {
      uptime: 97.5,
      avgResponseTime: 180,
      completedJobs: 189,
      rating: 4.7
    },
    pricing: {
      pricePerHour: 0.45,
      currency: "USD"
    },
    status: "online" as const,
    provider: {
      id: "provider-2",
      name: "EuroCompute",
      walletAddress: "0x0987654321098765432109876543210987654321",
      reputation: 4.7
    },
    availability: {
      maxDuration: 12,
      minDuration: 1
    }
  }
];

export default function DashboardPage() {
  const [userType, setUserType] = useState<'renter' | 'provider'>('renter');
  const [activeTab, setActiveTab] = useState<'overview' | 'jobs' | 'nodes' | 'earnings'>('overview');

  const stats = {
    renter: {
      activeJobs: 2,
      totalSpent: 245.80,
      completedJobs: 15,
      avgJobTime: "2h 15m"
    },
    provider: {
      activeNodes: 3,
      totalEarned: 1247.50,
      utilization: 87,
      avgHourlyRate: 0.65
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4 pt-24">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6"
        >
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gradient mb-2">
              Dashboard
            </h1>
            <p className="text-gray-400 text-lg">
              {userType === 'renter' ? 'Manage your compute jobs and track spending' : 'Monitor your GPU nodes and earnings'}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-3 bg-gray-900 p-2 rounded-lg border border-gray-700">
              <Label htmlFor="user-type" className="text-sm text-gray-300">Renter</Label>
              <Switch
                id="user-type"
                checked={userType === 'provider'}
                onCheckedChange={(checked) => setUserType(checked ? 'provider' : 'renter')}
                className="data-[state=checked]:bg-bnb-yellow"
              />
              <Label htmlFor="user-type" className="text-sm text-gray-300">Provider</Label>
            </div>
            <Button className="bnb-gradient text-black font-semibold hover:opacity-90">
              <Wallet className="w-4 h-4 mr-2" />
              Connect Wallet
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {userType === 'renter' ? (
            <>
              <Card className="card-dark border-gray-700 gpu-glow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Active Jobs</CardTitle>
                  <Activity className="h-4 w-4 text-bnb-yellow" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stats.renter.activeJobs}</div>
                  <p className="text-xs text-gray-400">2 running, 0 queued</p>
                </CardContent>
              </Card>

              <Card className="card-dark border-gray-700 gpu-glow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Total Spent</CardTitle>
                  <DollarSign className="h-4 w-4 text-bnb-yellow" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">${stats.renter.totalSpent}</div>
                  <p className="text-xs text-gray-400">+$12.50 today</p>
                </CardContent>
              </Card>

              <Card className="card-dark border-gray-700 gpu-glow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Completed Jobs</CardTitle>
                  <TrendingUp className="h-4 w-4 text-bnb-yellow" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stats.renter.completedJobs}</div>
                  <p className="text-xs text-gray-400">95% success rate</p>
                </CardContent>
              </Card>

              <Card className="card-dark border-gray-700 gpu-glow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Avg Job Time</CardTitle>
                  <Clock className="h-4 w-4 text-bnb-yellow" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stats.renter.avgJobTime}</div>
                  <p className="text-xs text-gray-400">-15% vs last month</p>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <Card className="card-dark border-gray-700 gpu-glow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Active Nodes</CardTitle>
                  <Server className="h-4 w-4 text-bnb-yellow" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stats.provider.activeNodes}</div>
                  <p className="text-xs text-gray-400">All nodes online</p>
                </CardContent>
              </Card>

              <Card className="card-dark border-gray-700 gpu-glow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Total Earned</CardTitle>
                  <DollarSign className="h-4 w-4 text-bnb-yellow" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">${stats.provider.totalEarned}</div>
                  <p className="text-xs text-gray-400">+$45.20 today</p>
                </CardContent>
              </Card>

              <Card className="card-dark border-gray-700 gpu-glow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Utilization</CardTitle>
                  <BarChart3 className="h-4 w-4 text-bnb-yellow" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stats.provider.utilization}%</div>
                  <p className="text-xs text-gray-400">Above target</p>
                </CardContent>
              </Card>

              <Card className="card-dark border-gray-700 gpu-glow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Hourly Rate</CardTitle>
                  <Zap className="h-4 w-4 text-bnb-yellow" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">${stats.provider.avgHourlyRate}</div>
                  <p className="text-xs text-gray-400">Competitive rate</p>
                </CardContent>
              </Card>
            </>
          )}
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-2 bg-gray-900 p-2 rounded-lg border border-gray-700"
        >
          {(userType === 'renter' ? 
            [
              { id: 'overview', label: 'Overview' },
              { id: 'jobs', label: 'My Jobs' }
            ] : 
            [
              { id: 'overview', label: 'Overview' },
              { id: 'nodes', label: 'My Nodes' },
              { id: 'earnings', label: 'Earnings' }
            ]
          ).map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              className={`${
                activeTab === tab.id 
                  ? 'bnb-gradient text-black' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
              onClick={() => setActiveTab(tab.id as any)}
            >
              {tab.label}
            </Button>
          ))}
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-8"
        >
          {userType === 'renter' ? (
            <>
              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card className="card-dark border-gray-700">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-gradient">Recent Jobs</CardTitle>
                        <Button variant="outline" size="sm" className="border-bnb-yellow text-bnb-yellow hover:bg-bnb-yellow hover:text-black">
                          <Plus className="w-4 h-4 mr-2" />
                          New Job
                        </Button>
                      </div>
                      <CardDescription>Your latest compute jobs</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {mockJobs.slice(0, 3).map((job, index) => (
                        <JobCard key={job.id} job={job} />
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="card-dark border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-gradient">Quick Stats</CardTitle>
                      <CardDescription>Performance overview</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Success Rate</span>
                          <span className="text-white font-semibold">95%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-bnb-yellow h-2 rounded-full" style={{ width: '95%' }}></div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Cost Efficiency</span>
                          <span className="text-white font-semibold">87%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-bnb-yellow h-2 rounded-full" style={{ width: '87%' }}></div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Average Speed</span>
                          <span className="text-white font-semibold">92%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-bnb-yellow h-2 rounded-full" style={{ width: '92%' }}></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === 'jobs' && (
                <Card className="card-dark border-gray-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-gradient">All Jobs</CardTitle>
                        <CardDescription>Manage and monitor your compute jobs</CardDescription>
                      </div>
                      <Button className="bnb-gradient text-black font-semibold hover:opacity-90">
                        <Plus className="w-4 h-4 mr-2" />
                        Submit New Job
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockJobs.map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))}
                  </CardContent>
                </Card>
              )}
            </>
          ) : (
            <>
              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card className="card-dark border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-gradient">Node Performance</CardTitle>
                      <CardDescription>Real-time monitoring</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Uptime</span>
                          <span className="text-white font-semibold">99.8%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '99.8%' }}></div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Utilization</span>
                          <span className="text-white font-semibold">87%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-bnb-yellow h-2 rounded-full" style={{ width: '87%' }}></div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Client Satisfaction</span>
                          <span className="text-white font-semibold">4.9/5</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-bnb-yellow h-2 rounded-full" style={{ width: '98%' }}></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="card-dark border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-gradient">Earnings Chart</CardTitle>
                      <CardDescription>Last 30 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-32 flex items-end justify-between space-x-2">
                        {Array.from({ length: 7 }).map((_, i) => (
                          <div
                            key={i}
                            className="bg-bnb-yellow rounded-t opacity-70 hover:opacity-100 transition-opacity"
                            style={{ 
                              height: `${Math.random() * 80 + 20}%`, 
                              width: '100%'
                            }}
                          />
                        ))}
                      </div>
                      <div className="flex justify-between text-xs text-gray-400 mt-2">
                        <span>Mon</span>
                        <span>Tue</span>
                        <span>Wed</span>
                        <span>Thu</span>
                        <span>Fri</span>
                        <span>Sat</span>
                        <span>Sun</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === 'nodes' && (
                <Card className="card-dark border-gray-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-gradient">My GPU Nodes</CardTitle>
                        <CardDescription>Manage your registered GPU nodes</CardDescription>
                      </div>
                      <Button className="bnb-gradient text-black font-semibold hover:opacity-90">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Node
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {mockGpuNodes.map((node) => (
                      <GpuCard key={node.id} node={node} />
                    ))}
                  </CardContent>
                </Card>
              )}

              {activeTab === 'earnings' && (
                <Card className="card-dark border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-gradient">Earnings Overview</CardTitle>
                    <CardDescription>Detailed breakdown of your earnings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                        <div className="text-sm text-gray-400 mb-1">Today</div>
                        <div className="text-xl font-bold text-white">$45.20</div>
                        <div className="text-xs text-green-400">+8.5%</div>
                      </div>
                      <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                        <div className="text-sm text-gray-400 mb-1">This Week</div>
                        <div className="text-xl font-bold text-white">$287.15</div>
                        <div className="text-xs text-green-400">+12.3%</div>
                      </div>
                      <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                        <div className="text-sm text-gray-400 mb-1">This Month</div>
                        <div className="text-xl font-bold text-white">$1,247.50</div>
                        <div className="text-xs text-green-400">+15.7%</div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white">Payment History</h3>
                      <div className="space-y-3">
                        {[
                          { date: '2024-01-15', amount: 45.20, status: 'Completed' },
                          { date: '2024-01-14', amount: 38.75, status: 'Completed' },
                          { date: '2024-01-13', amount: 52.30, status: 'Completed' },
                          { date: '2024-01-12', amount: 41.85, status: 'Pending' }
                        ].map((payment, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-900 rounded-lg border border-gray-700">
                            <div>
                              <div className="font-medium text-white">${payment.amount}</div>
                              <div className="text-sm text-gray-400">{payment.date}</div>
                            </div>
                            <div className={`px-2 py-1 rounded text-xs ${
                              payment.status === 'Completed' 
                                ? 'bg-green-900 text-green-300' 
                                : 'bg-yellow-900 text-yellow-300'
                            }`}>
                              {payment.status}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
