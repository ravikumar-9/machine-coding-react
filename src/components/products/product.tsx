import React from "react";
import { Link } from "react-router-dom";
import type { productType } from "../../types";

const Product = (props: { product: productType }) => {
  const { product } = props;
  const isInStock = product?.availabilityStatus.toLowerCase() === "in stock";

  return (
    <div className="group relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700/50 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-500 ease-out cursor-pointer shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 flex flex-col">
      {/* Product Image Container */}
      <div className="relative overflow-hidden bg-gray-950 h-72">
        <img
          src={product?.thumbnail}
          alt={product?.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Stock Badge - Top Left */}
        <div className="absolute top-4 left-4 z-10">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full backdrop-blur-md transition-all duration-300 ${
              isInStock
                ? "bg-emerald-500/90 text-white shadow-lg shadow-emerald-500/50"
                : "bg-red-500/90 text-white shadow-lg shadow-red-500/50"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isInStock ? "bg-white" : "bg-white animate-pulse"
              }`}
            />
            {isInStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        {/* Quick View Overlay */}
        <Link
          to={`/product-details/${product?.id}`}
          className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"
        >
          <button className="w-full bg-white/90 hover:bg-white text-gray-900 font-semibold py-3 px-4 rounded-xl backdrop-blur-sm transition-all duration-300 transform hover:scale-105">
            Quick View
          </button>
        </Link>
      </div>

      {/* Product Details */}
      <div className="flex-1 p-5 space-y-4">
        {/* Product Title */}
        <h2
          className="text-xl font-bold text-white line-clamp-2 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300"
          title={product?.title}
        >
          {product?.title}
        </h2>

        {/* Price and Rating Row */}
        <div className="flex items-end justify-between pt-2">
          {/* Price Section */}
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 line-through">
              ${(product?.price * 1.2).toFixed(2)}
            </span>
            <span className="text-3xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-cyan-400 transition-all duration-300">
              ${product?.price.toFixed(2)}
            </span>
          </div>

          {/* Rating Badge */}
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-2 rounded-xl shadow-lg shadow-yellow-500/30 transform group-hover:scale-110 transition-transform duration-300">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              <span className="text-sm font-bold">
                {product?.rating.toFixed(1)}
              </span>
            </div>
            <span className="text-xs text-gray-400 mt-1">Rated</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
