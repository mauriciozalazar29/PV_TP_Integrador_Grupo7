import { useDispatch } from 'react-redux';
import { addProduct } from '../features/products/productsSlice';
import ProductForm from '../components/ProductForm';

const CreateProduct = () => {
  const dispatch = useDispatch();

  const handleCreate = (nuevoProducto) => {
    dispatch(addProduct(nuevoProducto));
  };

  return <ProductForm onSubmit={handleCreate} />;
};

export default CreateProduct;