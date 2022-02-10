import { LOCALE } from "@config";

const UTILS = {
    formatoMoneda,
    getClienteAnonimo,
    getEmpleadoAnonimo,
    toggleNightTheme,
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


/** Night theme */
function toggleNightTheme() {
    const darkTheme = 'dark-theme';
    // Previously selected topic
    const selectedTheme = localStorage.getItem('selected-theme');
    // We obtain the current theme that the interface has by validating the dark-theme class
    const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
    // We validate if the user previously chose a topic
    if (selectedTheme) {
        document.body.classList[(selectedTheme === 'dark') ? 'add' : 'remove'](darkTheme);
    }
    // Active / deactivate the theme manually with the button
    document.body.classList.toggle(darkTheme);
    localStorage.setItem('selected-theme', getCurrentTheme());
    console.log({ darkTheme, selectedTheme, })
}

export default UTILS;