import axios from 'axios';

const LOG_API_URL = 'http://20.207.122.201/evaluation-service/logs';
const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhbjY1MjdAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwNjEwNiwiaWF0IjoxNzc3NzA1MjA2LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiMTZhMWNlYTEtZDc5NC00NmJhLWIwMWUtYWI0NDljMDg3ZGE3IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYWthcnNoIG5hcmF5YW5hbiIsInN1YiI6IjgyZDc0MWFjLTAzOWEtNDBhYy1iNmJhLTE1ZjdjZWRmZjVjYSJ9LCJlbWFpbCI6ImFuNjUyN0Bzcm1pc3QuZWR1LmluIiwibmFtZSI6ImFrYXJzaCBuYXJheWFuYW4iLCJyb2xsTm8iOiJyYTIzMTEwMDMwMjA1NzYiLCJhY2Nlc3NDb2RlIjoiUWticHhIIiwiY2xpZW50SUQiOiI4MmQ3NDFhYy0wMzlhLTQwYWMtYjZiYS0xNWY3Y2VkZmY0YmIwIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYWthcnNoIG5hcmF5YW5hbiIsInN1YiI6IjgyZDc0MWFjLTAzOWEtNDBhYy1iNmJhLTE1ZjdjZWRmZjVjYSJ9LCJlbWFpbCI6ImFuNjUyN0Bzcm1pc3QuZWR1LmluIiwibmFtZSI6ImFrYXJzaCBuYXJheWFuYW4iLCJyb2xsTm8iOiJyYTIzMTEwMDMwMjA1NzYiLCJhY2Nlc3NDb2RlIjoiUWticHhIIiwiY2xpZW50SUQiOiI4MmQ3NDFhYy0wMzlhLTQwYWMtYjZiYS0xNWY3Y2VkZmY1Y2EiLCJjbGllbnRTZWNyZXQiOiJ2WnRaVnBoVGVadGJWUWNLIn0.aNM5VZX1KxuROwc8FMPYPa3NCDKxL2Kdt8P45lDV2Ow';

export const Log = async (stack, level, pkg, message) => {
    const payload = {
        stack: stack.toLowerCase(),
        level: level.toLowerCase(),
        package: pkg.toLowerCase(),
        message: message
    };

    try {
        await axios.post(LOG_API_URL, payload, {
            headers: {
                'Authorization': 'Bearer ' + AUTH_TOKEN,
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        // Silent fail for frontend logs
    }
};

export default Log;
