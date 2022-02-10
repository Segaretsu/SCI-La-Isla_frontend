import { APP_NAME } from '@config';
import React, { useState } from 'react';
import { Container, Form, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import Link from 'next/link';
import UTILS from '@core/utils/utils';
import { useEffect } from 'react';

const Menu = () => {

    const darkThemeClass = 'dark-theme';

    const [darkTheme, setDarkTheme] = useState(true);

    useEffect(() => {
        let mounted = true;
        if (mounted) {

            const isDarkThemeOn = localStorage.getItem('selected-theme') === 'dark';
            if (isDarkThemeOn) {
                document.body.classList['add'](darkThemeClass);
            } else {
                setDarkTheme(false);
            }
        }
        return () => mounted = false;
    }, [])

    const changeTheme = () => {
        UTILS.toggleNightTheme();
        setDarkTheme(!darkTheme);
    }

    return (
        <Navbar variant={(darkTheme) && 'dark' || 'light'} bg={(darkTheme) && 'dark' || 'light'} expand={false}>
            <Container fluid>
                <Navbar.Brand href="/">{APP_NAME}</Navbar.Brand>
                <Navbar.Toggle aria-controls="offcanvasNavbar" />
                <Navbar.Offcanvas
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel">Menú</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Link><Link href='/'>Inicio</Link></Nav.Link>
                            <Nav.Link><Link href='/compra-cliente-sitio'>Compra en sitio</Link></Nav.Link>
                            <Nav.Link><Link href='/compras/resumen-compras'>Resumen de compras</Link></Nav.Link>
                        </Nav>
                        <Form.Check
                            type="switch"
                            id="toggleModoOscuro"
                            label="Modo oscuro"
                            checked={darkTheme}
                            onClick={changeTheme}
                        />
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}

export default Menu;