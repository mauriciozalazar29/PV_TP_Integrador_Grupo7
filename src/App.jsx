// App.jsx
// Componente principal de la app. Define las rutas y el layout general (NavBar, Footer, main).
// Usa PrivateRoute para proteger rutas privadas.

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importa componentes de enrutamiento
import PrivateRoute from './components/PrivateRoute'; // Importa el componente para proteger rutas privadas
import Home from './views/Home'; // Importa la vista de inicio
import Favorites from './views/Favorites'; // Importa la vista de favoritos
import ProductDetail from './views/ProductDetail'; // Importa la vista de detalles del producto
import NavBar from './components/NavBar'; // Importa la barra de navegación
import Footer from './components/Footer'; // Importa el pie de página
import Cart from './views/Cart'; // Importa la vista del carrito
import Create from './views/CreateProduct'; // Importa la vista para crear un producto
import Edit from './views/EditProduct'; // Importa la vista para editar un producto
import Checkout from './views/Checkout'; // Importa la vista de checkout
import Success from './views/Success'; // Importa la vista de éxito
import Register from './views/Register'; // Importa la vista de registro
import Login from './views/Login'; // Importa la vista de inicio de sesión

const App = () => {
  return (
    <Router> {/* Configura el enrutador para la aplicación */}
      <NavBar /> {/* Renderiza la barra de navegación */}
      <main className="pt-1 min-h-screen"> {/* Contenedor principal de la aplicación */}
        <Routes> {/* Define las rutas de la aplicación */}
          <Route path="/register" element={<Register />} /> {/* Ruta para el registro */}
          <Route path="/login" element={<Login />} /> {/* Ruta para el inicio de sesión */}
          <Route path='/' element={
            <PrivateRoute> {/* Protege la ruta de inicio */}
              <Home /> {/* Renderiza la vista de inicio */}
            </PrivateRoute>
          } />
          <Route path="/favorites" element={
            <PrivateRoute> {/* Protege la ruta de favoritos */}
              <Favorites /> {/* Renderiza la vista de favoritos */}
            </PrivateRoute>
          } />
          <Route path="/detail/:id" element={
            <PrivateRoute> {/* Protege la ruta de detalles del producto */}
              <ProductDetail /> {/* Renderiza la vista de detalles del producto */}
            </PrivateRoute>
          } />
          <Route path="/cart" element={
            <PrivateRoute> {/* Protege la ruta del carrito */}
              <Cart /> {/* Renderiza la vista del carrito */}
            </PrivateRoute>
          } />
          <Route path="/create" element={
            <PrivateRoute> {/* Protege la ruta para crear un producto */}
              <Create /> {/* Renderiza la vista para crear un producto */}
            </PrivateRoute>
          } />
          <Route path="/edit/:id" element={
            <PrivateRoute> {/* Protege la ruta para editar un producto */}
              <Edit /> {/* Renderiza la vista para editar un producto */}
            </PrivateRoute>
          } />
          <Route path="/checkout" element={
            <PrivateRoute> {/* Protege la ruta de checkout */}
              <Checkout /> {/* Renderiza la vista de checkout */}
            </PrivateRoute>
          } />
          <Route path="/success" element={
            <PrivateRoute> {/* Protege la ruta de éxito */}
              <Success /> {/* Renderiza la vista de éxito */}
            </PrivateRoute>
          } />
        </Routes>
      </main>
      <Footer /> {/* Renderiza el pie de página */}
    </Router>
  );
};

export default App; // Exporta el componente para su uso en otras partes de la aplicación
