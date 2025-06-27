'use client';
import * as React from 'react';
import ResponsiveAppBar from './appbar';
import DrawerMenu from './drawer';
import { Box } from '@mui/system';
import { CssBaseline } from '@mui/material';
import useAppBarHeight from './appbarheight';
import { useAuth } from '@/applicationcontext/AuthProvider';


function AppNavigation() {

  // const appBarHeight = useAppBarHeight()
  const appBarHeight = 0
  const { token } = useAuth()

  return (
    <Box sx={{ display: 'flex', flexDirection:'column', marginTop: `${appBarHeight}px` }}>
      <CssBaseline />
     <ResponsiveAppBar></ResponsiveAppBar>
     {token ? <DrawerMenu /> : <></>}
     </Box>
  );
}
export default AppNavigation;
