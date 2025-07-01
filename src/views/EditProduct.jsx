import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateProduct, fetchProducts } from '../features/products/productsSlice';
import ProductForm from '../components/ProductForm';
import { useEffect } from 'react';

const Edit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { items, loading } = useSelector(state => state.products);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length]);

  const handleSubmit = (producto) => {
    dispatch(updateProduct({ id: producto.id, data: producto }));
    navigate('/');
  };

  if (loading) {
    return <div className="p-8 text-center text-lg">Cargando producto...</div>;
  }

  // Si no existe el producto, mostrar mensaje de error
  const productoExistente = items.find(p => p.id === parseInt(id));
  if (!productoExistente) {
    return <div className="p-8 text-center text-red-600">Producto no encontrado.</div>;
  }

  return <ProductForm onSubmit={handleSubmit} />;
};

export default Edit;