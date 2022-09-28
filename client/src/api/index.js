import axios from 'axios';

//backend route
const url = "http://localhost:5000/posts";

// make api calls
export const fetchPosts = () => axios.get(url);
export const createPosts = (newPost) => axios.post(url, newPost);