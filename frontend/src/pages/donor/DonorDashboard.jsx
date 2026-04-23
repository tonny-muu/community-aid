// src/pages/donor/DonorDashboard.jsx
import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import "./DonorDashboard.css";

const DonorDashboard = () => {
  const [userName, setUserName] = useState("");

  // Mock donation stats
  const [stats, setStats] = useState({
    totalDonations: 0,
    causesContributed: 0,
    pendingPledges: 0
  });

  // Mock donations list
  const [donations, setDonations] = useState([
    { id: 1, cause: "Flood Relief in Kampala", amount: 100, status: "Completed", date: "2026-03-10" },
    { id: 2, cause: "Medical Supplies Drive", amount: 50, status: "Pending", date: "2026-03-12" },
    { id: 3, cause: "Food Aid Distribution", amount: 75, status: "Completed", date: "2026-03-15" },
  ]);

  // Load user info for personalized welcome
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo && userInfo.email) {
      const namePart = userInfo.email.split("@")[0];
      const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
      setUserName(formattedName);
    }
  }, []);

  // Update stats based on donations
  useEffect(() => {
    const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);
    const causesContributed = donations.length;
    const pendingPledges = donations.filter(d => d.status === "Pending").length;

    setStats({ totalDonations, causesContributed, pendingPledges });
  }, [donations]);

  // Mark donation as acknowledged
  const markAcknowledged = (id) => {
    const updated = donations.map(d =>
      d.id === id ? { ...d, status: "Completed" } : d
    );
    setDonations(updated);
  };

  return (
    <Layout>
      <div className="donor-dashboard">
        {/* Personalized Welcome */}
        {userName && <h2>Welcome, {userName}!</h2>}

        {/* Stats Cards */}
        <div className="stats-cards">
          <div className="card">
            <h3>Total Donations ($)</h3>
            <p>{stats.totalDonations}</p>
          </div>
          <div className="card">
            <h3>Causes Contributed</h3>
            <p>{stats.causesContributed}</p>
          </div>
          <div className="card">
            <h3>Pending Pledges</h3>
            <p>{stats.pendingPledges}</p>
          </div>
        </div>

        {/* Donations Table */}
        <div className="donation-table">
          <h3>Your Donations</h3>
          <table>
            <thead>
              <tr>
                <th>Cause</th>
                <th>Amount ($)</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {donations.map(d => (
                <tr key={d.id}>
                  <td>{d.cause}</td>
                  <td>{d.amount}</td>
                  <td className={d.status === "Completed" ? "status-completed" : "status-pending"}>{d.status}</td>
                  <td>{d.date}</td>
                  <td>
                    {d.status !== "Completed" && (
                      <button className="ack-btn" onClick={() => markAcknowledged(d.id)}>Acknowledge</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default DonorDashboard;