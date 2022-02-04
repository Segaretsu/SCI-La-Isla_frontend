import React from 'react';
import ResumenComprasViews from '@compras-clientes/views/resumen-compras/resumen-compras-view';
import MainLayout from 'src/layouts/main-layout';

const ResumenCompras = () => {
    return (
        <MainLayout>
            <ResumenComprasViews></ResumenComprasViews>
        </MainLayout>
    );
}

export default ResumenCompras;