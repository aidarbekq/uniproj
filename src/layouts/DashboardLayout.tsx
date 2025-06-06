import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LanguageProvider } from '../contexts/LanguageContext';
import Sidebar from '../components/dashboard/Sidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';

interface DashboardLayoutProps {
  role: 'graduate' | 'employer' | 'admin';
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ role }) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  // Check if user is authenticated and has correct role
  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== role)) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate, role, user?.role]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar role={role} />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-6 overflow-auto">
            <div className="container mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </LanguageProvider>
  );
};

export default DashboardLayout;