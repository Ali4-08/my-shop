import { useParams } from "react-router-dom";
import products from "../data/products.json";
import useCartStore from "../store/cartStore";
import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

export default function ProductDetail() {
  // گرفتن id از آدرس
  const { id } = useParams();

  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!user) {
      toast.error("لطفا اول وارد حساب کاربری شوید");
      navigate("/login");
      return;
    }

    addItem(product);
    toast.success("محصول به سبد اضافه شد 🛒");
  };

  // پیدا کردن محصول از روی json
  const product = products.find((p) => p.id === id);

  // برای تغییر عکس اصلی (گالری)
  const [mainImage, setMainImage] = useState(product.images[0]);

  // دسترسی به متد addItem از zustand
  const addItem = useCartStore((state) => state.addItem);

  // اگر محصول پیدا نشد
  if (!product) {
    return <div className="p-6 text-center">محصول مورد نظر یافت نشد!</div>;
  }

  return (
    <motion.div
      className="p-6 grid md:grid-cols-2 gap-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.3 }}
    >
      {/* گالری عکس */}
      <div>
        <img
          src={mainImage}
          alt={product.title}
          className="w-full h-80 object-cover rounded-lg border"
        />
        <div className="flex gap-2 mt-3">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={product.title}
              onClick={() => setMainImage(img)}
              className={`w-20 h-20 object-cover rounded cursor-pointer border ${
                mainImage === img ? "border-blue-500" : "border-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* اطلاعات محصول */}
      <div>
        <h1 className="text-2xl font-bold mb-3">{product.title}</h1>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="text-xl font-semibold mb-6">
          {product.price.toLocaleString()} تومان
        </p>

        <button
          onClick={() => handleAddToCart()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          افزودن به سبد خرید
        </button>
      </div>
    </motion.div>
  );
}
