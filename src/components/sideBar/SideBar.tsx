import React, { useState } from 'react';
import { SwipeableDrawer, Button, List, ListItem, ListItemText } from '@mui/material';

const Sidebar: React.FC = () => {
  const [state, setState] = useState<{ left: boolean }>({
    left: false,
  });

  const toggleDrawer =
    (anchor: 'left', open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: 'left') => (
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

  const anchor: 'left' = 'left';

  return (
    <React.Fragment key={anchor}>
      <Button onClick={toggleDrawer(anchor, true)}>Open Sidebar</Button>
      <SwipeableDrawer
        anchor={anchor}
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false)}
        onOpen={toggleDrawer(anchor, true)}
      >
        {list(anchor)}
      </SwipeableDrawer>
    </React.Fragment>
  );
};

export default Sidebar;
