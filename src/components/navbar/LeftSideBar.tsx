import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import MonetizationOn from '@mui/icons-material/MonetizationOn';
import { useLocation } from 'react-router-dom';

const LeftSideBar = () => {
  const navigate = useNavigate();


  const [selectedIndex, setSelectedIndex] = React.useState(1);

  // whenever the url changes we update what page we're on in the sidebar
  const location = useLocation();
  useEffect(() => {
    switch (location.pathname) {
      case '/dashboard':
        setSelectedIndex(-1);
        break;
      case '/monetization':
        setSelectedIndex(0);
        break;
      default:
        setSelectedIndex(1);
        break;
    }
  }, [location]);

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List component="nav" aria-label="main mailbox folders">

      <ListItemButton
          selected={selectedIndex === 0}
          onClick={() => {
            navigate('/monetization')
          }}
        >
          <ListItemIcon>
            <MonetizationOn />
          </ListItemIcon>
          <ListItemText primary="MONETIZATION" />
        </ListItemButton>

{/*         
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItemButton>


        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Drafts" />

        </ListItemButton> */}

      </List>
    </Box>
  );
}

export default LeftSideBar