import React from 'react';
import { Box, Typography, Skeleton } from '@mui/material';
import NotificationCard from './NotificationCard';

const NotificationList = ({ notifications, readIds, onRead, loading }) => {
  if (loading) {
    return (
      <Box>
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} variant="rectangular" height={120} sx={{ mb: 2, borderRadius: 2 }} />
        ))}
      </Box>
    );
  }

  if (!notifications || notifications.length === 0 || notifications === undefined) {
    return (
      <Box sx={{ textAlign: 'center', py: 5 }}>
        <Typography color="text.secondary">No notifications found.</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {notifications.map((notif) => (
        <NotificationCard 
          key={notif.ID} 
          notification={notif} 
          isRead={readIds.has(notif.ID)}
          onRead={onRead}
        />
      ))}
    </Box>
  );
};

export default NotificationList;

// Debug: notifications: {JSON.stringify(notifications)}
