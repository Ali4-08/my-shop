import useCartStore from "../store/cartStore";
import toast from "react-hot-toast";
import { motion } from "framer-motion";


export default function Cart() {
  const { items, updateQty, removeItem, getTotal } = useCartStore();

  

  if (items.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold">سبد خرید شما خالی است 🛒</h2>
      </div>
    );
  }

  return (
    <motion.div
      className="p-6 max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-2xl font-bold mb-6">سبد خرید</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b pb-4"
          >
            {/* عکس محصول */}
            <img
              src={item.images[0]}
              alt={item.title}
              className="w-20 h-20 object-cover rounded"
            />

            {/* اطلاعات محصول */}
            <div className="flex-1 px-4">
              <h2 className="font-semibold">{item.title}</h2>
              <p className="text-gray-600">
                {item.price.toLocaleString()} تومان
              </p>
            </div>

            {/* کنترل تعداد */}
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  updateQty(item.id, item.qty > 1 ? item.qty - 1 : 1)
                }
                className="px-2 py-1 bg-gray-200 rounded"
              >
                -
              </button>
              <span>{item.qty}</span>
              <button
                onClick={() => updateQty(item.id, item.qty + 1)}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                +
              </button>
            </div>

            {/* دکمه حذف */}
            <button
              onClick={() => {
                removeItem(item.id);
                toast.error(`${item.title} از فاکتور خارج شد. ❌`);
              }}
              className="mr-4 text-red-500 hover:underline"
            >
              حذف
            </button>
          </div>
        ))}
      </div>

      {/* جمع کل */}
      <div className="mt-6 text-right">
        <p className="text-xl font-bold">
          مجموع: {getTotal().toLocaleString()} تومان
        </p>
      </div>
    </motion.div>
  );
}
