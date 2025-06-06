import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { GraduationCap, Mail, Lock, User, Briefcase } from 'lucide-react';
import { Card, CardContent } from '../components/common/Card';
import Button from '../components/common/Button';

type UserRole = 'graduate' | 'employer';

const RegisterPage: React.FC = () => {
  const { t } = useTranslation();
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('graduate');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await register(email, password, name, role);
      
      // Redirect based on user role
      if (role === 'employer') {
        navigate('/employer/dashboard');
      } else {
        navigate('/graduate/profile');
      }
    } catch (error) {
      setError('Failed to create an account.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen py-16 bg-gray-50 flex justify-center">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <div className="inline-flex justify-center items-center mb-4">
            <GraduationCap className="h-12 w-12 text-primary-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">{t('auth.register')}</h1>
          <p className="mt-2 text-gray-600">{t('Create your account')}</p>
        </div>
        
        <Card className="animate-slide-up">
          <CardContent>
            {error && (
              <div className="mb-4 p-3 bg-error-50 text-error-700 rounded-md border border-error-200">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('Full Name')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('auth.email')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('auth.password')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('auth.confirmPassword')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('auth.role')}
                </label>
                <div className="mt-1 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className={`flex items-center justify-center px-4 py-3 border ${
                      role === 'graduate'
                        ? 'bg-primary-50 border-primary-500 text-primary-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    } rounded-md focus:outline-none transition-colors`}
                    onClick={() => setRole('graduate')}
                  >
                    <GraduationCap className="h-5 w-5 mr-2" />
                    {t('auth.graduate')}
                  </button>
                  <button
                    type="button"
                    className={`flex items-center justify-center px-4 py-3 border ${
                      role === 'employer'
                        ? 'bg-primary-50 border-primary-500 text-primary-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    } rounded-md focus:outline-none transition-colors`}
                    onClick={() => setRole('employer')}
                  >
                    <Briefcase className="h-5 w-5 mr-2" />
                    {t('auth.employer')}
                  </button>
                </div>
              </div>
              
              <div>
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isLoading}
                  className="w-full py-2.5"
                >
                  {t('auth.register')}
                </Button>
              </div>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {t('auth.haveAccount')}{' '}
                <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                  {t('auth.login')}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;