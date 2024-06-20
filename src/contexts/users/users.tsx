// DataContext.tsx
import axios from 'axios';
import React, { createContext, useState, ReactNode } from 'react';

// Everything included in context - VARS + FNS
interface UserContextType {
    user: any;
    isUserLoading: boolean;
    isUserErr: boolean;
    getUser: (id: string) => void;
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
            getUser 
        }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserContextProvider };
