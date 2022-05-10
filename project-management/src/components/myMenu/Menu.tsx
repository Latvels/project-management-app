import React, { useState } from 'react';
// import { Drawer, Box, List, ListItemButton, ListItemIcon, ListItem, ListItemText, IconButton } from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import EditIcon from '@mui/icons-material/Edit';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
// import LanguageIcon from '@mui/icons-material/Language';
import { NavLink } from 'react-router-dom';
import { Box, SpeedDial, SpeedDialAction } from '@mui/material';

const actions = [
    { icon: <HomeIcon />, name: 'Go To Main Page' },
    { icon: <EditIcon />, name: 'Edit Profile' },
    { icon: <DashboardCustomizeIcon />, name: 'Create New Board' },
  ];

function MyMenu() {
  // const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{ position: 'absolute', bottom: 16, right: 16 }}
      icon={<MenuIcon />}
    >
      {actions.map((action) => (
        <NavLink to="/">
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        </NavLink>
      ))}
    </SpeedDial>
  </Box>
      {/* <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => setIsDrawerOpen(true)}
        >
          <MenuIcon />
        </IconButton>

      <Drawer anchor='left' open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <Box p={2} width='250px' textAlign='left' role='presentation'>
          <List>
            <NavLink to="/">
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                </ListItemButton>
                <ListItemText>Go To Main Page</ListItemText>
              </ListItem>
            </NavLink>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
              </ListItemButton>
              <ListItemText>Edit Profile</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <DashboardCustomizeIcon />
                </ListItemIcon>
              </ListItemButton>
              <ListItemText>Create New Board</ListItemText>
            </ListItem>
          </List>
        </Box>
      </Drawer> */}
  );
}

export default MyMenu;