import CompraClienteServices from '@compras-clientes/services/compra-cliente-services';
import { APP_NAME, URL_COMERCIAL } from '@config';
import UTILS from '@core/utils/utils';
import ProductosServices from '@productos/services/productos-services';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, ListGroup, Row, Table } from "react-bootstrap";

const CompraClienteView = (props) => {
    const [listaProductos, setListaProductos] = useState([]);
    const [listaTipoFormaPago, setListaTipoFormaPago] = useState([]);
    const [productos, setProductos] = useState([]);
    const [pagos, setPagos] = useState([]);

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            ProductosServices.getAllProductos((response) => {
                if (response.status == 200 || response.status == 201) {
                    setListaProductos(response.data);
                }
            });
            CompraClienteServices.getAllTipoFormaPago((response) => {
                if (response.status == 200 || response.status == 201) {
                    setListaTipoFormaPago(response.data);
                }
            });
        }
        return () => mounted = false;
    }, [])

    const registrarCompra = () => {
        console.log({
            compra: {
                productos,
                pagos,
            }
        })
    }

    const addProducto = ({ target }) => {
        const { value } = target;
        if (!productos.some((producto) => producto.idProducto == value)) {
            const productoEncontrado = listaProductos.find((producto) => producto.idProducto == value);
            const productoAgregar = {
                ...productoEncontrado,
                cantidad: 1,
            }
            const newProductos = [
                ...productos,
                productoAgregar,
            ];
            setProductos(newProductos);
        }
    }

    const addPago = () => {
        const pago = {
            'idTipoFormaPago': 1,
            'numeroComprobante': '',
            'valor': 0,
        }

        setPagos([
            ...pagos,
            pago,
        ]);
    }

    const eliminarPago = (index) => {
        const listaPago = pagos;
        listaPago.splice(index, 1);
        setPagos([...listaPago]);
    }

    return (
        <Container>
            <h1>Esto es la pantalla de compras</h1>
            <Col>
                <Form.Select aria-label="Default select example" onChange={addProducto}>
                    <option value="-1">Seleccione un producto</option>
                    {listaProductos.map((producto) => {
                        return (
                            <option key={producto.idProducto} value={producto.idProducto}>{producto.nombreProducto}</option>
                        );
                    })}
                </Form.Select>

            </Col>
            <Col className="mt-4">
                <Row>
                    <Col>
                        <ListGroup>
                            {productos.map((producto, index) => {
                                const valorTotal = (producto.cantidad * producto.precioVenta);
                                const changeCantidad = (cantidad = 1) => {
                                    producto.cantidad += cantidad;
                                    const lista = [
                                        ...productos,
                                        producto,
                                    ];
                                    setProductos([...new Set(lista)]);
                                }

                                const deleteProducto = (idProducto) => {
                                    const lista = productos.filter(producto => producto.idProducto != idProducto);
                                    setProductos(lista);
                                }

                                return (
                                    <ListGroup.Item
                                        key={`${producto.idProducto}-${index}`}
                                        className="d-flex justify-content-between align-items-start"
                                    >
                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold">{producto.nombreProducto}</div>
                                            {producto.categoria}
                                            <p>{UTILS.formatoMoneda(valorTotal)}</p>
                                        </div>
                                        <div>
                                            <Row>
                                                <Col>
                                                    {producto.cantidad > 1
                                                        && <Button variant='outline-primary' onClick={() => changeCantidad(-1)}>-</Button>
                                                        || <Button variant='outline-primary' onClick={() => deleteProducto(producto.idProducto)}>Eliminar</Button>}
                                                </Col>
                                                <Col className="ml-2 mr-2 mt-2">
                                                    {producto.cantidad}
                                                </Col>
                                                <Col>
                                                    <Button onClick={() => changeCantidad(1)}>+</Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    </ListGroup.Item>
                                );
                            })}
                        </ListGroup>
                    </Col>
                    <Col className="px-5">
                        <Col>
                            <Col className="d-flex justify-content-center">
                                {APP_NAME}
                            </Col>
                            <Col className="d-flex justify-content-center">
                                {URL_COMERCIAL}
                            </Col>
                        </Col>
                        <hr />
                        <Row className="d-flex justify-content-between mt-3">
                            <Col>
                                #00001
                            </Col>
                            <Col>
                                Fecha: {moment(new Date()).format("DD/MM/YYYY")}
                            </Col>
                        </Row>

                        <Col>
                            <Col>
                                .............
                            </Col>
                            <Table responsive
                                striped
                                borderless>
                                <thead>
                                    <tr>
                                        <th>Referencia</th>
                                        <th>Cantidad</th>
                                        <th>Valor Unitario</th>
                                        <th>Valor Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productos.map((producto, index) => {
                                        return (
                                            <tr>
                                                <td>{producto.nombreProducto}</td>
                                                <td>{producto.cantidad}</td>
                                                <td>{UTILS.formatoMoneda(producto.precioVenta)}</td>
                                                <td>{UTILS.formatoMoneda(producto.precioVenta * producto.cantidad)}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>

                        </Col>
                        <Col>
                            <Col>
                                .............
                            </Col>
                            <Table responsive
                                striped
                                borderless>
                                <thead>
                                    <tr>
                                        <th>Tipo forma pago</th>
                                        <th>Número comprobante</th>
                                        <th>Valor pagado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pagos.map((pago, index) => {

                                        const changeFormaPago = (event) => {
                                            const value = event.target.value;
                                            const listaPagos = pagos;
                                            listaPagos[index].idTipoFormaPago = value;
                                            setPagos([...listaPagos]);
                                        }

                                        return (
                                            <tr key={`${pago.numeroComprobante}-${index}`}>
                                                <td>
                                                    <Form.Select value={pago.idTipoFormaPago} aria-label={`Tipo Forma Pago ${index}`} onChange={changeFormaPago}>
                                                        <option value="-1">SELECCIONAR</option>
                                                        {listaTipoFormaPago.map((formaPago) => {
                                                            return (
                                                                <option key={`${formaPago.nombre}-${index}`} value={formaPago.idTipoFormaPago}>{formaPago.nombre}</option>
                                                            );
                                                        })}
                                                    </Form.Select>
                                                </td>
                                                <td>
                                                    {pago.idTipoFormaPago != 1
                                                        && <input type="text" value={pago.numeroComprobante} />
                                                        || "NN"
                                                    }
                                                </td>
                                                <td>{UTILS.formatoMoneda(pago.valor)}</td>
                                                <td>
                                                    <Button onClick={() => eliminarPago(index)} variant="outline-danger">Eliminar pago</Button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                            <Col className="d-flex justify-content-center">
                                <Button onClick={addPago} variant="outline-primary">Agregar pago</Button>
                            </Col>
                        </Col>
                        <Col>
                            <Col className="d-flex justify-content-end">
                                TOTAL NETO:
                            </Col>
                            <Col className="d-flex justify-content-end">
                                {
                                    productos.length > 0
                                    && UTILS.formatoMoneda(productos
                                        .map(producto => producto.cantidad * producto.precioVenta)
                                        .reduce((total, valor) => total += valor))
                                    || UTILS.formatoMoneda(0)
                                }
                            </Col>
                        </Col>
                        <hr />
                    </Col>
                </Row>
            </Col>
            <Col className="mt-4 d-flex justify-content-end">
                <Button variant="primary" onClick={registrarCompra}>Registrar compra</Button>
            </Col>
        </Container>
    );
}

export default CompraClienteView;