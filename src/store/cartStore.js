import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
    persist(

        (set, get) => ({

            items: [],

              // اضافه کردن محصول
            addItem: (product) => {
                const items = get().items
                const existing = items.find((i) => i.id === product.id)

                if(existing){
                      // اگه محصول قبلاً وجود داشت، فقط تعدادش زیاد شه
                    set({
                        items: items.map((i) => 
                        i.id === product.id ? {...i, qty: i.qty + 1} : i),
                    })
                } else {
                      // اگه محصول جدید بود
                    set({
                        items: [...items, {...product, qty: 1}]
                    })
                }
            },

            updateQty: (id, qty) => {
                set({
                    items: get().items.map((i) =>
                    i.id === id ? {...i, qty: Math.max(qty, 1)} : i)
                })
            },

            removeItem: (id) => {
                set({
                    items: get().items.filter((i) => i.id !== id)
                })
            },

            clearCart: () => set({
                items: []
            }),

            getTotal: () => {
               return get().items.reduce((sum, i) => sum + i.qty * i.price, 0)
            }

        }),

        {
            name: "cart-storage"
        },
    ),
);

export default useCartStore;