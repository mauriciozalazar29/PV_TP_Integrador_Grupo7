import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Favorites from './views/Favorites';
import ProductDetail from './views/ProductDetail';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Cart from './views/Cart';
import Create from './views/CreateProduct';
import Edit from './views/EditProduct';
import Checkout from './views/Checkout';
import Login from './views/Login';
import Register from './views/Register';
import PrivateRoute from './features/auth/PrivateRoute';

const App = () => {
  return (
    <Router>
      {/* NavBar visible siempre */}
      <NavBar />

      <main className="pt-1 min-h-screen">
        <Routes>
          {/* Rutas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rutas privadas protegidas */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <PrivateRoute>
                <Favorites />
              </PrivateRoute>
            }
          />
          <Route
            path="/detail/:id"
            element={
              <PrivateRoute>
                <ProductDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            }
          />
          <Route
            path="/create"
            element={
              <PrivateRoute>
                <Create />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <PrivateRoute>
                <Edit />
              </PrivateRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>

      {/* Footer visible siempre */}
      <Footer />
    </Router>
  );
};

export default App;
