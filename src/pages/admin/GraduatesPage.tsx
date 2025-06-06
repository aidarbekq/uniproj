import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/common/Card';
import Button from '../../components/common/Button';
import { 
  Search, 
  Filter, 
  Download, 
  ChevronDown, 
  Eye, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle 
} from 'lucide-react';

// Mock data
const initialGraduates = Array(15).fill(null).map((_, index) => ({
  id: index + 1,
  name: [
    'Adilet Asanov', 
    'Marina Kim', 
    'Bakyt Orozov',
    'Alina Petrova',
    'Azamat Muratov',
    'Elena Ivanova',
    'Timur Aliev',
    'Natalia Sokolova',
    'Dastan Bolotov',
    'Olga Sidorova',
    'Marat Isaev',
    'Svetlana Novikova',
    'Erlan Mambetaliev',
    'Victoria Volkova',
    'Ruslan Nurmatov'
  ][index],
  email: `graduate${index + 1}@example.com`,
  graduationYear: [2020, 2021, 2022, 2023, 2024, 2025][Math.floor(Math.random() * 6)],
  department: [
    'Computer Science', 
    'Electrical Engineering', 
    'Mechanical Engineering',
    'Civil Engineering',
    'Economics',
    'Applied Mathematics'
  ][Math.floor(Math.random() * 6)],
  employmentStatus: Math.random() > 0.2 ? 'employed' : 'unemployed',
  company: Math.random() > 0.2 ? [
    'Tech Solutions LLC',
    'Kyrgyz IT',
    'Global Finance',
    'Engineering Associates',
    'Bishkek Construction',
    'Data Systems'
  ][Math.floor(Math.random() * 6)] : null,
  position: Math.random() > 0.2 ? [
    'Software Engineer',
    'UI/UX Designer',
    'Project Manager',
    'Data Analyst',
    'Network Engineer',
    'System Administrator'
  ][Math.floor(Math.random() * 6)] : null,
}));

const AdminGraduatesPage: React.FC = () => {
  const { t } = useTranslation();
  const [graduates, setGraduates] = useState(initialGraduates);
  const [search, setSearch] = useState('');
  const [filterYear, setFilterYear] = useState<string>('');
  const [filterDepartment, setFilterDepartment] = useState<string>('');
  const [filterEmployment, setFilterEmployment] = useState<string>('');
  
  // Filter graduates based on search and filters
  const filteredGraduates = graduates.filter(graduate => {
    const matchesSearch = 
      graduate.name.toLowerCase().includes(search.toLowerCase()) ||
      graduate.email.toLowerCase().includes(search.toLowerCase()) ||
      (graduate.company && graduate.company.toLowerCase().includes(search.toLowerCase()));
    
    const matchesYear = filterYear ? graduate.graduationYear.toString() === filterYear : true;
    const matchesDepartment = filterDepartment ? graduate.department === filterDepartment : true;
    const matchesEmployment = filterEmployment ? graduate.employmentStatus === filterEmployment : true;
    
    return matchesSearch && matchesYear && matchesDepartment && matchesEmployment;
  });
  
  // Get unique values for filters
  const years = Array.from(new Set(graduates.map(g => g.graduationYear))).sort((a, b) => b - a);
  const departments = Array.from(new Set(graduates.map(g => g.department))).sort();
  
  const handleExport = () => {
    // Mock export functionality
    alert('Exporting data...');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">{t('admin.graduatesManagement')}</h1>
        <Button 
          leftIcon={<Download className="h-4 w-4" />}
          onClick={handleExport}
        >
          {t('admin.exportData')}
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>{t('Graduates List')}</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search and filters */}
          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
            <div className="relative w-full md:w-auto">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder={t('Search graduates')} 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 w-full md:w-80 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className="inline-flex relative">
                <select 
                  value={filterYear}
                  onChange={(e) => setFilterYear(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">{t('All Years')}</option>
                  {years.map(year => (
                    <option key={year} value={year.toString()}>{year}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none text-gray-400" />
              </div>
              
              <div className="inline-flex relative">
                <select 
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">{t('All Departments')}</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none text-gray-400" />
              </div>
              
              <div className="inline-flex relative">
                <select 
                  value={filterEmployment}
                  onChange={(e) => setFilterEmployment(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">{t('All Statuses')}</option>
                  <option value="employed">{t('graduate.employed')}</option>
                  <option value="unemployed">{t('graduate.unemployed')}</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none text-gray-400" />
              </div>
            </div>
          </div>
          
          {/* Graduates Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('Name')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('Graduation')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('Department')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('Status')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('Employment')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('Actions')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredGraduates.map(graduate => (
                  <tr key={graduate.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="font-medium text-gray-900">{graduate.name}</div>
                          <div className="text-sm text-gray-500">{graduate.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{graduate.graduationYear}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{graduate.department}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        graduate.employmentStatus === 'employed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {graduate.employmentStatus === 'employed' 
                          ? <CheckCircle className="h-3 w-3 mr-1" /> 
                          : <XCircle className="h-3 w-3 mr-1" />}
                        {graduate.employmentStatus === 'employed' 
                          ? t('graduate.employed') 
                          : t('graduate.unemployed')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {graduate.company ? (
                        <>
                          <div className="text-sm font-medium text-gray-900">{graduate.company}</div>
                          <div className="text-sm text-gray-500">{graduate.position}</div>
                        </>
                      ) : (
                        <span className="text-sm text-gray-500">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        leftIcon={<Eye className="h-4 w-4" />}
                      >
                        {t('common.view')}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredGraduates.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">{t('common.noResults')}</p>
            </div>
          )}
          
          {/* Pagination */}
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              {t('Showing')} <span className="font-medium">1</span> {t('to')} <span className="font-medium">{filteredGraduates.length}</span> {t('of')} <span className="font-medium">{graduates.length}</span> {t('graduates')}
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" disabled>
                {t('Previous')}
              </Button>
              <Button variant="outline" size="sm" disabled>
                {t('Next')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminGraduatesPage;