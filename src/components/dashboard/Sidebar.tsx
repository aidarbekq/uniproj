import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  GraduationCap, 
  User, 
  FileText, 
  Briefcase, 
  Users, 
  BarChart, 
  Settings,
  Building,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import clsx from 'clsx';

interface SidebarProps {
  role: 'graduate' | 'employer' | 'admin';
}

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const renderLinks = () => {
    switch (role) {
      case 'graduate':
        return (
          <>
            <Link 
              to="/graduate/profile" 
              className={clsx(
                "flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors",
                isActive('/graduate/profile') 
                  ? "bg-primary-100 text-primary-700" 
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <User className="h-5 w-5" />
              <span>{t('graduate.profile')}</span>
            </Link>
            <Link 
              to="/graduate/resume" 
              className={clsx(
                "flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors",
                isActive('/graduate/resume') 
                  ? "bg-primary-100 text-primary-700" 
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <FileText className="h-5 w-5" />
              <span>{t('graduate.resume')}</span>
            </Link>
          </>
        );
      
      case 'employer':
        return (
          <>
            <Link 
              to="/employer/dashboard" 
              className={clsx(
                "flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors",
                isActive('/employer/dashboard') 
                  ? "bg-primary-100 text-primary-700" 
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <BarChart className="h-5 w-5" />
              <span>{t('employer.dashboard')}</span>
            </Link>
            <Link 
              to="/employer/vacancies" 
              className={clsx(
                "flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors",
                isActive('/employer/vacancies') 
                  ? "bg-primary-100 text-primary-700" 
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <Briefcase className="h-5 w-5" />
              <span>{t('employer.vacancies')}</span>
            </Link>
          </>
        );
      
      case 'admin':
  return (
    <>
      <Link 
        to="/admin/dashboard" 
        className={clsx(
          "flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors",
          isActive('/admin/dashboard') 
            ? "bg-primary-100 text-primary-700" 
            : "text-gray-600 hover:bg-gray-100"
        )}
      >
        <BarChart className="h-5 w-5" />
        <span>{t('admin.dashboard')}</span>
      </Link>

      <Link 
        to="/admin/graduates" 
        className={clsx(
          "flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors",
          isActive('/admin/graduates') 
            ? "bg-primary-100 text-primary-700" 
            : "text-gray-600 hover:bg-gray-100"
        )}
      >
        <GraduationCap className="h-5 w-5" />
        <span>{t('admin.graduatesManagement')}</span>
      </Link>

      <Link 
        to="/admin/employers" 
        className={clsx(
          "flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors",
          isActive('/admin/employers') 
            ? "bg-primary-100 text-primary-700" 
            : "text-gray-600 hover:bg-gray-100"
        )}
      >
        <Building className="h-5 w-5" />
        <span>{t('admin.employersManagement')}</span>
      </Link>

      <Link 
        to="/admin/vacancies" 
        className={clsx(
          "flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors",
          isActive('/admin/vacancies') 
            ? "bg-primary-100 text-primary-700" 
            : "text-gray-600 hover:bg-gray-100"
        )}
      >
        <Briefcase className="h-5 w-5" />
        <span>{t('admin.vacanciesManagement')}</span>
      </Link>
    </>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
      <div className="p-4 border-b border-gray-200">
        <Link to="/" className="flex items-center space-x-2">
          <GraduationCap className="h-8 w-8 text-primary-600" />
          <span className="text-lg font-semibold text-primary-700">{t('app.name')}</span>
        </Link>
      </div>
      
      <nav className="mt-6 px-3 space-y-1">
        {renderLinks()}
      </nav>
      
      <div className="absolute bottom-0 w-full border-t border-gray-200 p-4">
        <button 
          onClick={logout}
          className="flex items-center space-x-2 px-4 py-2 w-full rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>{t('nav.logout')}</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;