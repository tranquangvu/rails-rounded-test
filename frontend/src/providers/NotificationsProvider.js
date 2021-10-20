/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, createContext } from "react";

export const NotificationsContext = createContext({
  notification: null,
  addNotification: () => {},
  removeNotification: () => {},
});

export default function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const removeNotification = (id) => {
    const nextNotifications = notifications.filter((notification) => notification.id !== id);
    setNotifications(nextNotifications);
  };

  const addNotification = ({ message, type }) => {
    const nextNotifications = [...notifications, { id: new Date().getTime(), type, message }];
    setNotifications(nextNotifications);
  };

  const contextValue = {
    notifications,
    addNotification: (notification) => addNotification(notification),
    removeNotification: (id) => removeNotification(id),
  };

  return (
    <NotificationsContext.Provider value={contextValue}>
      {children}
    </NotificationsContext.Provider>
  );
}
