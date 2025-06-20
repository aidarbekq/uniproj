import React, { useEffect, useState } from "react";
import api from "@/services/api";
import { useNavigate } from "react-router-dom";

interface Vacancy {
  id: number;
  employer: string;
  title: string;
  description: string;
  location: string;
  salary: string;
  is_active: boolean;
  created_at: string;
}

const VacanciesPage: React.FC = () => {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchVacancies = async () => {
    try {
      const res = await api.get("vacancies/vacancies/");
      setVacancies(res.data);
    } catch (error) {
      console.error("Ошибка загрузки вакансий", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVacancies();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Удалить вакансию?")) return;
    try {
      await api.delete(`vacancies/vacancies/${id}/`);
      setVacancies((prev) => prev.filter((v) => v.id !== id));
    } catch (error) {
      console.error("Ошибка удаления", error);
    }
  };

  if (loading) return <p className="text-center mt-8">Загрузка...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Мои вакансии</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => navigate("/vacancies/vacancies/create")}
        >
          ➕ Добавить вакансию
        </button>
      </div>

      {vacancies.length === 0 ? (
        <p className="text-gray-600">У вас пока нет опубликованных вакансий.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Компания</th>
                <th className="border px-4 py-2">Должность</th>
                <th className="border px-4 py-2">Описание</th>
                <th className="border px-4 py-2">Локация</th>
                <th className="border px-4 py-2">Зарплата</th>
                <th className="border px-4 py-2">Дата</th>
                <th className="border px-4 py-2">Действия</th>
              </tr>
            </thead>
            <tbody>
              {vacancies.map((v) => (
                <tr key={v.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{v.employer}</td>
                  <td className="border px-4 py-2 font-semibold">{v.title}</td>
                  <td className="border px-4 py-2">{v.description}</td>
                  <td className="border px-4 py-2">{v.location}</td>
                  <td className="border px-4 py-2">{v.salary || "-"}</td>
                  <td className="border px-4 py-2">{new Date(v.created_at).toLocaleDateString()}</td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => navigate(`/vacancies/vacancies/${v.id}/edit`)}
                    >
                      ✏️
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(v.id)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default VacanciesPage;
