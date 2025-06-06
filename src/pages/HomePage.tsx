import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { BarChart3, Users, Building, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '../components/common/Card';
import Button from '../components/common/Button';

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-700 to-primary-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              {t('home.heroTitle')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100">
              {t('home.heroSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  {t('nav.register')}
                </Button>
              </Link>
              <Link to="/login">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary-800"
                >
                  {t('nav.login')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-800">
            {t('home.statsTitle')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Employment Rate */}
            <Card className="transform transition-transform hover:-translate-y-2">
              <CardContent className="text-center p-8">
                <div className="flex justify-center mb-4">
                  <div className="rounded-full bg-primary-100 p-4">
                    <BarChart3 className="h-8 w-8 text-primary-600" />
                  </div>
                </div>
                <h3 className="text-4xl font-bold text-primary-600 mb-2">86%</h3>
                <p className="text-gray-600">{t('home.employmentRate')}</p>
              </CardContent>
            </Card>
            
            {/* Total Graduates */}
            <Card className="transform transition-transform hover:-translate-y-2">
              <CardContent className="text-center p-8">
                <div className="flex justify-center mb-4">
                  <div className="rounded-full bg-secondary-100 p-4">
                    <Users className="h-8 w-8 text-secondary-600" />
                  </div>
                </div>
                <h3 className="text-4xl font-bold text-secondary-600 mb-2">1,240+</h3>
                <p className="text-gray-600">{t('home.totalGraduates')}</p>
              </CardContent>
            </Card>
            
            {/* Partner Companies */}
            <Card className="transform transition-transform hover:-translate-y-2">
              <CardContent className="text-center p-8">
                <div className="flex justify-center mb-4">
                  <div className="rounded-full bg-accent-100 p-4">
                    <Building className="h-8 w-8 text-accent-600" />
                  </div>
                </div>
                <h3 className="text-4xl font-bold text-accent-600 mb-2">75+</h3>
                <p className="text-gray-600">{t('home.partnerCompanies')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-800">
            {t('Features')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="h-full">
              <CardContent>
                <div className="rounded-full bg-primary-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('Graduate Profiles')}</h3>
                <p className="text-gray-600 mb-4">
                  {t('Create your profile, add your work experience, or upload your resume to find better opportunities.')}
                </p>
              </CardContent>
            </Card>
            
            {/* Feature 2 */}
            <Card className="h-full">
              <CardContent>
                <div className="rounded-full bg-secondary-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Building className="h-6 w-6 text-secondary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('Job Listings')}</h3>
                <p className="text-gray-600 mb-4">
                  {t('Employers can post job vacancies and find suitable candidates from our pool of qualified graduates.')}
                </p>
              </CardContent>
            </Card>
            
            {/* Feature 3 */}
            <Card className="h-full">
              <CardContent>
                <div className="rounded-full bg-accent-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-accent-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('Employment Analytics')}</h3>
                <p className="text-gray-600 mb-4">
                  {t('Access detailed analytics about graduate employment rates, popular industries, and salary trends.')}
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/register">
              <Button rightIcon={<ArrowRight className="h-4 w-4" />}>
                {t('Get Started')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials/Partners Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-800">
            {t('Our Partners')}
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-70">
            {/* Partner logos would go here - using placeholder text for now */}
            <div className="text-xl font-bold text-gray-400">Company A</div>
            <div className="text-xl font-bold text-gray-400">Company B</div>
            <div className="text-xl font-bold text-gray-400">Company C</div>
            <div className="text-xl font-bold text-gray-400">Company D</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;