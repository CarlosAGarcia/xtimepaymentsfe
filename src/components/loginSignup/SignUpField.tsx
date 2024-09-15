import React, { useContext, useEffect, useState } from 'react';
import { Button, IconButton, InputAdornment, TextField, Link } from '@mui/material';
import axios from 'axios';
import { UserContext } from '../../contexts/users/users';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

let source: any;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SignUpField: React.FC = () => {
    const navigate = useNavigate();

    // CONTEXT START
    const userContext = useContext(UserContext);
    if (!userContext) throw new Error('YourComponent must be used within a MainProvider');
    const { isEmailAvailable, getIsEmailAvailable, signUp, signUpVars } = userContext;
    const { signUpSuccess, signUpLoading, signUpErr } = signUpVars;
    const { isEmailAvailableLoading, isEmailAvailableErr, isEmailAvailable: isEmailAvailableResult } = isEmailAvailable;
    // CONTEXT END

    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = useState('');
    const [touched, setTouched] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    // on mount it sets up the axios cancel token and cancels reqs if unmounts
    useEffect(() => {
        source = axios.CancelToken.source();
        return () => {
            source.cancel('Unmounting component');
        };
    }
    , []);

    // email validity
    useEffect(() => {
        setIsValidEmail(emailRegex.test(email));
    }, [email]);

    // password validity
    useEffect(() => {
        if (touched) {
            if (password.length < 12 || !/[!@#$%^&*]/.test(password)) {
                setPasswordError('Password must be at least 12 characters and include at least one special character.');
                setIsPasswordValid(false);
            } else {
                setPasswordError('');
                setIsPasswordValid(true);
            }

            if (confirmPassword && password !== confirmPassword) {
                setConfirmPasswordError('Passwords do not match.');
            } else {
                setConfirmPasswordError('');
            }
        }
    }, [password, confirmPassword, touched]);

    // when signUpLoading changes and signUpSuccess is true, it redirects to login after 3 seconds
    // useEffect(() => {
    //     if (!signUpLoading) {
    //         const token = localStorage.getItem('token');
    //         if (signUpSuccess && token) {
    //             setTimeout(() => {
    //                 // redirect to /dashboard
    //                 navigate('/dashboard')
    //             }, 3000);
    //         }
    //     }
    // }, [navigate, signUpLoading, signUpSuccess])

    const onContinueClick = () => {
        if (isValidEmail) {
            getIsEmailAvailable(email, source);
        }
    };

    const onSignup = () => {
        // calls signUp from context
        signUp({ email, password }, source);
    }

    return (
        <>
                {!isEmailAvailableResult ? (
                    <>
                        <TextField
                            label="Email address"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={!isValidEmail && email.length > 0}
                            helperText={!isValidEmail && email.length > 0 ? 'Please enter a valid email address.' : ''}
                        />
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{ mb: 2 }}
                            onClick={onContinueClick}
                            disabled={!isValidEmail || isEmailAvailableLoading}
                        >
                            {isEmailAvailableLoading ? 'LOADING...' : 'Continue'}
                        </Button>
                    </>
                ) : (
                    <>
                        <TextField
                            label="Password"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={Boolean(passwordError)}
                            helperText={passwordError}
                            onBlur={() => setTouched(true)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            label="Confirm Password"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            type={showPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            error={Boolean(confirmPasswordError)}
                            helperText={confirmPasswordError}
                        />
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{ mb: 2 }}
                            disabled={!isPasswordValid || password !== confirmPassword}
                            onClick={onSignup}
                        >
                            Submit
                        </Button>
 
                        { signUpSuccess && (
                            <>
                                <div className='verifyText'>
                                    <p> Sign up successful! Please check your email for a verification link.</p>
                                 </div>
                            </>
                        )}

                    </>
                )}
        </>
    );
};

export default SignUpField;
