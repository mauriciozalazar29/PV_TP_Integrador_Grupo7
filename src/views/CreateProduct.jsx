import { useDispatch } from 'react-redux';
import { addProduct } from '../features/products/productsSlice';
import ProductForm from '../components/ProductForm';

// CreateProduct.jsx
// Componente que permite crear un nuevo producto. Utiliza el componente ProductForm.
// Al enviar el formulario, agrega el producto al store de Redux.
// Botones: los del formulario ProductForm.

const CreateProduct = () => {
  const dispatch = useDispatch(); // Hook para despachar acciones de Redux

  // Función que maneja la creación de un nuevo producto
  const handleCreate = (nuevoProducto) => {
    dispatch(addProduct(nuevoProducto)); // Despacha la acción para agregar el nuevo producto al store
  };

  return <ProductForm onSubmit={handleCreate} />; // Renderiza el formulario de producto y pasa la función de manejo de envío
};

export default CreateProduct; // Exporta el componente para ser utilizado en otras partes de la aplicación
