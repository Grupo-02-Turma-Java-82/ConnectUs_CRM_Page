import { createContext, useEffect, useState, type ReactNode } from "react";
import type { Notification } from "@/models/Notification";

const LOCAL_STORAGE_KEY = "@connectus-store:notifications";

type NotificationsContextData = {
  isLoading: boolean;
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteAll: () => void;
};

export const NotificationsContext = createContext(
  {} as NotificationsContextData
);

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  function addNotification(notification: Notification) {
    setIsLoading(true);

    setNotifications([...notifications, notification]);

    setIsLoading(false);
  }

  function markAsRead(id: string) {
    const updatedNotifications = notifications.map((notification) => {
      if (notification.id.match(id)) {
        if (notification.isRead) {
          return {
            ...notification,
            isRead: false,
          };
        } else {
          return {
            ...notification,
            isRead: true,
          };
        }
      }

      return notification;
    });

    setNotifications(updatedNotifications);
  }

  function markAllAsRead() {
    const updatedNotifications = notifications.map((notification) => {
      if (notification.isRead) {
        return {
          ...notification,
          isRead: false,
        };
      } else {
        return {
          ...notification,
          isRead: true,
        };
      }
    });

    setNotifications(updatedNotifications);
  }

  function deleteAll() {
    setNotifications([]);
  }

  function fetchNotifications() {
    const notifications = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (notifications) {
      const parsedNotifications = JSON.parse(notifications);
      setNotifications(parsedNotifications);
    }
  }

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    if (notifications.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notifications));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }, [notifications]);

  return (
    <NotificationsContext.Provider
      value={{
        addNotification,
        isLoading,
        markAllAsRead,
        markAsRead,
        notifications,
        deleteAll,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}
