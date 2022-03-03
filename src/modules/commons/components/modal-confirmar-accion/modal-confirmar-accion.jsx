import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const ModalConfirmarAccion = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant={props.variant} onClick={handleShow}>
                {props.buttonMessage}
            </Button>

            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{props.accion}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Realmente desea ejecutar la acción de <strong>{props.accion}</strong>?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={props.onClickExito}>Confirmar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalConfirmarAccion;