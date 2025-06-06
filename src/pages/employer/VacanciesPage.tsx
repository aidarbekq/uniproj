import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/common/Card';
import Button from '../../components/common/Button';
import { PlusCircle, Edit, Trash2, ExternalLink, Eye, Search, Filter } from 'lucide-react';

// Mock data
const initialVacancies = [
  {
    id: 1,
    title: 'Senior Software Engineer',
    description: 'We are looking for an experienced software engineer to join our team.',
    requirements: 'At least 5 years of experience, proficient in React and Node.js.',
    location: 'Bishkek, Kyrgyzstan',
    salary: '80000 - 120000 KGS',
    applicants: 7,
    status: 'active',
    createdAt: '2025-05-01',
  },
  {
    id: 2,
    title: 'UI/UX Designer',
    description: 'Design beautiful user interfaces for our web and mobile applications.',
    requirements: 'Portfolio with examples of web design work, Figma proficiency.',
    location: 'Remote',
    salary: '60000 - 90000 KGS',
    applicants: 4,
    status: 'active',
    createdAt: '2025-05-05',
  },
  {
    id: 3,
    title: 'QA Engineer',
    description: 'Ensure the quality of our software products through manual and automated testing.',
    requirements: 'Experience with test automation, knowledge of QA methodologies.',
    location: 'Bishkek, Kyrgyzstan',
    salary: '50000 - 80000 KGS',
    applicants: 3,
    status: 'active',
    createdAt: '2025-05-10',
  },
];

interface VacancyFormData {
  id?: number;
  title: string;
  description: string;
  requirements: string;
  location: string;
  salary: string;
}

const VacanciesPage: React.FC = () => {
  const { t } = useTranslation();
  const [vacancies, setVacancies] = useState(initialVacancies);
  const [isAddingVacancy, setIsAddingVacancy] = useState(false);
  const [isEditingVacancy, setIsEditingVacancy] = useState(false);
  const [currentVacancy, setCurrentVacancy] = useState<VacancyFormData>({
    title: '',
    description: '',
    requirements: '',
    location: '',
    salary: '',
  });
  
  const resetForm = () => {
    setCurrentVacancy({
      title: '',
      description: '',
      requirements: '',
      location: '',
      salary: '',
    });
  };
  
  const handleAddVacancy = () => {
    setIsAddingVacancy(true);
    resetForm();
  };
  
  const handleEditVacancy = (vacancy: typeof initialVacancies[0]) => {
    setIsEditingVacancy(true);
    setCurrentVacancy({
      id: vacancy.id,
      title: vacancy.title,
      description: vacancy.description,
      requirements: vacancy.requirements,
      location: vacancy.location,
      salary: vacancy.salary,
    });
  };
  
  const handleDeleteVacancy = (id: number) => {
    setVacancies(vacancies.filter(vacancy => vacancy.id !== id));
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentVacancy(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditingVacancy) {
      setVacancies(vacancies.map(vacancy => 
        vacancy.id === currentVacancy.id 
          ? { 
              ...vacancy, 
              title: currentVacancy.title,
              description: currentVacancy.description,
              requirements: currentVacancy.requirements,
              location: currentVacancy.location,
              salary: currentVacancy.salary,
            } 
          : vacancy
      ));
      setIsEditingVacancy(false);
    } else {
      const newVacancy = {
        id: Date.now(),
        ...currentVacancy,
        applicants: 0,
        status: 'active',
        createdAt: new Date().toISOString().split('T')[0],
      };
      setVacancies([...vacancies, newVacancy]);
      setIsAddingVacancy(false);
    }
    
    resetForm();
  };
  
  const handleCancel = () => {
    setIsAddingVacancy(false);
    setIsEditingVacancy(false);
    resetForm();
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">{t('employer.vacancies')}</h1>
        {!isAddingVacancy && !isEditingVacancy && (
          <Button 
            leftIcon={<PlusCircle className="h-4 w-4" />}
            onClick={handleAddVacancy}
          >
            {t('employer.addVacancy')}
          </Button>
        )}
      </div>
      
      {(isAddingVacancy || isEditingVacancy) && (
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>
              {isEditingVacancy ? t('Edit Vacancy') : t('employer.addVacancy')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('employer.title')} *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={currentVacancy.title}
                    onChange={handleInputChange}
                    required
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('employer.description')} *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={currentVacancy.description}
                    onChange={handleInputChange}
                    required
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('employer.requirements')} *
                  </label>
                  <textarea
                    id="requirements"
                    name="requirements"
                    rows={3}
                    value={currentVacancy.requirements}
                    onChange={handleInputChange}
                    required
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('employer.location')} *
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={currentVacancy.location}
                      onChange={handleInputChange}
                      required
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('employer.salary')}
                    </label>
                    <input
                      type="text"
                      id="salary"
                      name="salary"
                      value={currentVacancy.salary}
                      onChange={handleInputChange}
                      placeholder="e.g. 60000 - 80000 KGS"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                >
                  {t('common.cancel')}
                </Button>
                <Button type="submit">
                  {isEditingVacancy ? t('common.save') : t('Create')}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
      
      {!isAddingVacancy && !isEditingVacancy && (
        <>
          <div className="flex items-center justify-between mb-6">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder={t('Search vacancies')} 
                className="pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              leftIcon={<Filter className="h-4 w-4" />}
            >
              {t('Filter')}
            </Button>
          </div>
          
          {vacancies.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('No vacancies yet')}</h3>
              <p className="text-gray-500 mb-4">{t('Click the button above to add your first job listing')}</p>
              <Button 
                leftIcon={<PlusCircle className="h-4 w-4" />}
                onClick={handleAddVacancy}
              >
                {t('employer.addVacancy')}
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {vacancies.map(vacancy => (
                <Card key={vacancy.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900">{vacancy.title}</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {vacancy.location}
                          </span>
                          {vacancy.salary && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {vacancy.salary}
                            </span>
                          )}
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {vacancy.applicants} {t('applicants')}
                          </span>
                        </div>
                        <p className="mt-3 text-gray-600">{vacancy.description}</p>
                        <div className="mt-4">
                          <h4 className="font-medium text-gray-900 mb-1">{t('employer.requirements')}:</h4>
                          <p className="text-gray-600">{vacancy.requirements}</p>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 md:ml-6 flex md:flex-col gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          leftIcon={<Eye className="h-4 w-4" />}
                        >
                          {t('View Applicants')} ({vacancy.applicants})
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          leftIcon={<Edit className="h-4 w-4" />}
                          onClick={() => handleEditVacancy(vacancy)}
                        >
                          {t('common.edit')}
                        </Button>
                        <Button 
                          variant="danger" 
                          size="sm" 
                          leftIcon={<Trash2 className="h-4 w-4" />}
                          onClick={() => handleDeleteVacancy(vacancy.id)}
                        >
                          {t('common.delete')}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VacanciesPage;