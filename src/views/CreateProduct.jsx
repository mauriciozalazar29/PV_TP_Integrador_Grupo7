import ProductForm from '../components/ProductForm';
import { useDispatch } from 'react-redux';
import { addProduct } from '../features/products/productsSlice';

const CreateProduct = () => {
  const dispatch = useDispatch();

  const handleCreate = (producto) => {
    dispatch(addProduct(producto));
  };

  return <ProductForm onSubmit={handleCreate} />;
};

export default CreateProduct;
