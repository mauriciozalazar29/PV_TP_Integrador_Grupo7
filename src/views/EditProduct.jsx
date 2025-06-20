import ProductForm from '../components/ProductForm';
import { useDispatch } from 'react-redux';
import { editProduct } from '../features/products/productsSlice';

const EditProduct = () => {
  const dispatch = useDispatch();

  const handleEdit = (producto) => {
    dispatch(editProduct(producto));
  };

  return <ProductForm onSubmit={handleEdit} />;
};

export default EditProduct;
