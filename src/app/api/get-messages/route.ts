import { getServerSession} from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {User} from "next-auth"
import mongoose from "mongoose";
 
export async function GET(request:Request) {
    await dbConnect()
    const session =  await getServerSession(authOptions)
    const _user:User = session?.user as User
    if(!session || !session.user){
        return Response.json({
            success:false,
            message:"Error while getting session and user"
        },{status:500})
    }

    const userId = new mongoose.Types.ObjectId(_user._id)
    console.log(userId)
   try {

    const user = await UserModel.aggregate([
        { $match: { _id: userId } },
        { $unwind: '$message' },
        { $sort: { 'message.createdAt': -1 } },
        { $group: { _id: '$_id', messages: { $push: '$message' } } },
      ]);

      console.log(user)

    if(!user|| user.length === 0){
        return Response.json({
            success:false,
            message:"user not found"
        },{status:404})
    }

   const messages = user[0].messages
    return Response.json({
        success:true,
        messages
    },{status:200})
     

   } catch (error) {
    
    console.log("Cant get user messages ",error)
        return Response.json({
            success:false,
            message:"Cant get user messages"
        },{status:500})

   }

}