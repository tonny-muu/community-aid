// src/routes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Donate from "./pages/Donate";
import ReportEmergency from "./pages/ReportEmergency";
import Contact from "./pages/Contact";
import Login from "./pages/Login";

// Admin Dashboard Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import EmergencyList from "./pages/admin/EmergencyList";
import DonationTracker from "./pages/admin/DonationTracker";
import Messages from "./pages/admin/Messages";
import VolunteerManagement from "./pages/admin/VolunteerManagement";

// Volunteer Dashboard Pages
import VolunteerDashboard from "./pages/volunteer/VolunteerDashboard";
import AssignedEmergencies from "./pages/volunteer/AssignedEmergencies";
import EmergencyMap from "./pages/volunteer/EmergencyMap";
import Notes from "./pages/volunteer/Notes";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/donate" element={<Layout><Donate /></Layout>} />
      <Route path="/report-emergency" element={<Layout><ReportEmergency /></Layout>} />
      <Route path="/contact" element={<Layout><Contact /></Layout>} />
      <Route path="/login" element={<Layout><Login /></Layout>} />

      {/* Admin Dashboard */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/emergencies"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <EmergencyList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/donations"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <DonationTracker />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/messages"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Messages />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/volunteers"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <VolunteerManagement />
          </ProtectedRoute>
        }
      />

      {/* Volunteer Dashboard */}
      <Route
        path="/volunteer/dashboard"
        element={
          <ProtectedRoute allowedRoles={["volunteer"]}>
            <VolunteerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/volunteer/assigned"
        element={
          <ProtectedRoute allowedRoles={["volunteer"]}>
            <AssignedEmergencies />
          </ProtectedRoute>
        }
      />
      <Route
        path="/volunteer/map"
        element={
          <ProtectedRoute allowedRoles={["volunteer"]}>
            <EmergencyMap />
          </ProtectedRoute>
        }
      />
      <Route
        path="/volunteer/notes"
        element={
          <ProtectedRoute allowedRoles={["volunteer"]}>
            <Notes />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;