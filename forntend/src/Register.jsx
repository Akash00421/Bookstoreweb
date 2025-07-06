import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register({ setUser }) {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    email: "",
    mobile: "",
    age: "",
    address: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://bookstoreweb-wwfq.onrender.com/api/auth/register", {

      
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
        alert(`User Registered!\nWelcome, ${data.name}`);
        navigate("/");
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (error) {
      alert("Server error: " + error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input name="name" placeholder="Full Name" onChange={handleChange} required />
        <input name="username" placeholder="Username" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="mobile" placeholder="Mobile" onChange={handleChange} required />
        <input name="age" placeholder="Age" onChange={handleChange} required />
        <input name="address" placeholder="Address" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account?{" "}
        <a onClick={() => navigate("/login")} className="auth-link">Login</a>
      </p>
    </div>
  );
}

export default Register;
