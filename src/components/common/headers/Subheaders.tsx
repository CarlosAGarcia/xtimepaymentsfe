// subheader component
//
import React from 'react';
import Typography from '@mui/material/Typography';
import styles from '../../../styling/modules/Headers.module.css'

interface SubheaderProps {
    title: string;
}

const SubHeader: React.FC<SubheaderProps> = ({ title }) => {
    return <Typography className={styles.subheaderPadding} variant="h5" component="div">{title}</Typography>;
}

export default SubHeader;
