import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

type Props = {
  onOptionClicked: (option: string) => void;
};

const AddWidget: React.FC<Props> = ({ onOptionClicked }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuPosition, setMenuPosition] = useState<'below' | 'above'>('below');

  // Function to open the menu
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonRect = event.currentTarget.getBoundingClientRect();
    const isTooCloseToBottom = window.innerHeight - buttonRect.bottom < 200;

    setMenuPosition(isTooCloseToBottom ? 'above' : 'below');
    setAnchorEl(event.currentTarget);
  };

  // Function to close the menu
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleOptionClick = (option: string) => {
    console.log(`Selected option: ${option}`);
    onOptionClicked(option)
    handleClose();
  }

  // Placeholder options
  const options = Array.from({ length: 10 }, (_, i) => `Option ${i + 1}`);

  return (
    <Box>
      {/* Plus (+) button */}
      <IconButton onClick={handleClick} aria-controls="widget-menu" aria-haspopup="true">
        <AddIcon />
      </IconButton>

      {/* Menu showing the list of widget options */}
      <Menu
        id="widget-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: menuPosition === 'below' ? 'bottom' : 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: menuPosition === 'below' ? 'top' : 'bottom',
          horizontal: 'center',
        }}
      >
        {options.map((option, index) => (
          <MenuItem key={index} onClick={() => handleOptionClick(option)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default AddWidget;
