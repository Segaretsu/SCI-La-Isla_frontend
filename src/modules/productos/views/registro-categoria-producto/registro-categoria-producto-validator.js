import { useFormik } from 'formik';
import * as Yup from 'yup';

const categoriaSchema = Yup.object().shape({
    'nombre': Yup.string().trim()
        .max(30, 'Máximo 30 caracteres')
        .required('Este campo es obligatorio'),
});

const CategoriaValidator = {
    getFormik,
    categoriaSchema
}

function getFormik(onSubmit, initialValues = {
    nombre: '',
}) {
    return useFormik({
        initialValues: initialValues,
        validationSchema: categoriaSchema,
        onSubmit,
    });
}

export default CategoriaValidator;