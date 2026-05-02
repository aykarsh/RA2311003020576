import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 'bold' }}
            right="20px"
          >Campus Notifications
          </Typography>
          <Button color="inherit" component={RouterLink} to="/">
            All
          </Button>
          <Button color="inherit" component={RouterLink} to="/priority">
            Priority
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
