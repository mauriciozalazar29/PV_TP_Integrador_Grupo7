import { useState } from 'react'; // Importa el hook useState para manejar el estado del componente
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate para la navegación
import { FaEye, FaEyeSlash, FaUser  } from 'react-icons/fa'; // Importa iconos de react-icons
import { MdEmail, MdLock, MdLockOutline } from 'react-icons/md'; // Importa iconos de react-icons

// Register.jsx
// Vista de registro de usuario. Permite crear una cuenta nueva.
// Botones: mostrar/ocultar contraseña, enviar formulario (registrar usuario).
// Valida email, contraseñas y nombre. Si es exitoso, muestra mensaje y redirige.

const Register = () => {
  const navigate = useNavigate(); // Hook para redirigir a otra ruta
  const [form, setForm] = useState({ // Estado para almacenar los datos del formulario
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [error, setError] = useState(''); // Estado para manejar mensajes de error
  const [success, setSuccess] = useState(''); // Estado para manejar mensajes de éxito
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Estado para mostrar/ocultar la confirmación de contraseña
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para manejar el estado de envío del formulario

  // Función para validar el formato del correo electrónico
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value })); // Actualiza el estado del formulario
    setError(''); // Resetea el mensaje de error
    setSuccess(''); // Resetea el mensaje de éxito
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    setIsSubmitting(true); // Cambia el estado a "enviando"

    const { email, password, confirmPassword, name } = form; // Desestructura los valores del formulario

    // Validaciones
    if (!validateEmail(email)) {
      setError('El correo electrónico no tiene un formato válido.'); // Mensaje de error si el email es inválido
      setIsSubmitting(false); // Cambia el estado a "no enviando"
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.'); // Mensaje de error si la contraseña es demasiado corta
      setIsSubmitting(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.'); // Mensaje de error si las contraseñas no coinciden
      setIsSubmitting(false);
      return;
    }

    // Simular una pequeña demora para mejor UX
    await new Promise(resolve => setTimeout(resolve, 500));

    const users = JSON.parse(localStorage.getItem('users')) || []; // Obtiene la lista de usuarios del localStorage

    if (users.find(u => u.email === email)) {
      setError('Este correo ya está registrado.'); // Mensaje de error si el correo ya está registrado
      setIsSubmitting(false);
      return;
    }

    const newUser  = { email, password, name }; // Crea un nuevo objeto de usuario
    users.push(newUser ); // Agrega el nuevo usuario a la lista
    localStorage.setItem('users', JSON.stringify(users)); // Guarda la lista actualizada en el localStorage

    setSuccess('Registro exitoso. Redirigiendo al login...'); // Mensaje de éxito
    setTimeout(() => navigate('/login'), 2000); // Redirige a la página de login después de 2 segundos
    setIsSubmitting(false); // Cambia el estado a "no enviando"
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Crear una cuenta
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Completa el formulario para registrarte
          </p>
        </div>

        {/* Muestra mensaje de error si existe */}
        {error && (
          <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}

        {/* Muestra mensaje de éxito si existe */}
        {success && (
          <div className="rounded-md bg-green-50 dark:bg-green-900/20 p-4">
            <p className="text-sm text-green-700 dark:text-green-300">{success}</p>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            {/* Campo para el nombre */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nombre (opcional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser  className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
                  placeholder="Tu nombre"
                />
              </div>
            </div>

            {/* Campo para el correo electrónico */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Correo electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdEmail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
                  placeholder="tucorreo@ejemplo.com"
                />
              </div>
            </div>

            {/* Campo para la contraseña */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdLockOutline className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"} // Cambia el tipo según el estado de mostrar/ocultar
                  autoComplete="new-password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)} // Cambia el estado al hacer clic
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                  )}
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Mínimo 6 caracteres
              </p>
            </div>

            {/* Campo para confirmar la contraseña */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Confirmar contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"} // Cambia el tipo según el estado de mostrar/ocultar
                  autoComplete="new-password"
                  required
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Cambia el estado al hacer clic
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Botón para enviar el formulario */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting} // Desactiva el botón mientras se está enviando
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? ( // Muestra un spinner si se está enviando
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Registrando...
                </span>
              ) : (
                <span>Registrarse</span> // Texto del botón cuando no se está enviando
              )}
            </button>
          </div>
        </form>

        {/* Enlace para iniciar sesión si ya tiene cuenta */}
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          ¿Ya tienes una cuenta?{' '}
          <a href="/login" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
            Iniciar sesión
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register; // Exporta el componente para que pueda ser utilizado en otras partes de la aplicación
