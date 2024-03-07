import './App.css';
import Login from './Page/Login'
import Home from './Page/Home'
import Product from './Page/Product'

import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primeicons/primeicons.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import history from './Component/historyRouter';
import ProductSize from './Page/ProductSize';
import ProductColor from './Page/ProductColor';
import PriceProduct from './Page/PriceProduct';
import ProductDetail from './Page/ProductDetail';
import Cart from './Page/Cart';
import Category from './Page/Category';

function App() {
  return (


    <Router history={history}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product-size" element={<ProductSize />} />
        <Route path="/product-color" element={<ProductColor />} />
        <Route path="/price" element={<PriceProduct />} />
        <Route path="/product-detail/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category" element={<Category />} />

      </Routes>
    </Router>
  );
}

export default App;
