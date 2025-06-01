import React, { useState } from "react";
import { blogSchema } from "../validations/authValidation";
import API from "../services/axios";

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      blogSchema.parse(formData);
      const token = localStorage.getItem("token");
      await API.post("/blogs/", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess("Blog created successfully!");
      setFormData({ title: "", description: "", image: "" });
    } catch (err) {
      if (err.name === "ZodError") {
        setError(err.errors[0].message);
      } else {
        setError(err.response?.data?.error || "Failed to create blog");
      }
    }
  };

  return (
    <div className="create-blog-container">
      <h2>Create Blog</h2>
      <form className="create-blog-form" onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          value={formData.title}
        />
        <input
          name="image"
          placeholder="Image URL"
          onChange={handleChange}
          value={formData.image}
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          value={formData.description}
        ></textarea>
        <button type="submit">Create</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
};

export default CreateBlog;
