import React, { useContext, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { UserContext } from '../../contexts/users/users';

let source: any;

const SignUpField: React.FC = () => {
    const userContext = useContext(UserContext);
    if (!userContext) throw new Error('YourComponent must be used within a MainProvider');

    const { isEmailAvailable, getIsEmailAvailable } = userContext;
    const { isEmailAvailableLoading, isEmailAvailableErr, isEmailAvailable: isEmailAvailableResult } = isEmailAvailable;

    // on mount it sets up the axios cancel token and cancels reqs if unmounts
    useEffect(() => {
        source = axios.CancelToken.source();
        return () => {
            source.cancel('Unmounting component');
        };
    }
    , []);

    // stores user email and updates it on change
    const [email, setEmail] = React.useState<string>('');
    const onChangeEmail = (e: any) => {
        setEmail(e.target.value);
    }

    const onContinueClick = () => {
        if (getIsEmailAvailable !== undefined) {
            getIsEmailAvailable(email, source);
        }
    }

    console.log('isEmailAvailableResult:', isEmailAvailableResult, 'isEmailAvailableLoading:', isEmailAvailableLoading, 'isEmailAvailableErr:', isEmailAvailableErr);
    return (
        <>
            <TextField label="Email address" variant="outlined" fullWidth sx={{ mb: 2 }} onChange={onChangeEmail}/>
            <Button variant="contained" fullWidth sx={{ mb: 2 }} onClick={onContinueClick}>
                Continue
            </Button>
        </>
    );
};

export default SignUpField;
