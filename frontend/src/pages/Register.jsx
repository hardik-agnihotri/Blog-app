import React, { useState } from "react";
import { registerSchema } from "../validations/authValidation";
import API from "../services/axios";
// import "./Register.css"; // ⬅️ Add this

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
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
      registerSchema.parse(formData);
      const res = await API.post("/users/register", formData);
      localStorage.setItem("token", res.data.token);
      setSuccess("Registered successfully");
    } catch (err) {
      if (err.name === "ZodError") {
        setError(err.errors[0].message);
      } else {
        setError(err.response?.data?.error || "Registration failed");
      }
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input name="username" placeholder="Username" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
        />
        <button type="submit">Register</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
};

export default Register;
