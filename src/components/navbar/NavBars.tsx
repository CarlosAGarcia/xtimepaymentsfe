import React, { useState } from 'react';
import { SwipeableDrawer, List, ListItem, ListItemText } from '@mui/material';
import TopNavBar from './TopNavBar';

// both side bar + nav bar components
const NavBars: React.FC = () => {
  const [ state, setState ] = useState<{ left: boolean, right: boolean }>({ left: false, right: false });

  const toggleDrawer = (anchor: string, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event && event.type === 'keydown' &&  ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor: string) => (
    <div
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Item 1', 'Item 2', 'Item 3', 'Item 4'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );


  return (
    <React.Fragment key={'navBars'}>
      <TopNavBar
        onClickLeft={toggleDrawer('left', true)}
        onClickRight={toggleDrawer('right', true)}
      />
     
      <SwipeableDrawer
        anchor={'left'}
        open={state['left']}
        onClose={toggleDrawer('left', false)}
        onOpen={toggleDrawer('left', true)}
      >
        {list('left')}
      </SwipeableDrawer>
      <SwipeableDrawer
        anchor={'right'}
        open={state['right']}
        onClose={toggleDrawer('right', false)}
        onOpen={toggleDrawer('right', true)}
      >
        {list('right')}
      </SwipeableDrawer>
    </React.Fragment>
  );
};

export default NavBars;
