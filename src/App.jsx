import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Favorites from './views/Favorites';
import ProductDetail from './views/ProductDetail';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Cart from './views/Cart';

const App = () => {
  return (
    <Router>
      <NavBar />
      <main className="pt-1 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/detail/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;