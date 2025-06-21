import React, { useEffect, useState } from "react";
import { Search, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "@/services/api";
import Button from "@/components/common/Button";

interface Employer {
  id: number;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
  };
  company_name: string;
  address: string;
  phone: string;
  description: string | null;
}

const EmployersPage: React.FC = () => {
  const [employers, setEmployers] = useState<Employer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployers = async () => {
      try {
        const res = await api.get("employers/employers/");
        setEmployers(res.data);
      } catch (error) {
        console.error("Ошибка загрузки работодателей", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployers();
  }, []);

  const filtered = employers.filter((e) => {
    const lower = search.toLowerCase();
    return (
      e.company_name?.toLowerCase().includes(lower) ||
      e.address?.toLowerCase().includes(lower) ||
      e.phone?.toLowerCase().includes(lower) ||
      (e.description?.toLowerCase() || "").includes(lower)
    );
  });

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Загрузка работодателей...</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-6">
      <h1 className="text-3xl font-bold text-blue-800">Список работодателей</h1>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type="text"
          placeholder="Поиск по названию, адресу, описанию..."
          className="w-full border pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full text-sm text-left bg-white">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="px-4 py-3 border-b">Компания</th>
              <th className="px-4 py-3 border-b">Адрес</th>
              <th className="px-4 py-3 border-b">Телефон</th>
              <th className="px-4 py-3 border-b">Описание</th>
              <th className="px-4 py-3 border-b">Действия</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((e) => (
                <tr key={e.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-2 border-b font-medium">{e.company_name}</td>
                  <td className="px-4 py-2 border-b">{e.address}</td>
                  <td className="px-4 py-2 border-b">{e.phone}</td>
                  <td className="px-4 py-2 border-b">{e.description || "—"}</td>
                  <td className="px-4 py-2 border-b">
                    <Button
                      size="sm"
                      variant="outline"
                      leftIcon={<Eye className="h-4 w-4" />}
                      onClick={() => navigate(`/admin/employers/${e.id}`)}
                    >
                      Просмотр
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  Ничего не найдено.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployersPage;
