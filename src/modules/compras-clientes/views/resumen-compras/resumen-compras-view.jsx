import CompraClienteServices from '@compras-clientes/services/compra-cliente-services';
import ProductosServices from '@productos/services/productos-services';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { FECHA } from '@config';
import UTILS from '@core/utils/utils';
import { useRouter } from 'next/router';
import ModalConfirmarAccion from 'src/modules/commons/components/modal-confirmar-accion/modal-confirmar-accion';

const ResumenComprasView = () => {

    const router = useRouter();

    const [listaCompras, setListaCompras] = useState([]);

    const getResumenCompras = () => {
        CompraClienteServices.getResumenCompras(null, (response) => {
            if (response.status == 200 || response.status == 201) {
                setListaCompras(response.data);
            }
        });
    }

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            getResumenCompras();
        }
        return () => mounted = false;
    }, [])

    const goToModificarCompra = (idCompra) => {
        const URL = ['/compra-cliente-sitio/editar/', idCompra].join('');
        router.push(URL);
    }

    const eliminarCompra = (idCompra) => {
        CompraClienteServices.eliminarCompra(idCompra, (response) => {
            if (response.status == 200 || response.status == 201) {
                alert('Compra eliminada correctamente');
                getResumenCompras();
            }
        });
    }

    return (
        <Container className='mt-5'>
            <h1>Resumen de compras</h1>

            <Table responsive
                striped>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>id</th>
                        <th>Fecha</th>
                        <th>Nombre cliente</th>
                        <th>Productos comprados</th>
                        <th>Valor compra</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {listaCompras.map((compraActual, index) => {
                        const { compra, cliente, productos } = compraActual;
                        const clienteNombreCompleto = [cliente.primerNombre, cliente.segundoNombre, cliente.primerApellido, cliente.segundoApellido].join(' ');
                        const productosComprados = productos.reduce((cadenaProductos, producto, index) => {
                            const joinWith = (index < productos.length && index != 0) ? ', ' : '';
                            return cadenaProductos + joinWith + producto.nombreProducto;
                        }, '');

                        return (
                            <tr key={`compraId-${compra.idCompra}`}>
                                <td>{(index + 1)}</td>
                                <td>{compra.idCompra}</td>
                                <td>{moment(compra.fechaCompra).format(FECHA.FORMATO_FECHA)}</td>
                                <td>{clienteNombreCompleto}</td>
                                <td>{productosComprados}</td>
                                <td>{UTILS.formatoMoneda(compra.valorTotal)}</td>
                                <td>
                                    <Row>
                                        <Col>
                                            <Button onClick={() => goToModificarCompra(compra.idCompra)} variant='outline-warning'>Modificar</Button>
                                        </Col>
                                        <Col>
                                            <ModalConfirmarAccion 
                                                accion='Eliminar compra'
                                                variant='outline-danger'
                                                buttonMessage='Eliminar'
                                                onClickExito={() => eliminarCompra(compra.idCompra)}
                                            />
                                            {/* <Button onClick={() => eliminarCompra(compra.idCompra)} variant='outline-danger'>Eliminar</Button> */}
                                        </Col>
                                    </Row>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </Container>
    );
}

export default ResumenComprasView;