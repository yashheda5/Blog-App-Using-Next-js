import mongoose from "mongoose";

// Define the schema with more detailed specifications
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, // Title is required
        trim: true // Removes whitespace from both ends of a string
    },
    description: {
        type: String,
        required: true // Description is required
    }
});

// Use existing model if it exists, otherwise create a new one
const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

export default Blog;