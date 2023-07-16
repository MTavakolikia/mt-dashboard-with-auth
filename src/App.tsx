import React from "react";
import "./App.css";
import Album from "./pages/album/Album";
import Calculator from "./pages/calculator";
import SignIn from "./pages/secutiry/login/Login";
import ProductList from "./pages/product";
import ProductCatalog from "./pages/product/ProductCatalog";
import { Home as AdminHome } from "./pages/home";
import PageNotFound from "./pages/page-not-found";
import CalculatorTypescript from "./pages/calculator-typescript";
import { Link, Route, Routes, Navigate } from "react-router-dom";
import AdminLayout from "./layouts/admin-layout";
import SimpleLayout from "./layouts/simple-layout";
import UserLayout from "./layouts/user-layout";
import Login from "./pages/secutiry/login/Login";
import Register from "./pages/secutiry/register";
import ForgotPassword from "./pages/secutiry/forgot-password";
import Home from './pages/user-pages/home';
import {productService} from './services/productService';
import {storageKeys} from './constants/storageKeys'
import {Counter} from './pages/counter'
import Basket from 'pages/user-pages/basket'
import FakeStoreAPISample from 'pages/user-pages/fake-store-api'
import {default as UserProductList}  from 'pages/user-pages/product'
//use => hook =>

const App = () => {

  productService.setInitailProductsInLocalStorage();

  return (
    <>
        <Routes>
          <Route element={<UserLayout />}>
              <Route path="" element={<Home />} />
              <Route path="basket" element={<Basket />} />
              <Route path="products" element={<UserProductList />} />
              <Route path="fake-api" element={<FakeStoreAPISample />} />
          </Route>
          <Route element={<SimpleLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
          </Route>
          <Route 
            path="admin"
            element={
              <PrivateRoute>
                <AdminLayout/>
              </PrivateRoute>
            }
          >
            <Route index element={<AdminHome />} />
            <Route path="calculator" element={<Calculator />} />
            <Route path="counter" element={<Counter />} />
            <Route  path="products" element={<ProductList />}>
              <Route path=":id" element={<ProductCatalog />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
    </>
  );
};

export default App;

const PrivateRoute = ({ children }: any) => {
  if (!localStorage.getItem(storageKeys.loginInfo)) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

{
  /* <Route
path="home"
element={
  <ProtectedRoute user={user}>
    <Home />
  </ProtectedRoute>
}
/> */
}

// const ProtectedRoute = ({
//   user,
//   redirectPath = '/landing',
//   children,
// }) => {
//   if (!user) {
//     return <Navigate to={redirectPath} replace />;
//   }

//   return children;
// };
