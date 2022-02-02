import { LOCALE } from "@config";

const UTILS = {
    formatoMoneda,
}

function formatoMoneda(valor) {
    if (isNaN(parseFloat(valor))) {
        return valor;
    }
    return `$ ${new Intl.NumberFormat(LOCALE).format(valor)} COP`;
}

export default UTILS;