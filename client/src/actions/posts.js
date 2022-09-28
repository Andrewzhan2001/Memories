import * as api from '../api/index.js';

// Action Creators
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts(); // fetch all the data from api

    dispatch({ type: 'FETCH_ALL', payload: data }); //object, payload store the data for posts
  } catch (error) {
    console.log(error.message);
  }
};