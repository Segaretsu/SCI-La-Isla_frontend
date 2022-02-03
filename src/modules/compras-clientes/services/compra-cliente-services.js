import axios from "axios";
import { API_ENDPOINT } from '@config';

const CompraClienteServices = {
    getAllTipoFormaPago,
    registrarCompra,
}

function getAllTipoFormaPago(success, error = (err) => console.error(err)) {
    const URI = [API_ENDPOINT, '/forma-pago/find-all'].join('');
    axios.get(URI)
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