import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("volunteer");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const existingUser = users.find(u => u.email === email && u.role === role);

    if (existingUser) {
      alert("User already exists. Please login.");
      navigate("/login");
      return;
    }

    // Save user
    users.push({ email, password, role });
    localStorage.setItem("users", JSON.stringify(users));

    alert(`Account created for ${role}. Please login.`);
    navigate("/login");

    // CLEAR ALL INPUTS (secure)
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setRole("volunteer");
  };

  return (
    <div className="auth-wrapper">
      <h2>Signup</h2>
      <p style={{ color: "red", fontSize: "0.85rem" }}>
        Admin signup is for testing only (remove in production)
      </p>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} required />
        <select value={role} onChange={e=>setRole(e.target.value)}>
          <option value="volunteer">Volunteer</option>
          <option value="donor">Donor</option>
          <option value="admin">Admin (dev/test only)</option>
        </select>
        <button type="submit">Signup</button>
      </form>
      <p>
        Already have an account?{" "}
        <span style={{ color: "blue", cursor: "pointer" }} onClick={() => navigate("/login")}>
          Login here
        </span>
      </p>
    </div>
  );
};

export default Signup;