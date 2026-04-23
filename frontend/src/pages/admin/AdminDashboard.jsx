// src/pages/admin/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [userName, setUserName] = useState("");

  // Stats
  const [stats, setStats] = useState({
    totalVolunteers: 0,
    totalDonors: 0,
    pendingApprovals: 0,
    pendingEmergencies: 0
  });

  // Mock Volunteers & Donors
  const [volunteers] = useState([
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
  ]);

  const [donors] = useState([
    { id: 1, name: "Charlie", email: "charlie@example.com" },
    { id: 2, name: "Dana", email: "dana@example.com" },
  ]);

  // Pending Admins
  const [pendingAdmins, setPendingAdmins] = useState([
    { id: 1, name: "Eve", email: "eve@example.com" },
  ]);

  // Pending Emergencies
  const [pendingEmergencies, setPendingEmergencies] = useState([
    { id: 1, type: "Flood", location: "Kampala", reportedBy: "Volunteer1", date: "2026-03-15" },
    { id: 2, type: "Fire", location: "Gulu", reportedBy: "Volunteer2", date: "2026-03-16" },
  ]);

  // Load admin info from localStorage
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo && userInfo.email) {
      const namePart = userInfo.email.split("@")[0];
      setUserName(namePart.charAt(0).toUpperCase() + namePart.slice(1));
    }
  }, []);

  // Update stats dynamically
  useEffect(() => {
    setStats({
      totalVolunteers: volunteers.length,
      totalDonors: donors.length,
      pendingApprovals: pendingAdmins.length,
      pendingEmergencies: pendingEmergencies.length,
    });
  }, [volunteers, donors, pendingAdmins, pendingEmergencies]);

  // Approve / Reject Admin Requests
  const approveAdmin = (id) => setPendingAdmins(pendingAdmins.filter(a => a.id !== id));
  const rejectAdmin = (id) => setPendingAdmins(pendingAdmins.filter(a => a.id !== id));

  // Approve / Reject Emergencies
  const approveEmergency = (id) => setPendingEmergencies(pendingEmergencies.filter(e => e.id !== id));
  const rejectEmergency = (id) => setPendingEmergencies(pendingEmergencies.filter(e => e.id !== id));

  return (
    <Layout>
      <div className="admin-dashboard">
        {userName && <h2 className="welcome">Welcome, {userName}!</h2>}

        {/* Stats Cards */}
        <div className="stats-cards">
          <div className="card">
            <h3>Total Volunteers</h3>
            <p>{stats.totalVolunteers}</p>
          </div>
          <div className="card">
            <h3>Total Donors</h3>
            <p>{stats.totalDonors}</p>
          </div>
          <div className="card">
            <h3>Pending Admin Approvals</h3>
            <p>{stats.pendingApprovals}</p>
          </div>
          <div className="card">
            <h3>Pending Emergencies</h3>
            <p>{stats.pendingEmergencies}</p>
          </div>
        </div>

        {/* Pending Admins Table */}
        <div className="admin-table">
          <h3>Pending Admin Requests</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingAdmins.length === 0 && (
                <tr>
                  <td colSpan="3" style={{ textAlign: "center" }}>No pending admin requests</td>
                </tr>
              )}
              {pendingAdmins.map(admin => (
                <tr key={admin.id}>
                  <td>{admin.name}</td>
                  <td>{admin.email}</td>
                  <td>
                    <button className="approve-btn" onClick={() => approveAdmin(admin.id)}>Approve</button>
                    <button className="reject-btn" onClick={() => rejectAdmin(admin.id)}>Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pending Emergencies Table */}
        <div className="admin-table">
          <h3>Pending Emergencies</h3>
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Location</th>
                <th>Reported By</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingEmergencies.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>No pending emergencies</td>
                </tr>
              )}
              {pendingEmergencies.map(e => (
                <tr key={e.id}>
                  <td>{e.type}</td>
                  <td>{e.location}</td>
                  <td>{e.reportedBy}</td>
                  <td>{e.date}</td>
                  <td>
                    <button className="approve-btn" onClick={() => approveEmergency(e.id)}>Approve</button>
                    <button className="reject-btn" onClick={() => rejectEmergency(e.id)}>Reject</button>
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

export default AdminDashboard;