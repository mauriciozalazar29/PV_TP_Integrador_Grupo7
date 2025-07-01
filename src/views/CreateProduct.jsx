import { useDispatch } from 'react-redux'; // Importa para despachar acciones de Redux
import { addProduct } from '../features/products/productsSlice'; // Importa el creador de acciones
import ProductForm from '../components/ProductForm'; // Importa el componente del formulario de producto

// CreateProduct.jsx
// Componente que permite crear un nuevo producto. Utiliza el componente ProductForm.
// Al enviar el formulario, agrega el producto al store de Redux.
// Botones: los del formulario ProductForm.

const CreateProduct = () => {
  const dispatch = useDispatch(); // Inicializa la función dispatch

  // Función manejadora que se llamará cuando se envíe el formulario
  const handleCreate = (nuevoProducto) => {
    dispatch(addProduct(nuevoProducto)); // Despacha la acción addProduct con los datos del nuevo producto
  };

  // Renderiza el componente ProductForm y pasa nuestra función manejadora como prop onSubmit
  return <ProductForm onSubmit={handleCreate} />;
};

export default CreateProduct; // Exporta el componente
