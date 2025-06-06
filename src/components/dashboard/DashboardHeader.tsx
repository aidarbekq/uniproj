import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { Bell, User, Globe } from 'lucide-react';

const DashboardHeader: React.FC = () => {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const { user } = useAuth();
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const toggleLanguageMenu = () => {
    setLanguageMenuOpen(!languageMenuOpen);
    if (userMenuOpen) setUserMenuOpen(false);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
    if (languageMenuOpen) setLanguageMenuOpen(false);
  };

  const changeLanguage = (lang: 'en' | 'ru' | 'kg') => {
    setLanguage(lang);
    setLanguageMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="h-16 px-6 flex items-center justify-between">
        {/* Dashboard title */}
        <h1 className="text-xl font-semibold text-gray-800">
          {user?.role === 'admin' && t('admin.dashboard')}
          {user?.role === 'employer' && t('employer.dashboard')}
          {user?.role === 'graduate' && t('graduate.profile')}
        </h1>
        
        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100 transition-colors relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary-500"></span>
          </button>
          
          {/* Language selector */}
          <div className="relative">
            <button 
              onClick={toggleLanguageMenu}
              className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100 transition-colors flex items-center"
            >
              <Globe className="h-5 w-5" />
              <span className="ml-1 text-sm font-medium">{language.toUpperCase()}</span>
            </button>
            
            {languageMenuOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                <button 
                  onClick={() => changeLanguage('en')}
                  className={`block px-4 py-2 text-sm text-left w-full ${language === 'en' ? 'bg-gray-100 text-primary-600' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  English
                </button>
                <button 
                  onClick={() => changeLanguage('ru')}
                  className={`block px-4 py-2 text-sm text-left w-full ${language === 'ru' ? 'bg-gray-100 text-primary-600' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  Русский
                </button>
                <button 
                  onClick={() => changeLanguage('kg')}
                  className={`block px-4 py-2 text-sm text-left w-full ${language === 'kg' ? 'bg-gray-100 text-primary-600' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  Кыргызча
                </button>
              </div>
            )}
          </div>
          
          {/* User menu */}
          <div className="relative">
            <button 
              onClick={toggleUserMenu}
              className="flex items-center space-x-2"
            >
              <div className="h-8 w-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center">
                <User className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:inline-block">
                {user?.name}
              </span>
            </button>
            
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  {t('Profile Settings')}
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  {t('Notifications')}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;