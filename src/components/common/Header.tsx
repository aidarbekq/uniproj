import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { GraduationCap, Menu, X, User, LogOut, Globe } from 'lucide-react';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleLanguageMenu = () => {
    setLanguageMenuOpen(!languageMenuOpen);
  };

  const changeLanguage = (lang: 'en' | 'ru' | 'kg') => {
    setLanguage(lang);
    setLanguageMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-semibold text-primary-700">
              {t('app.name')}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 transition-colors">
              {t('nav.home')}
            </Link>
            
            {user ? (
              <>
                <Link 
                  to={`/${user.role}/dashboard`} 
                  className="text-gray-700 hover:text-primary-600 transition-colors"
                >
                  {t('nav.dashboard')}
                </Link>
                <div className="relative">
                  <button 
                    onClick={handleLogout}
                    className="flex items-center text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    <LogOut className="h-5 w-5 mr-1" />
                    {t('nav.logout')}
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-primary-600 transition-colors">
                  {t('nav.login')}
                </Link>
                <Link 
                  to="/register" 
                  className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
                >
                  {t('nav.register')}
                </Link>
              </>
            )}

            {/* Language Selector */}
            <div className="relative">
              <button 
                onClick={toggleLanguageMenu}
                className="flex items-center text-gray-700 hover:text-primary-600 transition-colors"
              >
                <Globe className="h-5 w-5 mr-1" />
                {language.toUpperCase()}
              </button>
              {languageMenuOpen && (
                <div className="absolute right-0 mt-2 w-24 bg-white rounded-md shadow-lg py-1 z-10">
                  <button 
                    onClick={() => changeLanguage('en')}
                    className={`block px-4 py-2 text-sm w-full text-left ${language === 'en' ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
                  >
                    English
                  </button>
                  <button 
                    onClick={() => changeLanguage('ru')}
                    className={`block px-4 py-2 text-sm w-full text-left ${language === 'ru' ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
                  >
                    Русский
                  </button>
                  <button 
                    onClick={() => changeLanguage('kg')}
                    className={`block px-4 py-2 text-sm w-full text-left ${language === 'kg' ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
                  >
                    Кыргызча
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile menu button */}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden text-gray-700"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 py-3 border-t">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-primary-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.home')}
              </Link>
              
              {user ? (
                <>
                  <Link 
                    to={`/${user.role}/dashboard`} 
                    className="text-gray-700 hover:text-primary-600 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('nav.dashboard')}
                  </Link>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    <LogOut className="h-5 w-5 mr-1" />
                    {t('nav.logout')}
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="text-gray-700 hover:text-primary-600 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('nav.login')}
                  </Link>
                  <Link 
                    to="/register" 
                    className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors inline-block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('nav.register')}
                  </Link>
                </>
              )}

              {/* Language options */}
              <div className="pt-2 border-t">
                <div className="flex space-x-4">
                  <button 
                    onClick={() => {
                      changeLanguage('en');
                      setMobileMenuOpen(false);
                    }}
                    className={`px-2 py-1 text-sm rounded ${language === 'en' ? 'bg-gray-200' : ''}`}
                  >
                    EN
                  </button>
                  <button 
                    onClick={() => {
                      changeLanguage('ru');
                      setMobileMenuOpen(false);
                    }}
                    className={`px-2 py-1 text-sm rounded ${language === 'ru' ? 'bg-gray-200' : ''}`}
                  >
                    RU
                  </button>
                  <button 
                    onClick={() => {
                      changeLanguage('kg');
                      setMobileMenuOpen(false);
                    }}
                    className={`px-2 py-1 text-sm rounded ${language === 'kg' ? 'bg-gray-200' : ''}`}
                  >
                    KG
                  </button>
                </div>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;