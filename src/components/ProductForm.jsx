import { useState, useEffect } from 'react'; // Importa hooks de React para manejar el estado y efectos secundarios
import { useParams, useNavigate } from 'react-router-dom'; // Hooks para acceder a parámetros de la URL y navegación
import { useSelector } from 'react-redux'; // Hook para acceder al estado de Redux
import { FiSave, FiArrowLeft } from 'react-icons/fi'; // Iconos para guardar y volver atrás
import { toast } from 'react-toastify'; // Biblioteca para mostrar notificaciones

// Definición de categorías disponibles para los productos
const categoriasDisponibles = [
  { value: "men's clothing", label: "Ropa Masculina", icon: "👔" },
  { value: "women's clothing", label: "Ropa Femenina", icon: "👗" },
  { value: "electronics", label: "Electrónicos", icon: "📱" },
  { value: "jewelery", label: "Joyería", icon: "💎" }
];

 //Componente ProductForm que permite crear o editar un producto.

const ProductForm = ({ onSubmit }) => {
  const { id } = useParams(); // Obtiene el ID del producto de los parámetros de la URL
  const navigate = useNavigate(); // Hook para la navegación programática
  const productoExistente = useSelector(state =>
    state.products.items.find(p => p.id === parseInt(id)) // Busca el producto existente en el estado de Redux
  );

  // Estado del formulario inicializado con valores vacíos
  const [form, setForm] = useState({
    title: '',
    price: '',
    description: '',
    category: id ? '' : '', // Se inicializa vacío, pero se setea en useEffect si es edición
    image: '',
    stock: '',
    rating: '',
  });

  const [errors, setErrors] = useState({}); // Estado para almacenar errores de validación
  const [touched, setTouched] = useState({}); // Estado para rastrear campos tocados
  const [formError, setFormError] = useState(""); // Estado para errores generales del formulario
  const [imagePreviewError, setImagePreviewError] = useState(false); // Estado para manejar errores de carga de imagen

  // Efecto para inicializar el formulario con datos del producto existente si se está editando
  useEffect(() => {
    if (formError && validateForm()) {
      setFormError(""); // Limpia el error del formulario si es válido
    }
    if (productoExistente) {
      setForm({
        title: productoExistente.title,
        price: productoExistente.price,
        description: productoExistente.description,
        category: productoExistente.category,
        image: productoExistente.image,
        stock: productoExistente.stock ?? 100, // Valor por defecto para stock
        rating: productoExistente.rating?.rate ?? 4.0, // Valor por defecto para rating
      });
    }
  }, [productoExistente, formError]); // Dependencias del efecto

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target; // Desestructura el nombre y valor del campo
    setForm(prev => ({ ...prev, [name]: value })); // Actualiza el estado del formulario
    setImagePreviewError(false); // Resetea el error de vista previa de imagen
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' })); // Limpia el error si existe
    }
    if (touched[name]) {
      validateField(name, value); // Valida el campo si ha sido tocado
    }
  };

  // Maneja el evento de desenfoque en los campos del formulario
  const handleBlur = (e) => {
    const { name, value } = e.target; // Desestructura el nombre y valor del campo
    setTouched(prev => ({ ...prev, [name]: true })); // Marca el campo como tocado
    validateField(name, value); // Valida el campo
  };

  // Función para validar un campo específico
  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'title':
        error = value.trim() ? '' : 'El título es requerido'; // Valida el título
        break;
      case 'price':
        error = !value || parseFloat(value) <= 0 ? 'El precio debe ser mayor a 0' : ''; // Valida el precio
        break;
      case 'description':
        error = value.trim() ? '' : 'La descripción es requerida'; // Valida la descripción
        break;
      case 'image':
        error = value.trim() ? '' : 'La URL de imagen es requerida'; // Valida la URL de imagen
        break;
      case 'stock':
        error = !value || parseInt(value) < 0 ? 'El stock debe ser mayor o igual a 0' : ''; // Valida el stock
        break;
      case 'rating':
        error = value && (parseFloat(value) < 0 || parseFloat(value) > 5) ? 'La valoración debe estar entre 0 y 5' : ''; // Valida la valoración
        break;
      default:
        break;
    }
    setErrors(prev => ({ ...prev, [name]: error })); // Actualiza el estado de errores
  };

  // Función para validar todo el formulario
  const validateForm = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'El título es requerido'; // Valida el título
    if (!form.price || parseFloat(form.price) <= 0) newErrors.price = 'El precio debe ser mayor a 0'; // Valida el precio
    if (!form.description.trim()) newErrors.description = 'La descripción es requerida'; // Valida la descripción
    if (!form.image.trim()) newErrors.image = 'La URL de imagen es requerida'; // Valida la URL de imagen
    if (!form.stock || parseInt(form.stock) < 0) newErrors.stock = 'El stock debe ser mayor o igual a 0'; // Valida el stock
    if (form.rating && (parseFloat(form.rating) < 0 || parseFloat(form.rating) > 5)) {
      newErrors.rating = 'La valoración debe estar entre 0 y 5'; // Valida la valoración
    }
    setErrors(newErrors); // Actualiza el estado de errores
    return Object.keys(newErrors).length === 0; // Retorna true si no hay errores
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    if (!validateForm()) {
      // Si el formulario no es válido
      setTouched({ title: true, price: true, description: true, image: true, stock: true, rating: true }); // Marca todos los campos como tocados
      setFormError("Por favor, completa todos los campos obligatorios correctamente."); // Establece un error general
      return;
    }
    setFormError(""); // Limpia el error del formulario
    const productoFinal = {
      ...form,
      id: id ? parseInt(id) : Date.now(), // Asigna un ID nuevo o existente
      price: parseFloat(form.price), // Convierte el precio a número
      stock: parseInt(form.stock) || 0, // Convierte el stock a número
      rating: { rate: parseFloat(form.rating) || 4.0, count: 0 }, // Asigna la valoración
    };
    onSubmit(productoFinal); // Llama a la función onSubmit con el producto final
    toast.success(id ? 'Producto editado exitosamente' : 'Producto creado exitosamente'); // Muestra una notificación de éxito
    navigate('/'); // Navega a la página principal
  };

  // Función para obtener datos de la categoría
  const getCategoryData = (categoryValue) => {
    return categoriasDisponibles.find(cat => cat.value === categoryValue) || categoriasDisponibles[0]; // Retorna la categoría correspondiente o la primera
  };

  const currentCategory = getCategoryData(form.category); // Obtiene la categoría actual

  // Maneja el error de carga de imagen
  const handleImageError = () => {
    setImagePreviewError(true); // Establece el error de vista previa de imagen
  };

  // Maneja la carga de imagen
  const handleImageLoad = () => {
    setImagePreviewError(false); // Limpia el error de vista previa de imagen
  };

  // Función para reiniciar el formulario
  const handleReset = () => {
    setForm({
      title: '',
      price: '',
      description: '',
      category: '',
      image: '',
      stock: '',
      rating: '',
    });
    setErrors({}); // Limpia los errores
    setTouched({}); // Limpia los campos tocados
    setFormError(""); // Limpia el error del formulario
    setImagePreviewError(false); // Limpia el error de vista previa de imagen
  };

 return (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100"> {/* Contenedor principal con fondo degradado */}
    
    {/* Header Section */}
    <div className="bg-white border-b border-gray-200 shadow-sm"> {/* Sección del encabezado */}
      <div className="max-w-7xl mx-auto px-4 py-8"> {/* Contenedor centrado */}
        <div className="flex items-center justify-between"> {/* Flexbox para alinear elementos */}
          <div className="flex items-center space-x-4"> {/* Contenedor para el icono y título */}
            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-lg"> {/* Icono de acción */}
              <span className="text-2xl text-white">{id ? "✏️" : "➕"}</span> {/* Icono de editar o agregar */}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {id ? 'Editar Producto' : 'Nuevo Producto'} {/* Título dinámico */}
              </h1>
              <p className="text-gray-600 mt-1">
                {id ? 'Actualiza la información del producto' : 'Completa los datos para crear un nuevo producto'} {/* Descripción dinámica */}
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500"> {/* Información adicional visible en pantallas medianas y grandes */}
            <span className="text-lg">📦</span>
            <span>Sistema de Gestión de Productos</span>
          </div>
        </div>
      </div>
    </div>

    {/* Main Content */}
    <div className="max-w-7xl mx-auto px-4 py-8"> {/* Contenedor principal para el formulario */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"> {/* Tarjeta del formulario */}
        
        {/* Form Header */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-8 py-6"> {/* Encabezado del formulario */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-white bg-opacity-20 rounded-lg"> {/* Icono de categoría */}
              <span className="text-2xl">{currentCategory.icon}</span> {/* Icono de la categoría actual */}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Información del Producto</h2> {/* Título de la sección */}
              <p className="text-gray-300 text-sm">Completa todos los campos obligatorios</p> {/* Instrucciones */}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 animate-fade-in"> {/* Formulario principal */}
          {formError && ( // Muestra error si existe
            <div className="mb-4 p-3 rounded bg-red-100 text-red-800 text-center font-semibold border border-red-300 animate-pulse">
              {formError} {/* Mensaje de error */}
            </div>
          )}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8"> {/* Estructura de columnas para el formulario */}
            
            {/* Columna Principal - Información Básica */}
            <div className="xl:col-span-2 space-y-8"> {/* Columna principal para información del producto */}
              
              {/* Título del Producto */}
              <div className="space-y-2"> {/* Contenedor para el título */}
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700"> {/* Etiqueta del campo */}
                  <span className="text-base">🏷️</span>
                  <span>Título del Producto <span className="text-red-500">*</span></span> {/* Campo obligatorio */}
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Ej. iPhone 15 Pro Max 256GB" 
                  className={`w-full px-4 py-3.5 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-50 bg-white/80 shadow-sm hover:shadow-md ${
                    errors.title && touched.title
                      ? 'border-red-400 focus:border-red-500 bg-red-50' // Estilo en caso de error
                      : 'border-gray-300 focus:border-blue-500 hover:border-gray-400' // Estilo normal
                  }`}
                />
                {errors.title && touched.title && ( // Muestra error si existe
                  <div className="flex items-center space-x-2 text-red-600 text-sm animate-shake">
                    <span>⚠️</span>
                    <span>{errors.title}</span> {/* Mensaje de error */}
                  </div>
                )}
              </div>

              {/* Descripción */}
              <div className="space-y-2"> {/* Contenedor para la descripción */}
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700"> {/* Etiqueta del campo */}
                  <span className="text-base">📝</span>
                  <span>Descripción del Producto <span className="text-red-500">*</span></span> {/* Campo obligatorio */}
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Describe las características principales, beneficios y especificaciones técnicas del producto..."
                  rows="6" // Número de filas del textarea
                  className={`w-full px-4 py-3.5 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-50 resize-none bg-white/80 shadow-sm hover:shadow-md ${
                    errors.description && touched.description
                      ? 'border-red-400 focus:border-red-500 bg-red-50' // Estilo en caso de error
                      : 'border-gray-300 focus:border-blue-500 hover:border-gray-400' // Estilo normal
                  }`}
                />
                {errors.description && touched.description && ( // Muestra error si existe
                  <div className="flex items-center space-x-2 text-red-600 text-sm animate-shake">
                    <span>⚠️</span>
                    <span>{errors.description}</span> {/* Mensaje de error */}
                  </div>
                )}
              </div>

              {/* Precio y Categoría */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* Contenedor para precio y categoría */}
                <div className="space-y-2"> {/* Contenedor para el precio */}
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700"> {/* Etiqueta del campo */}
                    <span className="text-base text-green-600">💰</span>
                    <span>Precio <span className="text-red-500">*</span></span> {/* Campo obligatorio */}
                  </label>
                  <div className="relative"> {/* Contenedor para el input del precio */}
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-600 font-bold text-lg">
                      $ {/* Símbolo de dólar */}
                    </div>
                    <input
                      name="price"
                      type="number"
                      step="0.01" // Permite decimales
                      value={form.price}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="0.00"
                      className={`w-full pl-8 pr-4 py-3.5 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-50 bg-white/80 shadow-sm hover:shadow-md ${
                        errors.price && touched.price
                          ? 'border-red-400 focus:border-red-500 bg-red-50' // Estilo en caso de error
                          : 'border-gray-300 focus:border-blue-500 hover:border-gray-400' // Estilo normal
                      }`}
                    />
                  </div>
                  {errors.price && touched.price && ( // Muestra error si existe
                    <div className="flex items-center space-x-2 text-red-600 text-sm animate-shake">
                      <span>⚠️</span>
                      <span>{errors.price}</span> {/* Mensaje de error */}
                    </div>
                  )}
                </div>

                <div className="space-y-2"> {/* Contenedor para la categoría */}
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700"> {/* Etiqueta del campo */}
                    <span className="text-base text-purple-600">📂</span>
                    <span>Categoría <span className="text-red-500">*</span></span> {/* Campo obligatorio */}
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 hover:border-gray-400 transition-all duration-200 bg-white/80 shadow-sm hover:shadow-md"
                  >
                    {!form.category && (
                      <option value="" disabled>Selecciona una categoría...</option>
                    )}
                    {categoriasDisponibles.map((cat, i) => ( // Mapea las categorías disponibles
                      <option key={i} value={cat.value}>
                        {cat.icon} {cat.label} {/* Muestra el icono y el nombre de la categoría */}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Stock y Valoración */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* Contenedor para stock y valoración */}
                <div className="space-y-2"> {/* Contenedor para el stock */}
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700"> {/* Etiqueta del campo */}
                    <span className="text-base text-orange-600">📦</span>
                    <span>Stock Disponible <span className="text-red-500">*</span></span> {/* Campo obligatorio */}
                  </label>
                  <input
                    name="stock"
                    type="number"
                    min="0" // Valor mínimo
                    value={form.stock}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Cantidad en inventario"
                    className={`w-full px-4 py-3.5 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-50 bg-white/80 shadow-sm hover:shadow-md ${
                      errors.stock && touched.stock
                        ? 'border-red-400 focus:border-red-500 bg-red-50' // Estilo en caso de error
                        : 'border-gray-300 focus:border-blue-500 hover:border-gray-400' // Estilo normal
                    }`}
                  />
                  {errors.stock && touched.stock && ( // Muestra error si existe
                    <div className="flex items-center space-x-2 text-red-600 text-sm animate-shake">
                      <span>⚠️</span>
                      <span>{errors.stock}</span> {/* Mensaje de error */}
                    </div>
                  )}
                </div>

                <div className="space-y-2"> {/* Contenedor para la valoración */}
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700"> {/* Etiqueta del campo */}
                    <span className="text-base text-yellow-500">⭐</span>
                    <span>Valoración</span> {/* Campo opcional */}
                  </label>
                  <input
                    name="rating"
                    type="number"
                    step="0.1" // Permite decimales
                    max="5" // Valor máximo
                    min="0" // Valor mínimo
                    value={form.rating}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="4.5" 
                    className={`w-full px-4 py-3.5 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-50 bg-white/80 shadow-sm hover:shadow-md ${
                      errors.rating && touched.rating
                        ? 'border-red-400 focus:border-red-500 bg-red-50' // Estilo en caso de error
                        : 'border-gray-300 focus:border-blue-500 hover:border-gray-400' // Estilo normal
                    }`}
                  />
                  {errors.rating && touched.rating && ( // Muestra error si existe
                    <div className="flex items-center space-x-2 text-red-600 text-sm animate-shake">
                      <span>⚠️</span>
                      <span>{errors.rating}</span> {/* Mensaje de error */}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Columna Lateral - Imagen y Vista Previa */}
            <div className="space-y-6"> {/* Contenedor para la columna lateral */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200"> {/* Contenedor para la imagen */}
                <div className="space-y-4">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700"> {/* Etiqueta del campo */}
                    <span className="text-base text-blue-600">🖼️</span>
                    <span>Imagen del Producto <span className="text-red-500">*</span></span> {/* Campo obligatorio */}
                  </label>
                  <input
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="https://ejemplo.com/imagen.jpg" 
                    className={`w-full px-4 py-3.5 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-50 bg-white/80 shadow-sm hover:shadow-md ${
                      errors.image && touched.image
                        ? 'border-red-400 focus:border-red-500 bg-red-50' // Estilo en caso de error
                        : 'border-gray-300 focus:border-blue-500 hover:border-gray-400' // Estilo normal
                    }`}
                  />
                  {errors.image && touched.image && ( // Muestra error si existe
                    <div className="flex items-center space-x-2 text-red-600 text-sm animate-shake">
                      <span>⚠️</span>
                      <span>{errors.image}</span> {/* Mensaje de error */}
                    </div>
                  )}
                  {/* Vista previa de imagen */}
                  <div className="mt-4 flex flex-col items-center">
                    {form.image && !imagePreviewError ? (
                      <img
                        src={form.image}
                        alt="Vista previa"
                        className="w-40 h-40 object-contain rounded-lg border border-gray-200 shadow-md transition-transform duration-300 hover:scale-105 bg-white"
                        onError={handleImageError} // Maneja error de carga de imagen
                        onLoad={handleImageLoad} // Maneja carga exitosa de imagen
                      />
                    ) : form.image && imagePreviewError ? (
                      <div className="w-40 h-40 flex items-center justify-center bg-red-50 border border-red-300 rounded-lg text-red-500 text-sm">
                        Imagen no válida {/* Mensaje de error de imagen */}
                      </div>
                    ) : (
                      <div className="w-40 h-40 flex items-center justify-center bg-gray-100 border border-gray-200 rounded-lg text-gray-400 text-sm">
                        Vista previa {/* Mensaje de vista previa */}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Estadísticas del Formulario */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200"> {/* Contenedor para estadísticas */}
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-xl text-green-600">📊</span>
                  <h3 className="font-semibold text-green-900">Estado del Formulario</h3> {/* Título de estadísticas */}
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-green-700">Campos completados:</span>
                    <span className="font-semibold text-green-800">
                      {Object.values(form).filter(val => val.toString().trim() !== '').length}/7 {/* Conteo de campos completados */}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-green-700">Progreso:</span>
                    <span className="font-semibold text-green-800">
                      {Math.round((Object.values(form).filter(val => val.toString().trim() !== '').length / 7) * 100)}% {/* Porcentaje de progreso */}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Botones de Acción */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200"> {/* Contenedor para los botones */}
            
            {/* Botón de Cancelar */}
            <button
              type="button" // Tipo de botón que no envía el formulario
              onClick={() => navigate('/')} // Navega a la página principal al hacer clic
              title="Cancelar" // Tooltip que aparece al pasar el mouse
              className="flex-1 group relative p-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 flex items-center justify-center overflow-hidden shadow-sm hover:shadow-md"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> {/* Efecto de fondo en hover */}
              <FiArrowLeft className="text-xl group-hover:scale-110 group-hover:-translate-x-1 transition-transform duration-300 relative z-10" /> {/* Icono de flecha hacia la izquierda */}
              
              {/* Tooltip */}
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                Cancelar {/* Texto del tooltip */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div> {/* Triángulo del tooltip */}
              </div>
            </button>

            {/* Botón de Guardar */}
            <button
              type="submit" // Tipo de botón que envía el formulario
              title="Guardar" // Tooltip que aparece al pasar el mouse
              className="flex-1 group relative p-3 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white rounded-xl font-medium hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> {/* Efecto de fondo en hover */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div> {/* Efecto de fondo adicional en hover */}
              <FiSave className="text-xl group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300 relative z-10" /> {/* Icono de guardar */}
              
              {/* Tooltip */}
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                Guardar {/* Texto del tooltip */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div> {/* Triángulo del tooltip */}
              </div>
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm; 