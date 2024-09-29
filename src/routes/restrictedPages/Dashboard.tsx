import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/auth/authContext';
import Header from '../../components/headers/Headers';
import SubHeader from '../../components/headers/Subheaders';

export default function Dashboard() {
  const userContext = useContext(AuthContext);
  if (!userContext) throw new Error('YourComponent must be used within a MainProvider');

  const { user, isUserLoading, isUserErr } = userContext;

  return (
    <div>
      <Header title='DASHBOARD'/>
      <SubHeader title='' />
      <div>
        {isUserLoading ? 'LOADING...' : isUserErr ? 'ERR' : JSON.stringify(user.email)}
      </div>
    </div>
  )
}
