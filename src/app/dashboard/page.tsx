"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
  Plus,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Play,
  Pause,
  Square
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'renter' | 'provider'>('overview');
  const [isProviding, setIsProviding] = useState(true);

  const stats = {
    totalEarnings: 2847.50,
    activeJobs: 3,
    totalJobs: 127,
    uptime: 99.2,
    gpuUtilization: 87,
    avgHourlyRate: 1.25
  };

  const recentJobs = [
    {
      id: "job-1",
      name: "AI Model Training",
      status: "running",
      runtime: "2h 34m",
      earnings: 12.50,
      gpu: "RTX 4090",
      client: "DeepMind Research"
    },
    {
      id: "job-2", 
      name: "Video Rendering",
      status: "completed",
      runtime: "45m",
      earnings: 8.75,
      gpu: "RTX 4080",
      client: "Creative Studio"
    },
    {
      id: "job-3",
      name: "Cryptocurrency Mining",
      status: "queued",
      runtime: "-",
      earnings: 0,
      gpu: "RTX 4070",
      client: "Crypto Corp"
    },
    {
      id: "job-4",
      name: "3D Model Processing",
      status: "completed",
      runtime: "1h 23m",
      earnings: 15.25,
      gpu: "RTX 4090",
      client: "Arch Viz Studio"
    }
  ];

  const providerNodes = [
    {
      id: "gpu-1",
      model: "RTX 4090",
      vram: "24GB",
      status: "active",
      utilization: 87,
      earnings: 45.30,
      uptime: "12d 5h"
    },
    {
      id: "gpu-2",
      model: "RTX 4080",
      vram: "16GB", 
      status: "idle",
      utilization: 0,
      earnings: 23.80,
      uptime: "8d 12h"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
      case 'active':
        return 'text-green-600';
      case 'completed':
        return 'text-blue-600';
      case 'queued':
      case 'idle':
        return 'text-gray-600';
      case 'failed':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
      case 'active':
        return <Play className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'queued':
      case 'idle':
        return <Pause className="w-4 h-4" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Square className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-white pt-8">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="academy-section-heading mb-4">
                DASHBOARD
              </h1>
              <p className="text-xl text-gray-600">
                Monitor your GPU rental activity and manage your compute resources
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Label htmlFor="provider-mode" className="text-sm font-medium text-academy-black">
                  PROVIDER MODE
                </Label>
                <Switch
                  id="provider-mode"
                  checked={isProviding}
                  onCheckedChange={setIsProviding}
                />
              </div>
              <Button className="bg-academy-yellow text-academy-black hover:bg-yellow-500 font-semibold rounded-none">
                <Plus className="w-4 h-4 mr-2" />
                New Job
              </Button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'renter', label: 'As Renter' },
              { id: 'provider', label: 'As Provider' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'overview' | 'renter' | 'provider')}
                className={`px-6 py-3 font-semibold text-sm uppercase tracking-wider border-b-2 transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'border-academy-yellow text-academy-black'
                    : 'border-transparent text-gray-600 hover:text-academy-black hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-academy-yellow p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <DollarSign className="w-8 h-8 text-academy-black" />
                  <span className="text-2xl font-bold text-academy-black">
                    ${stats.totalEarnings.toFixed(2)}
                  </span>
                </div>
                <h3 className="font-semibold text-academy-black uppercase text-sm tracking-wider">
                  Total Earnings
                </h3>
              </div>

              <div className="bg-white p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <Activity className="w-8 h-8 text-gray-600" />
                  <span className="text-2xl font-bold text-academy-black">
                    {stats.activeJobs}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-600 uppercase text-sm tracking-wider">
                  Active Jobs
                </h3>
              </div>

              <div className="bg-white p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <BarChart3 className="w-8 h-8 text-gray-600" />
                  <span className="text-2xl font-bold text-academy-black">
                    {stats.totalJobs}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-600 uppercase text-sm tracking-wider">
                  Total Jobs
                </h3>
              </div>

              <div className="bg-white p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <Server className="w-8 h-8 text-gray-600" />
                  <span className="text-2xl font-bold text-academy-black">
                    {stats.uptime}%
                  </span>
                </div>
                <h3 className="font-semibold text-gray-600 uppercase text-sm tracking-wider">
                  Uptime
                </h3>
              </div>

              <div className="bg-white p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <Cpu className="w-8 h-8 text-gray-600" />
                  <span className="text-2xl font-bold text-academy-black">
                    {stats.gpuUtilization}%
                  </span>
                </div>
                <h3 className="font-semibold text-gray-600 uppercase text-sm tracking-wider">
                  GPU Utilization
                </h3>
              </div>

              <div className="bg-white p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="w-8 h-8 text-gray-600" />
                  <span className="text-2xl font-bold text-academy-black">
                    ${stats.avgHourlyRate}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-600 uppercase text-sm tracking-wider">
                  Avg Hourly Rate
                </h3>
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h2 className="text-2xl font-bold text-academy-black mb-6 uppercase tracking-tight">
                Recent Activity
              </h2>
              <div className="bg-white border border-gray-200">
                <div className="grid grid-cols-6 gap-4 p-4 border-b border-gray-200 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  <div>Job Name</div>
                  <div>Status</div>
                  <div>Runtime</div>
                  <div>Earnings</div>
                  <div>GPU</div>
                  <div>Client</div>
                </div>
                {recentJobs.map((job) => (
                  <div
                    key={job.id}
                    className="grid grid-cols-6 gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors items-center academy-list-item"
                  >
                    <div className="font-medium text-academy-black">{job.name}</div>
                    <div className={`flex items-center gap-2 ${getStatusColor(job.status)}`}>
                      {getStatusIcon(job.status)}
                      <span className="capitalize font-medium">{job.status}</span>
                    </div>
                    <div className="text-gray-600">{job.runtime}</div>
                    <div className="font-semibold text-academy-black">
                      {job.earnings > 0 ? `$${job.earnings.toFixed(2)}` : '-'}
                    </div>
                    <div className="text-gray-600">{job.gpu}</div>
                    <div className="text-gray-600">{job.client}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Renter Tab */}
        {activeTab === 'renter' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-academy-black uppercase tracking-tight">
                Your Jobs
              </h2>
              <Button className="bg-academy-yellow text-academy-black hover:bg-yellow-500 font-semibold rounded-none">
                <Plus className="w-4 h-4 mr-2" />
                Submit New Job
              </Button>
            </div>

            <div className="bg-white border border-gray-200">
              <div className="grid grid-cols-7 gap-4 p-4 border-b border-gray-200 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                <div>Job Name</div>
                <div>Status</div>
                <div>Progress</div>
                <div>Runtime</div>
                <div>Cost</div>
                <div>GPU</div>
                <div>Actions</div>
              </div>
              {recentJobs.filter(job => ['running', 'queued', 'completed'].includes(job.status)).map((job) => (
                <div
                  key={job.id}
                  className="grid grid-cols-7 gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors items-center academy-list-item"
                >
                  <div className="font-medium text-academy-black">{job.name}</div>
                  <div className={`flex items-center gap-2 ${getStatusColor(job.status)}`}>
                    {getStatusIcon(job.status)}
                    <span className="capitalize font-medium">{job.status}</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2">
                    <div 
                      className="bg-academy-yellow h-2 transition-all duration-300" 
                      style={{ width: job.status === 'completed' ? '100%' : job.status === 'running' ? '65%' : '0%' }}
                    ></div>
                  </div>
                  <div className="text-gray-600">{job.runtime}</div>
                  <div className="font-semibold text-academy-black">
                    ${job.earnings.toFixed(2)}
                  </div>
                  <div className="text-gray-600">{job.gpu}</div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-academy-black text-academy-black hover:bg-academy-black hover:text-white rounded-none">
                      View
                    </Button>
                    {job.status === 'running' && (
                      <Button variant="outline" size="sm" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-none">
                        Stop
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Provider Tab */}
        {activeTab === 'provider' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-academy-black uppercase tracking-tight">
                Your GPU Nodes
              </h2>
              <Button className="bg-academy-yellow text-academy-black hover:bg-yellow-500 font-semibold rounded-none">
                <Plus className="w-4 h-4 mr-2" />
                Add GPU Node
              </Button>
            </div>

            <div className="bg-white border border-gray-200">
              <div className="grid grid-cols-6 gap-4 p-4 border-b border-gray-200 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                <div>GPU Model</div>
                <div>Status</div>
                <div>Utilization</div>
                <div>Earnings</div>
                <div>Uptime</div>
                <div>Actions</div>
              </div>
              {providerNodes.map((node) => (
                <div
                  key={node.id}
                  className="grid grid-cols-6 gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors items-center academy-list-item"
                >
                  <div className="font-medium text-academy-black">
                    {node.model}
                    <div className="text-sm text-gray-600">{node.vram}</div>
                  </div>
                  <div className={`flex items-center gap-2 ${getStatusColor(node.status)}`}>
                    {getStatusIcon(node.status)}
                    <span className="capitalize font-medium">{node.status}</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2">
                    <div 
                      className="bg-academy-yellow h-2 transition-all duration-300" 
                      style={{ width: `${node.utilization}%` }}
                    ></div>
                    <div className="text-sm text-gray-600 mt-1">{node.utilization}%</div>
                  </div>
                  <div className="font-semibold text-academy-black">
                    ${node.earnings.toFixed(2)}
                  </div>
                  <div className="text-gray-600">{node.uptime}</div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-academy-black text-academy-black hover:bg-academy-black hover:text-white rounded-none">
                      Configure
                    </Button>
                    <Button variant="outline" size="sm" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-none">
                      {node.status === 'active' ? 'Stop' : 'Start'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Provider Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-academy-yellow p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <Wallet className="w-8 h-8 text-academy-black" />
                  <span className="text-2xl font-bold text-academy-black">
                    $69.10
                  </span>
                </div>
                <h3 className="font-semibold text-academy-black uppercase text-sm tracking-wider">
                  Today&apos;s Earnings
                </h3>
              </div>

              <div className="bg-white p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <Clock className="w-8 h-8 text-gray-600" />
                  <span className="text-2xl font-bold text-academy-black">
                    87%
                  </span>
                </div>
                <h3 className="font-semibold text-gray-600 uppercase text-sm tracking-wider">
                  Avg Utilization
                </h3>
              </div>

              <div className="bg-white p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <Users className="w-8 h-8 text-gray-600" />
                  <span className="text-2xl font-bold text-academy-black">
                    24
                  </span>
                </div>
                <h3 className="font-semibold text-gray-600 uppercase text-sm tracking-wider">
                  Unique Clients
                </h3>
              </div>
            </div>
          </motion.div>
        )}

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="pt-16 border-t border-gray-200"
        >
          <h2 className="text-2xl font-bold text-academy-black mb-8 uppercase tracking-tight">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              asChild
              className="bg-academy-black text-white hover:bg-gray-800 font-semibold h-auto p-6 rounded-none flex-col"
            >
              <a href="/rent" className="flex flex-col items-center gap-2">
                <Plus className="w-8 h-8" />
                <span>Submit Job</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
            
            <Button
              asChild
              className="bg-academy-yellow text-academy-black hover:bg-yellow-500 font-semibold h-auto p-6 rounded-none flex-col"
            >
              <a href="/marketplace" className="flex flex-col items-center gap-2">
                <Server className="w-8 h-8" />
                <span>Browse GPUs</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
            
            <Button
              asChild
              variant="outline"
              className="border-academy-black text-academy-black hover:bg-academy-black hover:text-white font-semibold h-auto p-6 rounded-none flex-col"
            >
              <a href="/provider" className="flex flex-col items-center gap-2">
                <Zap className="w-8 h-8" />
                <span>Add GPU</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
            
            <Button
              asChild
              variant="outline"
              className="border-academy-black text-academy-black hover:bg-academy-black hover:text-white font-semibold h-auto p-6 rounded-none flex-col"
            >
              <a href="/settings" className="flex flex-col items-center gap-2">
                <Settings className="w-8 h-8" />
                <span>Settings</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
