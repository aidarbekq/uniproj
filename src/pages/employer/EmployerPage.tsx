import React, { useEffect, useState } from "react";
import api from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface UserInfo {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

interface EmployerProfile {
  id: number;
  company_name: string;
  address: string;
  phone: string;
  description: string;
  user: UserInfo;
}

const EmployerPage: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<EmployerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    company_name: "",
    address: "",
    phone: "",
    description: "",
    first_name: "",
    last_name: "",
    email: "",
  });

  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        const res = await api.get("employers/employers/");
        const my = res.data.find((p: EmployerProfile) =>
          p.user?.id === user?.id
        );

        if (!my) {
          setProfile(null);
          toast.error("Профиль работодателя не найден");
          return;
        }

        setProfile(my);
        setFormData({
          company_name: my.company_name,
          address: my.address,
          phone: my.phone,
          description: my.description,
          first_name: my.user.first_name || "",
          last_name: my.user.last_name || "",
          email: my.user.email || "",
        });
      } catch (error) {
        console.error("❌ Ошибка загрузки профиля", error);
        toast.error("Ошибка загрузки профиля работодателя");
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchMyProfile();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    try {
      await Promise.all([
        api.put("users/me/", {
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
        }),
        api.put(`employers/employers/${profile.id}/`, {
          company_name: formData.company_name,
          address: formData.address,
          phone: formData.phone,
          description: formData.description,
        }),
      ]);
      toast.success("Профиль успешно обновлён");
      setIsEditing(false);
    } catch (error) {
      console.error("❌ Ошибка при сохранении", error);
      toast.error("Не удалось обновить профиль");
    }
  };

  const handleCancel = () => {
    if (!profile) return;
    setFormData({
      company_name: profile.company_name,
      address: profile.address,
      phone: profile.phone,
      description: profile.description,
      first_name: profile.user.first_name || "",
      last_name: profile.user.last_name || "",
      email: profile.user.email || "",
    });
    setIsEditing(false);
  };

  if (loading) return <p className="text-center mt-8">Загрузка...</p>;
  if (!profile) return <p className="text-center mt-8 text-red-600">Профиль не найден</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Профиль работодателя</h1>

      {!isEditing ? (
        <div className="space-y-3 text-gray-800 text-base">
          <p><strong>Компания:</strong> {formData.company_name}</p>
          <p><strong>Адрес:</strong> {formData.address}</p>
          <p><strong>Телефон:</strong> {formData.phone}</p>
          <p><strong>Описание:</strong> {formData.description}</p>
          <p><strong>Имя:</strong> {formData.first_name}</p>
          <p><strong>Фамилия:</strong> {formData.last_name}</p>
          <p><strong>Email:</strong> {formData.email}</p>

          <div className="pt-6 text-right">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Редактировать
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <input
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            placeholder="Компания"
            className="w-full border border-gray-300 p-2 rounded"
          />
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Адрес"
            className="w-full border border-gray-300 p-2 rounded"
          />
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Телефон"
            className="w-full border border-gray-300 p-2 rounded"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Описание"
            className="w-full border border-gray-300 p-2 rounded"
            rows={3}
          />
          <input
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="Имя"
            className="w-full border border-gray-300 p-2 rounded"
          />
          <input
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Фамилия"
            className="w-full border border-gray-300 p-2 rounded"
          />
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border border-gray-300 p-2 rounded"
          />

          <div className="flex gap-4 pt-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              Сохранить
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded hover:bg-gray-200 transition"
            >
              Отмена
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EmployerPage;
