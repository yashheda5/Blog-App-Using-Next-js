import connectToDB from "@/database";
import { NextResponse } from "next/server";
import Joi from 'joi';
import Blog from "@/models/blog";

const EditBlog = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required()
});

export async function PUT(req) {
    try {
        await connectToDB();
        const { searchParams } = new URL(req.url);
        const getCurrentBlogID = searchParams.get('id');

        if (!getCurrentBlogID) {
            return NextResponse.json({
                success: false,
                message: "Blog ID not found"
            });
        }

        const { title, description } = await req.json();
        const { error } = EditBlog.validate({
            title, description
        });

        if (error) {
            return NextResponse.json({
                success: false,
                message: error.details[0].message
            });
        }

        const updateBlogByID = await Blog.findOneAndUpdate(
            { _id: getCurrentBlogID },
            { title, description },
            { new: true }
        );

        if (updateBlogByID) {
            return NextResponse.json({
                success: true,
                message: "Blog updated successfully"
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "Something went wrong! Please try again later"
            });
        }

    } catch (e) {
        console.log(e);
        return NextResponse.json({
            success: false,
            message: "Something went wrong! Please try again later"
        });
    }
}