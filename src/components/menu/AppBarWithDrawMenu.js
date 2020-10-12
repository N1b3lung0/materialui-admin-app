import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { startLogout } from '../../redux/actions/auth';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Badge, Menu, MenuItem, Button, ListItem, ListItemIcon, ListItemText, Divider, List, useTheme, Drawer, CssBaseline } from '@material-ui/core';
import { appBarWithDrawMenuStyles } from '../../styles/components/menu/AppBarWithDrawMenuStyles';
import clsx from 'clsx';

import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export default function AppBarWithDrawMenu() {

    const classes = appBarWithDrawMenuStyles();
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);

    const handleProfileMenuOpen = (event)   => setAnchorEl(event.currentTarget);
    const handleMobileMenuClose = ()        => setMobileMoreAnchorEl(null);
    const handleMobileMenuOpen  = (event)   => setMobileMoreAnchorEl(event.currentTarget);
    const handleMenuClose       = ()        => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };
    const handleLogout = () => {
        dispatch(startLogout());
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu anchorEl={anchorEl} id={menuId} keepMounted open={isMenuOpen} onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu anchorEl={mobileMoreAnchorEl} id={mobileMenuId} keepMounted open={isMobileMenuOpen} onClose={handleMobileMenuClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <MenuItem>
                <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="secondary"><MailIcon /></Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton aria-label="show 11 new notifications" color="inherit">
                    <Badge badgeContent={11} color="secondary"><NotificationsIcon /></Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton aria-label="account of current user" aria-controls="primary-search-account-menu" aria-haspopup="true" color="inherit" >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
            <MenuItem onClick={ handleLogout }>
                <IconButton aria-label="exit to app" aria-controls="primary-search-account-menu" aria-haspopup="true" color="inherit" >
                    <ExitToAppIcon />
                </IconButton>
                <p>Logout</p>
            </MenuItem>
        </Menu>
    );

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={clsx(classes.appBar, {[classes.appBarShift]: open,}, classes.grow)}>
                <Toolbar>
                    <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" className={clsx(classes.menuButton, { [classes.hide]: open, })} >
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>Material-UI</Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}><SearchIcon /></div>
                        <InputBase placeholder="Search…" classes={{ root: classes.inputRoot, input: classes.inputInput, }} inputProps={{ 'aria-label': 'search' }} />
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <IconButton aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="secondary"><MailIcon /></Badge>
                        </IconButton>
                        <IconButton aria-label="show 17 new notifications" color="inherit">
                            <Badge badgeContent={35} color="secondary"><NotificationsIcon /></Badge>
                        </IconButton>
                        <IconButton edge="end" aria-label="account of current user" aria-controls={menuId} aria-haspopup="true" color="inherit" onClick={handleProfileMenuOpen} >
                            <AccountCircle />
                        </IconButton>
                        <Button onClick={ handleLogout } color="inherit">LOGOUT</Button>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton aria-label="show more" aria-controls={mobileMenuId} aria-haspopup="true" color="inherit" onClick={handleMobileMenuOpen} >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent"
                    className={clsx(classes.drawer, { [classes.drawerOpen]: open, [classes.drawerClose]: !open, })}
                    classes={{ paper: clsx({ [classes.drawerOpen]: open, [classes.drawerClose]: !open, }), }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            
            { renderMobileMenu }
            { renderMenu }
        </div>
    );
}