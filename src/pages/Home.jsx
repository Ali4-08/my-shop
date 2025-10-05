import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import SkeletonCard from "../components/SkeletonCard";

import products from "../data/products.json";
import ProductCart from "../components/ProductCart";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  // 📌 Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  // 1) فیلتر کردن بر اساس جستجو
  let filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  // 2) فیلتر کردن بر اساس دسته‌بندی
  if (category !== "all") {
    filtered = filtered.filter((p) => p.category === category);
  }

  // محاسبه صفحه‌ها
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  return (
    <motion.div
      className="container mx-auto p-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <SearchBar value={search} onChange={setSearch} />
        <CategoryFilter value={category} onChange={setCategory} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-4">
        {loading
          ? Array.from({ length: itemsPerPage }).map((_, i) => (
              <SkeletonCard key={i} />
            ))
          : currentItems.map((p) => <ProductCart key={p.id} product={p} />)}
      </div>

      {/* Pagination Controls */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            قبلی
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            بعدی
          </button>
        </div>
      )}
    </motion.div>
  );
}
