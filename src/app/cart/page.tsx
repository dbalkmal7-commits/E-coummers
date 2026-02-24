"use client"
import { useContext, useEffect, useState } from 'react'
import { getUserCart } from '@/CartActions/gerUserCart.action'
import { toast } from 'sonner';
import { removeCartItem } from '@/CartActions/removeCartItem.action';
import { updateCartItem } from '@/CartActions/updateCartItem.action';
import { Button } from '@/components/ui/button';
import { removeCart } from '@/CartActions/removeCart.action';
import { CartContext } from '@/context/CartContext';
import Link from 'next/link';
import { useSession } from "next-auth/react";
import { productCartType } from '@/type/cart.type';
import Image from 'next/image';

export default function Cart() {
  const [DisableFlay, setDisableFlay] = useState(false); // disable remove button 
  const [loading, setLoading] = useState(true);
  const [products, setproducts] = useState([]);
  const [updateLoading, setupdateLoading] = useState(false);
  const [currentId, setcurrentId] = useState("");
  const [disableUpdateBtn, setdisableUpdateBtn] = useState(false);
  const { setCount } = useContext(CartContext)!
  const [TotalPrice, setTotalPrice] = useState(0);
  const [cartid, setcartid] = useState("");
  async function removeProductFromCart(id:string){  
    setDisableFlay(true);
    setdisableUpdateBtn(true);
    const res=await removeCartItem(id);
    console.log(res);
    if(res.status=="success"){
      setproducts(res.data.products);
      toast.success("product removed form cart successfully", {
        duration: 3000,
        position: "top-center"
    });
      setproducts(res.data.products);
      setDisableFlay(false);
      setdisableUpdateBtn(false);
      getUserCartProducts()
      let sum =0;
      res.data.products.forEach((prod:productCartType) => {
        sum += prod.count;
      });
      setCount(sum);
    }
    else{
      toast.error("Failed to remove product from cart", {
        duration: 3000,
        position: "top-center"
    });
setdisableUpdateBtn(false);
    
    }
  }

async function getUserCartProducts(){
  // setLoading(true);
  const res=await getUserCart();
    console.log(res.data);
    setcartid(res.data._id); 
  if(res.status==="success"){
    setproducts(res.data.products);
    setTotalPrice(res.data.totalCartPrice);
    setLoading(false);
  }
  else{
    setLoading(false);
  }

}
async function updateCartProduct(id:string, count:string , sign:string){
  setDisableFlay(true);
  setdisableUpdateBtn(true);
  setcurrentId(id);
  setupdateLoading(true);
  const res= await updateCartItem(id, count);
  if(res.status==="success"){
    toast.success("product quantity updated successfully", {
      duration: 3000,
      position: "top-center"
  });
    setproducts(res.data.products);
    setupdateLoading(false);
    setdisableUpdateBtn(false);
    setDisableFlay(false);
    getUserCartProducts();
    if(sign==="+"){
      setCount(prev => prev + 1);
    }
    else if (sign==="-"){
      setCount(prev => prev - 1);
    }
  }
  else{
    toast.error("Failed to update product quantity", {
      duration: 3000,
      position: "top-center"
  });
  setupdateLoading(false);
  setdisableUpdateBtn(false);
  setDisableFlay(false);
}
}


async function removeallCartProducts() {
  const res = await removeCart();

  if (res.message === "success") {
    setproducts([]);
    setTotalPrice(0);
    setCount(0);
    toast.success("Cart cleared");
  }
}
  useEffect(()=>{
    getUserCartProducts();
    
  },[])
  return<>
  {loading ? <h1 className='text-center text-red-700'>Looooading............</h1> : products.length > 0 ? 
  <div className=' container mx-auto my-10'>

  <h1 className='text-2xl font-bold mb-6' >Shopping Cart</h1>

  <h3 className='text-center my-4 text-2xl text-red-500 '> total price of products = {TotalPrice}</h3>
  <Button className='my-4 black me-auto bg-red-700' onClick={() => removeallCartProducts()}>clear Cart </Button>
  <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
    <table className="w-full text-sm text-left rtl:text-right text-body">
        <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
            <tr>
                <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                    Product
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                    Qty
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                    Price
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
         {products.map((prod:productCartType)=>{
           return <tr key={prod.product.id} 
           className="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium">
               <td className="p-4">
    <div className="relative w-full h-64">
      <Image
        src="https://ecommerce.routemisr.com/Route-Academy-products/1680403156501-cover.jpeg"
        alt="product"
        fill
        className="object-cover"
      />
    </div>
               </td>
               <td className="px-6 py-4 font-semibold text-heading">
                 {prod.product.title}
               </td>
               <td className="px-6 py-4">
                 <form className="max-w-xs mx-auto">
                   <label htmlFor={`counter-input-${prod.product.id}`} className="sr-only">Choose quantity:</label>
                   <div className="relative flex items-center">
                     <button disabled={disableUpdateBtn} onClick={() => updateCartProduct(prod.product.id,`${prod.count - 1}`
, "-")} type="button" id={`decrement-button-${prod.product.id}`} data-input-counter-decrement={`counter-input-${prod.product.id}`} className="disabled:bg-slate-600 disabled:text-white  flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6">
                       <svg className="w-3 h-3 text-heading" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14"/></svg>
                     </button>

                     {/* <input type="text" id={`counter-input-${prod.product.id}`} data-input-counter className="shrink-0 text-heading border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center" placeholder="" value={prod.count} required /> */}
                      {currentId === prod.product.id ? updateLoading ? <i className='animate-spin fas fa-spinner'></i> : <span className='mx-2 ' >{prod.count}</span> : <span className='mx-2 ' >{prod.count}</span>}

                     <button disabled={disableUpdateBtn} onClick={() => updateCartProduct(prod.product.id, `${prod.count + 1}`,"+")} type="button" id={`increment-button-${prod.product.id}`} data-input-counter-increment={`counter-input-${prod.product.id}`} className="disabled:bg-slate-600 disabled:text-white flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6">

                       <svg className="w-3 h-3 text-heading" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5"/></svg>
                     </button>
                   </div>
                 </form>
               </td>      
            <td className="px-6 py-4 font-semibold text-heading">
  ${prod.price * prod.count}
</td>

               <td className="">
                 <button disabled={DisableFlay} className="bg-red-500 w-full text-white mt-6 py-2 rounded-lg me-8
      hover:bg-red-600 transition  hover:text-red-950" onClick={()=>{
                   removeProductFromCart(prod.product.id)
                 }} >Remove</button>
               </td>
             </tr>
           
         })}


          
       
       
        </tbody>
    </table>
    
</div>
<Button className='text-white bg-green-500 rounded-2xl p-2 hover:bg-blue-600  cursor-pointer my-6 block ms-auto'>

        <Link href={`/checkout/${cartid}`}>check Out </Link>

</Button>
  </div>: <h1 className='text-center text-2xl font-bold my-10'>Your Cart is Empty</h1>
  
  }

  
  </>
}
