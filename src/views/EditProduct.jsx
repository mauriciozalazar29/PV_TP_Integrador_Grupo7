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

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
};

export default Edit;
