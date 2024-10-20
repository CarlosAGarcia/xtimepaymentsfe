import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Link, TextField } from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../../../contexts/auth/authContext';
import { slideIn, slideOut } from '../../../styling/styling';

let source: any;
const LoginField: React.FC = () => {
    // 'global' state - context
    const userContext = useContext(AuthContext);
    if (!userContext) throw new Error('YourComponent must be used within a MainProvider');
    const { isEmailAvailable, getIsEmailAvailable, loginVars, login } = userContext;
    const { loginSuccess: isLoginSuccess, loginLoading: isLoginLoading, loginErr } = loginVars;
    const { isEmailAvailableLoading, isEmailAvailableErr, isEmailAvailable: isEmailAvailableResult } = isEmailAvailable;

    // local state
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = React.useState<string>('');

    // on mount it sets up the axios cancel token and cancels reqs if unmounts
    useEffect(() => {
        source = axios.CancelToken.source();
        return () => {
            if (source) source.cancel('Unmounting component');
        };
    }, []);

    const [animationClass, setAnimationClass] = useState('');
    useEffect(() => {
        // if the req is no longer loading and there's no error and the email is available, we change tha animationClass
        if (!isEmailAvailableErr && !isEmailAvailableLoading && isEmailAvailableResult) {
            setAnimationClass('slide-out');
            setTimeout(() => {
                setShowPassword(true);
                setAnimationClass('slide-in');
            }, 500); // Duration should match the CSS animation duration
        }
    }, [ isEmailAvailableLoading, isEmailAvailableResult, isEmailAvailableErr ]);
    

    // stores user email and updates it on change
    const onChangeEmail = (e: any) => {
        setEmail(e.target.value);
    }

    const onContinueClick = () => {
        if (getIsEmailAvailable !== undefined) {
            getIsEmailAvailable(email, source);
        }
    }

    const [password, setPassword] = useState('');
    const onChangePass = (e: any) => {
        setPassword(e.target.value);
    }

    const onPassSubmit = () => {
        if (login !== undefined) {
            login({ email, password }, source);
        }
    }

    // redirects user to the dashboard if login is successful
    // useEffect(() => {
    //     if (isLoginSuccess) {
    //         setTimeout(() => {
    //             window.location.href = '/dashboard';
    //         }, 2000);
    //     }
    // }, [isLoginSuccess]);

    return (
        <Box sx={{ width: '100%' }}>
            <form>
            {!showPassword ? <Box sx={{
                width: '100%',
                ...(animationClass === 'slide-out' ? { animation: `${slideOut} 0.5s forwards` } : {}),
            }}>
                <TextField autoComplete='email' label="Email" variant="outlined" fullWidth sx={{ mb: 2 }} onChange={onChangeEmail}/>
                <Button variant="contained" fullWidth sx={{ mb: 2 }} onClick={onContinueClick}>
                    {isEmailAvailableLoading ? 'LOADING...' : 'Continue'}
                </Button> 
            </Box> 
            :
            <Box sx={{
                width: '100%',
                ...(animationClass === 'slide-in' ? { animation: `${slideIn} 0.5s forwards` } : {}),
            }}>
                <TextField autoComplete='password' value={password} label="Password" variant="outlined" fullWidth sx={{ mb: 2 }} onChange={onChangePass}/>
                <Button variant="contained" fullWidth sx={{ mb: 2 }} onClick={onPassSubmit}>
                    {isLoginLoading ? 'LOADING...' : 'Submit'}
                </Button> 
                { loginErr && <p>{loginErr}</p>}
                { isLoginSuccess && <p><p>Logged in successfully!</p><Link href="#" sx={{ mx: 1 }}>Click here if you're not redirected</Link></p>}
            </Box>
            }
            </form>
        </Box>
    );
};

export default LoginField;
