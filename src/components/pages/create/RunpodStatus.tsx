'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  ServerIcon,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Zap,
  Clock,
} from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

import {
  useRunpodControllerIsEndpointRunning,
  useRunpodControllerWakeUpEndpoint,
  WorkersStatus,
  JobsStatus,
} from '@/api';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const RunpodStatus: React.FC = () => {
  const handleManualRefresh = async () => {
    try {
      await refetchStatus();
    } catch (error) {
      console.error('Error fetching server status:', error);
      toast.error('Failed to check AI server status');
    }
  };

  const wakeUpMutation = useRunpodControllerWakeUpEndpoint({
    mutation: {
      onSuccess: () => {
        toast.success('AI server wake-up signal sent successfully');
        setTimeout(() => handleManualRefresh(), 5000);
      },
      onError: () => {
        toast.error('Failed to wake up AI server');
      },
    },
  });

  const {
    data: statusData,
    isLoading: isStatusLoading,
    refetch: refetchStatus,
  } = useRunpodControllerIsEndpointRunning({
    query: {
      refetchInterval: 3000,
      enabled: !wakeUpMutation.isPending,
    },
  });

  const isRunning = statusData?.isRunning || false;

  const isBusy =
    isRunning && (getJobCount('inQueue') > 0 || getJobCount('inProgress') > 0);

  const isWakingUp = wakeUpMutation.isPending;
  const isLoading = isStatusLoading;

  const handleWakeUp = () => {
    if (!isRunning && !isWakingUp) {
      wakeUpMutation.mutate();
    }
  };

  function getWorkerCount(type: 'running' | 'idle'): number {
    if (!statusData || !statusData.workers) return 0;

    const workers = statusData.workers as unknown as WorkersStatus;
    return workers[type] || 0;
  }

  function getJobCount(
    type: 'inProgress' | 'inQueue' | 'completed' | 'failed' | 'retried'
  ): number {
    if (!statusData || !statusData.jobs) return 0;

    const jobs = statusData.jobs as unknown as JobsStatus;
    return jobs[type] || 0;
  }

  const getStatusInfo = () => {
    if (isLoading) {
      return {
        icon: (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
          >
            <RefreshCw size={14} className="text-white/60 mr-1" />
          </motion.div>
        ),
        text: 'Checking status...',
        color: 'text-white/60',
      };
    } else if (!isRunning) {
      return {
        icon: <AlertTriangle size={14} className="text-amber-500 mr-1" />,
        text: 'Offline',
        color: 'text-amber-500',
      };
    } else if (isBusy) {
      return {
        icon: <Clock size={14} className="text-blue-400 mr-1" />,
        text: 'Busy processing requests',
        color: 'text-blue-400',
      };
    } else {
      return {
        icon: <CheckCircle size={14} className="text-green-500 mr-1" />,
        text: 'Online and ready',
        color: 'text-green-500',
      };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto mb-4"
    >
      <div className="relative overflow-hidden rounded-xl border border-white/20 bg-black/40 backdrop-blur-sm p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ServerIcon className="h-5 w-5 text-white/80" />
            <div>
              <h3 className="text-sm font-medium text-white">
                AI Server Status
              </h3>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`status-${
                    isLoading
                      ? 'loading'
                      : isRunning
                      ? isBusy
                        ? 'busy'
                        : 'online'
                      : 'offline'
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center mt-1"
                >
                  {statusInfo.icon}
                  <span className={`text-xs ${statusInfo.color}`}>
                    {statusInfo.text}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleManualRefresh}
                    disabled={isLoading}
                    className="px-2 h-8 bg-black/30 border-white/20 text-white hover:bg-white/10 hover:text-[#F3CC3E]"
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 1,
                          ease: 'linear',
                        }}
                      >
                        <RefreshCw size={16} />
                      </motion.div>
                    ) : (
                      <RefreshCw size={16} />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Check server status</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Button
                      onClick={handleWakeUp}
                      disabled={isRunning || isWakingUp || isLoading}
                      className={`px-3 h-8 flex items-center gap-1 ${
                        isRunning || isWakingUp
                          ? 'bg-gray-700/50 text-white/50 cursor-not-allowed'
                          : 'bg-gradient-to-r from-[#F3CC3E] to-amber-500 text-black hover:opacity-90'
                      }`}
                    >
                      {isWakingUp ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            repeat: Infinity,
                            duration: 1,
                            ease: 'linear',
                          }}
                        >
                          <RefreshCw size={16} />
                        </motion.div>
                      ) : (
                        <Zap size={16} />
                      )}
                      <span className="text-xs font-medium">
                        {isWakingUp ? 'Waking up...' : 'Wake up server'}
                      </span>
                    </Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  {isRunning
                    ? 'Server is already running'
                    : 'Wake up the AI server to generate images'}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Server workers info */}
        {statusData && !isLoading && (
          <div className="mt-3 pt-3 border-t border-white/10">
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="text-left">
                <span className="text-white/60">Workers:</span>{' '}
                <span className="text-white/90">
                  {getWorkerCount('running')} running, {getWorkerCount('idle')}{' '}
                  idle
                </span>
              </div>
              <div className="text-right">
                <span className="text-white/60">Jobs:</span>{' '}
                <span className="text-white/90">
                  {getJobCount('inProgress')} in progress,{' '}
                  {getJobCount('inQueue')} in queue
                </span>
              </div>
            </div>

            {/* Additional message when server is busy */}
            {isBusy && (
              <div className="mt-2 py-1 px-2 bg-blue-500/10 border border-blue-500/20 rounded text-xs text-blue-400/90">
                <Clock size={12} className="inline-block mr-1" />
                <span>
                  The server is currently processing other requests. Your
                  generation might be slower than usual.
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default RunpodStatus;
