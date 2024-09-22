import React, { useContext, useEffect, useState } from 'react';

import { Box, Button, Container, Typography, Link, TextField } from '@mui/material';
import Logo from '../../components/home/Logo';
import LoginField from '../../components/loginSignup/LoginField';
import GoBackButton from '../../components/buttons/GoBackButton';
import axios from 'axios';
import { AuthContext } from '../../contexts/auth/authContext';
// import { slideOut, slideIn } from '../../styling/styling'

let source: any;

const LoginPage: React.FC = () => {
    // 'global' state - context
    const userContext = useContext(AuthContext);
    if (!userContext) throw new Error('YourComponent must be used within a MainProvider');
    const { isEmailAvailable, getIsEmailAvailable } = userContext;
    const { isEmailAvailableLoading, isEmailAvailableErr, isEmailAvailable: isEmailAvailableResult } = isEmailAvailable;

    // local state
    const [ email, setEmail ] = React.useState<string>('');
    // on mount it sets up the axios cancel token and cancels reqs if unmounts
    useEffect(() => {
        if (!source) source = axios.CancelToken.source();
        return () => {
            if (source) source.cancel('Unmounting component');
        };
    }, []);

    // stores user email and updates it on change
    const onChangeEmail = (e: any) => {
        setEmail(e.target.value);
    }
    const onContinueClick = () => {
        if (getIsEmailAvailable !== undefined) {
            getIsEmailAvailable(email, source);
        }
    }

    return (
        <div>
            <Box sx={{ mt: 4, ml:4, mr: 4 }}>
                <GoBackButton/>
            </Box>

            <Container maxWidth="sm">
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>

                    <Logo />

                    <Typography variant="h5" component="div" sx={{ mb: 4, mt: 4 }}>
                        RESET PASSWORD
                    </Typography>


                    <Box sx={{ width: '100%' }}>
                        <TextField label="Email address" variant="outlined" fullWidth sx={{ mb: 2 }} onChange={onChangeEmail}/>
                        <Button variant="contained" fullWidth sx={{ mb: 2 }} onClick={onContinueClick}>
                            {isEmailAvailableLoading ? 'LOADING...' : 'Continue'}
                        </Button>
                        {(!isEmailAvailableErr && !isEmailAvailableLoading && isEmailAvailableResult) && <div>Please check your email for a link to reset your password</div>}
                        { isEmailAvailableErr && <p>There was an error logging in. Please try again.</p>}
                    </Box>

                </Box>
            </Container>
        </div>
    );
};

export default LoginPage;
