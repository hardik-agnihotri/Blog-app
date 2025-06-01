import React from "react";
import { Link } from "react-router-dom";
import loginImage from '../assets/please_login_img.webp';

const PleaseLogin = () => {
  return (
    <div className="row please-login-page">
      <div className="col please-login-text">
        {" "}
        <h2>Please Login First</h2>
        <p>You must be logged in to view this page.</p>
        <Link to="/login">Go to Login</Link>
      </div>
      <div className="col">
        <img className="login-Image" src={loginImage} alt="IMG" />
      </div>
    </div>
  );
};

export default PleaseLogin;
