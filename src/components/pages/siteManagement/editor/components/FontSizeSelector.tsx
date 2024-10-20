import React from 'react';
import { MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';

const FontSizeSelector: React.FC<{ editor: any }> = ({ editor }) => {

  const fontSizeOptions = [
    { label: 'Header 1', value: '32px' },
    { label: 'Header 2', value: '24px' },
    { label: 'Subheader', value: '20px' },
    { label: 'Body', value: '16px' },
    { label: 'Small', value: '14px' },
    { label: 'Tiny', value: '12px' },
    { label: 'Button', value: '18px' },
  ];

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
        {fontSizeOptions.map(({ label, value }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FontSizeSelector;
