import z from "zod";

export const checkoutshema=z.object({
    
    details:z.string().nonempty("Email is required"),
    phone:z.string().nonempty("Password is required").regex(/^01[0125][0-9]{8}$/ , "must be egytian number "),
    city:z.string().nonempty("Email is required"),


})

export type checkoutshemaType = z.infer<typeof checkoutshema>;
