"use server"
import { getMyToken } from "@/utilities/getMyToken";


export async function getUserCart(){

    const token = await getMyToken();
    if(!token) throw new Error("you should logged in first");

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            token: token
        }
    })

    const payload = await res.json();

    return payload;
}