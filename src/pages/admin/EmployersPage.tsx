import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/common/Card';
import Button from '../../components/common/Button';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Trash2, 
  Building, 
  CheckCircle,
  XCircle,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

// Mock data
const initialEmployers = [
  {
    id: 1,
    name: 'Tech Solutions LLC',
    email: 'hr@techsolutions.kg',
    phone: '+996 312 123 456',
    location: 'Bishkek, Kyrgyzstan',
    industry: 'IT & Software',
    activeVacancies: 3,
    isVerified: true,
    joinDate: '2023-09-15'
  },
  {
    id: 2,
    name: 'Global Finance',
    email: 'careers@globalfinance.kg',
    phone: '+996 312 234 567',
    location: 'Bishkek, Kyrgyzstan',
    industry: 'Finance',
    activeVacancies: 2,
    isVerified: true,
    joinDate: '2023-10-20'
  },
  {
    id: 3,
    name: 'Engineering Associates',
    email: 'jobs@engassociates.kg',
    phone: '+996 312 345 678',
    location: 'Bishkek, Kyrgyzstan',
    industry: 'Engineering',
    activeVacancies: 1,
    isVerified: true,
    joinDate: '2024-01-10'
  },
  {
    id: 4,
    name: 'Bishkek Construction',
    email: 'hr@bishkekconstruction.kg',
    phone: '+996 312 456 789',
    location: 'Bishkek, Kyrgyzstan',
    industry: 'Construction',
    activeVacancies: 4,
    isVerified: false,
    joinDate: '2024-04-05'
  },
  {
    id: 5,
    name: 'Data Systems',
    email: 'careers@datasystems.kg',
    phone: '+996 312 567 890',
    location: 'Bishkek, Kyrgyzstan',
    industry: 'IT & Software',
    activeVacancies: 2,
    isVerified: false,
    joinDate: '2024-05-18'
  }
];

const AdminEmployersPage: React.FC = () => {
  const { t } = useTranslation();
  const [employers, setEmployers] = useState(initialEmployers);
  const [search, setSearch] = useState('');
  const [filterIndustry, setFilterIndustry] = useState('');
  const [filterVerification, setFilterVerification] = useState('');
  const [expandedEmployer, setExpandedEmployer] = useState<number | null>(null);
  
  // Filter employers based on search and filters
  const filteredEmployers = employers.filter(employer => {
    const matchesSearch = 
      employer.name.toLowerCase().includes(search.toLowerCase()) ||
      employer.email.toLowerCase().includes(search.toLowerCase()) ||
      employer.location.toLowerCase().includes(search.toLowerCase());
    
    const matchesIndustry = filterIndustry ? employer.industry === filterIndustry : true;
    const matchesVerification = filterVerification 
      ? (filterVerification === 'verified' ? employer.isVerified : !employer.isVerified) 
      : true;
    
    return matchesSearch && matchesIndustry && matchesVerification;
  });
  
  // Get unique industries for filter
  const industries = Array.from(new Set(employers.map(e => e.industry))).sort();
  
  const toggleEmployerExpand = (id: number) => {
    setExpandedEmployer(expandedEmployer === id ? null : id);
  };
  
  const verifyEmployer = (id: number) => {
    setEmployers(employers.map(employer => 
      employer.id === id ? { ...employer, isVerified: true } : employer
    ));
  };
  
  const handleExport = () => {
    // Mock export functionality
    alert('Exporting employers data...');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">{t('admin.employersManagement')}</h1>
        <Button 
          leftIcon={<Download className="h-4 w-4" />}
          onClick={handleExport}
        >
          {t('admin.exportData')}
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>{t('Employers List')}</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search and filters */}
          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
            <div className="relative w-full md:w-auto">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder={t('Search employers')} 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 w-full md:w-80 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className="inline-flex items-center relative">
                <select 
                  value={filterIndustry}
                  onChange={(e) => setFilterIndustry(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">{t('All Industries')}</option>
                  {industries.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>
              
              <div className="inline-flex items-center relative">
                <select 
                  value={filterVerification}
                  onChange={(e) => setFilterVerification(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">{t('All Status')}</option>
                  <option value="verified">{t('Verified')}</option>
                  <option value="unverified">{t('Unverified')}</option>
                </select>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                leftIcon={<Filter className="h-4 w-4" />}
              >
                {t('More Filters')}
              </Button>
            </div>
          </div>
          
          {/* Employers List */}
          <div className="space-y-4">
            {filteredEmployers.map(employer => (
              <div 
                key={employer.id} 
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <div 
                  className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-white cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleEmployerExpand(employer.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-full">
                      <Building className="h-6 w-6 text-gray-700" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{employer.name}</h3>
                      <div className="text-sm text-gray-500">{employer.industry}</div>
                    </div>
                  </div>
                  
                  <div className="mt-2 md:mt-0 flex items-center gap-4">
                    <div className="text-sm">
                      <span className="text-gray-500">{t('Vacancies')}: </span>
                      <span className="font-medium">{employer.activeVacancies}</span>
                    </div>
                    
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      employer.isVerified 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {employer.isVerified 
                        ? <CheckCircle className="h-3 w-3 mr-1" /> 
                        : <XCircle className="h-3 w-3 mr-1" />}
                      {employer.isVerified ? t('Verified') : t('Unverified')}
                    </span>
                    
                    <div className="flex items-center space-x-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        leftIcon={<Eye className="h-4 w-4" />}
                      >
                        {t('common.view')}
                      </Button>
                    </div>
                  </div>
                </div>
                
                {expandedEmployer === employer.id && (
                  <div className="p-4 bg-gray-50 border-t border-gray-200 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">{t('Contact Information')}</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center text-gray-700">
                            <Mail className="h-4 w-4 mr-2 text-gray-500" />
                            {employer.email}
                          </li>
                          <li className="flex items-center text-gray-700">
                            <Phone className="h-4 w-4 mr-2 text-gray-500" />
                            {employer.phone}
                          </li>
                          <li className="flex items-center text-gray-700">
                            <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                            {employer.location}
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">{t('Account Details')}</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <span className="text-gray-500 mr-2">{t('Joined')}:</span>
                            <span className="text-gray-700">{new Date(employer.joinDate).toLocaleDateString()}</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-gray-500 mr-2">{t('Active Vacancies')}:</span>
                            <span className="text-gray-700">{employer.activeVacancies}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-end space-x-2">
                      {!employer.isVerified && (
                        <Button 
                          variant="success" 
                          size="sm"
                          leftIcon={<CheckCircle className="h-4 w-4" />}
                          onClick={() => verifyEmployer(employer.id)}
                        >
                          {t('Verify Employer')}
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm"
                        leftIcon={<Edit className="h-4 w-4" />}
                      >
                        {t('common.edit')}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {filteredEmployers.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">{t('No employers found')}</h3>
                <p className="text-gray-500">{t('Try adjusting your search or filters')}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminEmployersPage;