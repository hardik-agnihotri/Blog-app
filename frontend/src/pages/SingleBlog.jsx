import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import API from "../services/axios";

const SingleBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const currentUserId = token ? jwtDecode(token).id : null;

  const fetchBlog = async () => {
    try {
      const res = await API.get(`/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBlog(res.data);
      console.log(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch blog", error);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    try {
      await API.delete(`/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Failed to delete blog", error);
    }
  };
  if (loading) return <p>Loading blog...</p>;
  if (!blog) return <p>Blog not found</p>;
  return (
    <div>
      {" "}
      <h2>{blog.title}</h2>
      <h4>{blog.description}</h4>
      <img src={blog.image} alt={"this is a image of " + blog.title} />

      {blog.user?._id === currentUserId && (
        <div>
            <button onClick={()=>navigate(`/edit-blog/${blog._id}`)}> ✏️ Edit</button>
            <button onClick={handleDelete}>🗑️ Delete</button>
        </div>

      )}
    


    </div>
  );
};

export default SingleBlog;
