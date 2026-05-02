import React, { useState, useEffect } from "react";
import { Container, Typography, Box, Select, MenuItem, FormControl, InputLabel, Pagination, Alert } from "@mui/material";
import { getNotifications } from "../services/notificationService";
import NotificationList from "../components/NotificationList";
import { useNotifications } from "../services/NotificationContext";

const AllNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState("");
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const { readIds, markAsRead } = useNotifications();

    useEffect(() => {
        const fetchNotifications = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getNotifications({ limit, page, notification_type: filter || undefined });
                setNotifications(data.notifications || []);
            } catch (err) {
                setError("Failed to load notifications. Please check your connection.");
            } finally {
                setLoading(false);
            }
        };
        fetchNotifications();
    }, [filter, page, limit]);

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                <Typography variant="h4" fontWeight="bold">All Notifications</Typography>
                <FormControl size="small" sx={{ minWidth: 150 }}>
                    <InputLabel>Type</InputLabel>
                    <Select value={filter} label="Type" onChange={(e) => { setFilter(e.target.value); setPage(1); }}>
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="Placement">Placement</MenuItem>
                        <MenuItem value="Result">Result</MenuItem>
                        <MenuItem value="Event">Event</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
            <NotificationList notifications={notifications} readIds={readIds} onRead={markAsRead} loading={loading} />
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <Pagination count={10} page={page} onChange={(e, v) => setPage(v)} color="primary" />
            </Box>
        </Container>
    );
};

export default AllNotifications;