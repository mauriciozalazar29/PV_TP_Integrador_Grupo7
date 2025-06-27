import { useSelector } from 'react-redux'; // Importa el hook useSelector de Redux
import { Navigate } from 'react-router-dom'; // Importa el componente Navigate para redireccionar

// PrivateRoute.jsx
// Componente para proteger rutas privadas. Si no hay usuario autenticado, redirige a /login.
// Props:
// - children: Componentes hijos que se renderizarán si el usuario está autenticado

const PrivateRoute = ({ children }) => {
  // Obtiene el usuario del estado de autenticación de Redux
  const user = useSelector(state => state.auth.user);
  
  // Si hay usuario autenticado, renderiza los componentes hijos
  // Si no hay usuario, redirige a la página de login
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute; // Exporta el componente para su uso en otras partes de la aplicación
