import axios from "axios";
import { useState } from "react";
import type { productType } from "../types";

const useProducts = () => {
  const [skip, setSkip] = useState(0);
  const [productsList, setProductsList] = useState([]);
  const [productDetails, setProductDetails] = useState<productType>();
  const [activeProduct, setActiveProduct] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://dummyjson.com/products?limit=10&skip=${skip}`
      );
      setTotal(response?.data?.total);
      setTotalPages(Math.ceil(response?.data?.total / 10));
      setIsLoading(false);
      setProductsList(response?.data?.products);
    } catch (error) {}
  };

  const fetchProductDetails = async (id: string | undefined) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`https://dummyjson.com/products/${id}`);
      setProductDetails(response?.data);
      setActiveProduct(response?.data?.images?.[0]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    skip,
    setSkip,
    total,
    totalPages,
    productsList,
    productDetails,
    isLoading,
    fetchProducts,
    fetchProductDetails,
    activeProduct,
    setActiveProduct,
  };
};

export default useProducts;
