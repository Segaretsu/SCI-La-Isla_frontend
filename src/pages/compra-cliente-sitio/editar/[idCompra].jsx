import React from 'react';
import CompraClienteView from '@compras-clientes/views/compra-cliente-sitio/compra-cliente-sitio-view';
import CompraClienteServices from '@compras-clientes/services/compra-cliente-services';


export async function getServerSideProps(context) {

    const compraRequest = CompraClienteServices.getCompraByIdCompra(context?.params?.idCompra);

    const [compra] = await Promise.all([compraRequest]);

    return {
        props: {
            compra: {
                ...compra.data,
                idCompra: context?.params?.idCompra,
            },
        },
    }
}

const CompraClienteSitioPage = (props) => {
    const compra = props.compra;
    return (
        <CompraClienteView
            isEditarCompra={true}
            compraEditar={compra}
        />
    );
}

export default CompraClienteSitioPage;