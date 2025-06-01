import React, { useState } from "react";
import { loginSchema } from "../validations/authValidation";
import API from "../services/axios";
import loginImage from "../assets/login-image.jpg";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      loginSchema.parse(formData);
      const res = await API.post("/users/login", formData);
      localStorage.setItem("token", res.data.token);
      setSuccess("Logged in Successfully");
      navigate("/");
    } catch (error) {
      if (error.name === "ZodError") {
        setError(error.errors[0].message);
      } else {
        setError(error.response?.data?.error || "Login failed");
      }
    }
  };
  return (
    <div className="login-form row login-page">
      <div className="col login-back login-form">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="login-inp"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
          />
          <input
            className="login-inp"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <button className="login-btn" type="submit">Submit</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
      </div>
      <div className="col login-form">
        <div className="login-img-container">
          <img className="login-Image" src={loginImage} alt="IMG" />
        </div>
      </div>
    </div>
  );
};

export default Login;
