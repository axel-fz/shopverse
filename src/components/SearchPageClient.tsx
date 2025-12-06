"use client";

import Navbar from "@/components/Navbar";
import { Product } from "@/components/PopularProducts";
import ProductCard from "@/components/ProductCard";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SearchPageClient = () => {
  const queryParam = useSearchParams().get("query") || "";
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await axios.get(
          "https://fakestoreapiserver.reactbd.org/api/walmartproducts?page=1&perPage=20"
        );
        setProducts(result.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const searchResult = products.filter((product) =>
    product.title.toLowerCase().includes(queryParam.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="p-10 mt-20">
        <h1 className="text-3xl font-bold mb-5">
          {`Search Results for "${queryParam}"`}
        </h1>

        <div className="flex gap-10 flex-wrap">
          {searchResult.length > 0 ? (
            searchResult.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p className="text-gray-500">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPageClient;
