// exports the organisation context along with the following variables:
import React, { createContext, useContext, useState } from 'react'
import { useAuth } from '../auth/authContext'
import axiosInstance from '../api';


interface SiteManagementContextType {
    // GET
    siteSettings: SiteSettings | undefined;
    getSiteSettings: () => void;
    getSection: (section: string) => any;
    isGetSiteSettingsLoading: boolean;
    isGetSiteSettingsErr: string;

    //EDIT
    editSection: ({ content, name, enabled }: { content: string; name: string; enabled?: boolean; }) => void;
    sectionsLoading: { [key: string]: boolean };
    sectionErrs: { [key: string]: string };
}

const { REACT_APP_API_URL } = process.env
const SiteManagementContext = createContext<SiteManagementContextType | undefined>(undefined)

const SiteManagementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { accessToken } = useAuth()

    // GET
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
    const getSection = (section: string) => {
        return siteSettings?.sections?.find((s: any) => s.name === section)
    }

    // EDIT
    // a hashmap of section names to loading states for each section, plus errors for each section
    const [sectionsLoading, setSectionsLoading] = useState<{ [key: string]: boolean }>({})
    const [sectionErrs, setSectionErrs] = useState<{ [key: string]: string }>({})
    const editSection = async ({ content, name, enabled }: { content: string, name: string, enabled?: boolean }) => {
        // Send the content to your backend
        setSectionsLoading({ ...sectionsLoading, [name]: true });
        setSectionErrs({ ...sectionErrs, [name]: '' });
        
        await axiosInstance.put(`${REACT_APP_API_URL}/api/siteSettings/section`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            content,
            name,
            enabled
          },
        }).then((response: any) => {
          alert('Content saved successfully');
          console.log('Content saved successfully:', response);
            setSectionsLoading({ ...sectionsLoading, [name]: false });

          // updates the site settings in context
          getSiteSettings();
        })
          .catch((error: any) => {
            console.error('Error saving content:', error);
            setSectionsLoading({ ...sectionsLoading, [name]: false });
            setSectionErrs({ ...sectionErrs, [name]: 'Error saving content' });
          });
    };

    return (
        <SiteManagementContext.Provider value={{
            // GET
            siteSettings,
            getSection,
            getSiteSettings,
            isGetSiteSettingsLoading,
            isGetSiteSettingsErr,

            // EDIT
            editSection,
            sectionsLoading,
            sectionErrs,
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