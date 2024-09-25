import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth/authContext';

const LoginButton: React.FC = () => {
    const navigate = useNavigate();
    const { accessToken } = useAuth();  // <<-- why is this undefined?
  
    console.log('accessToken:', accessToken);
    const isLoggedIn = !!accessToken

    const handleLoginClick = () => {
        navigate(isLoggedIn ? '/dashboard' : '/login');
    };

    return (
        <Button variant="outlined" style={{ position: 'absolute', top: 10, right: 10 }} onClick={handleLoginClick}>
            {isLoggedIn ? 'APP' : 'LOGIN'}
        </Button>
    );
};

export default LoginButton;