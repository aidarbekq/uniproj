import React, { useEffect, useState } from "react";
import {
  FileText,
  Search,
  Calendar,
  User,
  GraduationCap,
  BadgeCheck,
  XCircle,
  Briefcase,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/common/Card";
import Button from "@/components/common/Button";
import api from "@/services/api";

interface Resume {
  id: number;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  };
  summary: string;
  experience: string;
  education: string;
  skills: string;
  created_at: string;
}

const AdminResumesPage: React.FC = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await api.get("alumni/resumes/");
        setResumes(res.data);
      } catch (err) {
        console.error("Ошибка загрузки резюме", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResumes();
  }, []);

  const filteredResumes = resumes.filter((r) => {
    const fullName = `${r.user.first_name} ${r.user.last_name}`.toLowerCase();
    return (
      fullName.includes(search.toLowerCase()) ||
      r.skills.toLowerCase().includes(search.toLowerCase()) ||
      r.experience.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Управление резюме</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Список резюме</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex mb-6">
            <div className="relative w-full md:w-96">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск по ФИО, опыту, навыкам"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredResumes.map((resume) => (
              <div
                key={resume.id}
                className="border border-gray-200 rounded-lg bg-white px-4 py-4 shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-gray-100 rounded-full">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {resume.user.first_name} {resume.user.last_name}
                      </h3>
                      <p className="text-sm text-gray-500">{resume.user.email}</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(resume.created_at).toLocaleDateString()}
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                  <div>
                    <h4 className="text-gray-900 font-medium mb-1">Опыт</h4>
                    <p>{resume.experience || "Не указано"}</p>
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-medium mb-1">Образование</h4>
                    <p>{resume.education || "Не указано"}</p>
                  </div>
                  <div className="md:col-span-2">
                    <h4 className="text-gray-900 font-medium mb-1">Навыки</h4>
                    <p>{resume.skills || "Не указано"}</p>
                  </div>
                  <div className="md:col-span-2">
                    <h4 className="text-gray-900 font-medium mb-1">О себе</h4>
                    <p>{resume.summary || "Не указано"}</p>
                  </div>
                </div>
              </div>
            ))}

            {!filteredResumes.length && (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Резюме не найдены</h3>
                <p className="text-gray-500">Попробуйте изменить параметры поиска</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminResumesPage;
