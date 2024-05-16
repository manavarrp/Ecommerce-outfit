import { Title } from "@/components";
import Link from "next/link";
import React from "react";
import ProductsInCart from "./ui/ProductsInCart";
import OrderSummary from "./ui/OrderSummary";


const CartPage = () => {
  //redirect("/empty");
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Carrito" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            <span className="text-xl">Agregar al carrito</span>
            <Link href={"/"} className="underline mb-5">
              Continúa comprando
            </Link>

           <ProductsInCart />
          </div>
          {/* Order summary */}
        <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
