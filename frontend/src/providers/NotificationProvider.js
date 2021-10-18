/* eslint-disable react-hooks/exhaustive-deps */

import React, {
  useState,
  useCallback,
  createContext,
} from "react";

export const NotificationContext = createContext({
  notification: null,
  notify: () => {},
  clear: () => {},
});

export default function NotificationProvider({ children }) {
  const [notification, setNotification] = useState(null);

  const clear = () => setNotification(null);

  const notify = ({ message, type }) => {
    setNotification({ message, type });
    setTimeout(() => clear(), 5000);
  };

  const contextValue = {
    notification,
    notify: useCallback(({ message, type }) => notify({ message, type }), []),
    clear: useCallback(() => clear(null), []),
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
}
