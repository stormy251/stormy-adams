import { Activity, AlertTriangle, Circle, PowerOff, Square, Star } from "lucide-react"

export const tags = [
  {
    value: "chat-service",
    label: "Chat Service",
  },
  {
    value: "notification-service",
    label: "Notifications Center",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
]

export const statuses = [
  {
    value: "offline",
    label: "Offline",
    icon: PowerOff,
  },
  {
    value: "active",
    label: "Active",
    icon: Activity,
  },
  {
    value: "warning",
    label: "Warning",
    icon: AlertTriangle,
  }
]

export const priorities = [
  {
    label: "Tier 3",
    value: "low",
    icon: Square,
  },
  {
    label: "Tier 2",
    value: "medium",
    icon: Circle,
  },
  {
    label: "Tier 1",
    value: "high",
    icon: Star,
  },
]