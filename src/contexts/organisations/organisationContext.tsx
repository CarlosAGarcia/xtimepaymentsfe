import React, { createContext, useContext, useState } from 'react'
import { useAuth } from '../auth/authContext'
import axiosInstance from '../api';

interface OrganisationContextType {
    organisation: any;
    getOrganisationById: (id: string, updateCache?: boolean) => void;
    isGetOrganisationByIdLoading: boolean;
    isGetOrganisationByIdErr: boolean;
}

const { REACT_APP_API_URL } = process.env

const OrganisationContext = createContext<OrganisationContextType | undefined>(undefined)

const OrganisationContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { accessToken } = useAuth()

    // main org object for user
    const [organisation, setOrganisation] = useState<any>(null)
    const [isGetOrganisationByIdLoading, setIsGetOrganisationByIdLoading] = useState<boolean>(false)
    const [isGetOrganisationByIdErr, setIsGetOrganisationByIdErr] = useState<boolean>(false)

    const getOrganisationById = async (id: string, updateCache = false) => {
        if (organisation?._id === id && !updateCache) {
            const diff = (new Date().getTime() - new Date(organisation?.lastUpdated).getTime()) / 1000
            // if diff is greater than 5 minutes in seconds, update the cache
            if (diff < 300) return
        }

        try {
            setIsGetOrganisationByIdLoading(true)
            await axiosInstance.get(`${REACT_APP_API_URL}/api/organisations/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
                .then((response: any) => {
                    setOrganisation({ ...response.data, lastUpdated: new Date() })
                    setIsGetOrganisationByIdLoading(false)
                    setIsGetOrganisationByIdErr(false)
                })
                .catch((error: any) => {
                    console.error('Error fetching organisation:', error)
                    setIsGetOrganisationByIdLoading(false)
                    setIsGetOrganisationByIdErr(true)
                })
        } catch (error) {
            console.error('Error fetching data:', error)
            setIsGetOrganisationByIdLoading(false)
            setIsGetOrganisationByIdErr(true)
        }
    }

    return (
        <OrganisationContext.Provider value={{ organisation, getOrganisationById, isGetOrganisationByIdLoading, isGetOrganisationByIdErr }}>
            {children}
        </OrganisationContext.Provider>
    )
}

const useOrganisation = () => {
    const context = useContext(OrganisationContext)
    if (context === undefined) {
        throw new Error('useOrganisation must be used within a OrganisationContextProvider')
    }
    return context
}

export { OrganisationContextProvider, useOrganisation }