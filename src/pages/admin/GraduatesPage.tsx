// src/pages/admin/AdminGraduatesPage.tsx
import React, { useEffect, useState } from "react";
import {
  GraduationCap, Search, BadgeCheck, Briefcase, XCircle,
  Calendar, FileText, Eye
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/common/Card";
import Button from "@/components/common/Button";
import api from "@/services/api";

interface Graduate {
  id: number;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
  };
  graduation_year: number;
  specialty: string;
  is_employed: boolean;
  employer: number | null;
  position: string;
  resume: string | null;
}

const AdminGraduatesPage: React.FC = () => {
  const [graduates, setGraduates] = useState<Graduate[]>([]);
  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [employmentFilter, setEmploymentFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchGraduates = async () => {
    setLoading(true);
    try {
      const params: any = {};
      if (yearFilter) params.graduation_year = yearFilter;
      if (employmentFilter) params.is_employed = employmentFilter;
      if (search) params.search = search;

      console.log("🔍 Fetching with params:", params);

      const res = await api.get("alumni/alumni-profiles/", { params });

      console.log("✅ Response data:", res.data);

      const filtered = res.data.filter((g: Graduate) => g.user?.role === "ALUMNI");

      console.log("🎓 Filtered alumni:", filtered);

      setGraduates(filtered);
    } catch (err) {
      console.error("❌ Ошибка при загрузке выпускников", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGraduates();
  }, [search, yearFilter, employmentFilter]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Управление выпускниками</h1>
      <Card>
        <CardHeader>
          <CardTitle>Список выпускников</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Поиск по ФИО/специальности"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <select
              className="border rounded px-3 py-2"
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
            >
              <option value="">Год выпуска</option>
              {[2025, 2024, 2023, 2022, 2021].map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>

            <select
              className="border rounded px-3 py-2"
              value={employmentFilter}
              onChange={(e) => setEmploymentFilter(e.target.value)}
            >
              <option value="">Статус</option>
              <option value="true">Трудоустроен</option>
              <option value="false">Без работы</option>
            </select>
          </div>

          <div className="space-y-4">
            {graduates.map((g) => (
              <div
                key={g.id}
                className="border rounded-lg p-4 bg-white shadow-sm flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <GraduationCap className="text-blue-600 h-6 w-6" />
                    <div>
                      <div className="font-medium text-gray-900">
                        {g.user.first_name} {g.user.last_name}
                      </div>
                      <div className="text-sm text-gray-500">{g.specialty}</div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    leftIcon={<Eye className="w-4 h-4" />}
                    onClick={() => navigate(`/admin/graduates/${g.id}`)}
                  >
                    Просмотр
                  </Button>
                </div>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-700 pl-10">
                  <div className="flex items-center"><Calendar className="h-4 w-4 mr-1" />{g.graduation_year}</div>
                  <div className="flex items-center"><Briefcase className="h-4 w-4 mr-1 text-gray-500" />{g.position || "-"}</div>
                  <div className="flex items-center">
                    {g.is_employed ? (
                      <>
                        <BadgeCheck className="h-4 w-4 mr-1 text-green-600" />
                        <span className="text-green-700 font-medium">Трудоустроен</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4 mr-1 text-yellow-600" />
                        <span className="text-yellow-700 font-medium">Без работы</span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-1">Работодатель ID:</span>
                    <span className="text-gray-900">{g.employer ?? "—"}</span>
                  </div>
                  {g.resume && (
                    <a href={g.resume} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:underline">
                      <FileText className="w-4 h-4 mr-1" />
                      Резюме
                    </a>
                  )}
                </div>
              </div>
            ))}

            {!graduates.length && (
              <div className="text-center py-12 text-gray-500">Нет данных</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminGraduatesPage;
