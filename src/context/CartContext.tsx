"use client"

import { getUserCart } from "@/CartActions/gerUserCart.action";
import { createContext, useEffect, useState, ReactNode, SetStateAction } from "react";


// 1️⃣ Define Context Type
export type CartContextType = {
  count: number;
  setCount: React.Dispatch<SetStateAction<number>>;
};


// 2️⃣ Create Context with default value
export const CartContext = createContext<CartContextType>({
  count: 0,
  setCount: () => {},
});


// 3️⃣ Define Props Type
type CartProviderProps = {
  children: ReactNode;
};


export function CartContextProvider({ children }: CartProviderProps) {
  const [count, setCount] = useState<number>(0);

  async function getLoggedUserCartCount() {
    try {
      const res = await getUserCart();

      if (res.status === "success") {
        let sum = 0;

        interface Product {
  count: number;
}

        res.data?.products.forEach((item: Product) => {
        sum += item.count;
});

        setCount(sum);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    function flag() {
    getLoggedUserCartCount();
    }
    flag()
  }, []);

  return (
    <CartContext.Provider value={{ count, setCount }}>
      {children}
    </CartContext.Provider>
  );
}
