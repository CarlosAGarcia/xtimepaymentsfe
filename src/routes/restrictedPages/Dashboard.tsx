import React, { useContext } from 'react'
import { Button } from '@mui/material';
import { UserContext } from '../../contexts/users/users';

export default function Dashboard() {
  const userContext = useContext(UserContext);
  if (!userContext) throw new Error('YourComponent must be used within a MainProvider');

  const { user, isUserLoading, isUserErr, getUser } = userContext;

  const onClickGetUser = () => {
    getUser('667454409e6bec9484e05b70')
  }
  return (
    <div>
      <div>Dashboard</div>
      <Button onClick={onClickGetUser} >
        getUserById
      </Button>
      <div>
        {isUserLoading ? 'LOADING...' : isUserErr ? 'ERR' : JSON.stringify(user)}
      </div>
    </div>
  )
}
