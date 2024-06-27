import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const GoBackButton: React.FC = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <IconButton onClick={handleGoBack} style={{ display: 'flex', alignItems: 'center' }}>
            <ArrowBackIcon style={{ fontSize: 40 }} />
        </IconButton>
    );
};

export default GoBackButton;
