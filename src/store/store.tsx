import { Headphones, Shirt, Smartphone, Watch } from "lucide-react";
import { create } from "zustand";
import type { expense, income, product, storeType } from "../types";

const useStore = create<storeType>((set) => ({
  products: [
    {
      id: 1,
      name: "Classic T-Shirt",
      price: 450,
      icon: Shirt,
      color: "bg-blue-50",
      inCart: true,
      quantity: 1,
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 2999,
      icon: Watch,
      color: "bg-purple-50",
      inCart: true,
      quantity: 1,
    },
    {
      id: 3,
      name: "Wireless Earbuds",
      price: 1499,
      icon: Headphones,
      color: "bg-pink-50",
      inCart: true,
      quantity: 1,
    },
    {
      id: 4,
      name: "Smartphone",
      price: 15999,
      icon: Smartphone,
      color: "bg-green-50",
      inCart: true,
      quantity: 1,
    },
  ],
  income: [],
  expenses: [],
  addToCart: (item: product) =>
    set((state) => ({ products: [...state.products, item] })),
  removeFromCart: (id: number) =>
    set((state) => ({
      products: state.products?.filter((p: product) => p?.id !== id),
    })),
  increaseQuantity: (id: number) =>
    set((state) => ({
      products: state?.products?.map((prod: product) =>
        prod?.id === id ? { ...prod, quantity: prod?.quantity + 1 } : prod
      ),
    })),
  decreaseQuantity: (id: number) =>
    set((state) => ({
      products: state?.products
        ?.map((prod) =>
          prod?.id === id
            ? { ...prod, quantity: prod?.quantity - 1 }
            : { ...prod }
        )
        .filter((prod: product) => prod?.quantity >= 1),
    })),
  addIncome: (item: income) =>
    set((state) => ({
      income: [...state.income, item],
    })),
  addExpenses: (item: expense) =>
    set((state) => ({
      expenses: [...state.expenses, item],
    })),
}));

export default useStore;
