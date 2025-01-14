import './notifications.scss'
import React from "react";
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
const Notifications = () => {
  return (
    <div className="notifications-page">
        <Sidebar/>
        <div className="notificationcontainer"><Navbar/>
      <h1>Notifications</h1>
      <div className="notification-item">
        <div className="notification-content">
          <h3>New Task Added</h3>
          <p>Mark the Attendance</p>
        </div>
        <div className="notification-actions">
          <button className="notification-button">View</button>
          <button className="notification-button">Mark as Read</button>
          <button className="notification-button">Delete</button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Notifications;
