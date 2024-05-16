"use client";

import QuantitySelector from "@/components/product/quantity-selector/QuantitySelector";
import { useCartStore } from "@/store/cart/cart-store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const ProductsInCart = () => {
  const productsInCart = useCartStore((state) => state.cart);
  const updateProductsInCart = useCartStore((state) => state.updateProductToCart);
  const removeProductsInCart = useCartStore((state) => state.removeProduct);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Cargando...</p>;
  }

  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className="flex mb-5">
          <Image
            src={`/products/${product.image}`}
            width={150}
            height={150}
            alt={product.title}
            className="mr-5 rounded"
          />
          <div>
            <Link
              className="hover:underline cursor-pointer"
              href={`/product/${product.slug}`}
            >
             {product.size} -- {product.title}
            </Link>
            <p>${product.price}</p>
            <QuantitySelector
              quantity={product.quantity}
              onQuantityChanged={(quantity) => updateProductsInCart(product, quantity)}
            />
            <button 
            onClick={()=>removeProductsInCart(product)}
            className="underline">Remover</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductsInCart;
