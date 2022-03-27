import axios from 'axios';
import config from '@config';

const CategoriaServices = {
    registrarCategoriaProducto,
}


function registrarCategoriaProducto(params, success, error = (err) => console.error(err)) {
    const URI = [config.API_ENDPOINT, '/categoria-producto/registrar'].join('');
    axios.post(URI, params)
        .then(success)
        .catch(error);
}

export default CategoriaServices;