import React from 'react';
import Menu from './menu';

const MainLayout = (props) => {
    const { children } = props;
    return (
        <>
            <Menu />
            {children}
        </>
    );
}

export default MainLayout;