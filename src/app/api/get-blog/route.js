
import connectToDB from "@/database";
import { NextResponse } from "next/server";
import Blog from "@/models/blog";
export async function GET(){
    try{
        await connectToDB();
        const extractAllBlogsFromDatabase = await Blog.find({});
        if(extractAllBlogsFromDatabase){
            return NextResponse.json({
                success:true,
                data:extractAllBlogsFromDatabase
            })
        }else{
            return NextResponse.json({
                success:false,
                message:"Something went wrong ! try again later"
            });
        }
    } catch(e){
        console.log(e);
        return NextResponse.json({
            success:false,
            message:"Something went wrong ! try again later"
        })
    }
}