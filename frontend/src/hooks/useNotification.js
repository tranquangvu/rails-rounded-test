import { useContext } from "react";
import { NotificationContext } from "../providers/NotificationProvider";

function useNotification() {
  const { notification, notify, clear } = useContext(NotificationContext);
  return { notification, notify, clear };
}

export default useNotification;
