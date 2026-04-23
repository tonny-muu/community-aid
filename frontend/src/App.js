import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Donate from "./pages/Donate";
import ReportEmergency from "./pages/ReportEmergency";
import Contact from "./pages/Contact";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import About from "./pages/About";

import VolunteerDashboard from "./pages/volunteer/VolunteerDashboard";
import DonorDashboard from "./pages/donor/DonorDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";

import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <Routes>

        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/report-emergency" element={<ReportEmergency />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />

        {/* Profile */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["donor", "volunteer", "admin"]}>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Dashboards */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/volunteer/dashboard"
          element={
            <ProtectedRoute allowedRoles={["volunteer"]}>
              <VolunteerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/donor/dashboard"
          element={
            <ProtectedRoute allowedRoles={["donor"]}>
              <DonorDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;