import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    first_name: "",
    last_name: "", 
    role: "ALUMNI",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (formData.password !== formData.password2) {
      setError("Пароли не совпадают.");
      return;
    }
    try {
      await register(formData);
      navigate("/dashboard");
    } catch (err) {
      setError("Ошибка регистрации. Проверьте данные.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md rounded-xl shadow-md p-6 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Регистрация</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div className="grid grid-cols-2 gap-4">
          <input
            name="first_name"
            placeholder="Имя"
            value={formData.first_name}
            onChange={handleChange}
            className="input w-full border p-2 rounded"
            required
          />
          <input
            name="last_name"
            placeholder="Фамилия"
            value={formData.last_name}
            onChange={handleChange}
            className="input w-full border p-2 rounded"
            required
          />
        </div>

        <input
          name="username"
          placeholder="Логин"
          value={formData.username}
          onChange={handleChange}
          className="input w-full border p-2 rounded"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="input w-full border p-2 rounded"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={handleChange}
          className="input w-full border p-2 rounded"
          required
        />
        <input
          name="password2"
          type="password"
          placeholder="Повторите пароль"
          value={formData.password2}
          onChange={handleChange}
          className="input w-full border p-2 rounded"
          required
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="input w-full border p-2 rounded"
        >
          <option value="ALUMNI">Выпускник</option>
          <option value="EMPLOYER">Работодатель</option>
        </select>

        <button
          type="submit"
          className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded w-full transition-colors"
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
