import React, { useEffect, useState } from "react";
import api from "@/services/api";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, Plus } from "lucide-react";

interface Vacancy {
  id: number;
  employer: string;
  title: string;
  description: string;
  requirements: string;
  location: string;
  salary: string;
  is_active: boolean;
  created_at: string;
}

const VacanciesPage: React.FC = () => {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
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

    fetchVacancies();
  }, []);

  const confirmDelete = async () => {
    if (deleteId === null) return;
    try {
      await api.delete(`vacancies/vacancies/${deleteId}/`);
      setVacancies((prev) => prev.filter((v) => v.id !== deleteId));
    } catch (error) {
      console.error("Ошибка удаления", error);
    } finally {
      setDeleteId(null);
    }
  };

  if (loading) {
    return <p className="text-center mt-8 text-gray-600">Загрузка...</p>;
  }

  return (
    <div className="p-6 relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Мои вакансии</h1>
        <button
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={() => navigate("/employer/vacancies/create")}
        >
          <Plus size={16} /> Добавить вакансию
        </button>
      </div>

      {vacancies.length === 0 ? (
        <p className="text-gray-600">У вас пока нет опубликованных вакансий.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border px-4 py-2">Компания</th>
                <th className="border px-4 py-2">Должность</th>
                <th className="border px-4 py-2">Описание</th>
                <th className="border px-4 py-2">Требования</th>
                <th className="border px-4 py-2">Локация</th>
                <th className="border px-4 py-2">Зарплата</th>
                <th className="border px-4 py-2">Дата</th>
                <th className="border px-4 py-2 text-center">Действия</th>
              </tr>
            </thead>
            <tbody>
              {vacancies.map((v) => (
                <tr key={v.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{v.employer}</td>
                  <td className="border px-4 py-2 font-semibold">{v.title}</td>
                  <td className="border px-4 py-2">{v.description}</td>
                  <td className="border px-4 py-2">{v.requirements || "-"}</td>
                  <td className="border px-4 py-2">{v.location}</td>
                  <td className="border px-4 py-2">
                    {v.salary ? `$${parseFloat(v.salary).toLocaleString()}` : "-"}
                  </td>
                  <td className="border px-4 py-2">
                    {new Date(v.created_at).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2 flex justify-center space-x-2">
                    <button
                      className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition"
                      onClick={() => navigate(`/employer/vacancies/${v.id}/edit`)}
                    >
                      <Pencil size={16} /> Изменить
                    </button>
                    <button
                      className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800 transition"
                      onClick={() => setDeleteId(v.id)}
                    >
                      <Trash2 size={16} /> Удалить
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Модальное окно подтверждения удаления */}
      {deleteId !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Удалить вакансию?</h3>
            <p className="mb-6 text-gray-600">
              Вы уверены, что хотите удалить эту вакансию? Это действие нельзя отменить.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 border rounded hover:bg-gray-100 transition"
              >
                Отмена
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VacanciesPage;
