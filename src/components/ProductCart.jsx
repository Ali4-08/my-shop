import { Link } from "react-router-dom";
import useCartStore from "../store/cartStore";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

export default function ProductCart({ product }) {
  const addItem = useCartStore((s) => s.addItem);

  const {user} = useAuth();
  const navigate = useNavigate();

    const handleAddToCart = () => {
    if (!user) {
      toast.error("لطفا اول وارد حساب کاربری شوید");
      navigate("/login");
      return;
    }
      addItem(product);
      toast.success("محصول به سبد اضافه شد 🛒");
    }

  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white dark:bg-gray-800 flex flex-col translate hover:scale-101 hover:shadow-2xl transition">
      <img
        src={product.images}
        alt={product.title}
        className="h-40 w-full rounded-md object-cover mb-2"
      />

      <h2 className="text-lg font-semibold">{product.title}</h2>

      <p className="text-gray-600 dark:text-gray-300">
        {product.price.toLocaleString()} تومان
      </p>

      <div className="mt-auto flex gap-2">
        <Link
          to={`/product/${product.id}`}
          className="flex-1 text-center bg-blue-500 text-white hover:bg-blue-600 py-1 rounded"
        >
          جزییات
        </Link>

        <button
          onClick={() => handleAddToCart()}
          className="flex-1 bg-green-500 text-white py-1 rounded hover:bg-green-600"
        >
          افزودن
        </button>
      </div>
    </div>
  );
}
