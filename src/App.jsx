import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
feat/product/-detail
import NavBar from './components/NavBar';
import Home from './views/Home';
import Favorites from './views/Favorites';
import ProductDetail from './views/ProductDetail';
import Cart from './views/Cart';
import Checkout from './views/Checkout';
import CreateProduct from './views/CreateProduct';
import EditProduct from './views/EditProduct';


import Home from './views/Home';
import Favorites from './views/Favorites';
import ProductDetail from './views/ProductDetail';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
develop

const App = () => {
  return (
    <Router>
      <NavBar />
 feat/product/-detail
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/detail/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/create" element={<CreateProduct />} />
        <Route path="/edit/:id" element={<EditProduct />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>

      <main className="pt-1 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/detail/:id" element={<ProductDetail />} />
        </Routes>
      </main>
      <Footer />
 develop
    </Router>
  );
};

feat/product/-detail
export default App;

export default App;
 develop
