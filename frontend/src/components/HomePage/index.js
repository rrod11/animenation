import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./homepage.css";
import { allThePosts } from "../../store/post";
import { allTheUsers } from "../../store/user";

function HomePage({ isLoaded }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log("🚀 ~ file: index.js:10 ~ HomePage ~ user:", user);
  const posts = useSelector((state) => state.post);
  const postArr = Object.values(posts);
  postArr?.forEach((post) => (post.user = user[post.userId]));
  console.log("🚀 ~ file: index.js:15 ~ HomePage ~ postArr:", postArr);
  useEffect(() => {
    dispatch(allThePosts());
    dispatch(allTheUsers());
  }, [dispatch]);
  if (!postArr.length) return null;

  return (
    <div className="main-page">
      <h1>HOMEEEE</h1>
      <div className="posts-container">
        {postArr.map(({ title, description, user }) => (
          <div className="post-container">
            <h3>{title}</h3>
            <div>{description}</div>
            <h4>
              {user.firstName} {user.lastName}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
