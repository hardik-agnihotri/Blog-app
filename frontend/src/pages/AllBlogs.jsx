import React, { useEffect, useState } from "react";
import API from "../services/axios";
import { Link } from "react-router-dom";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchBlog = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/blogs/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBlogs(res.data);
    } catch (error) {
      setError("Login to see All the Blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);
  if (loading) return <p>Loading blogs...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div>
      <h2>All Blogs</h2>
      {blogs.length === 0 ? (
        <p>No blogs yet.</p>
      ) : (
        // blogs.map((blog) => (
        //   <div
        //     key={blog._id}
        //     style={{
        //       border: "1px solid #ccc",
        //       margin: "1rem",
        //       padding: "1rem",
        //     }}
        //   >
        //     <img
        //       src={blog.image}
        //       alt={blog.title}
        //       style={{ maxWidth: "100%" }}
        //     />
        //     <h3>{blog.title}</h3>
        //     <p>{blog.description.slice(0, 100)}...</p>
        //     <Link to={`/blogs/${blog._id}`}>Read More</Link>
        //   </div>
        // ))

        <div className="masonry">
          {blogs.map((blog) => (
            <Link to={`/blogs/${blog._id}`}>
              <div className="blog-card" key={blog._id}>
                <img className="blog-image" src={blog.image} alt={blog.title} />
                <h3 className="blog-title">{blog.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBlogs;
