import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography, Container } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanelInner(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const TabPanel = () => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container>
      
      <Tabs value={value} onChange={handleChange} aria-label="payment tiers/tokens tabs">
        <Tab label="TIERS" {...a11yProps(0)} />
        <Tab label="TOKENS" {...a11yProps(1)} />
      </Tabs>

      <TabPanelInner value={value} index={0}>
        {/* Content for TIERS tab */}
        <Typography>This is the TIERS content.</Typography>
      </TabPanelInner>

      <TabPanelInner value={value} index={1}>
        {/* Content for TOKENS tab */}
        <Typography>This is the TOKENS content.</Typography>
      </TabPanelInner>

    </Container>
  );
}

export default TabPanel;
