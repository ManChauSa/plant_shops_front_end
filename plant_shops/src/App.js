import './App.css';
import { CustomFooter, CustomNavBar } from './components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage, ProductList, Login, Signup, AddProduct } from './controllers';


function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <CustomNavBar />
        <Routes>
          <Route path="/manage-product/product/:sku" element={<AddProduct />} />
          <Route path="/manage-product/product/" element={<AddProduct />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/product-list" element={<ProductList />} />        
        </Routes>
        <CustomFooter />
      </BrowserRouter>
    </div>
  );
}

export default App;
