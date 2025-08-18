import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff } from 'lucide-react';

const MicrophoneButton = ({ size = 'large' }: { size?: 'small' | 'large' }) => {
  const [isRecording, setIsRecording] = useState(false);
  
  const buttonSize = size === 'large' ? 'w-20 h-20' : 'w-12 h-12';
  const iconSize = size === 'large' ? 32 : 20;

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Pulsing rings */}
      {isRecording && (
        <>
          <motion.div
            animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className={`absolute ${size === 'large' ? 'w-20 h-20' : 'w-12 h-12'} bg-blue-400 rounded-full`}
          />
          <motion.div
            animate={{ scale: [1, 2], opacity: [0.3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            className={`absolute ${size === 'large' ? 'w-20 h-20' : 'w-12 h-12'} bg-purple-400 rounded-full`}
          />
        </>
      )}
      
      {/* Main button */}
      <motion.button
        onClick={handleToggleRecording}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`${buttonSize} bg-gradient-to-r from-blue-400 to-purple-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center relative z-10`}
        style={{
          boxShadow: isRecording 
            ? '0 0 30px rgba(147, 197, 253, 0.6), 0 0 60px rgba(196, 181, 253, 0.4)' 
            : undefined
        }}
      >
        {isRecording ? (
          <MicOff className="text-white" size={iconSize} />
        ) : (
          <Mic className="text-white" size={iconSize} />
        )}
      </motion.button>

      {/* Recording indicator */}
      {isRecording && size === 'large' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-8 text-sm text-gray-600 font-medium"
        >
          Recording...
        </motion.div>
      )}
    </div>
  );
};

export default MicrophoneButton;