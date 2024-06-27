import React from 'react';
import { Box, Container, Divider, Typography, Link } from '@mui/material';
import Logo from '../../components/home/Logo';
import ThirdPartyAuth from '../../components/loginSignup/ThirdPartyAuth';
import LoginField from '../../components/loginSignup/LoginField';
import GoBackButton from '../../components/buttons/GoBackButton';

const LoginPage: React.FC = () => {
    return (
        <div>
            <Box sx={{ mt: 4, ml:4, mr: 4 }}><GoBackButton/></Box>
            <Container maxWidth="sm">
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
                    <Logo />

                    <Typography variant="h5" component="div" sx={{ mb: 4, mt: 4 }}>
                        Welcome back
                    </Typography>

                <LoginField/>
                    
                    <Typography variant="body2" sx={{ mb: 2 }}>
                        Forgot Password? <Link href="/smh">Click here</Link>
                    </Typography>

                    <Typography variant="body2" sx={{ mb: 2 }}>
                        Don't have an account? <Link href="/signup">Sign Up</Link>
                    </Typography>

                    <Divider sx={{ width: '100%', mb: 2 }}>OR</Divider>

                    <ThirdPartyAuth />
                </Box>
            </Container>
        </div>
    );
};

export default LoginPage;
