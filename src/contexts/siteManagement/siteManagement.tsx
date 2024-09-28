// exports the organisation context along with the following variables:
import React, { createContext, useContext, useState } from 'react'
import { useAuth } from '../auth/authContext'
import axiosInstance from '../api';
import { useOrganisation } from '../organisations/organisationContext';

interface SiteManagementContextType {

}

const { REACT_APP_API_URL } = process.env
const SiteManagementContext = createContext<SiteManagementContextType | undefined>(undefined)

const SiteManagementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { accessToken } = useAuth()
    const { organisation } = useOrganisation()

    const [ siteSettings, setSiteSettings ] = useState<any>(null)
    const [ isGetSiteSettingsLoading, setIsGetSiteSettingsLoading ] = useState<boolean>(false)
    const [ isGetSiteSettingsErr, setIsGetSiteSettingsErr ] = useState<boolean>(false)

    const getSiteSettings = async () => {
        try {
            setIsGetSiteSettingsLoading(true)
            await axiosInstance.get(`${REACT_APP_API_URL}/api/site/${organisation?._id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
                .then((response: any) => {
                    setSiteSettings(response.data)
                    setIsGetSiteSettingsLoading(false)
                    setIsGetSiteSettingsErr(false)
                })
                .catch((error: any) => {
                    console.error('Error fetching site settings:', error)
                    setIsGetSiteSettingsLoading(false)
                    setIsGetSiteSettingsErr(true)
                })
        } catch (error) {
            console.error('Error fetching data:', error)
            setIsGetSiteSettingsLoading(false)
            setIsGetSiteSettingsErr(true)
        }
    }

    return (
        <SiteManagementContext.Provider value={{ }}>
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