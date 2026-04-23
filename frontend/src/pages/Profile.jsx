// src/pages/profile/Profile.jsx
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState({
    email: "",
    role: "",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));

    if (storedUser) {
      setUser({
        email: storedUser.email || "",
        role: storedUser.role || "",
      });
    }
  }, []);

  return (
    <Layout>
      <div className="profile-container">
        <h2>User Profile</h2>

        <div className="profile-card">
          <div className="profile-item">
            <strong>Email:</strong>
            <span>{user.email || "Not available"}</span>
          </div>

          <div className="profile-item">
            <strong>Role:</strong>
            <span className="role-badge">{user.role || "Not set"}</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;