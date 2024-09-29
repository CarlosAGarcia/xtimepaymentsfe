// exports the organisation context along with the following variables:
import React, { createContext, useContext, useState } from 'react'
import { useAuth } from '../auth/authContext'
import axiosInstance from '../api';


interface SiteManagementContextType {
    siteSettings: SiteSettings | undefined;
    getSiteSettings: () => void;
    isGetSiteSettingsLoading: boolean;
    isGetSiteSettingsErr: string;
}

const { REACT_APP_API_URL } = process.env
const SiteManagementContext = createContext<SiteManagementContextType | undefined>(undefined)

const SiteManagementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { accessToken } = useAuth()

    const [siteSettings, setSiteSettings] = useState<SiteSettings | undefined>(undefined)
    const [isGetSiteSettingsLoading, setIsGetSiteSettingsLoading] = useState<boolean>(false)
    const [isGetSiteSettingsErr, setIsGetSiteSettingsErr] = useState<string>('')

    const getSiteSettings = async () => {
        try {
            setIsGetSiteSettingsLoading(true)
            await axiosInstance.get(`${REACT_APP_API_URL}/api/siteSettings`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
                .then((response: any) => {
                    setSiteSettings(response.data)
                    setIsGetSiteSettingsLoading(false)
                    setIsGetSiteSettingsErr('')
                })
                .catch((error: any) => {
                    console.error('Error fetching site settings:', error)
                    setIsGetSiteSettingsLoading(false)
                    setIsGetSiteSettingsErr('Error fetching site settings')
                })
        } catch (error) {
            console.error('Error fetching data:', error)
            setIsGetSiteSettingsLoading(false)
            setIsGetSiteSettingsErr('Error fetching site settings')
        }
    }

    return (
        <SiteManagementContext.Provider value={{
            siteSettings,
            getSiteSettings,
            isGetSiteSettingsLoading,
            isGetSiteSettingsErr
         }}>
            {children}
        </SiteManagementContext.Provider>
    )
}

const useSiteManagement = () => {
    const context = useContext(SiteManagementContext)
    if (context === undefined) {
        throw new Error('useSiteManagement must be used within a SiteManagementProvider')
    }
    return context
}

export { SiteManagementProvider, useSiteManagement }