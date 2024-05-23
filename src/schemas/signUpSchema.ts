import {z} from "zod"

export const usernameValidation = z
.string()
.min(2,"username must be atlease 2 characters")
.max(20,"username must not be more than 20 characters")
.regex(/^[a-zA-Z0-9]+$/,"username must not have speacial characters")

export const signupSchema = z.object({
    username:usernameValidation,
    email:z.string().email({message:"Invalid email address"}),
    password:z.string().min(8,{message:"password must be 8 character"})
})