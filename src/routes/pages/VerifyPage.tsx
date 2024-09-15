// A simple verify page that says thanks for signing up and that they will redirected to /dashboard in 3 seconds, if not redirected, they can click a link to go to /dashboard
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const VerifyPage = () => {
    const navigate = useNavigate();

    // updates the number shown in seconds from 3 to 0
    const [countdown, setCountdown] = useState(3);
    const [error, setError] = useState('');
    const [isValidToken, setIsValidToken] = useState({ isValid: false, message: '' });
    const [isLoading, setIsLoading] = useState(true);

    // upon page load, and any updates to the url, checks for the token in the url under pattern /verify?token=${token} and saves it to local storage
    // also redirects to /dashboard if the token is found in 3 seconds
    useEffect(() => {
        const url = new URL(window.location.href);
        const token = url.searchParams.get('token');

        // checks if the token is a valid token (eg. not expired and present in the database)
        if (token) {
            // sends a request to /api/auth/verify with the token
            axios.get(`${REACT_APP_API_URL}/api/auth/verify/${token}`)
                .then((response) => {
                    setIsValidToken({ isValid: true, message: response?.data?.message });
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error('Error verifying token:', error);
                    const errorMessage = error.response?.data?.error || error?.message || 'There was an error verifying your account. Please try again.';
                    setError(errorMessage);
                    setIsLoading(false);
                });
        } else {
            setIsLoading(false);
            setError('INVALID TOKEN. PLEASE CONTACT SUPPORT IF YOU BELIEVE THIS IS AN ERROR.');
        }
    }, [ navigate ]);

    // if isValidToken.isValid is true, redirect to /dashboard in 3 seconds, also update the state var countdown every second
    useEffect(() => {
        if (isValidToken?.isValid) {
            // updates the countdown every second
            const interval = setInterval(() => {
                setCountdown(prevCountdown => prevCountdown - 1);
                if (countdown === 0) {
                   // replaces the url with http://localhost:3001/dashboard
                   window.location.href = '/dashboard';
                }
            }, 1000);


            return () => clearInterval(interval);
        }
    }, [ isValidToken?.isValid, navigate, countdown ]); 


    if (isLoading) {
        return <div>
            {/* please wait while we verify your account - with pretty animation for loading */}
            <div>
                <h1>Please wait while we verify your account...</h1>
                <div className="loading-spinner"></div>
            </div>

        </div>;
    }
    
    if (error) {
        return <div>
            <h1>There was an error verifying your account.</h1>
            {error}
        </div>;
    }

    if (!isValidToken.isValid) {
        return <div>
            <h1>There was an error verifying your account.</h1>
            {isValidToken.message}
        </div>;
    }

    return (
        <div>
            <h1>{isValidToken.message}</h1>
            <p>You will be redirected to the dashboard in {countdown} seconds...</p>
            <p>If not redirected, <Link to="/dashboard">click here</Link> to go to the dashboard.</p>
        </div>
    );
};

export default VerifyPage;