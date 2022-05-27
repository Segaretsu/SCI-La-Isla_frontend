const devConf = Object.freeze({
    // Información principal
    APP_NAME: 'La Isla S.A.S',
    // API
    API_ENDPOINT: 'http://localhost:8001',
    // URL de la app desplegada:
    URL_APP: 'http://localhost:4200',
    URL_COMERCIAL: 'http://localhost:4200',
    // Otras configuraciones
    LOCALE: "es-CO",
    FECHA: {
        FORMATO_FECHA: 'DD/MM/YYYY',
        FORMATO_TIME: 'DD/MM/YYYY HH:mm',
    },
    SEO: {
        AUTOR: 'jhonsebastianas.com',
        DESCRIPTION: `El almacén la isla es un almacén de variedades, donde se venden todo tipos de utilidades.`,
        KEYWORDS: `Inventario, control de ventas, ventas en sitio`,
        LARGE_TITLE: `La Isla: el almacén la isla es un almacén de variedades, donde se venden todo tipos de utilidades.`,
        SITE_NAME: 'La Isla',
        TITLE: 'La Isla',
        TYPE: 'website',
        URL: 'http://localhost:4200',
    },
})

const prodConf = Object.freeze({
    // Información principal
    APP_NAME: 'La Isla S.A.S',
    // API
    API_ENDPOINT: 'https://inventario-test-jsas.herokuapp.com',
    // URL de la app desplegada:
    URL_APP: 'https://inventario-jsas.vercel.app',
    URL_COMERCIAL: 'https://inventario-jsas.vercel.app',
    // Otras configuraciones
    LOCALE: "es-CO",
    FECHA: {
        FORMATO_FECHA: 'DD/MM/YYYY',
        FORMATO_TIME: 'DD/MM/YYYY HH:mm',
    },
    SEO: {
        AUTOR: 'jhonsebastianas.com',
        DESCRIPTION: `El almacén la isla es un almacén de variedades, donde se venden todo tipos de utilidades.`,
        KEYWORDS: `Inventario, control de ventas, ventas en sitio`,
        LARGE_TITLE: `La Isla: el almacén la isla es un almacén de variedades, donde se venden todo tipos de utilidades.`,
        SITE_NAME: 'La Isla',
        TITLE: 'La Isla',
        TYPE: 'website',
        URL: 'https://inventario-jsas.vercel.app',
    },
});


module.exports = (process.env.NODE_ENV === 'development') ? devConf : prodConf