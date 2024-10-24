import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useAuth } from '../auth/authContext'
import axiosInstance from '../api';

// file for context for subscription tiers
// saves all variables and functions related to subscription tiers - incl loading, errors, and data
// for functions in express that look like below
// router.get('/', authenticateJWT, checkOrg, getUserSubscriptionTiers);
// router.put('/', authenticateJWT, checkOrg, updateUserSubscriptionTier);
// router.delete('/', authenticateJWT, checkOrg, deleteUserSubscriptionTier);

interface UserSubscriptionTierContextType {
    // GET
    UserSubscriptionTier: UserSubscriptionTier | undefined;
    getUserSubscriptionTier: () => void;
    isGetUserSubscriptionTierLoading: boolean;
    isGetUserSubscriptionTierErr: string;
    // UPDATE TO DIFFERENT TIER
    updateUserSubscriptionTier: (id: string) => void;
    isupdateUserSubscriptionTierLoading: boolean;
    isupdateUserSubscriptionTierErr: string;
    // DELETE
    deleteUserSubscriptionTier: (id: string) => void;
    isDeleteUserSubscriptionTierLoading: boolean;
    isDeleteUserSubscriptionTierErr: string;

}

const { REACT_APP_API_URL } = process.env
const UserSubscriptionTierContext = createContext<UserSubscriptionTierContextType | undefined>(undefined)
const UserSubscriptionTierProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { accessToken } = useAuth()

    // GET
    const [UserSubscriptionTier, setUserSubscriptionTier] = useState<UserSubscriptionTier | undefined>(undefined)
    const [isGetUserSubscriptionTierLoading, setIsGetUserSubscriptionTierLoading] = useState<boolean>(false)
    const [isGetUserSubscriptionTierErr, setIsGetUserSubscriptionTierErr] = useState<string>('')
    const getUserSubscriptionTier = async () => {
        try {
            setIsGetUserSubscriptionTierLoading(true)
            await axiosInstance.get(`${REACT_APP_API_URL}/api/UserSubscriptionTier`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
                .then((response: any) => {
                    setUserSubscriptionTier(response.data)
                    setIsGetUserSubscriptionTierLoading(false)
                    setIsGetUserSubscriptionTierErr('')
                })
                .catch((error: any) => {
                    console.error('Error fetching UserSubscriptionTier:', error)
                    setIsGetUserSubscriptionTierLoading(false)
                    setIsGetUserSubscriptionTierErr('Error fetching UserSubscriptionTier')
                })
        } catch (error) {
            console.error('Error fetching UserSubscriptionTier:', error)
            setIsGetUserSubscriptionTierLoading(false)
            setIsGetUserSubscriptionTierErr('Error fetching UserSubscriptionTier')
        }
    }

    // UPDATE TO DIFFERENT TIER
    const [isupdateUserSubscriptionTierLoading, setIsupdateUserSubscriptionTierLoading] = useState<boolean>(false)
    const [isupdateUserSubscriptionTierErr, setIsupdateUserSubscriptionTierErr] = useState<string>('')
    const updateUserSubscriptionTier = async (id: string) => {
        try {
            setIsupdateUserSubscriptionTierLoading(true)
            await axiosInstance.put(`${REACT_APP_API_URL}/api/UserSubscriptionTier/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
                .then((response: any) => {
                    setIsupdateUserSubscriptionTierLoading(false)
                    setIsupdateUserSubscriptionTierErr('')
                })
                .catch((error: any) => {
                    console.error('Error updating UserSubscriptionTier:', error)
                    setIsupdateUserSubscriptionTierLoading(false)
                    setIsupdateUserSubscriptionTierErr('Error updating UserSubscriptionTier')
                })
        } catch (error) {
            console.error('Error updating UserSubscriptionTier:', error)
            setIsupdateUserSubscriptionTierLoading(false)
            setIsupdateUserSubscriptionTierErr('Error updating UserSubscriptionTier')
        }
    }
    
    // DELETE
    const [isDeleteUserSubscriptionTierLoading, setIsDeleteUserSubscriptionTierLoading] = useState<boolean>(false)
    const [isDeleteUserSubscriptionTierErr, setIsDeleteUserSubscriptionTierErr] = useState<string>('')
    const deleteUserSubscriptionTier = async (id: string) => {
        try {
            setIsDeleteUserSubscriptionTierLoading(true)
            await axiosInstance.delete(`${REACT_APP_API_URL}/api/UserSubscriptionTier/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
                .then((response: any) => {
                    setIsDeleteUserSubscriptionTierLoading(false)
                    setIsDeleteUserSubscriptionTierErr('')
                })
                .catch((error: any) => {
                    console.error('Error deleting UserSubscriptionTier:', error)
                    setIsDeleteUserSubscriptionTierLoading(false)
                    setIsDeleteUserSubscriptionTierErr('Error deleting UserSubscriptionTier')
                })
        } catch (error) {
            console.error('Error deleting UserSubscriptionTier:', error)
            setIsDeleteUserSubscriptionTierLoading(false)
            setIsDeleteUserSubscriptionTierErr('Error deleting UserSubscriptionTier')
        }
    }


    return (
        <UserSubscriptionTierContext.Provider value={{
            // GET
            UserSubscriptionTier,
            getUserSubscriptionTier,
            isGetUserSubscriptionTierLoading,
            isGetUserSubscriptionTierErr,

            // UPDATE TO DIFFERENT TIER
            updateUserSubscriptionTier,
            isupdateUserSubscriptionTierLoading,
            isupdateUserSubscriptionTierErr,

            // DELETE
            deleteUserSubscriptionTier,
            isDeleteUserSubscriptionTierLoading,
            isDeleteUserSubscriptionTierErr,
         }}>
            {children}
        </UserSubscriptionTierContext.Provider>
    )
}

const useUserSubscriptionTierContextContext = () => {
    const context = useContext(UserSubscriptionTierContext)
    if (context === undefined) {
        throw new Error('useSiteManagement must be used within a SiteManagementProvider')
    }
    return context
}

export { UserSubscriptionTierProvider, useUserSubscriptionTierContextContext }