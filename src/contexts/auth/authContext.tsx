// DataContext.tsx
import axios from 'axios';
import React, { createContext, useState, ReactNode, useContext } from 'react';

// QUICK ref to user store
// Everything included in context - VARS + FNS
interface AuthContextType {
    // Auth Token
    accessToken: string | null;
    setAccessToken: (token: string | null) => void;

    // Main - currnt user logged in
    user: any;
    isUserLoading: boolean;
    isUserErr: boolean;
    getUser: (id: string) => void;

    // LOGIN - REGISTER purposes
    isEmailAvailable: { isEmailAvailable: boolean, isEmailAvailableLoading: boolean, isEmailAvailableErr: boolean };
    getIsEmailAvailable: (email: string, source?: any) => void;

    // Sign up
    signUp: (vars: { email: string, password: string }, source?: any) => void;
    signUpVars: { signUpSuccess: boolean, signUpLoading: boolean, signUpErr: string };

    // LOGIN
    login: (vars: { email: string, password: string }, source?: any) => void;
    loginVars: { loginSuccess: boolean, loginLoading: boolean, loginErr: string };
    logOut: () => void;
}

const { REACT_APP_API_URL } = process.env
const AuthContext = createContext<AuthContextType | undefined>(undefined);
const AuthContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('accessToken') || null);


    // Checks email availability - /api/users/login/isEmailAvailable - POST
    const [ isEmailAvailable, setIsEmailAvailable ] = useState<{ isEmailAvailable: boolean, isEmailAvailableLoading: boolean, isEmailAvailableErr: boolean }>({ isEmailAvailable: false, isEmailAvailableLoading: false, isEmailAvailableErr: false });
    const getIsEmailAvailable = async (email: string, source?: any) => {
        try {
            setIsEmailAvailable({ isEmailAvailable: false, isEmailAvailableLoading: true, isEmailAvailableErr: false });
            await axios.post(`${REACT_APP_API_URL}/api/users/login/isEmailAvailable/`, { email }, { cancelToken: source?.token })
                .then((response) => {
                    console.log("Email fetched:", response.data);
                    setIsEmailAvailable({ isEmailAvailable: response.data.isEmailAvailable, isEmailAvailableLoading: false, isEmailAvailableErr: false });
                })
                .catch((error) => {
                    setIsEmailAvailable({ isEmailAvailable: false, isEmailAvailableLoading: false, isEmailAvailableErr: true });
                    console.error("Error fetching email:", error);
                })
        }
        catch (error) {
            console.error('Error fetching data:', error);
            setIsEmailAvailable({ isEmailAvailable: false, isEmailAvailableLoading: false, isEmailAvailableErr: true });
        }
    }

    // Signs up user - /api/auth/signup - POST
    // updates the state vars for signUp - { signUpSuccess, signUpLoading, signUpErr }
    const [{ signUpSuccess, signUpLoading, signUpErr }, setSignUp ] = useState<{ signUpSuccess: boolean, signUpLoading: boolean, signUpErr: string }>({ signUpSuccess: false, signUpLoading: false, signUpErr: '' });
    const signUp = async (vars: { email: string, password: string }, source?: any) => {
        try {
            const { email, password } = vars;
            setSignUp({ signUpSuccess: false, signUpLoading: true, signUpErr: '' });
            await axios.post(`${REACT_APP_API_URL}/api/auth/signup`, { email, password }, { cancelToken: source?.token })
                .then((response) => {
                    setSignUp({ signUpSuccess: true, signUpLoading: false, signUpErr: '' });
                })
                .catch((error) => {
                    setSignUp({ signUpSuccess: false, signUpLoading: false, signUpErr: error?.response?.data?.message || 'Something went wrong' });
                    console.error("Error signing up:", error);
                })
        }
        catch (error) {
            setSignUp({ signUpSuccess: false, signUpLoading: false, signUpErr: 'Something went wrong' });
            console.error("Error signing up:", error);
        }
    };
   

    // gets user by id - /api/users/:id - GET
    const [ isUserLoading, setIsUserLoading ] = useState<boolean>(false);
    const [ isUserErr, setIsUserErr ] = useState<boolean>(false);
    const [ user, setUser ] = useState<any>(
        localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) :
        null
    );
    const getUser = async (id: string) => {
        try {
            setIsUserLoading(true);
            setIsUserErr(false);
            await axios.get(`${REACT_APP_API_URL}/api/users/${id}`)
                .then((response) => {
                    setIsUserLoading(false);
                    setUser(response.data);
                })
                .catch((error) => {
                    setIsUserLoading(false);
                    setIsUserErr(true);
                    console.error("Error fetching user:", error);
                })
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsUserLoading(false);
            setIsUserErr(true);
        }
    };

    // logs in user - /api/auth/login - POST
    // updates the state vars for login - { loginSuccess, loginLoading, loginErr }
    const [{ loginSuccess, loginLoading, loginErr }, setLogin ] = useState<{ loginSuccess: boolean, loginLoading: boolean, loginErr: string }>({ loginSuccess: false, loginLoading: false, loginErr: '' });
    const login = async (vars: { email: string, password: string }, source?: any) => {
        try {
            const { email, password } = vars;
            setLogin({ loginSuccess: false, loginLoading: true, loginErr: '' });
            await axios.post(`${REACT_APP_API_URL}/api/auth/login`, { email, password }, { cancelToken: source?.token })
                .then((response) => {
                    const { accessToken: token , user } = response.data;

                    console.log("Login response:", response.data);
                    setLogin({ loginSuccess: true, loginLoading: false, loginErr: '' });

                    // saves response.data.token to local storage
                    const usr = JSON.stringify(user)
                    setUser(usr);
                    localStorage.setItem('user', usr);
                    localStorage.setItem('accessToken', token);
                    setAccessToken(`${token}`);
                    console.log("User logged in:", accessToken, );
                    setTimeout(() => {
                        window.location.href = '/dashboard';
                    }, 2000);
                })
                .catch((error) => {
                    setLogin({ loginSuccess: false, loginLoading: false, loginErr: error?.response?.data?.message || 'Something went wrong' });
                    console.error("Error logging in:", error);
                })
        }
        catch (error) {
            console.error('Error fetching data:', error);
            setLogin({ loginSuccess: false, loginLoading: false, loginErr: 'Something went wrong. Please try again.' });
        }
    }

    const logOut = () => {
        setAccessToken(null);
        setUser(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        window.location.href = '/';
    }

    return (
        <AuthContext.Provider value={{
            accessToken, setAccessToken,
            user, isUserErr, isUserLoading, getUser,
            isEmailAvailable, getIsEmailAvailable,
            signUp, signUpVars: { signUpSuccess, signUpLoading, signUpErr },
            login, loginVars: { loginSuccess, loginLoading, loginErr },
            logOut
        }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };

export { useAuth, AuthContext, AuthContextProvider };


