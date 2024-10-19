
import React from 'react'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

interface Props {
    isSelected: boolean;
    onClick: () => void;
    icon: React.ReactNode;
    text: string;
}

function NavItem(props: Props) {
    const { isSelected, onClick, icon, text } = props;

    return <ListItemButton
        selected={isSelected}
        onClick={onClick}
        >
      <ListItemIcon>
        {icon}
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItemButton>;
  }

  export default NavItem;