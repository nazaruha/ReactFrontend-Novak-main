import React from "react";
import logo from "./logo.svg";
import "./App.css";
import HomePage from "./components/home/HomePage";
import LoginPage from "./components/auth/login/LoginPage";
import RegisterPage from "./components/auth/register/RegisterPage";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./components/containers/default/DefaultLayout";
import MyProducts from "./components/pages/MyProducts/myProducts";
import NotFoundPage from "./components/pages/NotFound";
import ApiProducts from "./components/pages/ApiCategories/apiCategories";
import setAuthToken from "./helpers/setAuthToken";
import CategoryCreatePage from "./components/admin/categories/create/CategoryCreatePage";
import UserProfile from "./components/pages/userProfile";
import AdminLayout from "./components/containers/admin/AdminLayout";
import CategoriesListPage from "./components/admin/categories/list/CategoriesListPage";
import ProductsListPage from "./components/admin/products/list/ProductsListPage";
import ProductCreatePage from "./components/admin/products/create/ProductCreatePage";
import ProductEditPage from "./components/admin/products/edit/ProductEditPage";

const App = () => {
  return (
    <>
      <Routes>
        {/* загальна обгортка для всіх компонентів (DefaultLayout) */}
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="my-products" element={<MyProducts />} />
          <Route path="api-categories" element={<ApiProducts />} />
          <Route path="profile" element={<UserProfile />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="categories/create" element={<CategoryCreatePage />} />
          <Route path="categories/list" element={<CategoriesListPage />} />
          <Route path="products">
            <Route index element={<ProductsListPage />} />
            <Route path="create" element={<ProductCreatePage />} />
            <Route path="edit">
              <Route path=":id" element={<ProductEditPage />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
