import React, { useEffect, useState } from "react";
import api from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";

interface UserInfo {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: "ALUMNI" | "EMPLOYER" | "ADMIN";
}

interface Profile {
  id: number;
  graduation_year: number;
  specialty: string;
  is_employed: boolean;
  employer: number | null;
  resume: string | null;
  position: string;
  user: number | UserInfo;
}

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    graduation_year: "",
    specialty: "",
    is_employed: false,
    position: "",
    first_name: "",
    last_name: "",
    email: "",
  });

  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        const res = await api.get("alumni/alumni-profiles/");
        const my = res.data.find((p: Profile) => {
          if (typeof p.user === "object") return p.user.id === user?.id;
          return p.user === user?.id;
        });

        if (!my) {
          setProfile(null);
          return;
        }

        setProfile(my);
        const userInfo = typeof my.user === "object" ? my.user : null;
        setFormData({
          graduation_year: my.graduation_year.toString(),
          specialty: my.specialty,
          is_employed: my.is_employed,
          position: my.position || "",
          first_name: userInfo?.first_name || "",
          last_name: userInfo?.last_name || "",
          email: userInfo?.email || "",
        });
      } catch (error) {
        console.error("Ошибка профиля выпускника", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchMyProfile();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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
        api.put(`alumni/alumni-profiles/${profile.id}/`, {
          graduation_year: formData.graduation_year,
          specialty: formData.specialty,
          is_employed: formData.is_employed,
          position: formData.position,
        }),
      ]);
      setSuccessMessage("✅ Профиль успешно обновлён!");
      setTimeout(() => setSuccessMessage(""), 4000);
      setIsEditing(false);
    } catch (error) {
      console.error("Ошибка при обновлении", error);
    }
  };

  const handleCancel = () => {
    if (!profile) return;
    const userInfo = typeof profile.user === "object" ? profile.user : null;
    setFormData({
      graduation_year: profile.graduation_year.toString(),
      specialty: profile.specialty,
      is_employed: profile.is_employed,
      position: profile.position || "",
      first_name: userInfo?.first_name || "",
      last_name: userInfo?.last_name || "",
      email: userInfo?.email || "",
    });
    setIsEditing(false);
  };

  if (loading) return <p className="text-center mt-8">Загрузка...</p>;
  if (!profile) return <p className="text-center mt-8 text-red-600">Профиль не найден</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <h1 className="text-3xl font-bold mb-4 text-blue-800">Мой профиль</h1>

      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-800 rounded-md text-sm shadow-sm">
          {successMessage}
        </div>
      )}

      {!isEditing ? (
        <div className="space-y-2 text-gray-800">
          <p><strong>Имя:</strong> {formData.first_name}</p>
          <p><strong>Фамилия:</strong> {formData.last_name}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Год выпуска:</strong> {formData.graduation_year}</p>
          <p><strong>Специальность:</strong> {formData.specialty}</p>
          <p><strong>Трудоустроен:</strong> {formData.is_employed ? "Да" : "Нет"}</p>
          <p><strong>Должность:</strong> {formData.position || "—"}</p>
          <div className="mt-8 text-right">
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
              onClick={() => setIsEditing(true)}
            >
              Редактировать
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="Имя"
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Фамилия"
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="graduation_year"
            value={formData.graduation_year}
            onChange={handleChange}
            placeholder="Год выпуска"
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="specialty"
            value={formData.specialty}
            onChange={handleChange}
            placeholder="Специальность"
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="is_employed"
              checked={formData.is_employed}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span className="text-gray-700">Трудоустроен</span>
          </label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            placeholder="Должность"
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-4 pt-2">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition w-full"
            >
              Сохранить
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-blue-100 text-blue-700 py-2 px-4 rounded-lg hover:bg-blue-200 transition w-full"
            >
              Отмена
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProfilePage;
