import React from 'react';
import { Box, Button, Link } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import MicrosoftIcon from '@mui/icons-material/Apple';

const ThirdPartyAuth: React.FC = () => {
    return (
        <>
            <Button variant="outlined" fullWidth sx={{ mb: 1 }} startIcon={<GoogleIcon />}>
                Continue with Google
            </Button>
            <Button variant="outlined" fullWidth sx={{ mb: 1 }} startIcon={<MicrosoftIcon />}>
                Continue with Microsoft Account
            </Button>
            <Button variant="outlined" fullWidth startIcon={<AppleIcon />}>
                Continue with Apple
            </Button>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Link href="#" sx={{ mx: 1 }}>Terms of Use</Link>
                <Link href="#" sx={{ mx: 1 }}>Privacy Policy</Link>
            </Box>
        </>
    );
};

export default ThirdPartyAuth;
