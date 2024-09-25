import React, { useEffect } from 'react'
import { useAuth } from '../../contexts/auth/authContext'
import { useOrganisation } from '../../contexts/organisations/organisationContext'
import TabPanel from '../../components/monitization/TabPanel'
import Header from '../../components/headers/Headers'

export default function Monetization() {
    // gets the user obejct from authContext
    const { user } = useAuth()
    const { organisation, getOrganisationById, isGetOrganisationByIdLoading, isGetOrganisationByIdErr } = useOrganisation()

    // on load and on every user.organisation._id change, fetch the organisation data with getOrganisationById and the id
    useEffect(() => {
        if (user?.organisation?._id) {
            getOrganisationById(user.organisation._id)
        }
    }, [user?.organisation?._id])

    return (
        <div>
            <Header title='MONETIZATION'/>

            {/* renders a table  */}
            <TabPanel />
        </div>
    )
}
