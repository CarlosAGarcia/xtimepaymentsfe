// a basic header component that accept a title prop

import React from 'react';
import Typography from '@mui/material/Typography';
import styles from '../../../styling/modules/Headers.module.css';

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    return <Typography className={styles.mainPageHeaderPadding} variant="h4" component="div">{title}</Typography>;
}

export default Header;