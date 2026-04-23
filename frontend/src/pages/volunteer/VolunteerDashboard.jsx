// src/pages/volunteer/VolunteerDashboard.jsx
import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import "./VolunteerDashboard.css";

const VolunteerDashboard = () => {
  const [userName, setUserName] = useState("");

  // Stats state
  const [stats, setStats] = useState({
    tasksAssigned: 3,
    emergenciesReported: 2,
    hoursVolunteered: 12
  });

  // Tasks state
  const [tasks, setTasks] = useState([
    { id: 1, name: "Flood Relief in Kampala", location: "Kampala", status: "Pending", deadline: "2026-03-20" },
    { id: 2, name: "Distribute Food Aid", location: "Mbarara", status: "Completed", deadline: "2026-03-15" },
    { id: 3, name: "Medical Assistance Drive", location: "Gulu", status: "Pending", deadline: "2026-03-22" },
  ]);

  // Load user info for personalized greeting
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo && userInfo.email) {
      const namePart = userInfo.email.split("@")[0];
      const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
      setUserName(formattedName);
    }
  }, []);

  // Update stats based on tasks
  useEffect(() => {
    const tasksAssigned = tasks.length;
    const emergenciesReported = tasks.filter(t =>
      t.name.toLowerCase().includes("emergency") || t.name.toLowerCase().includes("flood")
    ).length;
    const hoursVolunteered = tasks.filter(t => t.status === "Completed").length * 4; // example: 4 hrs per task

    setStats({
      tasksAssigned,
      emergenciesReported,
      hoursVolunteered
    });
  }, [tasks]);

  // Mark task as complete
  const markComplete = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, status: "Completed" } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <Layout>
      <div className="volunteer-dashboard">
        {/* Personalized Welcome */}
        {userName && <h2>Welcome, {userName}!</h2>}

        {/* Stats Cards */}
        <div className="stats-cards">
          <div className="card">
            <h3>Tasks Assigned</h3>
            <p>{stats.tasksAssigned}</p>
          </div>
          <div className="card">
            <h3>Emergencies Reported</h3>
            <p>{stats.emergenciesReported}</p>
          </div>
          <div className="card">
            <h3>Hours Volunteered</h3>
            <p>{stats.hoursVolunteered}</p>
          </div>
        </div>

        {/* Task Table */}
        <div className="task-table">
          <h3>Your Tasks</h3>
          <table>
            <thead>
              <tr>
                <th>Task Name</th>
                <th>Location</th>
                <th>Status</th>
                <th>Deadline</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task.id}>
                  <td>{task.name}</td>
                  <td>{task.location}</td>
                  <td className={task.status === "Completed" ? "status-completed" : "status-pending"}>{task.status}</td>
                  <td>{task.deadline}</td>
                  <td>
                    {task.status !== "Completed" && (
                      <button className="complete-btn" onClick={() => markComplete(task.id)}>
                        Mark Complete
                      </button>
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

export default VolunteerDashboard;