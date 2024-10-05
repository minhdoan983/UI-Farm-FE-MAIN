import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import HomePage from '../pages/HomePage'
import StorePage from '../pages/StorePage/StorePage.js'
import ItemPage from '../pages/ItemPage'
import PolicyPage from '../pages/PolicyPage'
import ContactPage from '../pages/ContactPage'
import BlankLayout from '../layouts/BlankLayout.js'
import LoginPage from '../pages/LoginPage/LoginPage.js'
import DetailPage from '../pages/DetailPage/DetailPage.js'
import CartPage from '../pages/CartPage/CartPage.js'
import CheckoutPage from '../pages/CheckoutPage/CheckoutPage.js'
import AuthRequire from './AuthRequire.js'
import ProfilePage from '../pages/ProfilePage/ProfilePage.js'
import OrderPage from '../pages/OrderPage/OrderPage.js'
import RegisterPage from '../pages/RegisterPage/RegisterPage.js'
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage.js'
import EditItemPage from '../pages/EditItemPage/EditItemPage.js'
import ManageOrderPage from '../pages/ManageOrderPage/ManageOrderPage.js'

function Router() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <MainLayout />
                }
            >
                <Route index element={<HomePage />} />
                <Route path='/profile' element={<ProfilePage />} />
                <Route path='/orders' element={<OrderPage />} />
                <Route path='/item' element={<ItemPage />} />
                <Route path='/item/:id' element={<DetailPage />} />
                <Route path="/cart" element={
                    <AuthRequire>
                        <CartPage />
                    </AuthRequire>} />
                <Route path="/checkout" element={
                    <AuthRequire>
                        <CheckoutPage />
                    </AuthRequire>
                } />
                <Route path='/store' element={<StorePage />} />
                <Route path='/policy' element={<PolicyPage />} />
                <Route path='/contact' element={<ContactPage />} />
                <Route path='/edititem' element={<EditItemPage />} />
                <Route path='/manageorderpage' element={<ManageOrderPage />} />
            </Route>
            <Route element={<BlankLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    )
}

export default Router