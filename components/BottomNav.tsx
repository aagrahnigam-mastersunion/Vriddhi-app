import React from 'react';
import { Tab } from '../types';

interface NavTab {
  id: Tab;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface BottomNavProps {
  tabs: NavTab[];
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 flex justify-around bg-white border-t border-gray-200 max-w-md mx-auto">
      {tabs.map(tab => {
        const IconComponent = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center py-3 px-4 flex-1 transition-colors ${
              isActive ? 'text-orange-500' : 'text-gray-600'
            }`}
          >
            <IconComponent className={`w-6 h-6 ${isActive ? 'text-orange-500' : 'text-gray-600'}`} />
            <span className="text-xs mt-1">{tab.name}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
