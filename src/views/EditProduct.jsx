import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateProduct, fetchProducts } from '../features/products/productsSlice';
import ProductForm from '../components/ProductForm';
import { useEffect } from 'react';

// EditProduct.jsx
// Componente que permite editar un producto existente. Utiliza el componente ProductForm.
// Si el producto no existe, muestra un mensaje de error. Al enviar el formulario, actualiza el producto y redirige al home.
// Botones: los del formulario ProductForm.

const Edit = () => {
  const dispatch = useDispatch(); // Hook para despachar acciones de Redux
  const navigate = useNavigate(); // Hook para navegar entre rutas
  const { id } = useParams(); // Obtiene el ID del producto desde los parámetros de la URL
  const { items, loading } = useSelector(state => state.products); // Obtiene los productos y el estado de carga desde Redux

  // Efecto que se ejecuta al montar el componente para cargar los productos si no hay ninguno
  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts()); // Despacha la acción para obtener los productos
    }
  }, [dispatch, items.length]);

  // Función que maneja el envío del formulario de edición
  const handleSubmit = (producto) => {
    dispatch(updateProduct({ id: producto.id, data: producto })); // Despacha la acción para actualizar el producto
    navigate('/'); // Redirige al home después de la actualización
  };

  // Muestra un mensaje de carga mientras se obtienen los productos
  if (loading) {
    return <div className="p-8 text-center text-lg">Cargando producto...</div>;
  }

  // Busca el producto existente por ID
  const productoExistente = items.find(p => p.id === parseInt(id));
  // Si no existe el producto, muestra un mensaje de error
  if (!productoExistente) {
    return <div className="p-8 text-center text-red-600">Producto no encontrado.</div>;
  }

  // Renderiza el formulario de producto y pasa la función de manejo de envío
  return <ProductForm onSubmit={handleSubmit} />;
};

export default Edit; // Exporta el componente para ser utilizado en otras partes de la aplicación
