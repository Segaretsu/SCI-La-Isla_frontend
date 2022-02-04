import axios from "axios";
import { API_ENDPOINT } from '@config';

const CompraClienteServices = {
    actualizarCompra,
    eliminarCompra,
    getAllTipoFormaPago,
    getCompraByIdCompra,
    getResumenCompras,
    registrarCompra,
}

function actualizarCompra(data, success, error = (err) => console.error(err)) {
    const URI = [API_ENDPOINT, '/compra-cliente/actualizar-compra/', data.idCompra].join('');
    axios.put(URI, data)
        .then(success)
        .catch(error);
}

function eliminarCompra(idCompra, success, error = (err) => console.error(err)) {
    const URI = [API_ENDPOINT, '/compra-cliente/eliminar-compra/', idCompra].join('');
    axios.delete(URI)
        .then(success)
        .catch(error);
}

function getAllTipoFormaPago(success, error = (err) => console.error(err)) {
    const URI = [API_ENDPOINT, '/forma-pago/find-all'].join('');
    axios.get(URI)
        .then(success)
        .catch(error);
}
/**
 * Retorna una promesa
 * @param {Number} idCompra identificador de la compra.
 */
async function getCompraByIdCompra(idCompra) {
    const URI = [API_ENDPOINT, '/compra-cliente/', idCompra].join('');
    return axios.get(URI);
}

function getResumenCompras(data, success, error = (err) => console.error(err)) {
    const URI = [API_ENDPOINT, '/compra-cliente/resumen-compras'].join('');
    axios.post(URI, data)
        .then(success)
        .catch(error);
}

function registrarCompra(data, success, error = (err) => console.error(err)) {
    const URI = [API_ENDPOINT, '/compra-cliente/registrar'].join('');
    axios.post(URI, data)
        .then(success)
        .catch(error);
}

export default CompraClienteServices;