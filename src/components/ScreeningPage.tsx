import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import MicrophoneButton from './MicrophoneButton';
import { ArrowLeft, Play, Square } from 'lucide-react';

const ScreeningPage = () => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
        setProgress(prev => prev + (100 / 15));
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRecording(false);
    }
    
    return () => clearInterval(interval);
  }, [isRecording, timeLeft]);

  const handleStartRecording = () => {
    setIsRecording(true);
    setProgress(0);
    setTimeLeft(15);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
  };

  const handleAnalyze = () => {
    navigate('/results');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-8">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-gray-600 hover:text-blue-600 mb-6 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </button>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Voice Analysis
          </h1>
          <p className="text-gray-600">
            Speak for 15 seconds to analyze your emotional state
          </p>
        </motion.div>

        {/* Recording Circle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative flex items-center justify-center mb-8"
        >
          <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Progress Ring */}
            <svg className="absolute w-64 h-64 transform -rotate-90" viewBox="0 0 256 256">
              <circle
                cx="128"
                cy="128"
                r="112"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="8"
              />
              <motion.circle
                cx="128"
                cy="128"
                r="112"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 112}
                initial={{ strokeDashoffset: 2 * Math.PI * 112 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 112 * (1 - progress / 100) }}
                transition={{ duration: 0.5 }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#60A5FA" />
                  <stop offset="100%" stopColor="#A855F7" />
                </linearGradient>
              </defs>
            </svg>

            {/* Voice Wave Animation */}
            {isRecording && (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full"
              />
            )}

            {/* Microphone Button */}
            <div className="relative z-10">
              <button
                onClick={isRecording ? handleStopRecording : handleStartRecording}
                className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105"
              >
                {isRecording ? (
                  <Square className="text-white" size={32} fill="currentColor" />
                ) : (
                  <Play className="text-white ml-1" size={32} fill="currentColor" />
                )}
              </button>
            </div>

            {/* Timer */}
            {isRecording && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute -bottom-8 text-2xl font-bold text-gray-700"
              >
                {timeLeft}s
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8"
        >
          {isRecording ? (
            <p className="text-blue-600 font-medium">
              🎤 Listening to your voice...
            </p>
          ) : progress > 0 ? (
            <p className="text-green-600 font-medium">
              ✓ Recording completed
            </p>
          ) : (
            <p className="text-gray-500">
              Tap the microphone to start
            </p>
          )}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex gap-4"
        >
          <button
            onClick={handleCancel}
            className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAnalyze}
            disabled={progress < 100}
            className={`flex-1 py-3 px-6 font-medium rounded-xl transition-all ${
              progress >= 100
                ? 'bg-gradient-to-r from-blue-400 to-purple-500 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Analyze
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ScreeningPage;