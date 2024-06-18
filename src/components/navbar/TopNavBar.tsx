import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

interface TopNavBarProps {
  onClickLeft: (event: React.KeyboardEvent | React.MouseEvent) => void;
  onClickRight: (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const TopNavBar: React.FC<TopNavBarProps> = ({ onClickLeft, onClickRight }) => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={onClickLeft}>
          <MenuIcon />
        </IconButton>
        <IconButton color="inherit" aria-label="home" onClick={() => navigate('/')}>
          <HomeIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div">
            My App
          </Typography>
        </Box>
        <IconButton edge="end" color="inherit" aria-label="account" onClick={onClickRight}>
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavBar;
