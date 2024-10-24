import React, { useEffect } from 'react'
import { useAuth } from '../../contexts/auth/authContext'
import { useOrganisation } from '../../contexts/organisations/organisationContext'
import TabPanel from '../../components/pages/monitization/TabPanel'
import HeaderContentLayout from '../../layouts/HeaderContentLayout'
import { Box } from '@mui/material'

export default function Monetization() {
    // gets the user obejct from authContext
    const { user } = useAuth()
    const { getOrganisationSubscriptions, getOrganisationById, isGetOrganisationByIdLoading } = useOrganisation()

    // on load and on every user.organisation._id change, fetch the organisation data with getOrganisationById and the id
    useEffect(() => {
        if (user?.organisation?._id && !isGetOrganisationByIdLoading) {
            getOrganisationById(user.organisation._id)
            getOrganisationSubscriptions(user.organisation._id)
        }
    }, [user?.organisation?._id, getOrganisationById])

    return (
        <HeaderContentLayout title='MONETIZATION' subTitle=''>
            <Box sx={{ mt: 4 }}>
                <Box sx={{ mt: 4 }}>
                    <TabPanel />
                </Box>
            </Box>
        </HeaderContentLayout>
    )
}
