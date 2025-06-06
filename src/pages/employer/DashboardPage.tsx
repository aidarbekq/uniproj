import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/common/Card';
import Button from '../../components/common/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Briefcase, Users, BarChart2, Clock, PlusCircle, Search } from 'lucide-react';

// Mock data for charts
const applicationsData = [
  { name: 'Jan', value: 12 },
  { name: 'Feb', value: 19 },
  { name: 'Mar', value: 15 },
  { name: 'Apr', value: 25 },
  { name: 'May', value: 32 },
  { name: 'Jun', value: 27 },
];

const recentApplicants = [
  { id: 1, name: 'Adilet Murzaev', position: 'Front-end Developer', date: '2025-05-15', status: 'new' },
  { id: 2, name: 'Marina Kim', position: 'UI/UX Designer', date: '2025-05-14', status: 'reviewed' },
  { id: 3, name: 'Bakyt Asanov', position: 'Back-end Developer', date: '2025-05-13', status: 'interview' },
  { id: 4, name: 'Alina Petrova', position: 'Project Manager', date: '2025-05-12', status: 'rejected' },
];

const EmployerDashboardPage: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">{t('employer.dashboard')}</h1>
          <p className="text-gray-500">Welcome back, {user?.name}</p>
        </div>
        <Link to="/employer/vacancies">
          <Button leftIcon={<PlusCircle className="h-4 w-4" />}>
            {t('employer.addVacancy')}
          </Button>
        </Link>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-primary-100 mr-4">
                <Briefcase className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{t('Active Vacancies')}</p>
                <h3 className="text-2xl font-semibold text-gray-900">5</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-secondary-100 mr-4">
                <Users className="h-6 w-6 text-secondary-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{t('Total Applicants')}</p>
                <h3 className="text-2xl font-semibold text-gray-900">42</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-accent-100 mr-4">
                <Clock className="h-6 w-6 text-accent-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{t('New Applications')}</p>
                <h3 className="text-2xl font-semibold text-gray-900">12</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <Card>
        <CardHeader>
          <CardTitle>{t('Applications Over Time')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={applicationsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#2563EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Recent Applicants */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>{t('Recent Applicants')}</CardTitle>
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder={t('Search applicants')} 
              className="pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('Name')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('Position')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('Date')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('Status')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('Actions')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentApplicants.map((applicant) => (
                  <tr key={applicant.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{applicant.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {applicant.position}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {new Date(applicant.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        applicant.status === 'new' ? 'bg-blue-100 text-blue-800' :
                        applicant.status === 'reviewed' ? 'bg-yellow-100 text-yellow-800' :
                        applicant.status === 'interview' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {applicant.status === 'new' ? t('New') :
                         applicant.status === 'reviewed' ? t('Reviewed') :
                         applicant.status === 'interview' ? t('Interview') :
                         t('Rejected')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button variant="ghost" size="sm">
                        {t('common.view')}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployerDashboardPage;