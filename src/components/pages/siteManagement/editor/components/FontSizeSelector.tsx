import React from 'react';
import { MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';

const FontSizeSelector: React.FC<{ editor: any }> = ({ editor }) => {
  const changeFontSize = (event: SelectChangeEvent) => {
    const fontSize = event.target.value as string;
    editor.chain().focus().setFontSize(fontSize).run();
  };

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel id="font-size-label">Font Size</InputLabel>
      <Select
        labelId="font-size-label"
        defaultValue="16px"
        onChange={changeFontSize}
        label="Font Size"
      >
        {Array.from({ length: 50 }, (_, i) => i + 1).map(size => (
          <MenuItem key={size} value={`${size}px`}>
            {size}px
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FontSizeSelector;
