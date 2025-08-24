import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Stethoscope, MessageCircle, BookOpen, User, Settings, Bot } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Screening', path: '/screening', icon: Stethoscope },
    { name: 'Resources', path: '/resources', icon: BookOpen },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="text-xl font-semibold text-gray-800">MindCare</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>

          <button className="p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200">
            <Settings size={20} />
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex justify-center mt-4 space-x-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <Icon size={18} />
                <span className="text-xs font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;