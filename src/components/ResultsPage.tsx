import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, RefreshCw, Lightbulb, Smile } from 'lucide-react';

const ResultsPage = () => {
  const navigate = useNavigate();
  const location = useLocation() as any;
  const apiResult = location?.state?.result as {
    primary?: string;
    confidence?: number;
    emotions?: { label: string; score: number }[];
  } | undefined;

  // Map API result to UI structure with colors
  const palette = ['bg-green-400','bg-yellow-400','bg-blue-400','bg-red-400','bg-purple-400','bg-pink-400','bg-emerald-400'];
  const mappedEmotions = apiResult?.emotions?.map((e, i) => ({
    name: e.label,
    value: Math.round(e.score),
    color: palette[i % palette.length],
  })) ?? [
    { name: 'Sad', value: 15, color: 'bg-blue-400' },
    { name: 'Happy', value: 25, color: 'bg-yellow-400' },
    { name: 'Calm', value: 87, color: 'bg-green-400' },
    { name: 'Stressed', value: 20, color: 'bg-red-400' },
    { name: 'Anxious', value: 10, color: 'bg-purple-400' }
  ];
  const emotionData = {
    primary: apiResult?.primary ?? 'Calm',
    confidence: Math.round(apiResult?.confidence ?? 87),
    emotions: mappedEmotions,
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-8">
      <div className="max-w-lg w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <button
            onClick={() => navigate('/screening')}
            className="flex items-center text-gray-600 hover:text-blue-600 mb-6 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Screening
          </button>
          
          <div className="flex items-center justify-center mb-4">
            <Smile className="text-green-500 mr-3" size={32} />
            <h1 className="text-3xl font-bold text-gray-800">
              Your Emotional Analysis
            </h1>
          </div>
        </motion.div>

        {/* Main Result Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl mb-6"
          style={{
            boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          <div className="text-center mb-6">
            <div className="text-6xl font-bold text-green-600 mb-2">
              {emotionData.primary}
            </div>
            <div className="text-gray-600">
              Confidence: <span className="font-semibold">{emotionData.confidence}%</span>
            </div>
          </div>

          {/* Emotion Bar */}
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-700 text-center">
              Emotional Breakdown
            </h3>
            <div className="space-y-3">
              {emotionData.emotions.map((emotion, index) => (
                <motion.div
                  key={emotion.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <span className="w-16 text-sm text-gray-600 text-right">
                    {emotion.name}
                  </span>
                  <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${emotion.value}%` }}
                      transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                      className={`h-full ${emotion.color} rounded-full`}
                    />
                  </div>
                  <span className="w-10 text-sm text-gray-600 text-left">
                    {emotion.value}%
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* AI Message */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center"
          >
            <div className="flex items-center justify-center mb-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm">🤖</span>
              </div>
              <span className="text-green-700 font-medium">AI Insight</span>
            </div>
            <p className="text-green-800 leading-relaxed">
              {`Primary: ${emotionData.primary}. Confidence: ${emotionData.confidence}%.`}
            </p>
          </motion.div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex gap-4"
        >
          <button
            onClick={() => navigate('/screening')}
            className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center"
          >
            <RefreshCw size={18} className="mr-2" />
            Try Again
          </button>
          <button
            onClick={() => navigate('/resources')}
            className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-400 to-purple-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
          >
            <Lightbulb size={18} className="mr-2" />
            Get Tips
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultsPage;