import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import CategoriaValidator from "./registro-categoria-producto-validator";
import CategoriaServices from "@productos/services/categorias.services";
import { Activo } from "@commons/utils/constantes";


const RegistroCategoriaProductoView = () => {

    const [isActivoCategoria, setIsActivoCategoria] = useState(true);

    const router = useRouter();

    const registrarCategoria = (values) => {
        const categoria = {
            ...values,
            activo: (isActivoCategoria) ? Activo.SI : Activo.NO,
        };
        console.log({ categoria })
        CategoriaServices.registrarCategoriaProducto(categoria, (response) => {
            if (response.status == 200 || response.status == 201) {
                alert('¡Categoria registrado con éxito!');
                router.push('/');
            }
        });
    }

    const formik = CategoriaValidator.getFormik(registrarCategoria);

    const cancelarRegistro = () => {
        router.back();
    }

    return (
        <Container className='mt-5 min-vh-100'>
            <h1>Registrar categoria de productos</h1>
            <Form onSubmit={formik.handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="nombre">
                            <Form.Label>Nombre categoria: *</Form.Label>
                            <Form.Control type="text" placeholder="Hilo rojo x1 metro"
                                {...formik.getFieldProps('nombre')} />
                            {formik.touched.nombre && formik.errors.nombre ? (<Form.Text className="text-danger">{formik.errors.nombre}</Form.Text>) : null}
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="activo">
                            <Form.Label>Categoria activa: *</Form.Label>
                            <Form.Check
                                type="switch"
                                label="Activo"
                                checked={isActivoCategoria}
                                onChange={() => setIsActivoCategoria(!isActivoCategoria)}
                            />
                        </Form.Group>

                    </Col>
                </Row>
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
    )
}

export default RegistroCategoriaProductoView;