// exports a basic layout consisting of a Container component that contains props for header text for a Header Component and children below it

import React from 'react';
import { Container } from '@mui/material';
import Header from '../components/headers/Headers';

interface HeaderContentLayoutProps {
    title: string;
    children: React.ReactNode;
}

const HeaderContentLayout: React.FC<HeaderContentLayoutProps> = ({ title, children }) => {
    return (
        <Container>
            <Header title={title} />
            {children}
        </Container>
    );
}

export default HeaderContentLayout;