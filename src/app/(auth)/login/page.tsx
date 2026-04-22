"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import GoogleLoginButton from "@/components/ui/GoogleLoginButton";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // 1. ЗМІНИЛИ НА НАШ НОВИЙ БЕКЕНД І POST-ЗАПИТ
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // 2. ЯКЩО БЕКЕНД ВІДПОВІВ УСПІШНО (пароль підійшов)
      if (res.ok) {
        const user = await res.json(); // Отримуємо об'єкт {id, email, name, role}

        // Зберігаємо дані в пам'ять браузера
        localStorage.setItem("userId", user.id); // Щоб працювало створення івентів
        localStorage.setItem("kaeru_user", JSON.stringify(user)); // Для твого дизайну

        router.push("/");
        router.refresh();
      } else {
        // Якщо помилка (наприклад, невірний пароль) - дістаємо текст помилки з бекенду
        const errorData = await res.json();
        setError(errorData.error || "Невірний email або пароль.");
      }
    } catch (err) {
      setError("Помилка з'єднання з сервером.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[100dvh] max-w-md mx-auto px-4 py-12">
      
      {/* КНОПКА НАЗАД */}
      <Link href="/" className="fixed top-6 left-6 md:top-10 md:left-10 w-12 h-12 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-m-t rounded-full transition-colors z-50 shadow-sm">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
      </Link>

      <div className="text-center mb-8 w-full mt-10 md:mt-0">
        <h1 className="text-3xl md:text-4xl font-black text-m-t mb-2">З поверненням!</h1>
        <p className="text-gray-d text-sm md:text-base">Увійдіть у свій акаунт, щоб продовжити</p>
      </div>

      <div className="w-full bg-white p-6 md:p-8 rounded-[32px] border border-gray-l shadow-sm">
        <div className="flex flex-col gap-3 mb-6">
          <div className="w-full mb-1">
            <GoogleLoginButton />
          </div>
          <button className="w-full h-10 flex items-center justify-center gap-3 bg-black text-white rounded-full font-bold text-sm hover:bg-gray-800 transition-colors">
              Продовжити з Apple
          </button>
          <button className="w-full h-10 flex items-center justify-center gap-3 bg-[#1877F2] text-white rounded-full font-bold text-sm hover:bg-[#166FE5] transition-colors">
              Продовжити з Facebook
          </button>
        </div>

        <div className="relative flex items-center py-2 mb-6">
          <div className="flex-grow border-t border-gray-l"></div>
          <span className="flex-shrink-0 mx-4 text-gray-d text-[10px] font-bold uppercase tracking-widest">Або через пошту</span>
          <div className="flex-grow border-t border-gray-l"></div>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}
          <input type="email" placeholder="Email адреса" value={email} onChange={e => setEmail(e.target.value)} className="w-full h-14 px-5 bg-transparent border border-gray-l rounded-2xl outline-none focus:border-orange text-m-t" required />
          <input type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} className="w-full h-14 px-5 bg-transparent border border-gray-l rounded-2xl outline-none focus:border-orange text-m-t" required />
          <button type="submit" className="w-full h-14 mt-2 bg-orange text-white font-bold rounded-2xl hover:opacity-90 transition-opacity text-lg">Увійти</button>
        </form>
      </div>

      <div className="mt-8 text-center pb-6">
        <p className="text-m-t text-sm">Ще немає акаунту? <Link href="/register" className="text-orange font-bold hover:underline">Зареєструватися</Link></p>
      </div>
    </div>
  );
}