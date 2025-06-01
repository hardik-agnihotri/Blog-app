import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/axios";

const EditBlog = () => {
  const { id } = useParams();
  const [blogForm, setBlogForm] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await API.get(`/blogs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBlogForm(res.data);
      } catch (error) {
        console.error("Failed to fetch blog", error);
      }
    };
    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    setBlogForm({ ...blogForm, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/blogs/${id}`, blogForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate(`/blogs/${id}`);
    } catch (err) {
      console.error("Failed to update blog", err);
    }
  };

  if (!blogForm) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Blog</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Title</label>
          <input
            name="title"
            value={blogForm.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={blogForm.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Image URL</label>
          <input
            name="image"
            value={blogForm.image}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Update Blog</button>
      </form>
    </div>
  );
};

export default EditBlog;
