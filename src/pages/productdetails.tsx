import { useParams } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import { useEffect } from "react";
import { Star } from "lucide-react";
import React from "react";

const ProductDetails = () => {
  const { id } = useParams();
  const {
    fetchProductDetails,
    productDetails: product,
    isLoading,
    activeProduct,
    setActiveProduct,
  } = useProducts();

  useEffect(() => {
    if (id) fetchProductDetails(id);
  }, [id]);

  if (isLoading) {
    return (
      <div className="bg-gray-950 min-h-screen p-6 md:p-12 text-white flex flex-col md:flex-row gap-10 animate-pulse">
        <div className="flex-1 flex flex-col gap-4">
          <div className="w-full h-96 bg-gray-800 rounded-xl border border-gray-700" />
          <div className="grid grid-cols-4 gap-2 mt-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="w-full h-24 bg-gray-800 rounded-md border border-gray-700"
              />
            ))}
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <div className="w-3/4 h-8 bg-gray-800 rounded" />
          <div className="flex items-center gap-2 mt-2">
            <div className="w-16 h-5 bg-gray-800 rounded" />
          </div>
          <div className="flex items-center gap-4 mt-2">
            <div className="w-20 h-6 bg-gray-800 rounded" />
            <div className="w-12 h-5 bg-gray-800 rounded" />
          </div>
          <div className="w-32 h-4 bg-gray-800 rounded mt-2" />
          <div className="w-full h-24 bg-gray-800 rounded mt-2" />
          <div className="grid grid-cols-2 gap-4 mt-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-full h-4 bg-gray-800 rounded" />
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="w-16 h-5 bg-gray-800 rounded-md" />
            ))}
          </div>
          <div className="flex gap-4 mt-6">
            <div className="w-32 h-10 bg-gray-800 rounded" />
            <div className="w-32 h-10 bg-gray-800 rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-950 min-h-screen p-6 md:p-12 text-white flex flex-col md:flex-row gap-10">
      {/* Left: Images */}
      <div className="flex-1 flex flex-col gap-4">
        <img
          src={activeProduct}
          alt={product?.title ?? "Product image"}
          className="w-full h-96 object-cover rounded-xl border border-gray-700"
        />
        <div className="grid grid-cols-4 gap-2 mt-2">
          {product?.images?.map((img, i) => (
            <img
              key={i}
              src={img}
              onClick={() => setActiveProduct(img)}
              alt={`${product?.title ?? "product"}-${i}`}
              className="w-full h-24 object-cover rounded-md border border-gray-700 cursor-pointer hover:scale-105 transition-transform"
            />
          ))}
        </div>
      </div>

      {/* Right: Details */}
      <div className="flex-1 flex flex-col gap-4">
        <h1 className="text-3xl font-bold">
          {product?.title ?? "Product title"}
        </h1>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-400" />
          <span>{product?.rating?.toFixed(1) ?? "0"} / 5</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-4">
          <span className="text-2xl font-semibold">
            ${product?.price ?? "0"}
          </span>
          {product?.discountPercentage && (
            <span className="text-sm text-gray-400 line-through">
              $
              {(
                (product?.price * 100) /
                (100 - product?.discountPercentage)
              )?.toFixed(2) ?? "0"}
            </span>
          )}
          {product?.discountPercentage && (
            <span className="text-green-400 text-sm font-semibold">
              {product?.discountPercentage?.toFixed(1)}% OFF
            </span>
          )}
        </div>

        {/* Availability */}
        <div className="text-sm">
          <span className="font-semibold">Stock Status: </span>
          <span
            className={
              product?.availabilityStatus ? "text-green-400" : "text-red-500"
            }
          >
            {product?.availabilityStatus ?? "Unavailable"}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-300 mt-2">{product?.description ?? ""}</p>

        {/* SKU, Weight, Dimensions */}
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-400 mt-4">
          <div>
            <span className="font-semibold">SKU:</span> {product?.sku ?? "-"}
          </div>
          <div>
            <span className="font-semibold">Weight:</span>{" "}
            {product?.weight ?? "-"} g
          </div>
          <div>
            <span className="font-semibold">Dimensions:</span>{" "}
            {product?.dimensions?.width ?? "-"} ×{" "}
            {product?.dimensions?.height ?? "-"} ×{" "}
            {product?.dimensions?.depth ?? "-"} cm
          </div>
          <div>
            <span className="font-semibold">Brand:</span>{" "}
            {product?.brand ?? "-"}
          </div>
        </div>

        {/* Tags */}
        {product?.tags && product?.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {product?.tags?.map((tag, i) => (
              <span
                key={i}
                className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-4 mt-6">
          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md transition">
            Add to Cart
          </button>
          <button className="border border-gray-600 px-6 py-2 rounded-md hover:bg-gray-800 transition">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
