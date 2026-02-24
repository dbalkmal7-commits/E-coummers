"use server";


export async function getRelatedProducts(cateId: string){

    
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${cateId}`)

    const payload = res.json()

    return payload

}
