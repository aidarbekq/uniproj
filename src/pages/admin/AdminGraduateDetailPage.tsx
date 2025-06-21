import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/services/api";
import Button from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/common/Card";
import { toast } from "sonner";

const AdminGraduateDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [graduate, setGraduate] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    specialty: "",
    graduation_year: "",
    position: "",
    is_employed: false,
    employer: "",
  });

  useEffect(() => {
    api.get(`alumni/alumni-profiles/${id}/`)
      .then((res) => {
        setGraduate(res.data);
        setForm({
          specialty: res.data.specialty || "",
          graduation_year: res.data.graduation_year?.toString() || "",
          position: res.data.position || "",
          is_employed: res.data.is_employed || false,
          employer: res.data.employer?.toString() || "",
        });
      })
      .catch((err) => {
        console.error("Ошибка загрузки профиля:", err);
        toast.error("Не удалось загрузить профиль");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const payload = {
        specialty: form.specialty,
        graduation_year: parseInt(form.graduation_year),
        position: form.position,
        is_employed: form.is_employed,
        employer: form.employer || null,
      };

      console.log("⏫ Отправка данных:", payload);
      await api.put(`alumni/alumni-profiles/${id}/`, payload);
      toast.success("Профиль успешно обновлён");
      navigate("/admin/graduates");
    } catch (error) {
      console.error(" Ошибка обновления профиля:", error);
      toast.error("Ошибка при сохранении. Проверьте данные.");
    }
  };

  const handleDelete = async () => {
    if (confirm("Удалить выпускника?")) {
      try {
        await api.delete(`alumni/alumni-profiles/${id}/`);
        toast.success("Профиль удалён");
        navigate("/admin/graduates");
      } catch (error) {
        console.error(" Ошибка удаления:", error);
        toast.error("Ошибка при удалении профиля");
      }
    }
  };

  if (loading || !graduate) return <p className="text-center mt-10">Загрузка...</p>;

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">
        Выпускник: {graduate.user.first_name} {graduate.user.last_name}
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Редактирование профиля</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            name="specialty"
            label="Специальность"
            value={form.specialty}
            onChange={handleChange}
          />
          <Input
            name="graduation_year"
            label="Год выпуска"
            value={form.graduation_year}
            onChange={handleChange}
            type="number"
          />
          <Input
            name="position"
            label="Должность"
            value={form.position}
            onChange={handleChange}
          />
          <Input
            name="employer"
            label="ID работодателя"
            value={form.employer}
            onChange={handleChange}
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="is_employed"
              checked={form.is_employed}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <span>Трудоустроен</span>
          </label>

          {graduate.resume && (
            <a
              href={graduate.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline block"
            >
              📎 Скачать резюме
            </a>
          )}

          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              className="text-red-600 border-red-500 hover:bg-red-100"
              onClick={handleDelete}
            >
              Удалить
            </Button>
            <Button onClick={handleUpdate}>Сохранить</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminGraduateDetailPage;
