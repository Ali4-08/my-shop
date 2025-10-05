import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import useCartStore from "../store/cartStore";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const items = useCartStore((s) => s.items);
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // 📱 بستن منوی موبایل وقتی عرض صفحه بزرگ میشه (مثلاً از موبایل → دسکتاپ)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 640px)");
    

    // تابعی برای هندل تغییر سایز
    const handleResize = (e) => {
      if (e.matches) {
        setIsOpen(false); // یعنی رفتیم به حالت دسکتاپ        
      }
    };

    // گوش بده به تغییر سایز
    mediaQuery.addEventListener("change", handleResize);

    // پاکسازی هنگام unmount
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);


  return (
    <nav className="bg-white dark:bg-gray-800 shadow">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* دکمه همبرگری موبایل */}
        <button
          className="sm:hidden text-2xl font-semibold self-start"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        {/* لینک‌ها سمت راست */}
        <div className="hidden sm:flex sm:items-center gap-4">
          <Link to="/" className="text-sm">
            خانه
          </Link>

          {/* اگر لاگین نکرده */}
          {!user && (
            <>
              <Link to="/login" className="text-sm">
                ورود
              </Link>
              <Link to="/register" className="text-sm">
                ثبت‌ نام
              </Link>
            </>
          )}

          {/* اگر لاگین کرده */}
          {user && (
            <>
              <span className="text-sm text-gray-700 dark:text-gray-200">
                👤 {user.email || user.name}
              </span>
              <button
                onClick={logout}
                className="text-sm text-red-500 hover:underline"
              >
                خروج
              </button>
            </>
          )}

          {/* سبد خرید */}
          <Link to="/cart" className="text-sm flex items-center gap-1">
            سبد
            <span className="bg-red-500 text-white text-sm font-semibold leading-2 px-2 py-1 rounded-full">
              {items.length}
            </span>
          </Link>
        </div>

        {/* منو موبایل */}
        {isOpen && (
          <div className="md:hidden flex flex-col items-start bg-white dark:bg-gray-800 px-4 pb-4 gap-2">
            <Link to="/" className="text-sm" onClick={() => setIsOpen(false)}>
              خانه
            </Link>

            {!user && (
              <>
                <Link
                  to="/login"
                  className="text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  ورود
                </Link>
                <Link
                  to="/register"
                  className="text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  ثبت‌نام
                </Link>
              </>
            )}

            {user && (
              <>
                <span className="text-sm text-gray-700 dark:text-gray-200">
                  👤 {user.email || user.name}
                </span>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="text-sm text-red-500 hover:underline"
                >
                  خروج
                </button>
              </>
            )}

            <Link
              to="/cart"
              className="text-sm flex items-center gap-1"
              onClick={() => setIsOpen(false)}
            >
              سبد
              <span className="bg-red-500 text-white text-xs font-semibold px-2 rounded-full">
                {items.length}
              </span>
            </Link>

            <button onClick={toggleTheme} className="text-xl">
              {theme === "light" ? "🌙 تاریک" : "🌞 روشن"}
            </button>
          </div>
        )}

        {/* دکمه تغییر تم */}
        <button
          className="text-xl cursor-pointer hidden sm:block"
          aria-label="Toggle theme"
          onClick={toggleTheme}
        >
          {theme === "light" ? "🌙" : "🌞"}
        </button>

        {/* لوگو */}
        <Link to="/" className="text-lg font-bold hidden sm:block">
          🛍️ MyShop
        </Link>
      </div>
    </nav>
  );
}
