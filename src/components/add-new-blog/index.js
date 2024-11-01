import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddNewBlog({ setCurrentEditedBlogID, currentEditedBlogID, loading, setLoading, blogFormData, setBlogFormData, handleSaveBlogData, openBlogDialog, setOpenBlogDialog }) {

  // Wrap handleSaveBlogData to close the dialog and reset currentEditedBlogID
  const handleSave = async () => {
    await handleSaveBlogData();  // Save data
    setOpenBlogDialog(false);    // Close dialog after saving
    setCurrentEditedBlogID(null); // Reset currentEditedBlogID
  };

  return (
    <Dialog open={openBlogDialog} onOpenChange={setOpenBlogDialog}>
      <DialogTrigger asChild>
        <Button onClick={() => {
          setOpenBlogDialog(true);
          setCurrentEditedBlogID(null); // Ensure it's null when adding a new blog
          setBlogFormData({ title: null, description: null }); // Reset title and description
        }}>
          Add New Blog
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{currentEditedBlogID ? "Edit Blog" : "Add Blog"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              name="title"
              id="title"
              placeholder="Enter Blog Title"
              value={blogFormData.title}
              onChange={(event) => setBlogFormData({
                ...blogFormData,
                title: event.target.value
              })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              name="description"
              id="description"
              placeholder="Enter Blog Description"
              value={blogFormData.description}
              onChange={(event) => setBlogFormData({
                ...blogFormData,
                description: event.target.value
              })}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSave}>
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}