import { getServerSession} from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {User} from "next-auth"
 
export async function POST (request:Request){
    await dbConnect()
    const session =  await getServerSession(authOptions)
    const user:User = session?.user as User
    if(!session || !session.user){
        return Response.json({
            success:false,
            message:"Error while getting session and user"
        },{status:500})
    }

    const userId = user._id;
    const {acceptMessages} = await request.json()

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(userId,{
            isAcceptingMessage:acceptMessages
        },{new:true})

        if(!updatedUser){
            return Response.json({
                success:false,
                message:"Error while verification"
            },{status:401})
        }

        return Response.json({
            success:true,
            message:"accept message status updated"
        },{status:200})


    } catch (error) {
        console.log("Failed to update user accpet messages status")
        return Response.json({
            success:false,
            message:"Failed to update user accpet messages status"
        },{status:500})
    }
}


export async function GET(request:Request) {
    await dbConnect()
    const session =  await getServerSession(authOptions)
    const user:User = session?.user as User
    if(!session || !session.user){
        return Response.json({
            success:false,
            message:"Error while getting session and user"
        },{status:500})
    }

    const userId = user._id;
    
   try {
     const foundUser=await UserModel.findById(userId)
     if(!foundUser){
         return Response.json({
             success:false,
             message:"user not found"
         },{status:404})
     }
 
     return Response.json({
         success:true,
         isAcceptingMessage : foundUser.isAcceptingMessage
     },{status:200})

   } catch (error) {
    
    console.log("Cant get user accept message status")
        return Response.json({
            success:false,
            message:"Cant get user accept message status"
        },{status:500})

   }

}