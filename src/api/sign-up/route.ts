import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs"
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { messageSchema } from "@/schemas/messageSchema";

export async function POST(request:Request){
    await dbConnect()

    try {
        const {username,email,password}=await request.json()
        
    } catch (error) {
        console.log("Error registering user")
        return Response.json({
            success:false,
            message:"Error registering user"
        },
    {
        status:500
    })
    }
}
