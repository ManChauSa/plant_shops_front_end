import './App.css';
import { CustomFooter, CustomNavBar } from './components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage, ProductList, Login, Signup, AddProduct, ManageProduct, ProductDetail, CartPage, CheckoutCard, CheckoutConfirmation, CheckoutPersonalInfo, PersonalOrders, ManageOrderPage, ApproveSeller } from './controllers';


function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <CustomNavBar />
        <Routes>
          <Route path="/manage-product/product/:sku" element={<AddProduct />} />
          <Route path="/manage-product/product/" element={<AddProduct />} />
          <Route path="/manage-product" element={<ManageProduct />} />
          <Route path="/manage-order" element={<ManageOrderPage />} />
          <Route path="/approve-seller" element={<ApproveSeller />} />
          <Route path="/product/:sku" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/your-order" element={<PersonalOrders />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/product-list" element={<ProductList />} />  
          <Route exact path="/cart" element={<CartPage />} />
          <Route exact path="/checkout/info" element={<CheckoutPersonalInfo />} />
          <Route exact path="/checkout/card" element={<CheckoutCard />} />
          <Route exact path="/checkout/confirmation" element={<CheckoutConfirmation />} />      
        </Routes>
        <CustomFooter />
      </BrowserRouter>
    </div>
  );
}

export default App;
