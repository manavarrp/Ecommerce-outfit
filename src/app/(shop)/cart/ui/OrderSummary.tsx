"use client";

import { useCartStore } from "@/store/cart/cart-store";
import Link from "next/link";
import { useState, useEffect } from "react";
import { currencyFormat } from '../../../../utils/currencyFormat';

const OrderSummary = () => {
  const { subTotal, tax, total, itemsInCart } = useCartStore((state) =>
    state.getSummaryInfo()
  );
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <p>Cargando...</p>;

  return (
    <div className="bg-white rounded-xl shadow-lg p-10 h-fit">
      <h2 className="text-2xl mb-2">Resumen de orden</h2>
      <div className="grid grid-cols-2">
        <span>No. Productos</span>
        <span className="text-right">
          {itemsInCart === 1 ? "1 aticulo" : `${itemsInCart} articulos`}
        </span>
        <span>SubTotal</span>
        <span className="text-right"> {currencyFormat(subTotal)}</span>
        <span>Impuestos (15%)</span>
        <span className="text-right"> {currencyFormat(tax)}</span>

        <span className="mt-5 text-2xl">Total</span>
        <span className="mt-5 text-2xl text-right"> {currencyFormat(total)}</span>
      </div>

      <div className="mt-5 mb-2 w-full">
        <Link
          href={"/checkout/address"}
          className="flex btn-primary justify-center"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default OrderSummary;
