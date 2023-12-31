import axios from 'axios';
import { api } from './api';
import {
  ADD_POST,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_POST,
  GET_POSTS,
  POST_LOADING,
  DELETE_POST,
  SET_INPUT_VALUE,
  SET_STORED_VALUE,
} from './types';

// add post
export const addPost = (postData) => (dispatch) => {
  dispatch(clearErrors());
  api
    .post('api/posts', postData)
    .then((res) =>
      dispatch({
        type: ADD_POST,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// get post
export const getPost = (id) => (dispatch) => {
  dispatch(setPostLoading());
  api
    .get(`/api/posts/${id}`)
    .then((res) =>
      dispatch({
        type: GET_POST,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_POST,
        payload: null,
      })
    );
};

// get posts
export const getPosts = () => (dispatch) => {
  dispatch(setPostLoading());
  api
    .get('api/posts/')
    .then((res) =>
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_POSTS,
        payload: null,
      })
    );
};

// delete post
export const deletePost = (id) => (dispatch) => {
  api
    .delete(`api/posts/${id}`)
    .then((res) =>
      dispatch({
        type: DELETE_POST,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// like post
export const addLike = (id) => (dispatch) => {
  api
    .post(`api/posts/like/${id}`)
    .then((res) => dispatch(getPosts()))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// unlike post
export const removeLike = (id) => (dispatch) => {
  api
    .post(`api/posts/unlike/${id}`)
    .then((res) => dispatch(getPosts()))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// add comment
export const addComment = (postId, commentData) => (dispatch) => {
  dispatch(clearErrors());
  api
    .post(`/api/posts/comment/${postId}`, commentData)
    .then((res) =>
      dispatch({
        type: GET_POST,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// delete comment
export const deleteComment = (postId, commentId) => (dispatch) => {
  api
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then((res) =>
      dispatch({
        type: GET_POST,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// set loading
export const setPostLoading = () => {
  return {
    type: POST_LOADING,
  };
};

// clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};

export const setStoredValue = (value) => (dispatch) => {
  dispatch({
    type: SET_STORED_VALUE,
    payload: value,
  });
};

export const setInputValue = (fieldName, value) => ({
  type: SET_INPUT_VALUE,
  payload: { fieldName, value },
});


