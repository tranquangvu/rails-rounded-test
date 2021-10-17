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

  const notify = ({ message, type }) => setNotification({ message, type });

  const clear = () => setNotification(null);

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
