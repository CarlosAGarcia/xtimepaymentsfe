import React, { useEffect } from 'react'
import { useAuth } from '../../contexts/auth/authContext'
import { useOrganisation } from '../../contexts/organisations/organisationContext'
import HeaderContentLayout from '../../layouts/HeaderContentLayout'

export default function SiteManagement() {
    // gets the user obejct from authContext
    // const { user } = useAuth()
    // const { organisation, getOrganisationById, isGetOrganisationByIdLoading, isGetOrganisationByIdErr } = useOrganisation()

    return (
        <HeaderContentLayout title='SITE MANAGEMENT' subTitle=''>
            SUP
        </HeaderContentLayout>
    )
}
