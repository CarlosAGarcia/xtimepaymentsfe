// exports the organisation context along with the following variables:
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useAuth } from '../auth/authContext'
import axiosInstance from '../api';

interface SiteManagementContextType {
    // GET
    siteSettings: SiteSettings | undefined;
    getSiteSettings: () => void;
    getSection: (section: string) => any;
    isGetSiteSettingsLoading: boolean;
    isGetSiteSettingsErr: string;
    siteSettingsTemp: SiteSettings;
    setSiteSettingsTemp: (newSettings: SiteSettings) => void;
    saveTempSiteSettings: () => void;
    lastSaved: Date | undefined;

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
    // DB data
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
    // Memory data
    const [ siteSettingsTemp, setSiteSettingsTempOriginal ] = useState<SiteSettings>({ org: {}, sections: [] })
    const [ lastSaved, setLastSaved ] = useState<Date>()
    useEffect(() => {
        if (siteSettings) setSiteSettingsTemp(siteSettings)
    }, [siteSettings])
    const getSection = (section: string) => siteSettings?.sections?.find((s: any) => s.name === section)
    // Save temp site settings to db
    const saveTempSiteSettings = async () => {
        await axiosInstance.put(`${REACT_APP_API_URL}/api/siteSettings`, siteSettingsTemp, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }).then((response: any) => {
          console.log('TEMP Content saved successfully:', response);
        })
          .catch((error: any) => {
            console.error('Error saving TEMP content:', error);
          });
    };

    // auto saves temp site settings every 5 minutes (300000 ms) if there are changes
    // on any change to siteSettingsTemp, saveTempSiteSettings is debounced to run after 2 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            if (JSON.stringify(siteSettingsTemp) !== JSON.stringify(siteSettings)) {
                saveTempSiteSettings()
                setLastSaved(new Date())
            }
        }, 300000);
        return () => clearInterval(interval);
    }, [ siteSettingsTemp, siteSettings ]);

    const lastSaveTimeRef = useRef<number | null>(null);

    // Adds auto saving debounce capabilities to setSiteSettingsTempOriginal
    const setSiteSettingsTemp = (newSettings: SiteSettings) => {
        setSiteSettingsTempOriginal(newSettings)
        const currentTime = Date.now();

        // Check if autoSave has been called in the last 3 seconds
        if (!lastSaveTimeRef.current || currentTime - lastSaveTimeRef.current >= 3000) {
            saveTempSiteSettings();
            lastSaveTimeRef.current = currentTime; // Update the last save time
        }
    }

    useEffect(() => {
        return () => {
            saveTempSiteSettings();
        };
      }, []);

    // EDIT
    // a hashmap of section names to loading states for each section, plus errors for each section
    const [sectionsLoading, setSectionsLoading] = useState<{ [key: string]: boolean }>({})
    const [sectionErrs, setSectionErrs] = useState<{ [key: string]: string }>({})
    const editSection = async ({ content, name, enabled }: { content: string, name: string, enabled?: boolean }) => {
        // Send the content to your backend
        setSectionsLoading({ ...sectionsLoading, [name]: true });
        setSectionErrs({ ...sectionErrs, [name]: '' });
        
        await axiosInstance.put(`${REACT_APP_API_URL}/api/siteSettings/section`, {
            content,
            name,
            enabled
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
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
            siteSettingsTemp,
            setSiteSettingsTemp,
            saveTempSiteSettings,
            lastSaved,

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