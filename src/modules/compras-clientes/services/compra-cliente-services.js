import axios from "axios";
import { API_ENDPOINT } from '@config';

const CompraClienteServices = {
    getAllTipoFormaPago,
}

function getAllTipoFormaPago(success, error = (err) => console.error(err)) {
    const URI = [API_ENDPOINT, '/forma-pago/find-all'].join('');
    axios.get(URI)
        .then(success)
        .catch(error);
}

export default CompraClienteServices;