const axios = require("axios");
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhbjY1MjdAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwMjYzMSwiaWF0IjoxNzc3NzAxNzMxLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiOWQ0NTM1NjktNDc3NS00Y2QxLWE4MTAtNzBiMDIwN2Y2ZmIwIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYWthcnNoIG5hcmF5YW5hbiIsInN1YiI6IjgyZDc0MWFjLTAzOWEtNDBhYy1iNmJhLTE1ZjdjZWRmZjVjYSJ9LCJlbWFpbCI6ImFuNjUyN0Bzcm1pc3QuZWR1LmluIiwibmFtZSI6ImFrYXJzaCBuYXJheWFuYW4iLCJyb2xsTm8iOiJyYTIzMTEwMDMwMjA1NzYiLCJhY2Nlc3NDb2RlIjoiUWticHhIIiwiY2xpZW50SUQiOiI4MmQ3NDFhYy0wMzlhLTQwYWMtYjZiYS0xNWY3Y2VkZmY0YmIwIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYWthcnNoIG5hcmF5YW5hbiIsInN1YiI6IjgyZDc0MWFjLTAzOWEtNDBhYy1iNmJhLTE1ZjdjZWRmZjVjYSJ9LCJlbWFpbCI6ImFuNjUyN0Bzcm1pc3QuZWR1LmluIiwibmFtZSI6ImFrYXJzaCBuYXJheWFuYW4iLCJyb2xsTm8iOiJyYTIzMTEwMDMwMjA1NzYiLCJhY2Nlc3NDb2RlIjoiUWticHhIIiwiY2xpZW50SUQiOiI4MmQ3NDFhYy0wMzlhLTQwYWMtYjZiYS0xNWY3Y2VkZmY1Y2EiLCJjbGllbnRTZWNyZXQiOiJ2WnRaVnBoVGVadGJWUWNLIn0.lWlF5lkRZQ4BWcA0Fa8Z11D6f_93yoV51LjoPHCuDIg";
const url = "http://20.207.122.201/evaluation-service/notifications";

axios.get(url, { headers: { Authorization: "Bearer " + token } })
    .then(r => {
        console.log("SUCCESS");
        console.log("Data count:", r.data.notifications ? r.data.notifications.length : (Array.isArray(r.data) ? r.data.length : "unknown"));
    })
    .catch(e => {
        console.log("ERROR:", e.message);
        if (e.response) console.log("Status:", e.response.status, e.response.data);
    });