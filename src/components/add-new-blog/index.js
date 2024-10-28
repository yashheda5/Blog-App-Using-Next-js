import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
export default function AddNewBlog({loading,setLoading,blogFormData,setBlogFormData,handleSaveBlogData}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add New Blog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Blog</DialogTitle>
          
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" name="title" id="title" className="text-right">
              Title
            </Label>
            <Input name="title" id="title" placeholder="Enter Blog Title" value={blogFormData.title} onChange={(event)=>setBlogFormData({
                ...blogFormData,
                title: event.target.value
            })} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" name="description" id="description" className="text-right">
              Description
            </Label>
            <Input  name="description" id="description" className="col-span-3" value={blogFormData.description} onChange={(event)=>setBlogFormData({
                ...blogFormData,
                description: event.target.value
            })} />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSaveBlogData}>{
            loading ? 'Saving...' : 'Save'
          }</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
