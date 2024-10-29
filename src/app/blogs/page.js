import React from 'react';
import BlogOverview from '@/components/blog-overview';

async function fetchListOfBlogs() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  try {
    const apiResponse = await fetch(`${baseUrl}/api/get-blog`, {
      method: 'GET',
      cache: 'no-store',
    });
    const result = await apiResponse.json();
    return result?.data;
  } catch (e) {
    throw new Error(e);
  }
}

export default async function Blogs() {
  const blogList = await fetchListOfBlogs();
  console.log(blogList, 'blogList');
  return <BlogOverview blogList={blogList} />;
}
