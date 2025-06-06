import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Upload, File, Download, Trash2 } from 'lucide-react';

const ResumePage: React.FC = () => {
  const { t } = useTranslation();
  
  const [hasResume, setHasResume] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleUpload = () => {
    if (!file) return;
    
    setIsUploading(true);
    
    // Simulate API call
    setTimeout(() => {
      setHasResume(true);
      setIsUploading(false);
      setFile(null);
    }, 1500);
  };
  
  const handleDelete = () => {
    // Simulate API call
    setHasResume(false);
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">{t('graduate.resume')}</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>{t('Resume Management')}</CardTitle>
        </CardHeader>
        <CardContent>
          {hasResume ? (
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-primary-100">
                  <File className="h-6 w-6 text-primary-600" />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="font-medium">my_resume.pdf</h3>
                  <p className="text-sm text-gray-500">Added on May 15, 2025</p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Download className="h-4 w-4" />}
                  >
                    {t('Download')}
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    leftIcon={<Trash2 className="h-4 w-4" />}
                    onClick={handleDelete}
                  >
                    {t('Delete')}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
              <div className="text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">{t('Upload Your Resume')}</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {t('PDF, DOCX or DOC up to 10MB')}
                </p>
                
                <div className="mt-6">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="flex justify-center">
                      <Button variant="outline" as="div">
                        {t('Select a file')}
                      </Button>
                    </div>
                    <input 
                      id="file-upload" 
                      name="file-upload" 
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                    />
                  </label>
                </div>
                
                {file && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-700">{file.name}</p>
                    <Button
                      onClick={handleUpload}
                      isLoading={isUploading}
                      className="mt-2"
                    >
                      {t('Upload')}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
          
          <div className="mt-8">
            <h4 className="font-medium mb-4">{t('Resume Tips')}</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>{t('Keep your resume concise, ideally one page')}</li>
              <li>{t('Highlight relevant skills and experience')}</li>
              <li>{t('Include your GPA if it is 3.0 or above')}</li>
              <li>{t('List relevant coursework, projects, or extracurricular activities')}</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResumePage;