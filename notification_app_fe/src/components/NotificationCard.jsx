import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { 
  Work as WorkIcon, 
  Event as EventIcon, 
  Assessment as ResultIcon,
  FiberManualRecord as UnreadIcon
} from '@mui/icons-material';

const getCategoryStyles = (type) => {
  switch (type?.toLowerCase()) {
    case 'placement':
      return { icon: <WorkIcon fontSize="small" />, color: '#2e7d32', bgColor: '#e8f5e9' };
    case 'result':
      return { icon: <ResultIcon fontSize="small" />, color: '#d32f2f', bgColor: '#ffebee' };
    case 'event':
      return { icon: <EventIcon fontSize="small" />, color: '#ed6c02', bgColor: '#fff3e0' };
    default:
      return { icon: <EventIcon fontSize="small" />, color: '#757575', bgColor: '#f5f5f5' };
  }
};

const NotificationCard = ({ notification, isRead, onRead }) => {
  const styles = getCategoryStyles(notification.Type);
  
  return (
    <Card 
      onClick={() => onRead(notification.ID)}
      sx={{ 
        mb: 2, 
        cursor: 'pointer',
        borderLeft: `6px solid ${styles.color}`,
        backgroundColor: isRead ? '#ffffff' : '#f0f7ff',
        boxShadow: isRead ? 1 : 3,
        transition: 'all 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 4
        }
      }}
    >
      <CardContent sx={{ position: 'relative' }}>
        {!isRead && (
          <UnreadIcon 
            sx={{ 
              position: 'absolute', 
              top: 10, 
              right: 10, 
              color: '#1976d2', 
              fontSize: 14 
            }} 
          />
        )}
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
          <Chip 
            icon={styles.icon} 
            label={notification.Type} 
            size="small"
            sx={{ 
              backgroundColor: styles.bgColor, 
              color: styles.color,
              fontWeight: 'bold',
              textTransform: 'uppercase'
            }} 
          />
          <Typography variant="caption" color="text.secondary">
            {new Date(notification.Timestamp).toLocaleString()}
          </Typography>
        </Box>

        <Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: 600 }}>
          {notification.Message}
        </Typography>
        
        <Typography variant="body2" color="text.secondary">
          ID: {notification.ID}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;
