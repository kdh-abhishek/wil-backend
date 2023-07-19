import mongoose from "mongoose";
import Blog from "../model/Blog.js";
import User from "../model/User.js";
import Comment from '../model/Comment.js'

export const getAllBlogs = async( req, res, next ) => {
    let blogs;

    try {
        blogs = await Blog.find();
    } catch (err) {
        return console.log(err);
    }
    if (!blogs) {
        return res.status(400).json({ message: "No Blogs Found"})
    }
    return res.status(200).json({ blogs })
};

export const addBlog = async ( req, res, next ) => {
    const { title, description, image, user } = req.body;
    
    let existingUser;
    try {
        existingUser = await User.findById(user);
    } catch (error) {
        return console.log(err);
    }
    if(!existingUser) {
        return res.status(400).json({ message: "Unable to find the User by this Id!!"})
    }

    const blog = new Blog ({
        title, 
        description, 
        image, 
        user,
    });
    try {
       const session = await mongoose.startSession();
       session.startTransaction(); 
       await blog.save();

        // if(Comment) {
        //     const newComment = new Comment({
        //         content: Comment,
        //         user: existingUser._id,
        //         blog:blog._id,
        //     });
        //     await newComment.save();
        //     blog.comments.push(newComment);
        // }

       existingUser.blogs.push(blog);
       await existingUser.save({ session });
       await session.commitTransaction();

        // const populatedBlog = await Blog.findById(blog._id).populate("user").populate("comments.user");
        // return res.status(200).json({ blog: populatedBlog });
    }catch(err) {
        console.log(err);
        return res.status(500).json({ message: err})
    }
    return res.status(200).json({ blog })

};


export const updateBlog = async ( req, res, next ) => {
    const { title, description } = req.body;

    const blogId = req.params.id;

    let blog;
    try{
        blog = await Blog.findByIdAndUpdate( blogId, {
            title,
            description
        })
    } catch (err) {
        return console.log(err);
    }
    if (!blog) {
        return res.status(500).json({ message: "Unable to update the blog"})
    }
    return res.status(200).json({ blog });
};

export const getById = async ( req, res, next) =>{
    const id = req.params.id;
    let blog;
    try{
        blog = await Blog.findById(id).populate("comments");
    }catch (err){
        return console.log(err);
    }
    if (!blog) {
     return res.status(400).json({ message: " No Blog found!!"})   
    }
    return res.status(200).json({ blog })
}

export const deleteBlog = async ( req, res, next ) => {
    const id = req.params.id;

    let blog;
    try {
        blog = await Blog.findByIdAndRemove(id).populate(" user ");
        if (!blog) {
            return res.status(400).json({ message: "Unable to Delete!!" });
          }
          if (blog.user) {
            await blog.user.blogs.pull(blog);
          }
        }catch(err){
        return console.log(err)
    }
    if(!blog) {
        return res.status(400).json({ message: "Unable to Delete!!"})
    }
    return res.status(200).json({ message: "Successfully deleted!!"})
}