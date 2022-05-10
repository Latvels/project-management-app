import React, { useState } from 'react';
import { Drawer, Box, List, ListItemButton, ListItemIcon, ListItem, ListItemText, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import EditIcon from '@mui/icons-material/Edit';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import LanguageIcon from '@mui/icons-material/Language';

function MyMenu() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <>
      <IconButton
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
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
              </ListItemButton>
              <ListItemText>Go To Main Page</ListItemText>
            </ListItem>
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
      </Drawer>
    </>
  )
}

export default MyMenu;