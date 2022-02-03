const CompraValidator = {
    validate,
}

function validate(compra) {
    const errors = {};
    validarPagos(errors, compra);
    validarProductos(errors, compra);
    return errors;
}

function validarPagos(errors, compra) {
    const pagos = compra?.pagos;
    if (pagos.length <= 0) {
        errors.pagos = 'Se debe registrar por lo menos UN pago';
    } else if (pagos.some(pago => pago.idTipoFormaPago != 1
        && pago.numeroComprobante == '')) {
        errors.pagos = 'Para los pagos no realizados en efectivo se debe registrar el comprobante de pago';
    }
}

function validarProductos(errors, compra) {
    const productos = compra.productos;
    if (productos.length <= 0) {
        errors.productos = 'Se debe registrar por lo menos UN producto';
    }
}

export default CompraValidator;