import connectToDB from "@/database";
import { NextResponse } from "next/server";
import Blog from "@/models/blog";

export async function DELETE(req) {
    try {
        await connectToDB();
        const { searchParams } = new URL(req.url);
        const getCurrentBlogid = searchParams.get('id');
        if (!getCurrentBlogid) {
            return NextResponse.json({
                success: false,
                message: "Blog Id is required "
            });
        }
        const deleteCurrentBlogById = await Blog.findByIdAndDelete(getCurrentBlogid);
        if (deleteCurrentBlogById) {
            return NextResponse.json({
                success: true,
                message: "Blog deleted successfully"
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "Something went wrong! Please try again."
            });
        }
    } catch (e) {
        console.log(e);
        return NextResponse.json({
            success: false,
            message: "Something went wrong! Please try again."
        });
    }
}