import { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import type { productType } from "../types";
import Card from "../components/ui/Card";
import React from "react";

const InfiniteScroll = () => {
  const loader = useRef<null | HTMLDivElement>(null);
  const [products, setProducts] = useState<productType[]>([]);
  const [hasMore, setHasmore] = useState(true);
  const [skip, setSkip] = useState(0);

  const fetchProducts = async (skip: number) => {
    try {
      const response = await axiosInstance.get(
        `https://dummyjson.com/products?limit=10&skip=${skip}`
      );
      if (response?.data?.products?.length === 0) {
        setHasmore(false);
      }
      setProducts((prev) => [...prev, ...response?.data?.products]);
      setSkip((prev) => prev + 10);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts(skip);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      console.log(entries);
      if (target?.isIntersecting && hasMore) {
        fetchProducts(skip);
      }
    });
    if (loader?.current) {
      observer.observe(loader.current);
    }
  }, [hasMore]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="max-w-2xl h-96 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products?.map((product: productType) => (
            <Card className="h-32" key={product?.id}>
              {product?.title}
            </Card>
          ))}
        </div>
        <div ref={loader}>Loading...</div>
      </div>
    </div>
  );
};

export default InfiniteScroll;
