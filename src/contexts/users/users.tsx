// DataContext.tsx
import axios from 'axios';
import React, { createContext, useState, ReactNode } from 'react';

// QUICK ref to user store
// Everything included in context - VARS + FNS
interface UserContextType {
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
    signUpVars: { signUpSuccess: boolean, signUpLoading: boolean, signUpErr: boolean };

    // LOGIN
    login: (vars: { email: string, password: string }, source?: any) => void;
    loginVars: { loginSuccess: boolean, loginLoading: boolean, loginErr: boolean };
}

const UserContext = createContext<UserContextType | undefined>(undefined);
const UserContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    // Checks email availability - /api/users/login/isEmailAvailable - POST
    const [ isEmailAvailable, setIsEmailAvailable ] = useState<{ isEmailAvailable: boolean, isEmailAvailableLoading: boolean, isEmailAvailableErr: boolean }>({ isEmailAvailable: false, isEmailAvailableLoading: false, isEmailAvailableErr: false });
    const getIsEmailAvailable = async (email: string, source?: any) => {
        try {
            setIsEmailAvailable({ isEmailAvailable: false, isEmailAvailableLoading: true, isEmailAvailableErr: false });
            await axios.post(`http://localhost:3001/api/users/login/isEmailAvailable/`, { email }, { cancelToken: source?.token })
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
    const [{ signUpSuccess, signUpLoading, signUpErr }, setSignUp ] = useState<{ signUpSuccess: boolean, signUpLoading: boolean, signUpErr: boolean }>({ signUpSuccess: false, signUpLoading: false, signUpErr: false });
    const signUp = async (vars: { email: string, password: string }, source?: any) => {
        try {
            const { email, password } = vars;
            setSignUp({ signUpSuccess: false, signUpLoading: true, signUpErr: false });
            await axios.post(`http://localhost:3001/api/auth/signup`, { email, password }, { cancelToken: source?.token })
                .then((response) => {
                    console.log("Sign up response:", response.data);
                    setSignUp({ signUpSuccess: true, signUpLoading: false, signUpErr: false });

                    // saves response.data.token to local storage
                    localStorage.setItem('token', response.data.token);
                })
                .catch((error) => {
                    setSignUp({ signUpSuccess: false, signUpLoading: false, signUpErr: true });
                    console.error("Error signing up:", error);
                })
        }
        catch (error) {
            console.error('Error fetching data:', error);
            setSignUp({ signUpSuccess: false, signUpLoading: false, signUpErr: true });
        }
    };
   

    // gets user by id - /api/users/:id - GET
    const [ isUserLoading, setIsUserLoading ] = useState<boolean>(false);
    const [ isUserErr, setIsUserErr ] = useState<boolean>(false);
    const [ user, setUser ] = useState<any>(null);
    const getUser = async (id: string) => {
        try {
            setIsUserLoading(true);
            setIsUserErr(false);
            await axios.get(`http://localhost:3001/api/users/${id}`)
                .then((response) => {
                    console.log("User fetched:", response.data);
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
    const [{ loginSuccess, loginLoading, loginErr }, setLogin ] = useState<{ loginSuccess: boolean, loginLoading: boolean, loginErr: boolean }>({ loginSuccess: false, loginLoading: false, loginErr: false });
    const login = async (vars: { email: string, password: string }, source?: any) => {
        try {
            const { email, password } = vars;
            setLogin({ loginSuccess: false, loginLoading: true, loginErr: false });
            await axios.post(`http://localhost:3001/api/auth/login`, { email, password }, { cancelToken: source?.token })
                .then((response) => {
                    console.log("Login response:", response.data);
                    setLogin({ loginSuccess: true, loginLoading: false, loginErr: false });

                    // saves response.data.token to local storage
                    localStorage.setItem('token', response.data.token);
                })
                .catch((error) => {
                    setLogin({ loginSuccess: false, loginLoading: false, loginErr: true });
                    console.error("Error logging in:", error);
                })
        }
        catch (error) {
            console.error('Error fetching data:', error);
            setLogin({ loginSuccess: false, loginLoading: false, loginErr: true });
        }
    }

    return (
        <UserContext.Provider value={{
            user, isUserErr, isUserLoading, getUser,
            isEmailAvailable, getIsEmailAvailable,
            signUp, signUpVars: { signUpSuccess, signUpLoading, signUpErr },
            login, loginVars: { loginSuccess, loginLoading, loginErr }
        }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserContextProvider };
