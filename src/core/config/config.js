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
})

const prodConf = Object.freeze({
    // Información principal
    APP_NAME: 'La Isla S.A.S',
    // API
    API_ENDPOINT: 'http://localhost:8001',
    // URL de la app desplegada:
    URL_APP: 'http://localhost:4200',
    URL_COMERCIAL: 'http://localhost:4200',
    // Otras configuraciones
    LOCALE: "es-CO",
});


module.exports = (process.env.NODE_ENV === 'development') ? devConf : prodConf