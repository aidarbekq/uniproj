import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Mail, Lock, GraduationCap, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/common/Card";
import Button from "@/components/common/Button";

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(username, password);

      const role = localStorage.getItem("role") || "ALUMNI";
      if (role === "ADMIN") navigate("/admin/dashboard");
      else if (role === "EMPLOYER") navigate("/employer/dashboard");
      else navigate("/graduate/profile");
    } catch {
      setError("Неверный логин или пароль");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-no-repeat bg-top bg-cover relative px-4"
      style={{
        backgroundImage:
          'url("https://scontent-hel3-1.xx.fbcdn.net/v/t39.30808-6/484180283_1136202744969487_8270886603001842588_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_ohc=O2aBccBO67YQ7kNvwGnHib5&_nc_oc=AdmXXK9SauFNKRQWFO6IH5sS-5Y40GsInuCdBI4Ek1wkJSgNCxfCYR6jbFTilrvPFwg&_nc_zt=23&_nc_ht=scontent-hel3-1.xx&_nc_gid=lpbaV__NxGulWXSYRFK93g&oh=00_AfOD4OaplFUmjYmReXQbAg0fV6IDOjKhLg4g_z0KnuacHA&oe=685E0FE9")',
      }}
    >
      <div className="absolute inset-0 bg-black/50 z-0" />
      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8 text-white">
          <div className="inline-flex justify-center items-center mb-4">
            <GraduationCap className="h-12 w-12 text-primary-300" />
          </div>
          <h1 className="text-3xl font-bold">Вход</h1>
          <p className="mt-2 text-gray-200">Войдите в ваш аккаунт</p>
        </div>

        <Card className="animate-slide-up backdrop-blur-sm bg-white/90 shadow-lg">
          <CardContent>
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md border border-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Логин
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="user123"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Пароль
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full py-2.5 flex justify-center items-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Входим...
                  </>
                ) : (
                  "Войти"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Нет аккаунта?{" "}
                <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
                  Зарегистрироваться
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
