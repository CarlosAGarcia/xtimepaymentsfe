import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Logo from '../../components/home/Logo';
import SubHeader from '../../components/home/Subheader';
import TokenCountField from '../../components/fields/TokenCountField';
import ButtonComponent from '../../components/buttons/Button1';
import LoginButton from '../../components/buttons/LoginButton';
import TextList from '../../components/fields/TextList';
import { Paper } from '@mui/material';
import SubTitle from '../../components/home/SubTitle';
import { CountTokenContextProvider } from '../../contexts/countTokens/countTokens';

const Home: React.FC = () => {
  return (
    <CountTokenContextProvider>
        <Container sx={{ padding: '2rem', position: 'relative' }}>

            <LoginButton />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 2 }}>
                <Logo />
                <SubHeader />
            </Box>

            <Paper elevation={3} sx={{ padding: '2rem', mt: '2rem' }}>

                <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                    <SubTitle />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                    <TokenCountField />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
                    <ButtonComponent />
                    <TextList />
                </Box>

            </Paper>
            
        </Container>
      </CountTokenContextProvider>

  );
}

export default Home;
