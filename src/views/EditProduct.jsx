import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateProduct } from '../features/products/productsSlice';
import ProductForm from '../components/ProductForm';

const Edit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (producto) => {
    dispatch(updateProduct({ id: producto.id, data: producto }));
    navigate('/');
  };

  return <ProductForm onSubmit={handleSubmit} />;
};

export default Edit;