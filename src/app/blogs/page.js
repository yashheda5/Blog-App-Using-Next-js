
import React from 'react'
import BlogOverview from '@/components/blog-overview'
async function fetchListOfBlogs(){
  try{
    const apiResponse =await fetch('http://localhost:3000/api/get-blog',{
      method: 'GET',
      cache :'no-store'
    })
    const result =await apiResponse.json();
    return result?.data
  } catch(e){
    throw new Error(e)
  }
}
export default async function Blogs() {
  const blogList = await fetchListOfBlogs()
  console.log(blogList,'blogList')
  return (
   <BlogOverview blogList={blogList}/>
  )
}
