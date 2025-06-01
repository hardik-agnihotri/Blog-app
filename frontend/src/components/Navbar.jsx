import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <nav className="row navbar">
      <h2>Blog App</h2>
      <div className="row navbar-links">
        <Link className="simple-btn" to="/">All Blogs</Link>
        <Link className="simple-btn" to="/create">Create</Link>

        {token ? (
          <button className="simple-btn" onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link className="simple-btn" to="/login">Login</Link>
            <Link className="simple-btn" to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
