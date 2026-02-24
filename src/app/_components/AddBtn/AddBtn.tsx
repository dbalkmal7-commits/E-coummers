// "use client"
// import { addToCart } from '@/CartActions/addToCart.action';
// import { Button } from '@/components/ui/button'
// import {CartContext} from '@/context/CartContext'
// import { useContext } from 'react'
// import { toast } from 'sonner';

// export default function AddBtn({ id }: { id: string }) {
//   const { count, setCount } = useContext(CartContext);

// async function addToCartHandler(id: string) {
//   try {
//     const res = await addToCart(id);

//     if (res?.status === "success") {
//       toast.success(res.message);
//       setCount(prev => prev + 1);
//     } else {
//       toast.error(res?.message  , {
//   position: "top-center",
//   duration: 3000,
// }
//       );
//     }

//   } catch (error: string | any) {
//     toast.error("You must login first");
//   }
// }


//   return (
//     <div>
//       <Button
//         onClick={(e) => {
//           e.preventDefault();    // يمنع الـ Link
//           e.stopPropagation();   // يمنع الحدث يوصل للكارد

//           addToCartHandler(id);
//         }}
//         className="bg-blue-500 w-full text-white mt-6 py-3 rounded-lg 
//         hover:bg-blue-600 transition"
//       >
//         <i className="fa-solid fa-plus text-yellow-400 mr-2"></i>
//         Add to Cart
//       <i className="fa-duotone fa-solid fa-cart-arrow-down fa-bounce --fa-primary-color: rgba(177, 151, 252, 1); --fa-secondary-color: rgba(177, 151, 252, 0.4);"></i>  </Button>
//     </div>
//   )
// }
"use client"

import { addToCart } from '@/CartActions/addToCart.action';
import { Button } from '@/components/ui/button'
import { CartContext } from '@/context/CartContext'
import { useRouter } from 'next/navigation';
import { useContext } from 'react'
import { toast } from 'sonner';

export default function AddBtn({ id }: { id: string }) {

  const { setCount } = useContext(CartContext);
  const router = useRouter();

  async function addToCartHandler(id: string) {
    try {
      const res = await addToCart(id);

      // 👇 هنا الحل المهم
      if (res?.error) {
        toast.error("You must login first", {
          position: "top-center",
          duration: 3000,
        });

        router.push("/login");
        return;
      }

      if (res?.status === "success") {
        toast.success(res.message);
        setCount(prev => prev + 1);
      } else {
        toast.error(res?.message, {
          position: "top-center",
          duration: 3000,
        });
      }

    } catch (error) {
  console.error(error);
  toast.error("Something went wrong", {
    position: "top-center",
    duration: 3000,
  });
    }
  }

  return (
    <div>
      <Button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          addToCartHandler(id);
        }}
        className="bg-blue-500 w-full text-white mt-6 py-3 rounded-lg 
        hover:bg-blue-600 transition"
      >
        <i className="fa-solid fa-plus text-yellow-400 mr-2"></i>
        Add to Cart
      </Button>
    </div>
  )
}
