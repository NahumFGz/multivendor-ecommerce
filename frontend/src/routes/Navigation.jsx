import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { homeUrls } from './urls/homeUrls'
import { HomeLayout } from '../features/Home/layouts/HomeLayout'
import { HomePage } from '../features/Home/pages/HomePage'
import { ProductsPage } from '../features/Home/pages/ProductsPage'
import { BoardGamesPage } from '../features/Home/pages/BoardGamesPage'
import { Marketplace } from '../features/Home/pages/Marketplace'
import { PromosPage } from '../features/Home/pages/PromosPage'

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
      </Routes>
    </BrowserRouter>
  )
}
