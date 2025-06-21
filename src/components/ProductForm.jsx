import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const categoriasDisponibles = [
  { value: "men's clothing", label: "Ropa Masculina", icon: "👔" },
  { value: "women's clothing", label: "Ropa Femenina", icon: "👗" },
  { value: "electronics", label: "Electrónicos", icon: "📱" },
  { value: "jewelery", label: "Joyería", icon: "💎" }
];

const ProductForm = ({ onSubmit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const productoExistente = useSelector(state =>
    state.products.items.find(p => p.id === parseInt(id))
  );

  const [form, setForm] = useState({
    title: '',
    price: '',
    description: '',
    category: "men's clothing",
    image: '',
    stock: '',
    rating: '',
  });

  const [errors, setErrors] = useState({});
  

  useEffect(() => {
    if (productoExistente) {
      setForm({
        title: productoExistente.title,
        price: productoExistente.price,
        description: productoExistente.description,
        category: productoExistente.category,
        image: productoExistente.image,
        stock: productoExistente.stock ?? 100,
        rating: productoExistente.rating?.rate ?? 4.0,
      });
    }
  }, [productoExistente]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setImagePreviewError(false);
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.title.trim()) newErrors.title = 'El título es requerido';
    if (!form.price || parseFloat(form.price) <= 0) newErrors.price = 'El precio debe ser mayor a 0';
    if (!form.description.trim()) newErrors.description = 'La descripción es requerida';
    if (!form.image.trim()) newErrors.image = 'La URL de imagen es requerida';
    if (!form.stock || parseInt(form.stock) < 0) newErrors.stock = 'El stock debe ser mayor o igual a 0';
    if (form.rating && (parseFloat(form.rating) < 0 || parseFloat(form.rating) > 5)) {
      newErrors.rating = 'La valoración debe estar entre 0 y 5';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const productoFinal = {
      ...form,
      id: id ? parseInt(id) : Date.now(),
      price: parseFloat(form.price),
      stock: parseInt(form.stock) || 0,
      rating: { rate: parseFloat(form.rating) || 4.0, count: 0 },
    };
    onSubmit(productoFinal);
    navigate('/');
  };

  const getCategoryData = (categoryValue) => {
    return categoriasDisponibles.find(cat => cat.value === categoryValue) || categoriasDisponibles[0];
  };

  const currentCategory = getCategoryData(form.category);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-lg">
                <span className="text-2xl text-white">{id ? "✏️" : "➕"}</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {id ? 'Editar Producto' : 'Nuevo Producto'}
                </h1>
                <p className="text-gray-600 mt-1">
                  {id ? 'Actualiza la información del producto' : 'Completa los datos para crear un nuevo producto'}
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
              <span className="text-lg">📦</span>
              <span>Sistema de Gestión de Productos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-8 py-6">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-white bg-opacity-20 rounded-lg">
                <span className="text-2xl">{currentCategory.icon}</span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Información del Producto</h2>
                <p className="text-gray-300 text-sm">Completa todos los campos obligatorios</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Columna Principal - Información Básica */}
              <div className="xl:col-span-2 space-y-8">
                {/* Título del Producto */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                    <span className="text-base">🏷️</span>
                    <span>Título del Producto *</span>
                  </label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Ej. iPhone 15 Pro Max 256GB"
                    className={`w-full px-4 py-3.5 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-50 ${
                      errors.title 
                        ? 'border-red-400 focus:border-red-500' 
                        : 'border-gray-300 focus:border-blue-500 hover:border-gray-400'
                    }`}
                  />
                  {errors.title && (
                    <div className="flex items-center space-x-2 text-red-600 text-sm">
                      <span>⚠️</span>
                      <span>{errors.title}</span>
                    </div>
                  )}
                </div>

                {/* Descripción */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                    <span className="text-base">📝</span>
                    <span>Descripción del Producto *</span>
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Describe las características principales, beneficios y especificaciones técnicas del producto..."
                    rows="6"
                    className={`w-full px-4 py-3.5 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-50 resize-none ${
                      errors.description 
                        ? 'border-red-400 focus:border-red-500' 
                        : 'border-gray-300 focus:border-blue-500 hover:border-gray-400'
                    }`}
                  />
                  {errors.description && (
                    <div className="flex items-center space-x-2 text-red-600 text-sm">
                      <span>⚠️</span>
                      <span>{errors.description}</span>
                    </div>
                  )}
                </div>

                {/* Precio y Categoría */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                      <span className="text-base text-green-600">💰</span>
                      <span>Precio *</span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-600 font-bold text-lg">
                        $
                      </div>
                      <input
                        name="price"
                        type="number"
                        step="0.01"
                        value={form.price}
                        onChange={handleChange}
                        placeholder="0.00"
                        className={`w-full pl-8 pr-4 py-3.5 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-50 ${
                          errors.price 
                            ? 'border-red-400 focus:border-red-500' 
                            : 'border-gray-300 focus:border-blue-500 hover:border-gray-400'
                        }`}
                      />
                    </div>
                    {errors.price && (
                      <div className="flex items-center space-x-2 text-red-600 text-sm">
                        <span>⚠️</span>
                        <span>{errors.price}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                      <span className="text-base text-purple-600">📂</span>
                      <span>Categoría *</span>
                    </label>
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 hover:border-gray-400 transition-all duration-200 bg-white"
                    >
                      {categoriasDisponibles.map((cat, i) => (
                        <option key={i} value={cat.value}>
                          {cat.icon} {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Stock y Valoración */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                      <span className="text-base text-orange-600">📦</span>
                      <span>Stock Disponible *</span>
                    </label>
                    <input
                      name="stock"
                      type="number"
                      min="0"
                      value={form.stock}
                      onChange={handleChange}
                      placeholder="Cantidad en inventario"
                      className={`w-full px-4 py-3.5 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-50 ${
                        errors.stock 
                          ? 'border-red-400 focus:border-red-500' 
                          : 'border-gray-300 focus:border-blue-500 hover:border-gray-400'
                      }`}
                    />
                    {errors.stock && (
                      <div className="flex items-center space-x-2 text-red-600 text-sm">
                        <span>⚠️</span>
                        <span>{errors.stock}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                      <span className="text-base text-yellow-500">⭐</span>
                      <span>Valoración</span>
                    </label>
                    <input
                      name="rating"
                      type="number"
                      step="0.1"
                      max="5"
                      min="0"
                      value={form.rating}
                      onChange={handleChange}
                      placeholder="4.5"
                      className={`w-full px-4 py-3.5 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-50 ${
                        errors.rating 
                          ? 'border-red-400 focus:border-red-500' 
                          : 'border-gray-300 focus:border-blue-500 hover:border-gray-400'
                      }`}
                    />
                    {errors.rating && (
                      <div className="flex items-center space-x-2 text-red-600 text-sm">
                        <span>⚠️</span>
                        <span>{errors.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Columna Lateral - Imagen y Vista Previa */}
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <div className="space-y-4">
                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                      <span className="text-base text-blue-600">🖼️</span>
                      <span>Imagen del Producto *</span>
                    </label>
                    
                    <input
                      name="image"
                      value={form.image}
                      onChange={handleChange}
                      placeholder="https://ejemplo.com/imagen.jpg"
                      className={`w-full px-4 py-3.5 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-50 ${
                        errors.image 
                          ? 'border-red-400 focus:border-red-500' 
                          : 'border-gray-300 focus:border-blue-500 hover:border-gray-400'
                      }`}
                    />
                    
                    {errors.image && (
                      <div className="flex items-center space-x-2 text-red-600 text-sm">
                        <span>⚠️</span>
                        <span>{errors.image}</span>
                      </div>
                    )}
                  </div>
                </div>

               

                {/* Estadísticas del Formulario */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-xl text-green-600">📊</span>
                    <h3 className="font-semibold text-green-900">Estado del Formulario</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-green-700">Campos completados:</span>
                      <span className="font-semibold text-green-800">
                        {Object.values(form).filter(val => val.toString().trim() !== '').length}/7
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-green-700">Progreso:</span>
                      <span className="font-semibold text-green-800">
                        {Math.round((Object.values(form).filter(val => val.toString().trim() !== '').length / 7) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Botones de Acción */}
           <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-gray-200">
  <button
    type="button"
    onClick={() => navigate('/')}
    className="flex-1 px-4 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center justify-center space-x-2 group"
  >
    <span className="text-sm group-hover:scale-110 transition-transform">❌</span>
  </button>
  
  <button
    type="submit"
    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-800 transform hover:scale-[1.02] transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center space-x-2 group"
  >
    <span className="text-sm group-hover:scale-110 transition-transform">💾</span>
  </button>
</div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;