import RegistrarProductoView from '@productos/views/registrar-producto/registrar-producto-view';
import MainLayout from 'src/layouts/main-layout';


const RegistrarProductoPage = () => {
    return (
        <MainLayout>
            <RegistrarProductoView />
        </MainLayout>
    );
}

export default RegistrarProductoPage;