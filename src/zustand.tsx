import { create } from "zustand";

interface product{
    id:number,
    name:string,
    price:number,
    quantity:number
}

interface state {
  products: product[];
  addToCart: (data: product) => void;
  increaseQuantity: (id: number) => void;
}

const usezustandStore = create<state>((set) => ({
  products: [

  ],
  addToCart: (data) =>
    set((state) => ({ products: [...state.products, data] })),
  increaseQuantity: (id: number) =>
    set((state) => ({
      products: state.products?.map((item) =>
        item?.id === id ? { ...item, quantity: item?.quantity + 1 } : item
      ),
    })),
}));

export default usezustandStore;
