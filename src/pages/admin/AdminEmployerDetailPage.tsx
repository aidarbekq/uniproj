// src/pages/admin/AdminEmployerDetailPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/services/api";
import Button from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { Loader2, Trash2, Save } from "lucide-react";
import { toast } from "sonner";

interface Employer {
  id: number;
  user: string;
  company_name: string;
  address: string;
  phone: string;
  description: string;
}

const AdminEmployerDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employer, setEmployer] = useState<Employer | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get(`employers/employers/${id}/`);
        setEmployer(res.data);
      } catch {
        setError("❌ Не удалось загрузить работодателя");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!employer) return;
    setEmployer({ ...employer, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!employer) return;
    setSaving(true);
    try {
      await api.put(`employers/employers/${employer.id}/`, employer);
      toast.success("Данные успешно обновлены");
    } catch {
      toast.error(" Ошибка при обновлении данных");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!employer) return;
    if (!confirm("Удалить этого работодателя?")) return;
    try {
      await api.delete(`employers/employers/${employer.id}/`);
      toast.success(" Работодатель удалён");
      navigate("/admin/employers");
    } catch {
      toast.error(" Ошибка при удалении");
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Загрузка...</p>;

  if (error || !employer)
    return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Детали работодателя</h1>

      <div className="space-y-4">
        <Input
          label="Компания"
          name="company_name"
          value={employer.company_name}
          onChange={handleChange}
        />
        <Input
          label="Адрес"
          name="address"
          value={employer.address}
          onChange={handleChange}
        />
        <Input
          label="Телефон"
          name="phone"
          value={employer.phone}
          onChange={handleChange}
        />
        <Input
          label="Описание"
          name="description"
          value={employer.description}
          onChange={handleChange}
        />
      </div>

      <div className="flex justify-between pt-6">
        <Button variant="danger" leftIcon={<Trash2 />} onClick={handleDelete}>
          Удалить
        </Button>
        <Button
          variant="primary"
          leftIcon={saving ? <Loader2 className="animate-spin" /> : <Save />}
          onClick={handleUpdate}
          disabled={saving}
        >
          Сохранить
        </Button>
      </div>
    </div>
  );
};

export default AdminEmployerDetailPage;
