import React, { useEffect } from 'react'
import { useAuth } from '../../contexts/auth/authContext'
import { useOrganisation } from '../../contexts/organisations/organisationContext'
import HeaderContentLayout from '../../layouts/HeaderContentLayout'
import SiteManagementHeader from '../../components/siteManagement/siteMgmtHeader/siteMgmtHeader'


/*
    This page would display a demo of the actual site but with editing capabilities.
    it also includes a link to the 'live site' which would be the actual site they link people to
    it includes an easy to copy link to the site along with additional 'special' link that are generated for promotions etc.
    also generates a QR code to paste on posters etc.
*/

export default function SiteManagement() {
    // gets the user obejct from authContext

    const { user } = useAuth()
    const { organisation, getOrganisationById, isGetOrganisationByIdLoading, isGetOrganisationByIdErr } = useOrganisation()

    // on load and on every user.organisation._id change, fetch the organisation data with getOrganisationById and the id
    useEffect(() => {
        if (user?.organisation?._id) {
            getOrganisationById(user.organisation._id)
        }
    }, [ user?.organisation?._id ])

    return (
        <>
            <SiteManagementHeader />
        </>
    )
}
