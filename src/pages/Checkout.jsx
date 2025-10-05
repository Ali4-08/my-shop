import { useState } from "react";
import useCartStore from "../store/cartStore";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { items, getTotal, clearCart } = useCartStore();
  const navigate = useNavigate();

  // state برای فرم
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
  });

  const [success, setSuccess] = useState(false);

  // تغییر ورودی‌های فرم
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ارسال فرم
  const handleSubmit = (e) => {
    e.preventDefault();

    // اگر سبد خالی بود
    if (items.length === 0) {
      alert("سبد خرید شما خالی است!");
      return;
    }

    // اعتبارسنجی ساده
    if (!form.name || !form.email || !form.address) {
      alert("لطفا همه فیلدها را پر کنید.");
      return;
    }

    // شبیه‌سازی پرداخت
    setTimeout(() => {
      clearCart(); // پاک کردن سبد
      setSuccess(true); // نمایش پیام موفقیت
    }, 1000);
  };

  // اگر خرید موفق بود
  if (success) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          ✅ پرداخت موفقیت‌آمیز بود!
        </h1>
        <p className="mb-6">سفارش شما ثبت شد. با تشکر از خریدتان ❤️</p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          بازگشت به فروشگاه
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">تسویه حساب</h1>

      {/* خلاصه سفارش */}
      <div className="mb-6 border p-4 rounded">
        <h2 className="font-semibold mb-2">خلاصه سفارش:</h2>
        {items.map((item) => (
          <p key={item.id}>
            {item.title} × {item.qty} = {(item.price * item.qty).toLocaleString()} تومان
          </p>
        ))}
        <p className="mt-2 font-bold">مجموع: {getTotal().toLocaleString()} تومان</p>
      </div>

      {/* فرم پرداخت */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="نام و نام خانوادگی"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="ایمیل"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <textarea
          name="address"
          placeholder="آدرس"
          value={form.address}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded w-full"
        >
          پرداخت
        </button>
      </form>
    </div>
  );
}
