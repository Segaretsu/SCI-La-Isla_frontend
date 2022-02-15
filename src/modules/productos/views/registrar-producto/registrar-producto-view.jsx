import ProductosServices from "@productos/services/productos-services";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import ProductoValidator from "./registrar-producto-validator";

const RegistrarProductoView = () => {

    const [listaCategorias, setListaCategorias] = useState([]);
    const [isActivoProducto, setIsActivoProducto] = useState(true);

    const router = useRouter();

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            ProductosServices.getAllTipoCategoriaProducto((response) => {
                if (response.status == 200 || response.status == 201) {
                    setListaCategorias(response.data);
                }
            });
        }
        return () => mounted = false;
    }, [])

    const registrarProducto = (values) => {
        const produto = {
            ...values,
            activo: isActivoProducto
        };
        ProductosServices.registrarProducto(produto, (response) => {
            if (response.status == 200 || response.status == 201) {
                alert('¡Producto registrado con éxito!');
                router.push('/');
            }
        });
    }

    const formik = ProductoValidator.getFormik(registrarProducto);

    const cancelarRegistro = () => {
        router.push('/');
    }

    return (
        <Container className='mt-5'>
            <h1>Registrar producto</h1>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3" controlId="nombreProductos">
                    <Form.Label>Nombre producto: *</Form.Label>
                    <Form.Control type="text" placeholder="Hilo rojo x1 metro"
                        {...formik.getFieldProps('nombre')} />
                    {formik.touched.nombre && formik.errors.nombre ? (<Form.Text className="text-danger">{formik.errors.nombre}</Form.Text>) : null}
                </Form.Group>
                <Form.Group className="mb-3" controlId="selectCategoria">
                    <Form.Label>Categoria de producto: *</Form.Label>
                    <Form.Select aria-label="Default select example"
                        {...formik.getFieldProps('idCategoriaProducto')}>
                        <option value="-1">Seleccione una categoria</option>
                        {listaCategorias.map((categoria, index) => {
                            return (
                                <option key={`${categoria.nombre}-${index}`} value={categoria.idTipoCategoriaProducto}>{categoria.nombre}</option>
                            )
                        })}
                    </Form.Select>
                    {formik.touched.idCategoriaProducto && formik.errors.idCategoriaProducto ? (<Form.Text className="text-danger">{formik.errors.idCategoriaProducto}</Form.Text>) : null}
                </Form.Group>
                <Form.Group className="mb-3" controlId="cantidadStok">
                    <Form.Label>Cantidad en inventario: *</Form.Label>
                    <Form.Control type="number" placeholder="10"
                        {...formik.getFieldProps('stock')} />
                    {formik.touched.stock && formik.errors.stock ? (<Form.Text className="text-danger">{formik.errors.stock}</Form.Text>) : null}
                </Form.Group>
                <Form.Group className="mb-3" controlId="precioCompra">
                    <Form.Label>Precio compra (valor pagado): *</Form.Label>
                    <Form.Control type="number" placeholder="1000"
                        {...formik.getFieldProps('precioCompra')} />
                    {formik.touched.precioCompra && formik.errors.precioCompra ? (<Form.Text className="text-danger">{formik.errors.precioCompra}</Form.Text>) : null}
                </Form.Group>
                <Form.Group className="mb-3" controlId="precioVenta">
                    <Form.Label>Precio venta (valor a vender): *</Form.Label>
                    <Form.Control type="number" placeholder="1000"
                        {...formik.getFieldProps('precioVenta')} />
                    {formik.touched.precioVenta && formik.errors.precioVenta ? (<Form.Text className="text-danger">{formik.errors.precioVenta}</Form.Text>) : null}
                </Form.Group>
                <Form.Check
                    type="switch"
                    id="activo"
                    label="Activo (Se vende)"
                    checked={isActivoProducto}
                    onChange={() => setIsActivoProducto(!isActivoProducto)}
                />
                <Col className="mt-4 d-flex justify-content-end">
                    <Row>
                        <Col>
                            <Button variant="outline-danger" onClick={cancelarRegistro}>Cancelar</Button>
                        </Col>
                        <Col>
                            <Button variant="primary" type='submit' disabled={!formik.isValid}>Registrar</Button>
                        </Col>
                    </Row>
                </Col>
            </Form>
        </Container>
    );
}

export default RegistrarProductoView;