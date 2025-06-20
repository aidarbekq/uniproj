import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/config';

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import GraduateProfilePage from './pages/graduate/ProfilePage';
import GraduateResumePage from './pages/graduate/ResumePage';
import EmployerVacanciesPage from './pages/employer/VacanciesPage';
import EmployerPage from './pages/employer/EmployerPage';
import AdminDashboardPage from './pages/admin/DashboardPage';
import AdminGraduatesPage from './pages/admin/GraduatesPage';
import AdminEmployersPage from './pages/admin/EmployersPage';
import NotFoundPage from './pages/NotFoundPage';
import DashboardRedirect from "@/pages/DashboardRedirect";

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<DashboardRedirect />} />
          </Route>

          {/* Graduate routes */}
          <Route path="/graduate" element={<DashboardLayout role="graduate" />}>
            <Route path="profile" element={<GraduateProfilePage />} />
            <Route path="resume" element={<GraduateResumePage />} />
          </Route>

          {/* Employer routes */}
          <Route path="/employer" element={<DashboardLayout role="employer" />}>
            <Route path="dashboard" element={<EmployerPage />} />
            <Route path="vacancies" element={<EmployerVacanciesPage />} />
          </Route>

          {/* Admin routes */}
          <Route path="/admin" element={<DashboardLayout role="admin" />}>
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="graduates" element={<AdminGraduatesPage />} />
            <Route path="employers" element={<AdminEmployersPage />} />
          </Route>

          {/* Not found */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </I18nextProvider>
  );
}

export default App;
