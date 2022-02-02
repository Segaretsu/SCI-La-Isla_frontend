import axios from 'axios';
import config from '@config';

const ProductosServices = {
    getAllProductos,
}

function getAllProductos(success, error = (err) => console.error(err)) {
    const URI = [config.API_ENDPOINT, '/productos/find-all'].join('');
    axios.get(URI)
        .then(success)
        .catch(error);
}

export default ProductosServices;