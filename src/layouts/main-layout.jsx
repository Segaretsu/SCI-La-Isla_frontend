import React from 'react';
import Footer from './footer';
import Menu from './menu';

const MainLayout = (props) => {
    const { children } = props;
    return (
        <>
            <Menu />
            {children}
            <Footer />
        </>
    );
}

export default MainLayout;