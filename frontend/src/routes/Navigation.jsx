import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { homeUrls } from './urls/homeUrls'
import { HomeLayout } from '../features/Home/layouts/HomeLayout'
import { HomePage } from '../features/Home/pages/HomePage'
import { ProductsPage } from '../features/Home/pages/ProductsPage'
import { BoardGamesPage } from '../features/Home/pages/BoardGamesPage'
import { Marketplace } from '../features/Home/pages/Marketplace'
import { PromosPage } from '../features/Home/pages/PromosPage'

import { accountUrls } from './urls/accountUrls'
import { AccountLayout } from '../features/Account/layouts/AccountLayout'
import { DashboardPage } from '../features/Account/pages/DashboardPage'
import { DirectionsPage } from '../features/Account/pages/DirectionsPage'
import { ProfilePage } from '../features/Account/pages/ProfilePage'
import { SellingHistoryPage } from '../features/Account/pages/SellingHistoryPage'
import { ShoppinghistoryPage } from '../features/Account/pages/ShoppinghistoryPage'
import { SecurityPage } from '../features/Account/pages/SecurityPage'

import { authUrls } from './urls/authUrls'
import { AuthLayout } from '../features/Auth/layouts/AuthLayout'
import { LoginPage } from '../features/Auth/pages/LoginPage'
import { RegisterPage } from '../features/Auth/pages/RegisterPage'
import { PasswordResetPage } from '../features/Auth/pages/PasswordResetPage'
import { ForgotPasswordPage } from '../features/Auth/pages/ForgotPasswordPage'
import { PaymentsPage } from '../features/Account/pages/PaymentsPage'
import { TrackingPage } from '../features/Account/pages/TrackingPage'
import { PublishProductPage } from '../features/Account/pages/PublishProductPage'

export function Navigation () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to={homeUrls.home} />} />
        <Route path={homeUrls.home} element={<HomeLayout><HomePage /></HomeLayout>} />
        <Route path={homeUrls.products} element={<HomeLayout><ProductsPage /></HomeLayout>} />
        <Route path={homeUrls.boardGames} element={<HomeLayout><BoardGamesPage /></HomeLayout>} />
        <Route path={homeUrls.marketplace} element={<HomeLayout><Marketplace /></HomeLayout>} />
        <Route path={homeUrls.promos} element={<HomeLayout><PromosPage /></HomeLayout>} />

        <Route path={authUrls.base} element={<Navigate to={authUrls.login} />} />
        <Route path={authUrls.login} element={<AuthLayout><LoginPage /></AuthLayout>} />
        <Route path={authUrls.register} element={<AuthLayout><RegisterPage /></AuthLayout>} />
        <Route path={authUrls.forgotPassword} element={<AuthLayout><ForgotPasswordPage /></AuthLayout>} />
        <Route path={authUrls.passwordReset} element={<AuthLayout><PasswordResetPage /></AuthLayout>} />

        <Route path={accountUrls.base} element={<Navigate to={accountUrls.dashboard} />} />
        <Route path={accountUrls.dashboard} element={<AccountLayout><DashboardPage /></AccountLayout>} />
        <Route path={accountUrls.directions} element={<AccountLayout><DirectionsPage /></AccountLayout>} />
        <Route path={accountUrls.profile} element={<AccountLayout><ProfilePage /></AccountLayout>} />
        <Route path={accountUrls.selling} element={<AccountLayout><SellingHistoryPage /></AccountLayout>} />
        <Route path={accountUrls.shopping} element={<AccountLayout><ShoppinghistoryPage /></AccountLayout>} />
        <Route path={accountUrls.security} element={<AccountLayout><SecurityPage /></AccountLayout>} />
        <Route path={accountUrls.payments} element={<AccountLayout><PaymentsPage /></AccountLayout>} />
        <Route path={accountUrls.tracking} element={<AccountLayout><TrackingPage /></AccountLayout>} />
        <Route path={accountUrls.publishProduct} element={<AccountLayout><PublishProductPage /></AccountLayout>} />
      </Routes>
    </BrowserRouter>
  )
}
