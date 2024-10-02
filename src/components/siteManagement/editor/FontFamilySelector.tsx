import { Box } from "@mui/material";

const FontFamilySelector = ({ editor }: any) => {
  
    const changeFontFamily = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const fontFamily = event.target.value;
      if (fontFamily === 'default') {
        editor?.chain().focus().unsetFontFamily().run();
      } else {
        editor?.chain().focus().setFontFamily(fontFamily).run();
      }
    };
  
    return (
        <Box className="ffSelector" sx={{
            display: 'flex',
            alignItems: 'center',
        }}>
        <select onChange={changeFontFamily}>
            <option value="default">Default</option>
            <option value="Arial">Arial</option>
            <option value="Georgia">Georgia</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
            <option value="Verdana">Verdana</option>
        </select>
      </Box>

    );
  };

export default FontFamilySelector;