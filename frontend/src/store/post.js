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
const currentUserPosts = (payload) => {
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

export const allThePosts = () => async (dispatch) => {
  const response = await csrfFetch("/api/posts");
  const posts = await response.json();
  dispatch(allPosts(posts));
  return posts;
};

export const getCurrentUserPosts = (user) => async (dispatch) => {
  const response = await csrfFetch("/api/posts/current");
  const posts = await response.json(user);
  dispatch(currentUserPosts(posts));
  return posts;
};
export const onePost = (postId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${postId}`);
  const post = await response.json();
  dispatch(getPost(post));
  return post;
};
export const createAPost = (payload, images) => async (dispatch) => {
  const response = await csrfFetch("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload }),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(createPost(data));
    // if (images.length === 1) {
    //   await csrfFetch(`/api/posts/${data.id}/images`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       url: images[0],
    //       preview: false,
    //     }),
    //   });
    //   return data;
    // }
    // if (images.length > 1) {
    //   images.map(async (img) => {
    //     await csrfFetch(`/api/posts/${data.id}/images`, {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({
    //         url: img,
    //         preview: false,
    //       }),
    //     });
    //   });
    return data;
    // }
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const updateAPost = (payload, images, postId) => async (dispatch) => {
  const response = await csrfFetch(`/api/posts/${postId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload }),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(updatePost(data));
    // if (images.length === 1) {
    //   await csrfFetch(`/api/posts/${data.id}/images`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       url: images[0],
    //       preview: false,
    //     }),
    //   });
    //   return data;
    // }
    // if (images.length > 1) {
    //   images.map(async (img) => {
    //     await csrfFetch(`/api/posts/${data.id}/images`, {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({
    //         url: img,
    //         preview: false,
    //       }),
    //     });
    //   });
    return data;
    // }
  } else {
    const errors = await response.json();
    return errors;
  }
};
export const deleteAPost = (postId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${postId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(deletePost(data, postId));
  } else {
    const errors = await response.json();
    return errors;
  }
};

const initialState = {};
const postReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case ALL_POSTS: {
      const postData = {};
      action.payload.forEach((post) => {
        postData[post.id] = post;
      });
      return postData;
    }
    case GET_POST:
      newState = {};
      newState[action.post.id] = action.post;
      return newState;
    case CREATE_POST:
      newState = { ...state, [action.payload.id]: action.payload };
      return newState;
    case CURRENT_USER_POST:
      newState = { ...action.payload };
      return newState;
    case DELETE_POST:
      let deleteState;
      console.log(
        "🚀 ~ file: posts.js:186 ~ postReducer ~ action.payload:",
        action.payload
      );
      deleteState = { ...state };
      delete deleteState[action.payload];
      return deleteState;
    default:
      return state;
  }
};

export default postReducer;
