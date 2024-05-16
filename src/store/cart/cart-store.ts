import { CartProduct } from "@/interfaces/product.interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];
  getTotalItems: () => number;
  getSummaryInfo: () => {
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart: number
  };
  addProductToCart: (product: CartProduct) => void;
  updateProductToCart: (product: CartProduct, quantity: number) => void
  removeProduct: (product: CartProduct) => void
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      //methods
      getTotalItems: () =>{
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },
      getSummaryInfo : () => {
        const { cart } = get();
        const subTotal = cart.reduce(
            (subTotal, product) => (product.price * product.quantity) + subTotal, 0);
        const tax = subTotal * 0.15;
        const total = subTotal + tax;
        const itemsInCart = get().getTotalItems();
        return {
          subTotal,
          tax,
          total,
          itemsInCart
        }
      },
       
      addProductToCart: (product: CartProduct) => {
        const { cart } = get();
        //1. revisar si el producto ya existe en el carrito en la talla seleccionada
        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );

        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        //2. si el producto ya existe en el carrito, aumentar la cantidad
        const updatedCartProduct = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity };
          }
          return item;
        });
        set({ cart: updatedCartProduct });
      },
      updateProductToCart: (product: CartProduct, quantity: number) => {
       
        const { cart } = get();
        const updatedCartProduct = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity };
          }
          return item;
        })   
        set({ cart: updatedCartProduct });
      },
      removeProduct: (product: CartProduct) => {
        const { cart } = get();
        const updatedCartProduct = cart.filter(
          (item) => !(item.id === product.id && item.size === product.size)
        );  
        set({ cart: updatedCartProduct });
      }
    }),
    {
      name: "shop-cart",
    }
  )
);
