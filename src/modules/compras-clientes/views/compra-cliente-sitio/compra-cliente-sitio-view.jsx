import CompraClienteServices from '@compras-clientes/services/compra-cliente-services';
import { APP_NAME, URL_COMERCIAL } from '@config';
import UTILS from '@core/utils/utils';
import ProductosServices from '@productos/services/productos-services';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Container, Form, ListGroup, Row, Table } from "react-bootstrap";
import CompraValidator from './compra-cliente-sitio-validator';

const CompraClienteView = (props) => {

    const router = useRouter();

    const [errors, setErrors] = useState([]);
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
            if (props.isEditarCompra) {
                const compraEditar = props.compraEditar;
                setProductos(compraEditar.productos);
                setPagos(compraEditar.pagos);
            }
        }
        return () => mounted = false;
    }, [])

    const registrarCompra = () => {
        const listaProductos = productos.map((producto) => {
            return {
                idProducto: producto.idProducto,
                valorTotal: producto.precioVenta * producto.cantidad,
                cantidad: producto.cantidad,
            }
        });

        let compra = {};

        if (props?.isEditarCompra) {
            compra = {
                ...props.compraEditar,
                productos: listaProductos,
                pagos,
                idCompra: props?.compraEditar?.idCompra,
            }
        } else {
            compra = {
                productos: listaProductos,
                pagos,
                cliente: UTILS.getClienteAnonimo(),
                empleado: UTILS.getEmpleadoAnonimo(),
            };
        }

        const errorsValidator = CompraValidator.validate(compra);
        setErrors(errorsValidator);
        if (!Object.keys(errorsValidator).length) {
            if (props?.isEditarCompra) {
                console.log(compra)
                CompraClienteServices.actualizarCompra(compra, (response) => {
                    if (response.status == 200 || response.status == 201) {
                        alert('Compra actualizada con exito.');
                        router.push('/compras/resumen-compras');
                    }
                });
            } else {
                CompraClienteServices.registrarCompra(compra, (response) => {
                    if (response.status == 200 || response.status == 201) {
                        alert('Compra registrada con exito.');
                        router.push('/compras/resumen-compras');
                    }
                });
            }
        }

    }

    const addProducto = ({ target }) => {
        const { value } = target;
        if (!productos.some((producto) => producto.idProducto == value) && value != -1) {
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
        <Container className='mt-5'>
            <h1>Compras en sitio</h1>
            <Col className='mt-3'>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label htmlFor='buscadorProducto'>Buscar productos para añadir:</Form.Label>
                            <Form.Select id="buscadorProducto" aria-label="Default select example" onChange={addProducto}>
                                <option value="-1">Seleccione un producto</option>
                                {listaProductos.map((producto) => {
                                    return (
                                        <option key={producto.idProducto} value={producto.idProducto}>{producto.nombreProducto}</option>
                                    );
                                })}
                            </Form.Select>
                            <Form.Text className="text-muted">
                                Seleccione uno de los productos para añadirlo a la compra
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col></Col>
                </Row>
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
                            {errors.productos
                                &&
                                <Alert variant='danger' className='mt-3'>
                                    {errors.productos}
                                </Alert>
                            }
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
                            <Col>
                                <Col className="d-flex justify-content-end">
                                    <h5>TOTAL NETO:</h5>
                                </Col>
                                <Col className="d-flex justify-content-end">
                                    <h4>
                                        {
                                            productos.length > 0
                                            && UTILS.formatoMoneda(productos
                                                .map(producto => producto.cantidad * producto.precioVenta)
                                                .reduce((total, valor) => total += valor))
                                            || UTILS.formatoMoneda(0)
                                        }
                                    </h4>
                                </Col>
                            </Col>

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

                                        const handleChangeValorPago = (event) => {
                                            const value = event.target.value;
                                            const listaPagos = pagos;
                                            listaPagos[index].valor = value;
                                            setPagos([...listaPagos]);
                                        }

                                        const handleChangeNumeroComprobante = (event) => {
                                            const value = event.target.value;
                                            const listaPagos = pagos;
                                            listaPagos[index].numeroComprobante = value;
                                            setPagos([...listaPagos]);
                                        }

                                        return (
                                            <tr key={`pago-numero-${index}`}>
                                                <td>
                                                    <Form.Select value={pago.idTipoFormaPago} aria-label={`Tipo Forma Pago ${index}`} onChange={changeFormaPago}>
                                                        {listaTipoFormaPago.map((formaPago) => {
                                                            return (
                                                                <option key={`${formaPago.nombre}-${index}`} value={formaPago.idTipoFormaPago}>{formaPago.nombre}</option>
                                                            );
                                                        })}
                                                    </Form.Select>
                                                </td>
                                                <td>
                                                    {pago.idTipoFormaPago != 1
                                                        &&
                                                        <Form.Group controlId={`numeroComprobante${index}`}>
                                                            <Form.Control type="text" placeholder="NN" value={pago.numeroComprobante} onChange={handleChangeNumeroComprobante} />
                                                        </Form.Group>
                                                        || <Form.Control plaintext readOnly defaultValue="NN" />
                                                    }
                                                </td>
                                                <td>
                                                    <Form.Group controlId={`valorPago${index}`}>
                                                        <Form.Control type="number" placeholder="####" value={pago.valor} onChange={handleChangeValorPago} />
                                                    </Form.Group>
                                                </td>
                                                <td>
                                                    <Button onClick={() => eliminarPago(index)} variant="outline-danger">Eliminar</Button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                            {errors.pagos
                                &&
                                <Alert variant='danger' className='mt-3'>
                                    {errors.pagos}
                                </Alert>
                            }
                            <Col className="d-flex justify-content-center">
                                <Button onClick={addPago} variant="outline-primary">Agregar pago</Button>
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