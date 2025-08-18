import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Edit, 
  Settings, 
  Shield, 
  Calendar,
  TrendingUp,
  Award,
  Heart
} from 'lucide-react';

const ProfilePage = () => {
  const userData = {
    name: 'Priya Sharma',
    joinDate: 'March 2024',
    streak: 7,
    totalSessions: 24,
    mood: 'Calm'
  };

  const emotionTrends = [
    { day: 'Mon', calm: 85, happy: 60, stressed: 20 },
    { day: 'Tue', calm: 75, happy: 80, stressed: 15 },
    { day: 'Wed', calm: 90, happy: 70, stressed: 10 },
    { day: 'Thu', calm: 80, happy: 85, stressed: 25 },
    { day: 'Fri', calm: 95, happy: 90, stressed: 5 },
    { day: 'Sat', calm: 88, happy: 95, stressed: 8 },
    { day: 'Sun', calm: 92, happy: 88, stressed: 12 }
  ];

  const achievements = [
    { title: '7 Day Streak', icon: '🔥', color: 'from-orange-400 to-red-500' },
    { title: 'Mindfulness Master', icon: '🧘', color: 'from-purple-400 to-pink-500' },
    { title: 'Progress Tracker', icon: '📈', color: 'from-green-400 to-blue-500' }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-6">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl mb-8"
        >
          <div className="text-center">
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                <User className="text-white" size={40} />
              </div>
              <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
                <Edit size={14} className="text-gray-600" />
              </button>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-800 mb-1">
              {userData.name}
            </h1>
            <p className="text-gray-600 mb-4">
              Your journey matters ✨
            </p>
            
            <div className="text-sm text-gray-500">
              Member since {userData.joinDate}
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg text-center"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🔥</span>
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">
              {userData.streak} Days
            </div>
            <div className="text-gray-600 text-sm">
              Current Streak
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg text-center"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Calendar className="text-white" size={20} />
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">
              {userData.totalSessions}
            </div>
            <div className="text-gray-600 text-sm">
              Total Sessions
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg text-center"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Heart className="text-white" size={20} />
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">
              {userData.mood}
            </div>
            <div className="text-gray-600 text-sm">
              Today's Mood
            </div>
          </motion.div>
        </div>

        {/* Emotion Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Weekly Emotional Trends
            </h2>
            <TrendingUp className="text-green-500" size={24} />
          </div>

          <div className="space-y-4">
            {emotionTrends.map((trend, index) => (
              <motion.div
                key={trend.day}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-center space-x-4"
              >
                <div className="w-12 text-sm text-gray-600 font-medium">
                  {trend.day}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 text-xs text-gray-500">Calm</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${trend.calm}%` }}
                        transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
                        className="h-full bg-green-400 rounded-full"
                      />
                    </div>
                    <div className="w-8 text-xs text-gray-600">{trend.calm}%</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 text-xs text-gray-500">Happy</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${trend.happy}%` }}
                        transition={{ duration: 0.8, delay: 1.0 + index * 0.1 }}
                        className="h-full bg-yellow-400 rounded-full"
                      />
                    </div>
                    <div className="w-8 text-xs text-gray-600">{trend.happy}%</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 text-xs text-gray-500">Stress</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${trend.stressed}%` }}
                        transition={{ duration: 0.8, delay: 1.2 + index * 0.1 }}
                        className="h-full bg-red-400 rounded-full"
                      />
                    </div>
                    <div className="w-8 text-xs text-gray-600">{trend.stressed}%</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl mb-8"
        >
          <div className="flex items-center mb-6">
            <Award className="text-yellow-500 mr-3" size={24} />
            <h2 className="text-xl font-semibold text-gray-800">
              Your Achievements
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className={`bg-gradient-to-r ${achievement.color} rounded-2xl p-4 text-white text-center`}
              >
                <div className="text-2xl mb-2">{achievement.icon}</div>
                <div className="font-semibold">{achievement.title}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid md:grid-cols-3 gap-4"
        >
          <button className="flex items-center justify-center space-x-2 py-3 px-6 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl hover:bg-white transition-all shadow-lg">
            <Edit size={18} />
            <span>Edit Profile</span>
          </button>
          <button className="flex items-center justify-center space-x-2 py-3 px-6 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl hover:bg-white transition-all shadow-lg">
            <Settings size={18} />
            <span>Settings</span>
          </button>
          <button className="flex items-center justify-center space-x-2 py-3 px-6 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl hover:bg-white transition-all shadow-lg">
            <Shield size={18} />
            <span>Privacy</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;