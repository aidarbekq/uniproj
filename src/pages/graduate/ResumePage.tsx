import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/services/api';
import { Upload, File, Download, Trash2 } from 'lucide-react';

const ResumePage: React.FC = () => {
  const { user } = useAuth();
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [profileId, setProfileId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("alumni/alumni-profiles/");
        const myProfile = res.data.find((p: any) => {
          if (typeof p.user === "object") return p.user.id === user?.id;
          return p.user === user?.id;
        });

        if (myProfile) {
          setResumeUrl(myProfile.resume);
          setProfileId(myProfile.id);
        } else {
          setError("Профиль не найден");
        }
      } catch (error) {
        console.error("Ошибка при получении профиля", error);
        setError("Ошибка при загрузке профиля");
      }
    };

    if (user) fetchProfile();
  }, [user]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !profileId) {
      setError("Файл не выбран или профиль не найден.");
      return;
    }

    setError(null);
    setIsUploading(true);
    const formData = new FormData();
    formData.append("resume", file);

    try {
      await api.put(`alumni/alumni-profiles/${profileId}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Резюме успешно загружено");
      setFile(null);
      window.location.reload();
    } catch (err) {
      console.error("Ошибка при загрузке резюме", err);
      setError("Не удалось загрузить файл");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!profileId) return;

    try {
      await api.put(`alumni/alumni-profiles/${profileId}/`, { resume: null });
      setResumeUrl(null);
    } catch (err) {
      console.error("Ошибка при удалении", err);
      setError("Ошибка при удалении резюме");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-6">
      <h1 className="text-2xl font-bold text-blue-800">Загрузка резюме</h1>

      {error && <p className="text-red-600">{error}</p>}

      {resumeUrl ? (
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <File className="h-6 w-6 text-blue-500" />
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-700 hover:text-blue-900"
              >
                {resumeUrl.split('/').pop()}
              </a>
            </div>
            <div className="flex gap-2">
              <a href={resumeUrl} download>
                <button className="px-4 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-1">
                  <Download className="w-4 h-4" /> Скачать
                </button>
              </a>
              <button
                onClick={handleDelete}
                className="px-4 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" /> Удалить
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <Upload className="w-10 h-10 text-gray-400 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-700 mb-2">Загрузите ваше резюме</p>
          <p className="text-sm text-gray-500 mb-4">Форматы: PDF, DOC, DOCX до 10MB</p>

          <label htmlFor="file-upload" className="cursor-pointer">
            <div className="flex justify-center">
              <div className="bg-white text-blue-600 border border-blue-600 px-4 py-2 rounded hover:bg-blue-50">
                Выбрать файл
              </div>
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

          {file && (
            <div className="mt-4">
              <p className="text-sm text-gray-700 mb-2">{file.name}</p>
              <button
                onClick={handleUpload}
                disabled={isUploading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {isUploading ? "Загрузка..." : "Загрузить"}
              </button>
            </div>
          )}
        </div>
      )}

      <div className="pt-6 border-t border-gray-200">
        <h2 className="font-medium text-gray-800 mb-3">Советы по составлению резюме</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
          <li>Старайтесь уложиться в одну страницу</li>
          <li>Выделите ключевые навыки и достижения</li>
          <li>Укажите средний балл, если он выше 3.0</li>
          <li>Добавьте курсы, проекты и волонтёрство</li>
        </ul>
      </div>
    </div>
  );
};

export default ResumePage;
