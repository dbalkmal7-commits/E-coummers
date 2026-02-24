
import z from "zod";



export const registerShema=z.object({
    name:z.string().nonempty("Name is required").min(2,"Name must be at least 2 characters long").max(15,"Name must be at most 15 characters long"),
    email:z.email("Invalid email address").nonempty("Email is required"),
    password:z.string().nonempty("Password is required").min(6,"Password must be at least 6 characters long").max(20,"Password must be at most 20 characters long"),
    rePassword:z.string().nonempty("Please confirm your password"),
    phone:z.string().regex(/^01[0125][0-9]{8}$/ , "must be egyptian number").nonempty("Phone number is required"),

}).refine((obj)=>obj.password===obj .rePassword,{
    message:"Passwords do not match",
    path:["rePassword"],
})

export type registerType = z.infer<typeof registerShema>;
