import Log from './logger';
import axios from "axios";

const API_BASE_URL = "/api-proxy/notifications";
const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhbjY1MjdAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwNjEwNiwiaWF0IjoxNzc3NzA1MjA2LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiMTZhMWNlYTEtZDc5NC00NmJhLWIwMWUtYWI0NDljMDg3ZGE3IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYWthcnNoIG5hcmF5YW5hbiIsInN1YiI6IjgyZDc0MWFjLTAzOWEtNDBhYy1iNmJhLTE1ZjdjZWRmZjVjYSJ9LCJlbWFpbCI6ImFuNjUyN0Bzcm1pc3QuZWR1LmluIiwibmFtZSI6ImFrYXJzaCBuYXJheWFuYW4iLCJyb2xsTm8iOiJyYTIzMTEwMDMwMjA1NzYiLCJhY2Nlc3NDb2RlIjoiUWticHhIIiwiY2xpZW50SUQiOiI4MmQ3NDFhYy0wMzlhLTQwYWMtYjZiYS0xNWY3Y2VkZmY1Y2EiLCJjbGllbnRTZWNyZXQiOiJ2WnRaVnBoVGVadGJWUWNLIn0.aNM5VZX1KxuROwc8FMPYPa3NCDKxL2Kdt8P45lDV2Ow";

const notificationApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Authorization": `Bearer ${AUTH_TOKEN}`
  }
});

export const getNotifications = async (params = {}) => {
  try {
    // API constraint: limit must be <= 10
    const limit = Math.min(params.limit || 10, 10);
    const page = params.page || 1;
    
    // Some endpoints may fail if notification_type is empty string, so we use undefined
    const notification_type = params.notification_type || undefined;

    const response = await notificationApi.get("", {
      params: { limit, page, notification_type }
    });

    if (response.data && response.data.notifications) {
      return response.data;
    } else if (Array.isArray(response.data)) {
      return { notifications: response.data };
    }
    return { notifications: [] };
  } catch (error) {
    Log("frontend", "error", "api", error.message);
    throw error;
  }
};

export const CATEGORY_WEIGHTS = {
  "placement": 3,
  "result": 2,
  "event": 1
};

export const getPriorityScore = (notification) => {
  const type = (notification.Type || "").toLowerCase();
  const weight = CATEGORY_WEIGHTS[type] || 0;
  const timestamp = new Date(notification.Timestamp).getTime();
  return (weight * Math.pow(10, 13)) + timestamp;
};

export const sortNotificationsByPriority = (notifications) => {
  return [...notifications]
    .map(notif => ({ ...notif, priorityScore: getPriorityScore(notif) }))
    .sort((a, b) => b.priorityScore - a.priorityScore);
};
