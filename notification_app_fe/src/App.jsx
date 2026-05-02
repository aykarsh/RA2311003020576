import React, { useState } from 'react';
import './App.css';

function App() {
  const [notifications] = useState([
    {
      id: 1,
      category: 'Placement',
      title: 'Google Interview Shortlist',
      message: 'Congratulations! You have been shortlisted for the round 1 interview with Google for the SWE role.',
      type: 'placement'
    },
    {
      id: 2,
      category: 'Event',
      title: 'Annual Hackathon 2026',
      message: 'Registration is now open for the campus-wide hackathon. Join us for 48 hours of innovation!',
      type: 'event'
    },
    {
      id: 3,
      category: 'Result',
      title: 'Mid-Semester Grades Out',
      message: 'The results for the Spring 2026 semester are now available on the portal.',
      type: 'result'
    }
  ]);

  return (
    <div className="app-container">
      <h1 className="notification-header">Campus Notifications</h1>
      <div className="notification-list">
        {notifications.map((notif) => (
          <div key={notif.id} className={`notification-card ${notif.type}`}>
            <div className="category" style={{ 
              color: notif.type === 'placement' ? '#28a745' : 
                     notif.type === 'event' ? '#ffc107' : '#dc3545' 
            }}>
              {notif.category}
            </div>
            <h2 className="title">{notif.title}</h2>
            <p className="message">{notif.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
