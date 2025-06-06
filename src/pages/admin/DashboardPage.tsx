import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/common/Card';
import Button from '../../components/common/Button';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { Download, RefreshCw, Filter, FileText } from 'lucide-react';

// Mock data
const employmentRateData = [
  { year: '2020', rate: 75 },
  { year: '2021', rate: 78 },
  { year: '2022', rate: 82 },
  { year: '2023', rate: 79 },
  { year: '2024', rate: 86 },
  { year: '2025', rate: 88 },
];

const departmentEmploymentData = [
  { name: 'Computer Science', employed: 56, total: 62 },
  { name: 'Electrical Engineering', employed: 48, total: 60 },
  { name: 'Mechanical Engineering', employed: 42, total: 51 },
  { name: 'Civil Engineering', employed: 38, total: 45 },
  { name: 'Economics', employed: 32, total: 40 },
];

const industryDistributionData = [
  { name: 'IT & Software', value: 35 },
  { name: 'Manufacturing', value: 25 },
  { name: 'Construction', value: 15 },
  { name: 'Finance', value: 12 },
  { name: 'Education', value: 8 },
  { name: 'Other', value: 5 },
];

const COLORS = ['#2563EB', '#D97706', '#7C3AED', '#DC2626', '#10B981', '#6B7280'];

const AdminDashboardPage: React.FC = () => {
  const { t } = useTranslation();
  const [selectedYear, setSelectedYear] = useState('2025');
  const years = ['2020', '2021', '2022', '2023', '2024', '2025'];
  
  const generateEmploymentRateByDepartment = () => {
    return departmentEmploymentData.map(dept => ({
      name: dept.name,
      rate: Math.round((dept.employed / dept.total) * 100),
    }));
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">{t('admin.dashboard')}</h1>
          <p className="text-gray-500">{t('Employment statistics overview')}</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="inline-flex items-center">
            <span className="mr-2 text-sm font-medium text-gray-700">{t('admin.yearFilter')}:</span>
            <select 
              value={selectedYear} 
              onChange={(e) => setSelectedYear(e.target.value)}
              className="text-sm border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<RefreshCw className="h-4 w-4" />}
          >
            {t('Refresh')}
          </Button>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<FileText className="h-4 w-4" />}
          >
            {t('Export Report')}
          </Button>
        </div>
      </div>
      
      {/* Main statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('Overall Employment')}</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-4xl font-bold text-primary-600 mb-2">86%</div>
            <p className="text-gray-500">{t('Graduates employed for')} {selectedYear}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{t('Total Graduates')}</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-4xl font-bold text-secondary-600 mb-2">258</div>
            <p className="text-gray-500">{t('in')} {selectedYear}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{t('Avg. Salary')}</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-4xl font-bold text-accent-600 mb-2">65,000</div>
            <p className="text-gray-500">{t('KGS per month')}</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('Employment Rate Trend')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={employmentRateData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="year" />
                  <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                  <Tooltip formatter={(value) => [`${value}%`, t('Employment Rate')]} />
                  <Line
                    type="monotone"
                    dataKey="rate"
                    stroke="#2563EB"
                    strokeWidth={3}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{t('Employment by Department')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={generateEmploymentRateByDepartment()}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                  <Tooltip formatter={(value) => [`${value}%`, t('Employment Rate')]} />
                  <Bar dataKey="rate" fill="#EAB308" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{t('Industry Distribution')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={industryDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {industryDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, t('Percentage')]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{t('Employment Status')}</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{t('Employed')}</span>
                  <span className="text-sm text-gray-600">222/258</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-success-500 h-2 rounded-full" style={{ width: '86%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{t('Searching')}</span>
                  <span className="text-sm text-gray-600">25/258</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-warning-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{t('Further Studies')}</span>
                  <span className="text-sm text-gray-600">8/258</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary-500 h-2 rounded-full" style={{ width: '3%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{t('Other')}</span>
                  <span className="text-sm text-gray-600">3/258</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gray-500 h-2 rounded-full" style={{ width: '1%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-right">
              <Button 
                variant="outline" 
                size="sm"
                leftIcon={<Download className="h-4 w-4" />}
              >
                {t('Download Full Report')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardPage;