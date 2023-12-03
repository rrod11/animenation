import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";

function createPost() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(
        signUp(firstName, lastName, username, email, password)
      );
      if (data) {
        setErrors(data);
      }
    } else {
      setErrors([
        "Confirm Password field must be the same as the Password field",
      ]);
    }
  };
  return (
    <>
      <div>
        <form
          action="/posts/new"
          method="POST"
          enctype="multipart/form-data"
        ></form>
      </div>
    </>
  );
}
