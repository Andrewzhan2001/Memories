// put all the handlers for our routes
import PostMessage from "../models/postMessage.js";

//asynchronous means program will not wait the funtion finish to do the next step
//funciton will do the rest until wait is done
export const getPosts = async (req,res)=>{  // request and response
  try {
    // we need to wait for this function to be done, getPost should be asynchronous
    const postMessage = await PostMessage.find();// reteive all the post currently have in database
    res.status(200).json(postMessage)
  } catch (error) {
    res.status(404).json({message: error.message})
  }
}

export const createPost = async (req,res)=>{  // request and response
  const post = req.body;   //basic layout for making post
  const newPost = new PostMessage(post);   // create new post
  try {
    await newPost.save();
    
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({message: error.message});
  }
}