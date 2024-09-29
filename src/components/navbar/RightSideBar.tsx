import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/Inbox';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../contexts/auth/authContext';


const RightSideBar = () => {
    const { logOut } = useAuth()
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>,
      index: number,
    ) => {
      setSelectedIndex(index);
    };

    return (
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <List component="nav" aria-label="main mailbox folders">
  
            <ListItemButton
                selected={selectedIndex === 0}
                onClick={logOut}
            >

                <ListItemIcon>
                    <LogoutIcon />
                </ListItemIcon>

                <ListItemText primary="LOG OUT" />
            </ListItemButton>
  

        </List>
      </Box>
    );
}

export default RightSideBar