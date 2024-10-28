'use client'
import React, { useState } from 'react'

import AddNewBlog from '../add-new-blog'

const initialBlogFormData = {
    title: '',
    description: ''
}

export default function BlogOverview() {
    const [loading, setLoading] = useState(false);
    const [blogFormData, setBlogFormData] = useState(initialBlogFormData);
    console.log(blogFormData);

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
                />
            </div>

            <div>
                BlogList Section
            </div>
        </div>
    )
}