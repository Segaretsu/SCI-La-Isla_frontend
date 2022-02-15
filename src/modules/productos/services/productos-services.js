import axios from 'axios';
import config from '@config';

const ProductosServices = {
    getAllProductos,
    getAllTipoCategoriaProducto,
    registrarProducto,
}

function getAllTipoCategoriaProducto(success, error = (err) => console.error(err)) {
    const URI = [config.API_ENDPOINT, '/categoria-producto/find-all'].join('');
    axios.get(URI)
        .then(success)
        .catch(error);
}

function getAllProductos(success, error = (err) => console.error(err)) {
    const URI = [config.API_ENDPOINT, '/productos/find-all'].join('');
    axios.get(URI)
        .then(success)
        .catch(error);
}

function registrarProducto(params, success, error = (err) => console.error(err)) {
    const URI = [config.API_ENDPOINT, '/productos/registrar'].join('');
    axios.post(URI, params)
        .then(success)
        .catch(error);
}

export default ProductosServices;