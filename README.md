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

---

## 📚 Funcionalidades Principales

* 🏠 **Página de Inicio (Home)**:
  - Lista de productos con imagen, nombre, precio, categoría y botón de "Ver más".
  - Opción para marcar productos como favoritos.

* ❤️ **Favoritos**:
  - Visualización de productos marcados como favoritos.
  - Estado sincronizado globalmente.

* 🔍 **Detalle del Producto**:
  - Página con descripción completa, categoría, precio, stock.
  - Posibilidad de desmarcar como favorito.

* ✏️ **Formulario Crear/Editar Producto**:
  - Crear un nuevo producto.
  - Editar productos existentes con datos precargados.

---

## ⚙️ Características Técnicas

* Manejo de estado global con Redux
* Consumo de API REST con Fetch
* Hooks: `useEffect`, `useDispatch`, `useSelector`
* Navegación dinámica con `react-router-dom`
* Componentes funcionales reutilizables
* Diseño responsive con Tailwind CSS

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
npm install tailwindcss @tailwindcss/vite

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
---
### 🎨 React Icons

```bash
npm install react-icons
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

## 📝 Licencia

Proyecto con fines educativos - Facultad de Ingeniería - Analista Programador Universitario