"use client";

import { getStockBySlug } from "@/actions/products/get-stock-by-slug";
import { titleFont } from "@/config/font";
import { useEffect, useState } from "react";

interface Props {
  slug: string;
}

const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStock();
  }, []);

  const getStock = async () => {
    const inStock = await getStockBySlug(slug);
    setStock(inStock);
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <h1
          className={`${titleFont.className} antialiased font-bold text-lg bg-gray-200 animate-pulse`}
        >
          &nbsp
        </h1>
      ) : (
        <h1 className={`${titleFont.className} antialiased font-bold text-lg`}>
          Stock: {stock}
        </h1>
      )}
    </>
  );
};

export default StockLabel;
