//implement functions for different routes
import mongoose from "mongoose";
import postMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
    try{
        const postMessages = await postMessage.find();

        res.status(200).json(postMessages);
    }catch(error){
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new postMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });

    try{
        await newPost.save();

        res.status(201).json(newPost);
    }catch(error){
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const {id: _id} = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id: ${_id}`);

    const updatePost = await postMessage.findByIdAndUpdate(_id, {...post, _id}, {new: true});

    res.json(updatePost);
}

export const deletePost = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await postMessage.findByIdAndDelete(id);

    res.json({message: 'Post deleted successfully'});
}

export const likePost = async (req, res) => {
    const {id} = req.params;
    if (!req.userId) return res.json({ message: "Unauthenticated" });
      
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await postMessage.findById(id);

    const index = post.likes.findIndex((id) => id ===String(req.userId));// compare the userId who liked the post and the ids in the like list of this post
    if (index === -1) {
        post.likes.push(req.userId);
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await postMessage.findByIdAndUpdate(id, post, { new: true});

    res.status(200).json(updatedPost);
}