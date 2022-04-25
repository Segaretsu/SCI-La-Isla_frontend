import CompraClienteServices from '@compras-clientes/services/compra-cliente-services';
import ProductosServices from '@productos/services/productos-services';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, InputGroup, Row, Table } from 'react-bootstrap';
import { FECHA } from '@config';
import UTILS from '@core/utils/utils';
import { useRouter } from 'next/router';
import ModalConfirmarAccion from 'src/modules/commons/components/modal-confirmar-accion/modal-confirmar-accion';

const ResumenComprasView = () => {

    const router = useRouter();

    const [listaCompras, setListaCompras] = useState([]);
    const [fechaDesde, setFechaDesde] = useState("");
    const [fechaHasta, setFechaHasta] = useState("");

    const getResumenCompras = (fechaHoy) => {
        const params = {
            byFecha: true,
            byFechaInicio: fechaHoy || fechaDesde,
            byFechaFin: fechaHoy || fechaHasta,
        }
        CompraClienteServices.getResumenCompras(params, (response) => {
            if (response.status == 200 || response.status == 201) {
                setListaCompras(response.data);
            }
        });
    }

    const setFechaInicial = () => {
        setFechaDesde(getFechaHoy());
        setFechaHasta(getFechaHoy());
    }

    const getFechaHoy = () => {
        const hoy = new Date();
        return hoy.toISOString().substr(0, 10);
    }

    const onHandledChange = ({ target }) => {
        const { value, name } = target;
        if (name == "fechaDesde") {
            setFechaDesde(value);
        } else {
            setFechaHasta(value);
        }
        console.log({ value, name })
    }

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            setFechaInicial();
            getResumenCompras(getFechaHoy());
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
            <Row>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Fecha desde:</Form.Label>
                        <Form.Control onChange={onHandledChange} value={fechaDesde} type="date" id="fechaDesde" name="fechaDesde" />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Fecha Hasta:</Form.Label>
                        <Form.Control onChange={onHandledChange} value={fechaHasta} type="date" id="fechaHasta" name="fechaHasta" />
                    </Form.Group>
                </Col>
                <Col className='mt-3 mb-3' md={4}>
                    <Button onClick={() => getResumenCompras()} variant='outline-primary'>Buscar compras</Button>
                </Col>
            </Row>
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
                    <tr>
                        <td>TOTAL</td>
                        <td>-</td>
                        <td>{`${fechaDesde} - ${fechaHasta}`}</td>
                        <td>-</td>
                        <td>-</td>
                        <td>{UTILS.formatoMoneda(listaCompras.map((compraActual) => { return compraActual.compra.valorTotal}).reduce((total, actual) => total += actual, 0))}</td>
                        <td>-</td>
                    </tr>
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