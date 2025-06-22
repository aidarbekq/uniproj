import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Briefcase, Calendar, MapPin, Pencil, Trash } from "lucide-react";
import api from "@/services/api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/common/Card";
import Button from "@/components/common/Button";

interface Vacancy {
  id: number;
  title: string;
  description: string;
  requirements: string;
  location: string;
  salary: string;
  is_active: boolean;
  created_at: string;
  employer: {
    id: number;
    company_name: string;
  };
}

const AdminVacancyDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vacancy, setVacancy] = useState<Vacancy | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const fetchVacancy = async () => {
      try {
        const res = await api.get(`vacancies/vacancies/${id}/`);
        setVacancy(res.data);
      } catch (err) {
        console.error("Ошибка загрузки вакансии:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVacancy();
  }, [id]);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await api.delete(`vacancies/vacancies/${id}/`);
      navigate("/admin/vacancies");
    } catch (err) {
      console.error("Ошибка удаления:", err);
      alert("Не удалось удалить вакансию.");
    } finally {
      setDeleting(false);
      setShowConfirm(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-6">Загрузка...</p>;
  }

  if (!vacancy) {
    return <p className="text-center mt-6 text-red-600">Вакансия не найдена</p>;
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto relative">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Вакансия: {vacancy.title}</h1>
        <div className="flex gap-2">
          <Button onClick={() => navigate(`/admin/vacancies/${vacancy.id}/edit`)}>
            <Pencil className="h-4 w-4 mr-1" />
            Редактировать
          </Button>
          <Button variant="destructive" onClick={() => setShowConfirm(true)}>
            <Trash className="h-4 w-4 mr-1" />
            Удалить
          </Button>
          <Button variant="outline" onClick={() => navigate("/admin/vacancies")}>
            Назад
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Информация о вакансии</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-gray-900 font-medium mb-1">Компания</h4>
              <p className="flex items-center">
                <Briefcase className="h-4 w-4 mr-1 text-gray-500" />
                {vacancy.employer?.company_name}
              </p>
            </div>
            <div>
              <h4 className="text-gray-900 font-medium mb-1">Локация</h4>
              <p className="flex items-center">
                <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                {vacancy.location}
              </p>
            </div>
            <div>
              <h4 className="text-gray-900 font-medium mb-1">Зарплата</h4>
              <p>${vacancy.salary || "Не указано"}</p>
            </div>
            <div>
              <h4 className="text-gray-900 font-medium mb-1">Дата публикации</h4>
              <p className="flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                {new Date(vacancy.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div>
            <h4 className="text-gray-900 font-medium mb-1">Описание</h4>
            <p>{vacancy.description}</p>
          </div>
          <div>
            <h4 className="text-gray-900 font-medium mb-1">Требования</h4>
            <p>{vacancy.requirements || "—"}</p>
          </div>
        </CardContent>
      </Card>

      {/* Модальное окно подтверждения удаления */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Подтвердите удаление</h2>
            <p className="text-gray-700">
              Вы уверены, что хотите удалить вакансию <b>{vacancy.title}</b>? Это действие необратимо.
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowConfirm(false)}>
                Отмена
              </Button>
              <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
                {deleting ? "Удаление..." : "Удалить"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminVacancyDetailPage;
