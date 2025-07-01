# 🛍️ Tienda Virtual - TIENDAMIA

Aplicación web desarrollada con **React + Vite** para la gestión de productos de una tienda virtual. Permite visualizar, marcar como favorito, crear, editar y eliminar productos. El diseño es moderno y adaptable, con navegación fluida entre vistas y consumo de una API externa para obtener los productos.

---

## 👥 Desarrolladores

* Mauricio Tomas Zalazar – [@mauriciozalazar29](https://github.com/mauriciozalazar29)
* Mariano Gabriel Gutiérrez – [@marianogutierrez2008](https://github.com/marianogutierrez2008)

---

## 🚀 Tecnologías Utilizadas

* ⚛️ React + Vite
* 🔁 Redux Toolkit
* 🌐 React Router DOM
* 💨 Tailwind CSS
* 🌐 API externa: [Fake Store API](https://fakestoreapi.com/)
* 🧠 JavaScript (ES6+)
* 🎨 React Icons

---

## 📁 Estructura del Proyecto

```
├── public/
│   └── vite.svg                          # Archivos públicos accesibles directamente
│
├── src/
│   ├── assets/                           # Imágenes y recursos estáticos
│   │
│   ├── components/                       # Componentes reutilizables
│   │   ├── Footer.jsx
│   │   ├── NavBar.jsx
│   │   ├── HeroSlider.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductForm.jsx
│   │   └── PrivateRoute.jsx
│   │
│   ├── features/                         # Redux Toolkit slices organizados por dominio
│   │   ├── auth/                         # Autenticación (registro, login, estado de usuario)
│   │   ├── cart/                         # Estado del carrito de compras
│   │   ├── favorites/                    # Productos favoritos persistidos
│   │   ├── products/                     # Lógica de productos (API, creación, edición)
│   │   ├── search/                       # Filtro y búsqueda de productos
│   │   └── stock/                        # Control de stock y cantidades
│   │
│   ├── views/                            # Vistas principales de la aplicación (rutas)
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Favorites.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── CreateProduct.jsx
│   │   ├── EditProduct.jsx
│   │   └── Success.jsx
│   │
│   ├── App.jsx                           # Componente principal de la aplicación
│   ├── App.css                           # Estilos globales para App
│   ├── main.jsx                          # Punto de entrada de React (ReactDOM)
│   ├── index.css                         # Estilos generales
│   └── store.js                          # Configuración de Redux Store
│
├── package.json                          # Dependencias, scripts y metadatos del proyecto
├── vite.config.js                        # Configuración de Vite
├── eslint.config.js                      # Reglas de linting
└── README.md                             # Documentación del proyecto
```

---

## 📚 Funcionalidades Principales

* 🏠 **Página de Inicio (Home):**
  - Lista de productos con imagen, nombre, precio, categoría y botón de "Ver más".
  - Opción para marcar productos como favoritos.
  - Slider de promociones.

* ❤️ **Favoritos:**
  - Visualización de productos marcados como favoritos.
  - Estado sincronizado globalmente.

* 🛒 **Carrito de Compras:**
  - Agregar, quitar y modificar cantidad de productos.
  - Visualización del total y acceso al checkout.

* 🔍 **Detalle del Producto:**
  - Página con descripción completa, categoría, precio, stock.
  - Posibilidad de desmarcar como favorito y agregar al carrito.

* ✏️ **Formulario Crear/Editar Producto:**
  - Crear un nuevo producto.
  - Editar productos existentes con datos precargados.
  - Validaciones básicas de formulario.

* 🔐 **Autenticación:**
  - Registro y login de usuarios.
  - Rutas privadas protegidas.

* ✅ **Checkout y Éxito:**
  - Proceso de compra y pantalla de confirmación.

---

## 🧩 Componentes Destacados

- **NavBar:** Navegación principal, enlaces y estado de usuario.
- **Footer:** Pie de página con información de contacto.
- **HeroSlider:** Carrusel de promociones.
- **ProductCard:** Tarjeta individual de producto.
- **ProductForm:** Formulario reutilizable para crear/editar productos.
- **PrivateRoute:** Protección de rutas privadas.

---

## ⚙️ Características Técnicas

* Manejo de estado global con Redux Toolkit (slices por dominio)
* Consumo de API REST con Fetch
* Hooks: `useEffect`, `useDispatch`, `useSelector`
* Navegación dinámica con `react-router-dom`
* Componentes funcionales reutilizables
* Diseño responsive con Tailwind CSS
* Separación de lógica por features y vistas
* Control de errores y validaciones básicas

---

## 📝 Flujo de Usuario

1. El usuario accede a la Home y visualiza productos y promociones.
2. Puede buscar, filtrar, marcar favoritos y ver detalles de productos.
3. Puede registrarse/iniciar sesión para acceder a funciones avanzadas (crear/editar productos, comprar).
4. Agrega productos al carrito y realiza el checkout.
5. Visualiza la confirmación de compra.

---

## 💠 Cómo Ejecutar el Proyecto

1. 📥 Clonar el repositorio:

   ```bash
   git clone https://github.com/mauriciozalazar29/PV_TP_Integrador_Grupo7.git
   cd pv_tp_integrador_grupo7
   ```

2. 📦 Instalar dependencias:

   ```bash
   npm install
   ```

3. ▶️ Iniciar servidor de desarrollo:

   ```bash
   npm run dev
   ```

4. 🌐 Acceder a la app:

   Abrir el navegador en: [http://localhost:5173](http://localhost:5173)

---

## 📥 Instalación de Dependencias Específicas

Además de ejecutar `npm install`, asegurate de instalar las siguientes herramientas utilizadas en el proyecto:

### 🔁 React Router DOM

```bash
npm install react-router-dom
```

### 📦 Redux Toolkit y React-Redux

```bash
npm install @reduxjs/toolkit react-redux
```

### 💨 Tailwind CSS

```bash
npm install tailwindcss @tailwindcss/vite
```

Configurá `tailwind.config.js` así:

```js
/**vite.config.js */
  import { defineConfig } from 'vite'
  import tailwindcss from '@tailwindcss/vite'
  export default defineConfig({
    plugins: [
      tailwindcss(),
    ],
  })
```
Y en `src/index.css` importá:
```css
@import "tailwindcss";
```

### 🎨 React Icons

```bash
npm install react-icons
```

### 🔔 React Toastify (Notificaciones)

```bash
npm install react-toastify
```

---

## ✅ Buenas Prácticas Aplicadas

* 📦 Separación de responsabilidades (componentes, vistas, lógica de estado)
* 🌀 Estado global optimizado con Redux Toolkit
* ♻️ Componentes reutilizables y mantenibles
* 🧪 Control de errores y validaciones básicas
* 🧭 Navegación clara e intuitiva entre vistas
* ✍️ Documentación clara para usuarios y desarrolladores

---

## 📂 Recursos y Créditos

- [Fake Store API](https://fakestoreapi.com/)
- [React](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)

---

## 📝 Licencia

Proyecto con fines educativos - Facultad de Ingeniería - Analista Programador Universitario