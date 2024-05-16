"use client";

import QuantitySelector from "@/components/product/quantity-selector/QuantitySelector";
import SizeSelector from "@/components/product/size-selector/SizeSelector";
import { CartProduct, Product, Size } from "@/interfaces/product.interface";
import { useCartStore } from "@/store/cart/cart-store";
import { useState } from "react";

interface Props {
  product: Product;
}

const AddtoCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState<boolean>(false);

  const addProductToCart = useCartStore(state => state.addProductToCart)

  const addToCart = () => {
    setPosted(true);
    if (!size) return;
    console.log(size, quantity, product);

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity,
      size,
      image: product.images[0],

    }
    addProductToCart(cartProduct)
    setPosted(false);
    setQuantity(1);
    setSize(undefined);

  };

  return (
    <>
      {posted && !size  &&(
        <span className="text-red-500 mt-2 fade-in">Debe seleccionar una talla</span>
      )}

      {/* Sizes */}
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSizeChanged={setSize}
      />

      {/* Quantity */}
      <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />

      {/* Add to cart */}
      <button onClick={addToCart} className="btn-primary my-5">
        Agregar al carrito
      </button>
    </>
  );
};

export default AddtoCart;
