import React, { useState } from "react";
import { FaBell } from "react-icons/fa";
import "./Notifications.css";

const Notifications = () => {
  const [open, setOpen] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "Flood emergency reported in Kampala",
      read: false,
    },
    {
      id: 2,
      message: "New donation received for disaster relief",
      read: false,
    },
    {
      id: 3,
      message: "Volunteer task available near you",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const toggleNotifications = () => {
    setOpen(!open);
  };

  const markAsRead = (id) => {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updated);
  };

  return (
    <div className="notifications-container">
      {/* Notification Bell */}
      <button className="notification-btn" onClick={toggleNotifications}>
        <FaBell />
        {unreadCount > 0 && (
          <span className="notification-count">{unreadCount}</span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="notifications-dropdown">
          <h4>Notifications</h4>

          {notifications.length === 0 ? (
            <p className="no-notifications">No notifications</p>
          ) : (
            notifications.map((note) => (
              <div
                key={note.id}
                className={`notification-item ${
                  note.read ? "read" : "unread"
                }`}
                onClick={() => markAsRead(note.id)}
              >
                {note.message}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;