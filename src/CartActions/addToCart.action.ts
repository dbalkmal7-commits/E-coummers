"use server"
import { getMyToken } from "@/utilities/getMyToken";


export async function addToCart(id:string){

    const token = await getMyToken();
    if(!token) throw new Error("you should logged in first");

    const res =await fetch(`https://ecommerce.routemisr.com/api/v1/cart` , {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            token:token
        },
        body:JSON.stringify({
            productId:id,
        })
    })

const payload=await res.json();

return payload;
}