import React, { useEffect } from 'react'
import SiteManagementHeader from '../../components/siteManagement/siteMgmtHeader/siteMgmtHeader'
import SiteManagementContent from '../../components/siteManagement/siteMgmtContent/siteMgmtContent'
import { useSiteManagement } from '../../contexts/siteManagement/siteManagementContext'
import { useOrganisation } from '../../contexts/organisations/organisationContext'
import { useAuth } from '../../contexts/auth/authContext'
import HeaderContentLayout from '../../layouts/HeaderContentLayout'

/*
    This page would display a demo of the actual site but with editing capabilities.
    it also includes a link to the 'live site' which would be the actual site they link people to
    it includes an easy to copy link to the site along with additional 'special' link that are generated for promotions etc.
    also generates a QR code to paste on posters etc.
*/
export default function SiteManagement() {
    // gets the user obejct from authContext
    const { getSiteSettings, isGetSiteSettingsLoading, isGetSiteSettingsErr } = useSiteManagement()
    const { getOrganisationById } = useOrganisation()
    const { user } = useAuth()

    // on load and on every user.organisation._id change, fetch the organisation data with getOrganisationById and the id
    useEffect(() => {
        getSiteSettings()
        getOrganisationById(user?.organisation?._id)
    }, [])

    if (isGetSiteSettingsLoading) {
        return <div>Loading...</div>
    }
    if (isGetSiteSettingsErr) {
        return <div>Error...</div>
    }

    return (
        <>
        <HeaderContentLayout title='' subTitle=''>
        
            <SiteManagementHeader />
            <SiteManagementContent />
        </HeaderContentLayout>
        </>
    )
}
