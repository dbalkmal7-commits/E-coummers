// import z from "zod";

// export const loginshema=z.object({
    
//     email:z.email("Invalid email address").nonempty("Email is required"),
//     password:z.string().nonempty("Password is required").min(6,"Password must be at least 6 characters long").max(20,"Password must be at most 20 characters long"),
 


// })

// export type loginType = z.infer<typeof loginshema>;
import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),

  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password must be at most 20 characters long"),
});

export type LoginType = z.infer<typeof loginSchema>;