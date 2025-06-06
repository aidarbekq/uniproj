import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { GraduationCap, Mail, Lock } from 'lucide-react';
import { Card, CardContent } from '../components/common/Card';
import Button from '../components/common/Button';

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login(email, password);
      
      // Redirect based on user role
      if (email.includes('admin')) {
        navigate('/admin/dashboard');
      } else if (email.includes('employer')) {
        navigate('/employer/dashboard');
      } else {
        navigate('/graduate/profile');
      }
    } catch (error) {
      setError('Failed to log in. Please check your credentials.');
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
          <h1 className="text-3xl font-bold text-gray-900">{t('auth.login')}</h1>
          <p className="mt-2 text-gray-600">{t('Sign in to your account')}</p>
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
                <p className="mt-1 text-xs text-gray-500">
                  Try: admin@example.com, employer@example.com, or graduate@example.com
                </p>
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
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Use any password (this is a demo)
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    {t('Remember me')}
                  </label>
                </div>
                
                <div className="text-sm">
                  <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                    {t('auth.forgotPassword')}
                  </a>
                </div>
              </div>
              
              <div>
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isLoading}
                  className="w-full py-2.5"
                >
                  {t('auth.login')}
                </Button>
              </div>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {t('auth.noAccount')}{' '}
                <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
                  {t('auth.register')}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;