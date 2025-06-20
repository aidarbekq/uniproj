import React, { useEffect, useState } from "react";
import api from "@/services/api";

interface Graduate {
  id: number;
  user: string;
  graduation_year: number;
  specialty: string;
  is_employed: boolean;
  employer: number | null;
  position: string;
}

const GraduatesPage: React.FC = () => {
  const [graduates, setGraduates] = useState<Graduate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGraduates = async () => {
      try {
        const res = await api.get("alumni/alumni-profiles/");
        setGraduates(res.data);
      } catch (error) {
        console.error("Ошибка загрузки выпускников", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGraduates();
  }, []);

  if (loading) return <p className="text-center mt-8">Загрузка...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Выпускники</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">ФИО</th>
              <th className="border px-4 py-2">Год выпуска</th>
              <th className="border px-4 py-2">Специальность</th>
              <th className="border px-4 py-2">Трудоустроен</th>
              <th className="border px-4 py-2">Должность</th>
            </tr>
          </thead>
          <tbody>
            {graduates.map((g) => (
              <tr key={g.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{g.user}</td>
                <td className="border px-4 py-2">{g.graduation_year}</td>
                <td className="border px-4 py-2">{g.specialty}</td>
                <td className="border px-4 py-2">{g.is_employed ? "Да" : "Нет"}</td>
                <td className="border px-4 py-2">{g.position || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GraduatesPage;
