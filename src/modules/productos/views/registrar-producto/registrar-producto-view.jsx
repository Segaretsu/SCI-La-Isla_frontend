import { Container, Form } from "react-bootstrap";

const RegistrarProductoView = () => {
    return (
        <Container>
            <h1>Registrar producto</h1>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Nombre producto:</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label htmlFor='selectCategoria'>Categoria de producto:</Form.Label>
                    <Form.Select id="selectCategoria" aria-label="Default select example">
                        <option value="-1">Seleccione una categoria</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Cantidad en inventario:</Form.Label>
                    <Form.Control type="number" placeholder="10" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Precio compra (valor pagado):</Form.Label>
                    <Form.Control type="number" placeholder="1000" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Precio venta (valor a vender):</Form.Label>
                    <Form.Control type="number" placeholder="1000" />
                </Form.Group>
                <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Activo (Se vende)"
                />
            </Form>
        </Container>
    );
}

export default RegistrarProductoView;