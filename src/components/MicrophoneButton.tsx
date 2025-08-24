import React, { useState, useRef } from 'react';
import { BACKEND_URL } from '../config';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mic, MicOff } from 'lucide-react';

const MicrophoneButton = ({ size = 'large' }: { size?: 'small' | 'large' }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const navigate = useNavigate();
  const streamRef = useRef<MediaStream | null>(null);
  
  const buttonSize = size === 'large' ? 'w-20 h-20' : 'w-12 h-12';
  const iconSize = size === 'large' ? 32 : 20;

  const handleToggleRecording = async () => {
    if (!isRecording) {
      // Start recording
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
        const localChunks: Blob[] = [];
        recorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) localChunks.push(e.data);
        };
        recorder.onstop = async () => {
          const audioBlob = new Blob(localChunks, { type: 'audio/webm' });
          const endpoint = `${BACKEND_URL}/predict`;
          const formData = new FormData();
          formData.append('file', audioBlob, 'voice.webm');
          setIsUploading(true);
          setErrorMsg(null);
          try {
            const response = await fetch(endpoint, {
              method: 'POST',
              body: formData,
            });
            if (!response.ok) {
              throw new Error(`Server error: ${response.status}`);
            }
            const result = await response.json();
            setIsUploading(false);
            navigate('/results', { state: { result } });
          } catch (err: any) {
            setIsUploading(false);
            setErrorMsg('Error sending audio to backend. Please try again.');
          }
        };
        recorder.start();
        setIsRecording(true);
      } catch (err) {
        alert('Microphone access denied or not available.');
      }
    } else {
      // Stop recording
      if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      setIsRecording(false);
    }
  } 

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
      {/* Recording/Uploading indicator */}
      {(isRecording || isUploading) && size === 'large' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-8 text-sm text-gray-600 font-medium"
        >
          {isUploading ? 'Uploading...' : 'Recording...'}
        </motion.div>
      )}

      {/* Error toast */}
      {errorMsg && (
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 bg-red-100 text-red-700 px-4 py-2 rounded shadow text-sm">
          {errorMsg}
        </div>
      )}
    </div>
  );
};

export default MicrophoneButton;