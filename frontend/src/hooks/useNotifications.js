import { useContext } from "react";
import { NotificationsContext } from "../providers/NotificationsProvider";

function useNotifications() {
  const { notifications, addNotification, removeNotification } = useContext(NotificationsContext);
  return { notifications, addNotification, removeNotification };
}

export default useNotifications;
