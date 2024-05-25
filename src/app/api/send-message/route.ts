import dbConnect from "@/lib/dbConnect"
import UserModel from "@/model/User"
import {Message} from "@/model/User"

export async function POST(request:Request){
    await dbConnect();
    
    const {username,content}=await request.json()

    try {
        const user = await UserModel.findOne({username})
        if(!user){
            return Response.json({
                success:false,
                message:"can't get user"
            },{status:404})
        }

        if(!user.isAcceptingMessage){
            return Response.json({
                success:false,
                message:"User not accepting message"
            },{status:403})
        }

        const newMessage = {content,createdAt:new Date()}

        user.message.push(newMessage as Message)

        user.save()

        return Response.json({
            success:true,
            message:"message sent successfully"
        },{status:200})



    } catch (error) {
        return Response.json({
            success:false,
            message:"Error while sending message"
        },{status:500})
    }
}