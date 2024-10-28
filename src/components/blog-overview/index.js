'use client'
import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import AddNewBlog from '../add-new-blog'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'; 
import { Label } from '@radix-ui/react-label'
const initialBlogFormData = {
    title: '',
    description: ''
}

export default function BlogOverview({ blogList }) {
    const [loading, setLoading] = useState(false);
    const [blogFormData, setBlogFormData] = useState(initialBlogFormData);
    const [openBlogDialog, setOpenBlogDialog] = useState(false);
    console.log(blogFormData);

    const router=useRouter();
    useEffect(()=>{
        router.refresh()
    },[])
    async function handleSaveBlogData() {
        setLoading(true); // Set loading to true when starting the request
        try {
            const apiResponse = await fetch('/api/add-blog', { // Corrected the URL path
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Added headers to specify JSON content
                },
                body: JSON.stringify(blogFormData)
            });
            const result = await apiResponse.json();
            console.log(result);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false); // Ensure loading is set to false after request completes
            setBlogFormData(initialBlogFormData);
            router.refresh();
        }
    }
    async function handleDeleteBlogById(getCurrentId) {
        try {
            const apiResponse = await fetch(`/api/delete-blog?id=${getCurrentId}`, {
                method: 'DELETE',
            });
            const result = await apiResponse.json();
            if (result?.success) {
                router.refresh();
            }
        } catch (e) {
            console.log(e);
        }
    }
    

    return (
        <div className="min-h-screen flex flex-col gap-10 bg-gradient-to-r from-purple-500 to-blue-600 p-6">
            <div>
                <AddNewBlog
                    loading={loading}
                    setLoading={setLoading}
                    blogFormData={blogFormData}
                    setBlogFormData={setBlogFormData}
                    handleSaveBlogData={handleSaveBlogData}
                    openBlogDialog={openBlogDialog}
                    setOpenBlogDialog={setOpenBlogDialog}
                />
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5'>
                {
                    blogList && blogList.length > 0 ?
                        blogList.map(blogItem =>
                            <Card>
                                <CardHeader>
                                    <CardTitle>{blogItem.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>{blogItem.description}</p>
                                    <div className='mt-5 flex gap-5 justify-center items-center'>
                                        <Button>Edit</Button>
                                        <Button onClick={()=>handleDeleteBlogById(blogItem._id)}>Delete</Button>
                                    </div>
                                </CardContent>
                                
                            </Card>

                        )
                        : <Label className='text-3xl font-extrabold  '>No Blog found Please add one </Label>
                }
            </div>
        </div>
    )
}