import React from "react";
import { useEffect } from "react";
import Product from "../components/products/product";
import useProducts from "../hooks/useProducts";
import type { productType } from "../types";

const Products = () => {
  const { productsList, fetchProducts, isLoading, skip } = useProducts();

  useEffect(() => {
    fetchProducts();
  }, [skip]);

  return (
    <div className="bg-gray-950 w-full border border-gray-500 min-h-screen flex flex-col items-center space-y-6 px-4 py-3 md:px-10 md:py-6 text-white">
      <h2 className="font-bold text-xl">Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 w-full">
        {isLoading
          ? Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="bg-gray-800 animate-pulse rounded-md p-3 space-y-3 border border-gray-700"
              >
                <div className="w-full h-60 bg-gray-700 rounded-lg" />
                <div className="w-3/4 h-5 bg-gray-700 rounded" />
              </div>
            ))
          : productsList?.map((prod: productType) => (
              <Product product={prod} key={prod.id} />
            ))}
      </div>
    </div>
  );
};

export default Products;
