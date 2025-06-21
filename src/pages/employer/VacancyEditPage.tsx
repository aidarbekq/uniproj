import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/services/api";

const VacancyEditPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    salary: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
        });
      } catch (err) {
        setError("Ошибка загрузки данных вакансии.");
      }
    };
    fetchVacancy();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await api.put(`vacancies/vacancies/${id}/`, formData);
      setSuccess("Изменения сохранены!");
      setTimeout(() => navigate("/employer/vacancies"), 1500);
    } catch (err) {
      console.error(err);
      setError("Ошибка при сохранении изменений.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-semibold mb-4">Редактирование вакансии</h2>

      {success && <p className="text-green-600 font-medium mb-4">{success}</p>}
      {error && <p className="text-red-500 font-medium mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Название должности"
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Описание"
          className="w-full border p-2 rounded"
          rows={3}
          required
        />
        <textarea
          name="requirements"
          value={formData.requirements}
          onChange={handleChange}
          placeholder="Требования"
          className="w-full border p-2 rounded"
          rows={3}
        />
        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Локация"
          className="w-full border p-2 rounded"
          required
        />

        {/* 💲 Salary input with $ prefix */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="Зарплата"
            className="w-full border p-2 pl-7 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded w-full hover:bg-blue-700 transition"
        >
          Сохранить
        </button>
      </form>
    </div>
  );
};

export default VacancyEditPage;
