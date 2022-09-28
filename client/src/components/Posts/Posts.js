import React from 'react';
import Post from './Post/Post.js';
import { useSelector } from 'react-redux';
import useStyles from './styles';

const Posts = ()=> {
  const posts = useSelector((state) => state.posts);  // posts match to reducers/index.js
  const classes = useStyles();
  console.log(posts);
  return (
    <>
      <h1>POSTS</h1>
      <Post />
      <Post />
    </>
    
  )
}


export default Posts