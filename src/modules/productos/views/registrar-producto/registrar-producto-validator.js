import { useFormik } from 'formik';
import * as Yup from 'yup';

const TREINTA_CARACTERES = 999999999999999999999999999999;

const productoSchema = Yup.object().shape({
    'nombre': Yup.string().trim()
        .max(60, 'Máximo 60 caracteres')
        .required('Este campo es obligatorio'),
    'idCategoriaProducto': Yup.number()
        .moreThan(0, 'Seleccione una categoría valida para el producto')
        .required('Este campo es obligatorio'),
    'stock': Yup.number()
        .max(TREINTA_CARACTERES, 'Máximo 30 caracteres')
        .required('Este campo es obligatorio'),
    'precioCompra': Yup.number()
        .max(TREINTA_CARACTERES, 'Máximo 10 caracteres')
        .required('Este campo es obligatorio'),
    'precioVenta': Yup.number()
        .max(TREINTA_CARACTERES, 'Máximo 30 caracteres')
        .required('Este campo es obligatorio'),
});

const ProductoValidator = {
    getFormik,
    productoSchema,
    validate,
}

function getFormik(onSubmit, initialValues = {
    nombre: '',
    stock: '',
    precioCompra: '',
    precioVenta: '',
}) {
    return useFormik({
        initialValues: initialValues,
        validationSchema: productoSchema,
        onSubmit,
    });
}

function validate(producto) {
    const errors = {};
    return errors;
}

export default ProductoValidator;