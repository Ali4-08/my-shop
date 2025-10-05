import useCartStore from "../store/cartStore";

export default function CartItem({ item }) {
  const { updateQty, removeItem } = useCartStore();

  return (
    <div className="flex items-center justify-between border-b py-2">
      
      <div>
        <h3 className="font-medium">{item.title}</h3>
        <p className="text-sm text-gray-500">
          {item.price.toLocaleString()} تومان
        </p>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="number"
          min="1"
          value={item.qty}
          onChange={(e) => updateQty(item.id, parseInt(e.target.value))}
          className="w-16 border rounded text-center"
        />
        <button
          onClick={() => removeItem(item.id)}
          className="text-red-500 hover:text-red-700"
        >
          حذف
        </button>
      </div>

    </div>
  );
}
