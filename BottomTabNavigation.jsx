import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BottomTabNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    {
      id: 'records',
      label: 'Καταχωρήσεις',
      icon: 'Plus',
      path: '/records'
    },
    {
      id: 'home',
      label: 'Αρχική',
      icon: 'Home',
      path: '/'
    },
    {
      id: 'profile',
      label: 'Προφίλ',
      icon: 'User',
      path: '/profile'
    }
  ];

  const isActive = (path) => {
    return location?.pathname === path;
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50" role="navigation">
      <div className="flex items-center justify-around h-16 max-w-screen-xl mx-auto px-4">
        {navigationItems?.map((item) => (
          <button
            key={item?.id}
            onClick={() => handleNavigation(item?.path)}
            className={`flex flex-col items-center justify-center gap-1 px-4 py-2 transition-colors ${
              isActive(item?.path) ? 'text-teal-500' : 'text-gray-500'
            }`}
          >
            <Icon 
              name={item?.icon} 
              size={24} 
              strokeWidth={2}
              color={isActive(item?.path) ? '#14b8a6' : '#6b7280'}
            />
            <span className="text-xs font-medium">{item?.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomTabNavigation;
