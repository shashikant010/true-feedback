import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VefificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(email:string,username:string,verifyCode:string):Promise<ApiResponse> {
    try {
        console.log("Sending email on ",email)
        const {data, error }=await resend.emails.send({
            from:"onboarding@resend.dev",
            to:email,
            subject:"True Feedback Verification Code",
            react: VerificationEmail({username,otp:verifyCode})
        })
        console.log({data,error})

        return {
            success:true,message:"Verification email sent successfully"
        }
        
    } catch (emailError) {
        console.error("Error sending Verification Email ", emailError)
        return {success:false,message:'Failed to send verification email'}

    }
}

