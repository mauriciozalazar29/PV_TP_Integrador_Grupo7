import { useDispatch, useSelector } from 'react-redux'; // Importa hooks de Redux para despachar acciones y seleccionar estado
import { useNavigate, useParams } from 'react-router-dom'; // Importa hooks para la navegación y obtener parámetros de la URL
import { updateProduct, fetchProducts } from '../features/products/productsSlice'; // Importa las acciones del slice de productos
import ProductForm from '../components/ProductForm'; // Importa el componente del formulario de producto
import { useEffect } from 'react'; // Importa useEffect para manejar efectos secundarios

// EditProduct.jsx
// Componente que permite editar un producto existente. Utiliza el componente ProductForm.
// Si el producto no existe, muestra un mensaje de error. Al enviar el formulario, actualiza el producto y redirige al home.
// Botones: los del formulario ProductForm.

const Edit = () => {
  const dispatch = useDispatch(); // Inicializa la función dispatch
  const navigate = useNavigate(); // Inicializa la función de navegación
  const { id } = useParams(); // Obtiene el ID del producto desde los parámetros de la URL
  const { items, loading } = useSelector(state => state.products); // Selecciona el estado de productos desde Redux

  // Efecto para cargar productos si la lista está vacía
  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts()); // Despacha la acción para obtener productos
    }
  }, [dispatch, items.length]); // Se ejecuta cuando cambia el dispatch o la longitud de items

  // Función manejadora para el envío del formulario
  const handleSubmit = (producto) => {
    dispatch(updateProduct({ id: producto.id, data: producto })); // Despacha la acción para actualizar el producto
    navigate('/'); // Redirige a la página principal después de la actualización
  };

  // Muestra un mensaje de carga mientras se obtienen los productos
  if (loading) {
    return <div className="p-8 text-center text-lg">Cargando producto...</div>;
  }

  // Verifica si el producto existe en la lista
  const productoExistente = items.find(p => p.id === parseInt(id));
  if (!productoExistente) {
    return <div className="p-8 text-center text-red-600">Producto no encontrado.</div>; // Muestra un mensaje de error si no se encuentra el producto
  }

  // Renderiza el formulario de producto y pasa la función manejadora
  return <ProductForm onSubmit={handleSubmit} />;
};

export default Edit; // Exporta el componente Edit
