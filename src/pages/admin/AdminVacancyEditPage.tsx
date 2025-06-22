import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/services/api";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/common/Card";
import Button from "@/components/common/Button";

const AdminVacancyEditPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    salary: "",
    is_active: false,
  });

  useEffect(() => {
    const fetchVacancy = async () => {
      try {
        const res = await api.get(`vacancies/vacancies/${id}/`);
        setFormData({
          title: res.data.title || "",
          description: res.data.description || "",
          requirements: res.data.requirements || "",
          location: res.data.location || "",
          salary: res.data.salary || "",
          is_active: res.data.is_active,
        });
      } catch (err) {
        toast.error("Ошибка при загрузке вакансии");
      } finally {
        setLoading(false);
      }
    };
    fetchVacancy();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`vacancies/vacancies/${id}/`, formData);
      toast.success("Вакансия обновлена!");
      navigate("/admin/vacancies");
    } catch (err) {
      toast.error("Ошибка при сохранении");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Редактирование вакансии</h1>
        <Button variant="outline" onClick={() => navigate("/admin/vacancies")}>
          Назад
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Форма редактирования</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Название</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Описание</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Требования</label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Локация</label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Зарплата</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-400">$</span>
                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md pl-7 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <label className="inline-flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={handleChange}
                className="accent-blue-600"
              />
              <span>Вакансия активна</span>
            </label>

            <Button type="submit" className="w-full">
              Сохранить изменения
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminVacancyEditPage;
