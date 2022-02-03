import { LOCALE } from "@config";

const UTILS = {
    formatoMoneda,
    getClienteAnonimo,
    getEmpleadoAnonimo,
}

function formatoMoneda(valor) {
    if (isNaN(parseFloat(valor))) {
        return valor;
    }
    return `$ ${new Intl.NumberFormat(LOCALE).format(valor)} COP`;
}

function getClienteAnonimo() {
    return {
        'idTipoDocumento': 1,
        'numeroDocumento': 'N000000000',
    };
}

function getEmpleadoAnonimo() {
    return {
        'idTipoDocumento': 1,
        'numeroDocumento': 'N000000000',
    };
}

export default UTILS;