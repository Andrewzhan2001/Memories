import * as api from '../api/index.js';

// Action Creators
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts(); // fetch all the data from api

    dispatch({ type: 'FETCH_ALL', payload: data }); //object, payload store the data for posts
  } catch (error) {
    console.log(error);
  }
};

export const createPosts = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPosts(post); 

    dispatch({ type: 'CREATE', payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: 'UPDATE', payload: data });
  } catch (error) {
    console.log(error);
  }
};