const axios = require("axios");

const CATEGORY_WEIGHTS = {
    "placement": 3,
    "result": 2,
    "event": 1
};

const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhbjY1MjdAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwNjEwNiwiaWF0IjoxNzc3NzA1MjA2LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiMTZhMWNlYTEtZDc5NC00NmJhLWIwMWUtYWI0NDljMDg3ZGE3IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYWthcnNoIG5hcmF5YW5hbiIsInN1YiI6IjgyZDc0MWFjLTAzOWEtNDBhYy1iNmJhLTE1ZjdjZWRmZjVjYSJ9LCJlbWFpbCI6ImFuNjUyN0Bzcm1pc3QuZWR1LmluIiwibmFtZSI6ImFrYXJzaCBuYXJheWFuYW4iLCJyb2xsTm8iOiJyYTIzMTEwMDMwMjA1NzYiLCJhY2Nlc3NDb2RlIjoiUWticHhIIiwiY2xpZW50SUQiOiI4MmQ3NDFhYy0wMzlhLTQwYWMtYjZiYS0xNWY3Y2VkZmY1Y2EiLCJjbGllbnRTZWNyZXQiOiJ2WnRaVnBoVGVadGJWUWNLIn0.aNM5VZX1KxuROwc8FMPYPa3NCDKxL2Kdt8P45lDV2Ow";

function getPriorityScore(notification) {
    const type = (notification.Type || "").toLowerCase();
    const weight = CATEGORY_WEIGHTS[type] || 0;
    const timestamp = new Date(notification.Timestamp).getTime();
    return (weight * Math.pow(10, 13)) + timestamp;
}

function getTopNotifications(notifications, n = 10) {
    return [...notifications]
        .map(notif => ({ ...notif, priorityScore: getPriorityScore(notif) }))
        .sort((a, b) => b.priorityScore - a.priorityScore)
        .slice(0, n);
}

const API_URL = "http://20.207.122.201/evaluation-service/notifications";

async function fetchAndProcessNotifications() {
    try {
        console.log(`Fetching notifications from: ${API_URL}...`);
        const response = await axios.get(API_URL, {
            headers: { "Authorization": `Bearer ${AUTH_TOKEN}` }
        });
        
        const notifications = response.data.notifications || [];
        console.log(`Fetched ${notifications.length} notifications.`);

        const top10 = getTopNotifications(notifications, 10);

        console.log("\n--- Stage 1: Priority Inbox (Top 10) ---");
        top10.forEach((n, i) => {
            const type = (n.Type || "UNKNOWN").toUpperCase();
            const date = n.Timestamp || "N/A";
            const message = n.Message || "No Content";
            console.log(`${i + 1}. [${type}] ${message} - ${date}`);
        });
    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
    }
}

fetchAndProcessNotifications();
