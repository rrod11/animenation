import { csrfFetch } from "./csrf";

const ALL_POSTS = "posts/allPosts";
const GET_POST = "posts/getPost";
const CREATE_POST = "posts/createPost";
const CURRENT_USER_POST = "posts/currentUserPost";
const UPDATE_POST = "posts/updatePost";
const DELETE_POST = "posts/deletePost";

const allPosts = (payload) => {
  return {
    type: ALL_POSTS,
    payload,
  };
};
const currentUserPost = (payload) => {
  return {
    type: CURRENT_USER_POST,
    payload,
  };
};
const getPost = (post) => {
  return {
    type: GET_POST,
    post,
  };
};
const createPost = (payload) => {
  return {
    type: CREATE_POST,
    payload,
  };
};
const updatePost = (payload) => {
  return {
    type: UPDATE_POST,
    payload,
  };
};
const deletePost = (payload, postId) => {
  return {
    type: DELETE_POST,
    payload: postId,
  };
};
