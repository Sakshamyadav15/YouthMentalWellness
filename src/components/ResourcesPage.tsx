import React from 'react';
import { motion } from 'framer-motion';
import { 
  Wind, 
  Heart, 
  Brain, 
  Phone, 
  BookOpen, 
  Users, 
  Music, 
  Sunrise,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

const ResourcesPage = () => {
  const resources = [
    {
      icon: Wind,
      title: 'Breathing Exercises',
      description: 'Simple techniques to reduce anxiety and promote calm',
      color: 'from-cyan-400 to-blue-500',
      category: 'Practice'
    },
    {
      icon: Heart,
      title: 'Mindfulness & Meditation',
      description: 'Guided sessions for better mental clarity',
      color: 'from-pink-400 to-rose-500',
      category: 'Practice'
    },
    {
      icon: Brain,
      title: 'Cognitive Strategies',
      description: 'Evidence-based coping mechanisms for daily stress',
      color: 'from-purple-400 to-indigo-500',
      category: 'Learn'
    },
    {
      icon: Phone,
      title: 'Crisis Helplines',
      description: '24/7 support when you need immediate help',
      color: 'from-red-400 to-pink-500',
      category: 'Support'
    },
    {
      icon: Users,
      title: 'Peer Support Groups',
      description: 'Connect with others who understand your journey',
      color: 'from-green-400 to-emerald-500',
      category: 'Community'
    },
    {
      icon: Music,
      title: 'Relaxation Sounds',
      description: 'Curated playlists for stress relief and focus',
      color: 'from-yellow-400 to-orange-500',
      category: 'Practice'
    }
  ];

  const articles = [
    {
      title: 'Understanding Anxiety in Young Adults',
      description: 'Learn about common triggers and effective management strategies',
      image: 'https://images.pexels.com/photos/3768126/pexels-photo-3768126.jpeg?auto=compress&cs=tinysrgb&w=400',
      readTime: '5 min read'
    },
    {
      title: 'Building Resilience Through Daily Habits',
      description: 'Simple practices that strengthen your mental health over time',
      image: 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400',
      readTime: '7 min read'
    },
    {
      title: 'When to Seek Professional Help',
      description: 'Recognizing signs and finding the right mental health support',
      image: 'https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=400',
      readTime: '6 min read'
    }
  ];

  const categories = ['All', 'Practice', 'Learn', 'Support', 'Community'];
  const [activeCategory, setActiveCategory] = React.useState('All');

  const filteredResources = activeCategory === 'All' 
    ? resources 
    : resources.filter(resource => resource.category === activeCategory);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Self-Help Resources & Tips
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore tools, techniques, and support designed to help you on your mental wellness journey
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-2 shadow-lg">
            <div className="flex space-x-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                    activeCategory === category
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'text-gray-600 hover:bg-white/80'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredResources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
              >
                <div className={`w-14 h-14 bg-gradient-to-r ${resource.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="text-white" size={24} />
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {resource.title}
                  </h3>
                  <ArrowRight className="text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" size={18} />
                </div>
                
                <p className="text-gray-600 mb-3">
                  {resource.description}
                </p>
                
                <span className={`inline-block px-3 py-1 bg-gradient-to-r ${resource.color} bg-opacity-10 text-xs font-medium rounded-full`}>
                  {resource.category}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Articles Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              Featured Articles
            </h2>
            <button className="flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors">
              View All
              <ExternalLink size={16} className="ml-1" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                    {article.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {article.readTime}
                    </span>
                    <ArrowRight className="text-blue-500" size={16} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Emergency Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-12 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl p-6 text-center"
        >
          <Phone className="text-red-500 mx-auto mb-3" size={32} />
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Need Immediate Help?
          </h3>
          <p className="text-red-700 mb-4">
            If you're having thoughts of self-harm or suicide, please reach out immediately.
          </p>
          <div className="space-y-2">
            <div className="font-semibold text-red-800">
              National Suicide Prevention Lifeline: <span className="font-mono">988</span>
            </div>
            <div className="text-red-700">
              KIRAN Mental Health Helpline: <span className="font-mono">1800-599-0019</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResourcesPage;