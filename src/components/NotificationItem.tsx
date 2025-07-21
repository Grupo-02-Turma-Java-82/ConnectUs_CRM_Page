import type { Notification } from "@/models/Notification";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import { Checkbox } from "./ui/checkbox";
import { cn } from "@/lib/utils";
import React from "react";
import { useNotifications } from "@/hooks/useNotifications";

const actionStyles: Record<
  string,
  { icon: IconName; bgClass: string; iconColorClass: string }
> = {
  Criado: {
    icon: "check",
    bgClass: "bg-green-100 dark:bg-green-900/50",
    iconColorClass: "text-green-600 dark:text-green-400",
  },
  Atualizado: {
    icon: "edit",
    bgClass: "bg-amber-100 dark:bg-amber-900/50",
    iconColorClass: "text-amber-600 dark:text-amber-400",
  },
  Deletado: {
    icon: "trash",
    bgClass: "bg-red-100 dark:bg-red-900/50",
    iconColorClass: "text-red-600 dark:text-red-400",
  },
};

type Props = {
  notification: Notification;
} & React.HTMLAttributes<HTMLDivElement>;

export function NotificationItem({ notification, className, ...props }: Props) {
  const { markAsRead } = useNotifications();

  const formattedCreatedAt = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(notification.createdAt));

  const styles = actionStyles[notification.action] || actionStyles.Atualizado;

  return (
    <div
      className={cn("flex w-full items-center gap-4 border-b p-5", className)}
      {...props}
    >
      <div
        className={cn(
          "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full",
          styles.bgClass
        )}
      >
        <DynamicIcon
          name={styles.icon}
          size={18}
          className={styles.iconColorClass}
        />
      </div>

      <div className="flex-grow">
        <p
          className={
            notification.isRead ? "opacity-50 line-through" : "font-semibold"
          }
        >
          {notification.type}
        </p>
        <p
          className={
            notification.isRead ? "opacity-50 line-through text-sm" : "text-sm"
          }
        >
          {notification.message}
        </p>
      </div>

      <div className="ml-auto flex flex-col items-end gap-2 pl-4 text-right">
        <Checkbox
          checked={notification.isRead}
          className="w-5 h-5 border-2 mb-4"
          onCheckedChange={() => markAsRead(notification.id)}
        />
        <p
          className={
            notification.isRead
              ? "opacity-50 line-through whitespace-nowrap text-xs"
              : "whitespace-nowrap text-xs"
          }
        >
          {formattedCreatedAt}
        </p>
      </div>
    </div>
  );
}
