import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(username, password);
      const role = localStorage.getItem("role") || "ALUMNI";
      if (role === "ALUMNI") navigate("/graduate/profile");
      else if (role === "EMPLOYER") navigate("/employer/dashboard");
      else if (role === "ADMIN") navigate("/admin/dashboard");
      else navigate("/");
    } catch {
      setError("Неверный логин или пароль");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md rounded-xl shadow-md p-6 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Вход</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Логин</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border p-2 rounded focus:outline-none focus:ring focus:border-primary-500"
            placeholder="Введите логин"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded focus:outline-none focus:ring focus:border-primary-500"
            placeholder="Введите пароль"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded w-full transition-colors"
        >
          Войти
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
