// put all the handlers for our routes
import PostMessage from "../models/postMessage.js";
import express from 'express';
import mongoose from 'mongoose';
import moment from 'moment'
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
  const newPost = new PostMessage({...post, createdAt : new Date().toLocaleString("en-US", {timeZone: "America/New_York"})});   // create new post
  
  try {
    await newPost.save();
    
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({message: error.message});
  }
}

export const updatePost = async (req, res) => {// request and response
  const { id } = req.params; // id = req.params.id, id rename to _id
  const { title, message, creator, selectedFile, tags } = req.body;
  
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

  await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
}

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
}

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
  
  const post = await PostMessage.findById(id);

  const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
  
  res.json(updatedPost);
}