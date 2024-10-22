import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useAuth } from '../auth/authContext'
import axiosInstance from '../api';

// file for context for subscription tiers
// saves all variables and functions related to subscription tiers - incl loading, errors, and data
// for functions in express that look like below
// router.get('/', authenticateJWT, checkRole(ADMIN), checkOrg, getOrgSubscriptionTiers);
// router.put('/', authenticateJWT, checkRole(ADMIN), checkOrg, createSubscriptionTier);
// router.put('/edit', authenticateJWT, checkRole(ADMIN), checkOrg, editSubscriptionTier);
// router.delete('/', authenticateJWT, checkRole(ADMIN), checkOrg, deleteSubscriptionTier);


interface SubscriptionTiersContextType {
    // GET
    subscriptionTiers: SubscriptionTier[] | undefined;
    getSubscriptionTiers: () => void;
    isGetSubscriptionTiersLoading: boolean;
    isGetSubscriptionTiersErr: string;
    // EDIT
    subscriptionTiersTemp: SubscriptionTier[];
    saveSubscriptionTiers: (subscriptionTiersOverwrite?: SubscriptionTier[]) => void;
    isSaveSubscriptionTiersLoading: boolean;
    isSaveSubscriptionTiersErr: string;
    // DELETE
    deleteSubscriptionTier: (id: string) => void;
    isDeleteSubscriptionTierLoading: boolean;
    isDeleteSubscriptionTierErr: string;

}

const { REACT_APP_API_URL } = process.env
const SubscriptionTiersContext = createContext<SubscriptionTiersContextType | undefined>(undefined)
const SubscriptionTiersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { accessToken } = useAuth()

    // GET
    const [subscriptionTiers, setSubscriptionTiers] = useState<SubscriptionTier[] | undefined>(undefined)
    const [isGetSubscriptionTiersLoading, setIsGetSubscriptionTiersLoading] = useState<boolean>(false)
    const [isGetSubscriptionTiersErr, setIsGetSubscriptionTiersErr] = useState<string>('')
    const getSubscriptionTiers = async () => {
        try {
            setIsGetSubscriptionTiersLoading(true)
            await axiosInstance.get(`${REACT_APP_API_URL}/api/subscriptionTiers`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
                .then((response: any) => {
                    setSubscriptionTiers(response.data)
                    setSubscriptionTiersTempOriginal(response.data)
                    setIsGetSubscriptionTiersLoading(false)
                    setIsGetSubscriptionTiersErr('')
                })
                .catch((error: any) => {
                    console.error('Error fetching subscription tiers:', error)
                    setIsGetSubscriptionTiersLoading(false)
                    setIsGetSubscriptionTiersErr('Error fetching subscription tiers')
                })
        } catch (error) {
            console.error('Error fetching data:', error)
            setIsGetSubscriptionTiersLoading(false)
            setIsGetSubscriptionTiersErr('Error fetching subscription tiers')
        }
    }

    // EDIT
    const [subscriptionTiersTemp, setSubscriptionTiersTempOriginal] = useState<SubscriptionTier[]>([])
    const [isSaveSubscriptionTiersLoading, setIsSaveSubscriptionTiersLoading] = useState<boolean>(false)
    const [isSaveSubscriptionTiersErr, setIsSaveSubscriptionTiersErr] = useState<string>('')
    const saveSubscriptionTiers = async (subscriptionTiersOverwrite?: SubscriptionTier[]) => {
        try {
            setIsSaveSubscriptionTiersLoading(true)
            await axiosInstance.put(`${REACT_APP_API_URL}/api/subscriptionTiers`, subscriptionTiersOverwrite || subscriptionTiersTemp, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
                .then(() => {
                    setIsSaveSubscriptionTiersLoading(false)
                    setIsSaveSubscriptionTiersErr('')
                })
                .catch((error: any) => {
                    console.error('Error saving subscription tiers:', error)
                    setIsSaveSubscriptionTiersLoading(false)
                    setIsSaveSubscriptionTiersErr('Error saving subscription tiers')
                })
        } catch (error) {
            console.error('Error saving data:', error)
            setIsSaveSubscriptionTiersLoading(false)
            setIsSaveSubscriptionTiersErr('Error saving subscription tiers')
        }
    }
    
    // DELETE
    const [isDeleteSubscriptionTierLoading, setIsDeleteSubscriptionTierLoading] = useState<boolean>(false)
    const [isDeleteSubscriptionTierErr, setIsDeleteSubscriptionTierErr] = useState<string>('')
    const deleteSubscriptionTier = async (id: string) => {
        try {
            setIsDeleteSubscriptionTierLoading(true)
            await axiosInstance.delete(`${REACT_APP_API_URL}/api/subscriptionTiers`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                data: {
                    id
                }
            })
                .then(() => {
                    setIsDeleteSubscriptionTierLoading(false)
                    setIsDeleteSubscriptionTierErr('')
                })
                .catch((error: any) => {
                    console.error('Error deleting subscription tier:', error)
                    setIsDeleteSubscriptionTierLoading(false)
                    setIsDeleteSubscriptionTierErr('Error deleting subscription tier')
                })
        } catch (error) {
            console.error('Error deleting data:', error)
            setIsDeleteSubscriptionTierLoading(false)
            setIsDeleteSubscriptionTierErr('Error deleting subscription tier')
        }
    }


    return (
        <SubscriptionTiersContext.Provider value={{
            // GET
            subscriptionTiers,
            getSubscriptionTiers,
            isGetSubscriptionTiersLoading,
            isGetSubscriptionTiersErr,
            // EDIT
            subscriptionTiersTemp,
            saveSubscriptionTiers,
            isSaveSubscriptionTiersLoading,
            isSaveSubscriptionTiersErr,
            // DELETE
            deleteSubscriptionTier,
            isDeleteSubscriptionTierLoading,
            isDeleteSubscriptionTierErr

         }}>
            {children}
        </SubscriptionTiersContext.Provider>
    )
}

const useSubscriptionTiersContext = () => {
    const context = useContext(SubscriptionTiersContext)
    if (context === undefined) {
        throw new Error('useSiteManagement must be used within a SiteManagementProvider')
    }
    return context
}

export { SubscriptionTiersProvider, useSubscriptionTiersContext }