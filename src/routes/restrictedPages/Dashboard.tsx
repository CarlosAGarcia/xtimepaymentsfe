import React, { useContext } from 'react'
import { Button } from '@mui/material';
import { AuthContext } from '../../contexts/auth/authContext';
import Header from '../../components/headers/Headers';

export default function Dashboard() {
  const userContext = useContext(AuthContext);
  if (!userContext) throw new Error('YourComponent must be used within a MainProvider');

  const { user, isUserLoading, isUserErr, getUser } = userContext;

  const onClickGetUser = () => {
    getUser('667454409e6bec9484e05b70')
  }

  return (
    <div>
      <Header title='DASHBOARD'/>

      <div>
        {isUserLoading ? 'LOADING...' : isUserErr ? 'ERR' : JSON.stringify(user.email)}
      </div>
    </div>
  )
}
