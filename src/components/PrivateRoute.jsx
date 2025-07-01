import { useSelector } from 'react-redux'; // Hook para acceder al estado de Redux
import { Navigate } from 'react-router-dom'; // Componente para la navegación programática


// PrivateRoute.jsx
// Componente para proteger rutas privadas. Si no hay usuario autenticado, redirige a /login.
// Props:
// - children: Componentes hijos que se renderizarán si el usuario está autenticado

const PrivateRoute = ({ children }) => {
  // Obtiene el usuario del estado de autenticación de Redux
  const user = useSelector(state => state.auth.user);
  
  /**
   * Lógica de protección de ruta:
   * - Si existe usuario (autenticado) → Renderiza los componentes hijos
   * - Si no hay usuario (no autenticado) → Redirige a la página de login
   */
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute; // Exporta el componente como default
