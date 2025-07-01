// main.jsx
// Punto de entrada de la app. Renderiza el componente App dentro del Provider de Redux y StrictMode.
// Provider conecta la app con el store global de Redux.

import React from 'react'; // Importa la biblioteca React
import ReactDOM from 'react-dom/client'; // Importa React DOM para renderizar la aplicación
import App from './App'; // Importa el componente principal App
import './index.css'; // Importa los estilos globales
import { Provider } from 'react-redux'; // Importa el Provider de Redux
import { store } from './store'; // Importa la store de Redux

// Crea un root para la aplicación en el elemento con id 'root'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* StrictMode ayuda a detectar problemas potenciales en la aplicación */}
    <Provider store={store}>
      {/* Provee la store de Redux a toda la aplicación */}
      <App /> {/* Renderiza el componente principal */}
    </Provider>
  </React.StrictMode>
);
