import React, { useEffect, useState } from "react";
import { Building, Briefcase, Calendar, CheckCircle, XCircle, Search, MapPin } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/common/Card";
import Button from "@/components/common/Button";
import api from "@/services/api";

interface Vacancy {
  id: number;
  title: string;
  description: string;
  location: string;
  salary: string;
  is_active: boolean;
  created_at: string;
  employer: {
    id: number;
    company_name: string;
  };
}

const AdminVacanciesPage: React.FC = () => {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const res = await api.get("vacancies/vacancies/");
        setVacancies(res.data);
      } catch (err) {
        console.error("Ошибка загрузки вакансий", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVacancies();
  }, []);

  const filtered = vacancies.filter((v) =>
    [v.title, v.location, v.employer?.company_name].some((field) =>
      field?.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Управление вакансиями</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Список вакансий</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex mb-6">
            <div className="relative w-full md:w-96">
              <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск по должности, компании или локации"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filtered.map((v) => (
              <div
                key={v.id}
                className="border border-gray-200 rounded-lg bg-white px-4 py-4 shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-full">
                      <Briefcase className="h-6 w-6 text-gray-700" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{v.title}</h3>
                      <p className="text-sm text-gray-500">{v.employer?.company_name}</p>
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      v.is_active
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {v.is_active ? (
                      <>
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Активна
                      </>
                    ) : (
                      <>
                        <XCircle className="h-3 w-3 mr-1" />
                        Неактивна
                      </>
                    )}
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                  <div>
                    <h4 className="text-gray-900 font-medium mb-1">Локация</h4>
                    <p className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                      {v.location}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-medium mb-1">Зарплата</h4>
                    <p>${v.salary || "Не указано"}</p>
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-medium mb-1">Опубликовано</h4>
                    <p className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                      {new Date(v.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-medium mb-1">Описание</h4>
                    <p className="line-clamp-3">{v.description}</p>
                  </div>
                </div>
              </div>
            ))}

            {!filtered.length && (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Вакансии не найдены</h3>
                <p className="text-gray-500">Попробуйте изменить параметры поиска</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminVacanciesPage;
