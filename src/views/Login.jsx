// Login.jsx
// Componente de vista de inicio de sesión. Permite al usuario ingresar su correo electrónico y contraseña.
// Botones: mostrar/ocultar contraseña, enviar formulario (iniciar sesión).
// Si el inicio de sesión es exitoso, navega al home. Si falla, muestra un mensaje de error.

import { useState } from 'react'; // Importa useState para manejar el estado local
import { useDispatch, useSelector } from 'react-redux'; // Importa hooks de Redux para despachar acciones y seleccionar estado
import { loginFailure, loginSuccess } from '../features/auth/authSlice'; // Importa acciones para manejar el estado de autenticación
import { useNavigate } from 'react-router-dom'; // Importa el hook para la navegación
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importa iconos para mostrar/ocultar la contraseña
import { toast } from 'react-toastify'; // Importa la librería para mostrar notificaciones

const Login = () => {
  const dispatch = useDispatch(); // Inicializa la función dispatch
  const navigate = useNavigate(); // Inicializa la función de navegación
  const authError = useSelector(state => state.auth.error); // Obtiene el error de autenticación desde el estado de Redux
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para manejar el estado de envío del formulario

  // Estado para manejar el formulario de inicio de sesión
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  // Maneja el cambio en los campos del formulario
  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value })); // Actualiza el estado del formulario
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    setIsSubmitting(true); // Marca el inicio del envío

    // Simular una pequeña demora para mejor UX
    await new Promise(resolve => setTimeout(resolve, 500)); // Simula un retraso de 500 ms

    // Obtiene los usuarios almacenados en localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    // Busca el usuario que coincida con el correo y la contraseña ingresados
    const user = users.find(u => u.email === form.email && u.password === form.password);

    if (user) {
      dispatch(loginSuccess({ email: user.email })); // Despacha la acción de inicio de sesión exitoso
      toast.success('¡Inicio de sesión exitoso!'); // Muestra una notificación de éxito
      navigate('/'); // Redirige a la página principal
    } else {
      dispatch(loginFailure('Credenciales inválidas')); // Despacha la acción de fallo en el inicio de sesión
      toast.error('Credenciales inválidas'); // Muestra una notificación de error
    }
    
    setIsSubmitting(false); // Marca el fin del envío
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Iniciar Sesión
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Ingresa tus credenciales para acceder
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={handleChange} // Maneja el cambio en el campo de correo
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
                placeholder="tucorreo@ejemplo.com"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"} // Cambia el tipo de input según el estado de showPassword
                  autoComplete="current-password"
                  required
                  value={form.password}
                  onChange={handleChange} // Maneja el cambio en el campo de contraseña
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)} // Cambia el estado de showPassword al hacer clic
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Recordarme
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting} // Desactiva el botón mientras se está enviando
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Procesando...
                </span>
              ) : (
                <span>Ingresar</span>
              )}
            </button>
          </div>
        </form>
        
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          ¿No tienes una cuenta?{' '}
          <a href="/register" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
            Regístrate
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login; // Exporta el componente Login
