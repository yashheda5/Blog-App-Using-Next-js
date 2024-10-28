import connectToDB from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";
import Joi from "joi"; // Ensure Joi is imported

const AddNewBlog = Joi.object({
    title: Joi.string().required(), // Add parentheses
    description: Joi.string().required() // Add parentheses
});

export async function POST(req) {
    try {
        await connectToDB();
        const extractBlogData = await req.json();
        const { title, description } = extractBlogData;
        const { error } = AddNewBlog.validate({
            title, description
        });

        if (error) {
            return NextResponse.json({
                success: false,
                message: error.details[0].message
            });
        }

        const newlyCreatedBlogItem = await Blog.create(extractBlogData);
        if (newlyCreatedBlogItem) {
            return NextResponse.json({
                success: true,
                message: "Blog added successfully"
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "Failed to create blog"
            });
        }

    } catch (e) {
        console.log(e);
        return NextResponse.json({
            success: false,
            message: "Something went wrong please try again later"
        });
    }
}