import React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [readIds, setReadIds] = useState(new Set());

  // Load read status from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('readNotificationIds');
    if (saved) {
      try {
        setReadIds(new Set(JSON.parse(saved)));
      } catch (e) {
        console.error('Failed to parse read notification IDs', e);
      }
    }
  }, []);

  const markAsRead = (id) => {
    setReadIds((prev) => {
      const newSet = new Set(prev);
      newSet.add(id);
      localStorage.setItem('readNotificationIds', JSON.stringify(Array.from(newSet)));
      return newSet;
    });
  };

  return (
    <NotificationContext.Provider value={{ readIds, markAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
