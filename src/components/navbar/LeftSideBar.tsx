import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { useNavigate } from 'react-router-dom';
import MonetizationOn from '@mui/icons-material/MonetizationOn';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PaymentIcon from '@mui/icons-material/Payment';
import BuildIcon from '@mui/icons-material/Build';
import { useLocation } from 'react-router-dom';
import NavItem from './NavItem';

const LeftSideBar = () => {
  const navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  // whenever the url changes we update what page we're on in the sidebar
  const location = useLocation();
  useEffect(() => {
    switch (location.pathname) {
      case '/dashboard':
        setSelectedIndex(0);
        break;
      case '/siteManagement':
        setSelectedIndex(1);
        break;
      case '/monetization':
        setSelectedIndex(2);
        break;
      case '/billing':
        setSelectedIndex(3);
        break;
      default:
        setSelectedIndex(0);
        break;
    }
  }, [location]);

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List component="nav" aria-label="main mailbox folders">

          <NavItem
            isSelected={selectedIndex === 0}
            onClick={() => navigate('/dashboard')}
            icon={<DashboardIcon />}
            text="DASHBOARD"
          />

          <NavItem
            isSelected={selectedIndex === 1}
            onClick={() => navigate('/siteManagement')}
            icon={<BuildIcon />}
            text="SITE MANAGEMENT"
          />

          <NavItem
            isSelected={selectedIndex === 2}
            onClick={() => navigate('/monetization')}
            icon={<MonetizationOn />}
            text="Monetization"
          />

          <NavItem
            isSelected={selectedIndex === 3}
            onClick={() => navigate('/billing')}
            icon={<PaymentIcon />}
            text="Billing"
          />

      </List>
    </Box>
  );
}

export default LeftSideBar


