import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../contexts/auth/authContext';
import HeaderContentLayout from '../../layouts/HeaderContentLayout'
import { useOrganisation } from '../../contexts/organisations/organisationContext';

export default function Dashboard() {
  const { organisation, getOrganisationById, isGetOrganisationByIdLoading, isGetOrganisationByIdErr } = useOrganisation()
  const userContext = useContext(AuthContext);
  if (!userContext) throw new Error('YourComponent must be used within a MainProvider');

  const { user, isUserLoading, isUserErr } = userContext;
  // on load and on every user.organisation._id change, fetch the organisation data with getOrganisationById and the id
  useEffect(() => {
      if (!organisation?.name && user?.organisation?._id) {
          getOrganisationById(user.organisation._id)
      }
  }, [ user?.organisation?._id, organisation ])

  return (
    <HeaderContentLayout title={isGetOrganisationByIdLoading ? 'LOADING...' : organisation?.name} subTitle=''>
      <div>
        {isUserLoading ? 'LOADING...' : isUserErr ? 'ERR' : JSON.stringify(user.email)}
      </div>
    </HeaderContentLayout>
  )
}
