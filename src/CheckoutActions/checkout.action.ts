"use server"

import { checkoutshemaType } from "@/shema/checkout.shema"
import { getMyToken } from "@/utilities/getMyToken"

export async function checkPayment(cartId : string ,  formValues : checkoutshemaType){

    const token = await getMyToken()

    const url = process.env.NEXT_URL

    if (!token) throw new Error ("you should logged in first to complete payment")

        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}` , {

            method : "post",
            headers : {
                token , 
                "Content-Type":"application/json"
            },
            body : JSON.stringify({
                shippingAddress : formValues
            })
        })
        const payload = await res.json()

        return payload
}
