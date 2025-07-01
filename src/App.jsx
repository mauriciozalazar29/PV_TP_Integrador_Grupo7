// App.jsx
// Componente principal de la app. Define las rutas y el layout general (NavBar, Footer, main).
// Usa PrivateRoute para proteger rutas privadas.

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importa componentes de enrutamiento
import { ToastContainer } from 'react-toastify'; // Importa el contenedor para notificaciones
import PrivateRoute from './components/PrivateRoute'; // Importa el componente para rutas privadas
import Home from './views/Home'; // Importa la vista de inicio
import Favorites from './views/Favorites'; // Importa la vista de favoritos
import ProductDetail from './views/ProductDetail'; // Importa la vista de detalles del producto
import NavBar from './components/NavBar'; // Importa la barra de navegación
import Footer from './components/Footer'; // Importa el pie de página
import Cart from './views/Cart'; // Importa la vista del carrito
import Create from './views/CreateProduct'; // Importa la vista para crear un producto
import Edit from './views/EditProduct'; // Importa la vista para editar un producto
import Checkout from './views/Checkout'; // Importa la vista de pago
import Success from './views/Success'; // Importa la vista de éxito
import Register from './views/Register'; // Importa la vista de registro
import Login from './views/Login'; // Importa la vista de inicio de sesión
import 'react-toastify/dist/ReactToastify.css'; // Importa estilos para las notificaciones

const App = () => {
  return (
    <Router> {/* Configura el enrutador */}
      <NavBar /> {/* Renderiza la barra de navegación */}
      <main className="pt-1 min-h-screen"> {/* Contenedor principal con padding y altura mínima */}
        <Routes> {/* Define las rutas de la aplicación */}
          <Route path="/register" element={<Register />} /> {/* Ruta para el registro */}
          <Route path="/login" element={<Login />} /> {/* Ruta para el inicio de sesión */}
          <Route path='/' element={
            <PrivateRoute> {/* Ruta privada para la página de inicio */}
              <Home />
            </PrivateRoute>
          } />
          <Route path="/favorites" element={
            <PrivateRoute> {/* Ruta privada para la página de favoritos */}
              <Favorites />
            </PrivateRoute>
          } />
          <Route path="/detail/:id" element={
            <PrivateRoute> {/* Ruta privada para los detalles del producto */}
              <ProductDetail />
            </PrivateRoute>
          } />
          <Route path="/cart" element={
            <PrivateRoute> {/* Ruta privada para el carrito */}
              <Cart />
            </PrivateRoute>
          } />
          <Route path="/create" element={
            <PrivateRoute> {/* Ruta privada para crear un producto */}
              <Create />
            </PrivateRoute>
          } />
          <Route path="/edit/:id" element={
            <PrivateRoute> {/* Ruta privada para editar un producto */}
              <Edit />
            </PrivateRoute>
          } />
          <Route path="/checkout" element={
            <PrivateRoute> {/* Ruta privada para el proceso de pago */}
              <Checkout />
            </PrivateRoute>
          } />
          <Route path="/success" element={
            <PrivateRoute> {/* Ruta privada para la página de éxito */}
              <Success />
            </PrivateRoute>
          } />
        </Routes>
      </main>
      <Footer /> {/* Renderiza el pie de página */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover /> {/* Configura el contenedor de notificaciones */}
    </Router>
  );
};

export default App; // Exporta el componente App
