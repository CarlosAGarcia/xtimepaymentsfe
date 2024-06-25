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
}

const UserContext = createContext<UserContextType | undefined>(undefined);
// interface DataProviderProps {
//   children: ReactNode;
// }
const UserContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // vars
    const [ isUserLoading, setIsUserLoading ] = useState<boolean>(false);
    const [ isUserErr, setIsUserErr ] = useState<boolean>(false);
    const [ user, setUser ] = useState<any>(null);

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

    // functions
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

    return (
        <UserContext.Provider value={{ 
            user, 
            isUserErr, 
            isUserLoading, 
            getUser,
            isEmailAvailable,
            getIsEmailAvailable
        }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserContextProvider };
