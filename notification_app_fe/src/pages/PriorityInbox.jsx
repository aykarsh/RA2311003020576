import React, { useState, useEffect } from "react";
import { Container, Typography, Box, Select, MenuItem, FormControl, InputLabel, Alert } from "@mui/material";
import { getNotifications, sortNotificationsByPriority } from "../services/notificationService";
import NotificationList from "../components/NotificationList";
import { useNotifications } from "../services/NotificationContext";

const PriorityInbox = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [limit, setLimit] = useState(10);
    const { readIds, markAsRead } = useNotifications();

    useEffect(() => {
        const fetchPriorityNotifications = async () => {
            setLoading(true);
            setError(null);
            try {
                // Fetching a large set to sort them manually as per Stage 1 requirements
                const data = await getNotifications({ limit: 100 });
                const sorted = sortNotificationsByPriority(data.notifications || []);
                setNotifications(sorted.slice(0, limit));
            } catch (err) {
                setError("Failed to load priority notifications.");
            } finally {
                setLoading(false);
            }
        };
        fetchPriorityNotifications();
    }, [limit]);

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                <Box>
                    <Typography variant="h4" fontWeight="bold">Priority Inbox</Typography>
                    <Typography variant="body2" color="text.secondary">Top notifications based on importance and recency</Typography>
                </Box>
                <FormControl size="small" sx={{ minWidth: 100 }}>
                    <InputLabel>Top N</InputLabel>
                    <Select value={limit} label="Top N" onChange={(e) => setLimit(e.target.value)}>
                        <MenuItem value={10}>Top 10</MenuItem>
                        <MenuItem value={15}>Top 15</MenuItem>
                        <MenuItem value={20}>Top 20</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
            <NotificationList notifications={notifications} readIds={readIds} onRead={markAsRead} loading={loading} />
        </Container>
    );
};

export default PriorityInbox;