import express from 'express';  //for import has defualt export, you can customize your vairable name here
import {getPosts, createPost, updatePost} from '../controllers/posts.js'   //this is not default, use brace with your actual import variabble name

const router = express.Router();

// will execute the following function when someone visit localhost:5000/
router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', updatePost);

export default router;