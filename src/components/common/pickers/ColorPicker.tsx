import React, { useState } from 'react';
import { Box, IconButton, Popover } from '@mui/material';
import { Colorize } from '@mui/icons-material';
import { SketchPicker, ColorResult } from 'react-color';
import { SyntheticEvent } from 'react';

// types for color and handleColorChange
type ColorPickerProps = {
  color: string;
  handleColorChange: (color: string) => void;
};

const ColorPicker: React.FC<ColorPickerProps> = (props: ColorPickerProps) => {
  const { color, handleColorChange } = props;

  // State to handle popover for color picker
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

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

  console.log('color RENDER:', color);
  return (
    <Box
      sx={{
        backgroundColor: color,
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
            color={color}
            onChangeComplete={(colorRes) => {
              console.log('color ON CHANGE??:',{ hex: colorRes.hex, color });
              handleColorChange(colorRes.hex)
            }}
          />
        </Popover>
      </Box>
    </Box>
  );
};

export default ColorPicker;
