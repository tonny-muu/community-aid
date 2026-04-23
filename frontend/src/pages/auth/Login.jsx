// src/pages/auth/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../utils/token";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("volunteer"); // default role
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // clear previous error

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // Find matching user
    const user = users.find(u => u.email === email && u.role === role);

    if (!user) {
      setError("User not found. Please signup first.");
      setEmail("");
      setPassword("");
      return;
    }

    if (user.password !== password) {
      setError("Incorrect password. Try again.");
      setPassword("");
      return;
    }

    // Save token and user info for session
    setToken(`${role}|mockToken123`);
    localStorage.setItem("userInfo", JSON.stringify({ email, role }));

    // Clear form
    setEmail("");
    setPassword("");

    // Redirect based on role
    if (role === "admin") navigate("/admin/dashboard");
    else if (role === "volunteer") navigate("/volunteer/dashboard");
    else if (role === "donor") navigate("/donor/dashboard");
  };

  return (
    <div className="auth-wrapper">
      <h2>Login</h2>
      {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="volunteer">Volunteer</option>
          <option value="donor">Donor</option>
          <option value="admin">Admin (dev/test only)</option>
        </select>
        <button type="submit">Login</button>
      </form>
      <p>
        New user?{" "}
        <span style={{ color: "blue", cursor: "pointer" }} onClick={() => navigate("/signup")}>
          Signup here
        </span>
      </p>
    </div>
  );
};

export default Login;