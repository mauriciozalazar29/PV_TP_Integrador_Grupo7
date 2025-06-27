// main.jsx
// Punto de entrada de la app. Renderiza el componente App dentro del Provider de Redux y StrictMode.
// Provider conecta la app con el store global de Redux.

import React from 'react'; // Importa React
import ReactDOM from 'react-dom/client'; // Importa ReactDOM para renderizar la aplicación
import App from './App'; // Importa el componente principal de la aplicación
import './index.css'; // Importa los estilos globales
import { Provider } from 'react-redux'; // Importa el Provider de Redux para conectar la app con el store
import { store } from './store'; // Importa el store configurado

// Renderiza la aplicación en el elemento con id 'root'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> {/* Activa el modo estricto para detectar problemas en la aplicación */}
    <Provider store={store}> {/* Provee el store de Redux a la aplicación */}
      <App /> {/* Renderiza el componente principal de la aplicación */}
    </Provider>
  </React.StrictMode>
);
