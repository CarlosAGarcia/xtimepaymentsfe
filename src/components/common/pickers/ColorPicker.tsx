import React, { useState } from 'react';
import { Box, IconButton, Popover } from '@mui/material';
import { Colorize } from '@mui/icons-material';
import { SketchPicker, ColorResult } from 'react-color';
import { SyntheticEvent } from 'react';

const ColorPicker: React.FC = () => {
  // State to manage background color
  const [backgroundColor, setBackgroundColor] = useState<string>('#808080'); // Default grey
  // State to handle popover for color picker
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  // Handle color change from color picker
  const handleColorChange = (color: ColorResult) => {
    setBackgroundColor(color.hex);
  };

  // Handle opening of the color picker popover
  const handleOpenPopover = (event: SyntheticEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle closing of the color picker popover
  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'color-picker-popover' : undefined;

  return (
    <Box
      sx={{
        backgroundColor: backgroundColor,
        padding: 2,
        borderRadius: 2,
      }}
    >
      {/* Container for buttons */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* IconButton to open color picker */}
        <IconButton onClick={handleOpenPopover} aria-describedby={id}>
          <Colorize />
        </IconButton>
        {/* Popover that contains the color picker */}
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClosePopover}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <SketchPicker
            color={backgroundColor}
            onChangeComplete={handleColorChange}
          />
        </Popover>
      </Box>
    </Box>
  );
};

export default ColorPicker;
