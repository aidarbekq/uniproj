import React, { useEffect, useState } from "react";
import api from "@/services/api";

interface Employer {
  id: number;
  user: string;
  company_name: string;
  address: string;
  phone: string;
  description: string;
}

const EmployersPage: React.FC = () => {
  const [employers, setEmployers] = useState<Employer[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p className="text-center mt-8">Загрузка...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Работодатели</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Компания</th>
              <th className="border px-4 py-2">Адрес</th>
              <th className="border px-4 py-2">Телефон</th>
              <th className="border px-4 py-2">Описание</th>
            </tr>
          </thead>
          <tbody>
            {employers.map((e) => (
              <tr key={e.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2 font-semibold">{e.company_name}</td>
                <td className="border px-4 py-2">{e.address}</td>
                <td className="border px-4 py-2">{e.phone}</td>
                <td className="border px-4 py-2">{e.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployersPage;