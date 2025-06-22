import React, { useEffect, useState } from "react";
import api from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import Button from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/common/Card";

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
  graduation_year: number | null;
  specialty: string | null;
  is_employed: boolean;
  employer: number | null;
  resume: string | null;
  position: string | null;
  user: number | UserInfo;
}

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
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
    const fetchProfile = async () => {
      try {
        const res = await api.get("alumni/alumni-profiles/");
        const my = res.data.find((p: Profile) =>
          typeof p.user === "object" ? p.user.id === user?.id : p.user === user?.id
        );
        if (!my) return;

        setProfile(my);
        const userInfo = typeof my.user === "object" ? my.user : null;
        setFormData({
          graduation_year: my.graduation_year?.toString() || "",
          specialty: my.specialty || "",
          is_employed: my.is_employed,
          position: my.position || "",
          first_name: userInfo?.first_name || "",
          last_name: userInfo?.last_name || "",
          email: userInfo?.email || "",
        });
      } catch {
        toast.error("Ошибка загрузки профиля");
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchProfile();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        api.patch(`alumni/alumni-profiles/${profile.id}/`, {
          graduation_year: formData.graduation_year
            ? Number(formData.graduation_year)
            : null,
          specialty: formData.specialty || null,
          is_employed: formData.is_employed,
          position: formData.position || null,
        }),
      ]);
      toast.success("Профиль успешно обновлён");
      setIsEditing(false);
    } catch {
      toast.error("Ошибка при обновлении профиля");
    }
  };

  const handleCancel = () => {
    if (!profile) return;
    const userInfo = typeof profile.user === "object" ? profile.user : null;
    setFormData({
      graduation_year: profile.graduation_year?.toString() || "",
      specialty: profile.specialty || "",
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
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Мой профиль</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isEditing ? (
            <div className="text-gray-800 text-base space-y-2">
              <p><strong>Имя:</strong> {formData.first_name}</p>
              <p><strong>Фамилия:</strong> {formData.last_name}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Год выпуска:</strong> {formData.graduation_year || "—"}</p>
              <p><strong>Специальность:</strong> {formData.specialty || "—"}</p>
              <p><strong>Трудоустроен:</strong> {formData.is_employed ? "Да" : "Нет"}</p>
              <p><strong>Должность:</strong> {formData.position || "—"}</p>
              <div className="pt-4 text-right">
                <Button onClick={() => setIsEditing(true)}>Редактировать</Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { name: "first_name", label: "Имя" },
                { name: "last_name", label: "Фамилия" },
                { name: "email", label: "Email", type: "email" },
                { name: "graduation_year", label: "Год выпуска", type: "number" },
                { name: "specialty", label: "Специальность" },
                { name: "position", label: "Должность" },
              ].map(({ name, label, type = "text" }) => (
                <div key={name}>
                  <label
                    htmlFor={name}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {label}
                  </label>
                  <Input
                    id={name}
                    name={name}
                    type={type}
                    value={(formData as any)[name]}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="is_employed"
                  checked={formData.is_employed}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <label htmlFor="is_employed" className="text-sm text-gray-700">
                  Трудоустроен
                </label>
              </div>
              <div className="flex gap-4 pt-2">
                <Button type="submit" className="w-full">
                  Сохранить
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  className="w-full"
                >
                  Отмена
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
