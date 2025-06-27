'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import {  Drawer, useTheme } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDrawer } from '@/applicationcontext/DrawerContextProvider';
import useAppBarHeight from './appbarheight';
import { useAuth } from '@/applicationcontext/AuthProvider';


function DrawerMenu(props) {
    const theme = useTheme();
    // const appBarHeight = useAppBarHeight()
    const { token, logout } = useAuth()
    const appBarHeight = 50
    
  const { isOpen, setIsOpen } = useDrawer();

  const pages = [
    {
      key:'home',
      title: 'Home',
      path: '/dashboard'
    },
    // {
    //   key:'planogram',
    //   title: 'Planogram',
    //   path: 'planogram'
    // },
    // {
    //   key:'pane',
    //   title: 'Pane',
    //   path: 'pane'
    // },
  ];

  const DrawerList = (
    <Box  
    sx={{ width: 250, height:  "calc(100vh - 50px)"}} 
    className="flex flex-col justify-between"
    role="presentation" onClick={() =>{setIsOpen(false)}}>
      <List>
        {pages.map((text, index) => (
          <ListItem key={text}  disablePadding>
            
            <ListItemButton href={text.path}  >
              <ListItemIcon>
                {index % 2 === 0 ? <HomeIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      { token ? <List>
          <ListItem key={"logout"}  disablePadding>
            <ListItemButton onClick={logout}  >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
      </List> : <></> }
      
    </Box>
  );
  return (
    <>
    <Drawer 
    sx={{
        width: 250, 
        '&.MuiDrawer-root .MuiDrawer-paper': {'marginTop': `${appBarHeight}px`},
      }}
    open={isOpen} onClose={() =>{
        setIsOpen(false)
    }}>
    {DrawerList}
    </Drawer>
    </>
  );
}
export default DrawerMenu;
