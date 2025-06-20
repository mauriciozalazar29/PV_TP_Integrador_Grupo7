import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const categoriasDisponibles = [
  "men's clothing",
  "women's clothing",
  "electronics",
  "jewelery"
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
    // Limpiar error cuando el usuario empiece a escribir
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

  const getCategoryIcon = (category) => {
    const icons = {
      "men's clothing": "👔",
      "women's clothing": "👗",
      "electronics": "📱",
      "jewelery": "💎"
    };
    return icons[category] || "📦";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
            <span className="text-2xl text-white">{id ? "✏️" : "➕"}</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            {id ? 'Editar Producto' : 'Crear Nuevo Producto'}
          </h1>
          <p className="text-gray-600 text-lg">
            {id ? 'Modifica los detalles de tu producto' : 'Completa la información para agregar un nuevo producto'}
          </p>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
            <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
              <span className="text-3xl">{getCategoryIcon(form.category)}</span>
              Información del Producto
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Columna Izquierda */}
              <div className="space-y-6">
                {/* Título */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📝 Título del Producto
                  </label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Ingresa el nombre del producto"
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                      errors.title 
                        ? 'border-red-400 focus:border-red-500' 
                        : 'border-gray-200 focus:border-blue-500'
                    }`}
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <span>⚠️</span> {errors.title}
                  </p>}
                </div>

                {/* Precio */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    💰 Precio
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-gray-500 font-bold">$</span>
                    <input
                      name="price"
                      type="number"
                      step="0.01"
                      value={form.price}
                      onChange={handleChange}
                      placeholder="0.00"
                      className={`w-full pl-8 pr-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                        errors.price 
                          ? 'border-red-400 focus:border-red-500' 
                          : 'border-gray-200 focus:border-blue-500'
                      }`}
                    />
                  </div>
                  {errors.price && <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <span>⚠️</span> {errors.price}
                  </p>}
                </div>

                {/* Categoría */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    🏷️ Categoría
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-white"
                  >
                    {categoriasDisponibles.map((cat, i) => (
                      <option key={i} value={cat}>
                        {getCategoryIcon(cat)} {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Stock y Rating */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      📦 Stock
                    </label>
                    <input
                      name="stock"
                      type="number"
                      min="0"
                      value={form.stock}
                      onChange={handleChange}
                      placeholder="0"
                      className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                        errors.stock 
                          ? 'border-red-400 focus:border-red-500' 
                          : 'border-gray-200 focus:border-blue-500'
                      }`}
                    />
                    {errors.stock && <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <span>⚠️</span> {errors.stock}
                    </p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ⭐ Valoración
                    </label>
                    <input
                      name="rating"
                      type="number"
                      step="0.1"
                      max="5"
                      min="0"
                      value={form.rating}
                      onChange={handleChange}
                      placeholder="4.0"
                      className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                        errors.rating 
                          ? 'border-red-400 focus:border-red-500' 
                          : 'border-gray-200 focus:border-blue-500'
                      }`}
                    />
                    {errors.rating && <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <span>⚠️</span> {errors.rating}
                    </p>}
                  </div>
                </div>
              </div>

              {/* Columna Derecha */}
              <div className="space-y-6">
                {/* Imagen */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    🖼️ URL de Imagen
                  </label>
                  <input
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                    placeholder="https://ejemplo.com/imagen.jpg"
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                      errors.image 
                        ? 'border-red-400 focus:border-red-500' 
                        : 'border-gray-200 focus:border-blue-500'
                    }`}
                  />
                  {errors.image && <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <span>⚠️</span> {errors.image}
                  </p>}
                  
                  {/* Preview de imagen */}
                  {form.image && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                      <p className="text-sm text-gray-600 mb-2">Vista previa:</p>
                      <img
                        src={form.image}
                        alt="Preview"
                        className="w-32 h-32 object-contain mx-auto border-2 border-gray-200 rounded-lg bg-white"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Descripción */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📄 Descripción
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Describe las características y beneficios del producto..."
                    rows="6"
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 resize-none ${
                      errors.description 
                        ? 'border-red-400 focus:border-red-500' 
                        : 'border-gray-200 focus:border-blue-500'
                    }`}
                  />
                  {errors.description && <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <span>⚠️</span> {errors.description}
                  </p>}
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-4 mt-10 pt-8 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>❌</span> Cancelar
              </button>
              
              <button
                type="submit"
                className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <span>{id ? '💾' : '✨'}</span>
                {id ? 'Guardar Cambios' : 'Crear Producto'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;