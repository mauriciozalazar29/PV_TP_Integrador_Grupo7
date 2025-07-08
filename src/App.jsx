import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from './features/auth/authSlice';
import PrivateRoute from './components/PrivateRoute';
import Home from './views/Home';
import Favorites from './views/Favorites';
import ProductDetail from './views/ProductDetail';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Cart from './views/Cart';
import Create from './views/CreateProduct';
import Edit from './views/EditProduct';
import Checkout from './views/Checkout';
import Success from './views/Success';
import Register from './views/Register';
import Login from './views/Login';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === 'sessionUser' && event.newValue === null) {
        // Se eliminó la sesión en otra pestaña
        dispatch(logout());
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={
          <>
            <NavBar />
            <main className="pt-1 min-h-screen">
              <Routes>
                <Route path='/' element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                } />
                <Route path="/favorites" element={
                  <PrivateRoute>
                    <Favorites />
                  </PrivateRoute>
                } />
                <Route path="/detail/:id" element={
                  <PrivateRoute>
                    <ProductDetail />
                  </PrivateRoute>
                } />
                <Route path="/cart" element={
                  <PrivateRoute>
                    <Cart />
                  </PrivateRoute>
                } />
                <Route path="/create" element={
                  <PrivateRoute>
                    <Create />
                  </PrivateRoute>
                } />
                <Route path="/edit/:id" element={
                  <PrivateRoute>
                    <Edit />
                  </PrivateRoute>
                } />
                <Route path="/checkout" element={
                  <PrivateRoute>
                    <Checkout />
                  </PrivateRoute>
                } />
                <Route path="/success" element={
                  <PrivateRoute>
                    <Success />
                  </PrivateRoute>
                } />
              </Routes>
            </main>
            <Footer />
          </>
        } />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </Router>
  );
};

export default App;