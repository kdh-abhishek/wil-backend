import Comment from "../models/Comment.js";

export const addComment = async (req, res, next) => {
  
  const { blogId, content } = req.body;


  const comment = new Comment({
    blog: blogId,
    content,
  });

  try {
    
    const savedComment = await comment.save();

    
    return res.status(200).json({ comment: savedComment });
  } catch (err) {
    
    console.log(err);
    return res.status(500).json({ message: "Failed to add comment" });
  }
};



