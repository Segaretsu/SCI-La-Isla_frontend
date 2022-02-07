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
    const productos = compra?.productos;

    if (pagos.length <= 0) {
        errors.pagos = 'Se debe registrar por lo menos UN pago';
        return;
    } else if (pagos.some(pago => pago.idTipoFormaPago != 1
        && pago.numeroComprobante == '')) {
        errors.pagos = 'Para los pagos no realizados en efectivo se debe registrar el comprobante de pago';
        return;
    }
    const sumaPagos = pagos.map(pago => parseInt(pago.valor)).reduce((suma, valor) => suma += valor);
    const sumaProductos = (productos.length > 0) && productos.map(producto => parseInt(producto.valorTotal)).reduce((total, valor) => total += valor) || 0;
    console.log({ sumaPagos, sumaProductos });
    if (sumaPagos < sumaProductos) {
        errors.pagos = 'La suma de los pagos es inferior al importe total de la compra';
    }
}

function validarProductos(errors, compra) {
    const productos = compra.productos;
    if (productos.length <= 0) {
        errors.productos = 'Se debe registrar por lo menos UN producto';
    }
}

export default CompraValidator;