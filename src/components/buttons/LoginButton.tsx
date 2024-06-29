import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const LoginButton: React.FC = () => {
    const navigate = useNavigate();
    const loggedIn = !!localStorage.getItem('token')
    const handleLoginClick = () => {
        navigate(loggedIn ? '/dashboard' : '/login');
    };

    return (
        <Button variant="outlined" style={{ position: 'absolute', top: 10, right: 10 }} onClick={handleLoginClick}>
            {loggedIn ? 'APP' : 'LOGIN'}
        </Button>
    );
};

export default LoginButton;