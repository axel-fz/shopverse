"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import HeaderComponent from "./HeaderComponent";
import ProductCard from "./ProductCard";

export interface Product {
  _id: number;
  title: string;
  des: string;
  price: number;
  oldPrice: number;
  rating: number;
  image: string;
  brand: string;
  isNew: boolean;
  category: string;
}

export const PopularProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const result = await axios.get(
        "https://fakestoreapiserver.reactbd.org/api/walmartproducts?page=1&perPage=20"
      );

      setProducts(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mt-4 mb-4">
      <HeaderComponent href="" title="Popular Products" />

      <div className="flex justify-center flex-wrap gap-20">
        {products.map((product) => (
          <ProductCard 
            key={product._id}
            product={product}    
          />
        ))}
      </div>
    </div>
  );
};
