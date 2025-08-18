import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MicrophoneButton from './MicrophoneButton';
import { MessageSquare, Activity, Heart, Shield } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                Your Private Mental
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  {' '}Wellness Companion
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Speak freely, feel better – AI-powered, confidential, and stigma-free
              </p>
            </div>

            {/* Microphone Button */}
            <div className="flex justify-center lg:justify-start">
              <MicrophoneButton />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/screening">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-400 to-purple-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Start Screening
                </motion.button>
              </Link>
              
              <Link to="/resources">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-8 py-4 border-2 border-blue-400 text-blue-600 font-semibold rounded-2xl hover:bg-blue-50 transition-all duration-300"
                >
                  <MessageSquare size={20} className="inline mr-2" />
                  Chat with AI
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8 shadow-2xl">
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Peaceful meditation environment"
                className="w-full h-96 object-cover rounded-2xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-white rounded-full p-4 shadow-xl">
                <Heart className="text-pink-500" size={32} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white/60 backdrop-blur-sm py-16">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Why Choose MindCare?
            </h2>
            <p className="text-gray-600 text-lg">
              Designed specifically for young minds seeking support
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Complete Privacy',
                description: 'Your conversations are encrypted and never stored. Complete anonymity guaranteed.',
                color: 'from-green-400 to-teal-500'
              },
              {
                icon: Activity,
                title: 'Real-time Analysis',
                description: 'Advanced AI analyzes your emotional state and provides instant insights.',
                color: 'from-blue-400 to-purple-500'
              },
              {
                icon: Heart,
                title: 'Stigma-free Support',
                description: 'No judgment, just understanding. Get help without fear or shame.',
                color: 'from-pink-400 to-red-500'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                  <feature.icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;