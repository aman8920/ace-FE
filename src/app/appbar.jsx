'use client';
import * as React from 'react';
import { Image } from '@nextui-org/react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useDrawer } from '@/applicationcontext/DrawerContextProvider';
import Link from 'next/link';
import { useAuth } from '@/applicationcontext/AuthProvider';

const pages = [
    {
        key:'home',
        title: 'Home',
        path: '/dashboard'
    },
// {
//     key:'pane',
//     title: 'Pane',
//     path: 'pane'
// },
// {
//     key:'dnd',
//     title: 'Move Planogram',
//     path: 'dnd'
// }
];
const settings = [];

function ResponsiveAppBar(props) {
    const { isOpen, setIsOpen } = useDrawer();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const { token } = useAuth()
    // console.log(token)

    const triggerDrawer = () => {
        if (isOpen)
            setIsOpen(false)
        else
            setIsOpen(true)

    }

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
        triggerDrawer()
    };


    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
        triggerDrawer()
    };

    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, height: "50px" }} color="slate">
            {/* <Container maxWidth="xl"> */}
            <Toolbar disableGutters variant="dense" sx={{maxHeight: "50px"}}>
            { token ? <IconButton
                    size="small"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                >
                    <MenuIcon color="unslate" />
                </IconButton> : <></> }
                {/* <Image src="/kenvue_logo_black_rgb.png" alt="Kenvue logo" width={50} height={50} /> */}

                {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="#app-bar-with-responsive-menu"
                    sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                </Typography>

                {token ? <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="small"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        // open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}
                    >
                        {pages.map((page) => (
                            <MenuItem key={page.key} >
                                <Typography textAlign="center">
                                    <Link className={`link ${'pathname' === '/' ? 'active' : ''}`} href={page.path}>
                                        {page.title}
                                    </Link>
                                </Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box> : <></>}
                {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href="#app-bar-with-responsive-menu"
                    sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    LOGO
                </Typography> */}
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {token ? pages.map((page) => (
                        <Button
                            key={page.key}
                            // onClick={handleCloseNavMenu}
                            sx={{ my: 0, color: 'white', display: 'block' }}
                        >
                            <Link className={`link ${'pathname' === '/' ? 'active' : ''}`} href={`${page.path}`}>
                                {page.title}
                            </Link>
                        </Button>
                    )) : <></>}
                </Box>
                <Box sx={{ flexGrow: 0 }}>
                    <svg fill="#00B097" viewBox="0 0 500 50" width="500" xmlns="http://www.w3.org/2000/svg">
                        <polygon points="50,0 0,50 500,50 500,0" />
                        <text x="250" y="35" textAnchor="middle" fill="black" fontSize="24" fontWeight="bold">
                            Kenvas
                        </text>
                    </svg>
                </Box>
                {/* <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
            </Toolbar>
            {/* </Container> */}
        </AppBar>
    );
}
export default ResponsiveAppBar;
