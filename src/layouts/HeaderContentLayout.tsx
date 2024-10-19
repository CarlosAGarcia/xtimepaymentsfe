// exports a basic layout consisting of a Container component that contains props for header text for a Header Component and children below it

import React from 'react';
import { Container } from '@mui/material';
import Header from '../components/common/headers/Headers';
import SubHeader from '../components/common/headers/Subheaders';

interface HeaderContentLayoutProps {
    title: string;
    subTitle: string;
    children: React.ReactNode;
}

const HeaderContentLayout: React.FC<HeaderContentLayoutProps> = ({ title, subTitle, children }) => {
    return (
        <Container>
            <Header title={title} />
            <SubHeader title={subTitle} />
            {children}
        </Container>
    );
}

export default HeaderContentLayout;