import React from 'react';
import { Box, Container, Divider, Typography, Link } from '@mui/material';
import Logo from '../../components/home/Logo';
import ThirdPartyAuth from '../../components/loginSignup/ThirdPartyAuth';
import SignUpField from '../../components/loginSignup/SignUpField';
import GoBackButton from '../../components/buttons/GoBackButton';

const SignUpPage: React.FC = () => {
    return (
        <div>
            <Box sx={{ mt: 4, ml:4, mr: 4 }}><GoBackButton/></Box>
            <Container maxWidth="sm">
            
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
                    <Logo />

                    <Typography variant="h5" component="div" sx={{ mb: 4, mt: 4 }}>
                        Sign up
                    </Typography>

                    <SignUpField/>
                    
                    <Typography variant="body2" sx={{ mb: 2 }}>
                        Already have an account? <Link href="/login">Login</Link>
                    </Typography>

                    <Divider sx={{ width: '100%', mb: 2 }}>OR</Divider>

                    <ThirdPartyAuth />
                </Box>
            </Container>
        </div>
    );
};

export default SignUpPage;
