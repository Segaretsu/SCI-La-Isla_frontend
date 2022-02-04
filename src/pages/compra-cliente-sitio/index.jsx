import React from 'react';
import CompraClienteView from '@compras-clientes/views/compra-cliente-sitio/compra-cliente-sitio-view';
import MainLayout from 'src/layouts/main-layout';


const CompraClienteSitioPage = () => {
    return (
        <MainLayout>
            <CompraClienteView />
        </MainLayout>
    );
}

export default CompraClienteSitioPage;