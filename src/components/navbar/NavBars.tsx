import React, { useState } from 'react';
import { SwipeableDrawer } from '@mui/material';
import TopNavBar from './TopNavBar';
import LeftSideBar from './LeftSideBar';
import RightSideBar from './RightSideBar';

// both side bar + nav bar components
const NavBars: React.FC = () => {
  const [ state, setState ] = useState<{ left: boolean, right: boolean }>({ left: false, right: false });

  const toggleDrawer = (anchor: string, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event && event.type === 'keydown' &&  ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };



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
        <LeftSideBar/>
      </SwipeableDrawer>

      <SwipeableDrawer
        anchor={'right'}
        open={state['right']}
        onClose={toggleDrawer('right', false)}
        onOpen={toggleDrawer('right', true)}
      >
        <RightSideBar/>
      </SwipeableDrawer>

    </React.Fragment>
  );
};

export default NavBars;
