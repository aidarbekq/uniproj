import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/services/api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/common/Card";
import Button from "@/components/common/Button";
import { toast } from "sonner";

const VacancyCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    salary: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("vacancies/vacancies/", formData);
      toast.success("Вакансия успешно создана!");
      setTimeout(() => navigate("/employer/vacancies"), 1000);
    } catch (err: any) {
      console.error("Ошибка при создании:", err.response?.data || err.message);
      toast.error("Не удалось создать вакансию. Проверьте корректность данных.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Создание вакансии</h1>

      <Card>
        <CardHeader>
          <CardTitle>Форма новой вакансии</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Название должности *</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Например: Frontend разработчик"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Описание *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Подробное описание должности"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Требования</label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                rows={3}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Какие навыки и опыт необходимы"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Локация *</label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Город, офис или удалённо"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Зарплата</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 pl-7"
                  placeholder="Например: 1500"
                />
              </div>
            </div>

            <div className="pt-4">
              <Button type="submit" disabled={loading}>
                {loading ? "Создание..." : "Создать вакансию"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VacancyCreatePage;
