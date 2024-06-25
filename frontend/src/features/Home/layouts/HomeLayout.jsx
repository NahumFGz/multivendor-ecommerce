// /Users/nahumfg/Projects/GitHubProjects/multivendor-ecommerce/frontend/src/features/Home/layouts/HomeLayout.jsx
import { Footer } from '../components/Footer/Footer'
import { Header } from '../components/Header/Header'
import { useLocation, useNavigate } from 'react-router-dom'
import { homeUrls } from '../../../routes/urls/homeUrls'
import { Filters } from '../components/Filters/Filters'
import { useState, useEffect } from 'react'
import { useProductsAPI } from '../hooks/useProductsAPI'

export function HomeLayout ({ children }) {
  const location = useLocation()
  const { getProducts } = useProductsAPI()
  const [totalProducts, setTotalProducts] = useState(0)
  const [ordering, setOrdering] = useState('')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedSubCategories, setSelectedSubCategories] = useState([])
  const [filterTitle, setFilterTitle] = useState('')

  const navigate = useNavigate()

  // Función para actualizar la URL
  const updateUrlParams = (order, categories, subCategories) => {
    const searchParams = new URLSearchParams(location.search)
    if (order) {
      searchParams.set('ordering', order)
    } else {
      searchParams.delete('ordering')
    }
    if (categories.length > 0) {
      searchParams.set('categories', categories.join(','))
    } else {
      searchParams.delete('categories')
    }
    if (subCategories.length > 0) {
      searchParams.set('sub_categories', subCategories.join(','))
    } else {
      searchParams.delete('sub_categories')
    }
    navigate({
      pathname: location.pathname,
      search: searchParams.toString()
    })
  }

  // Función para leer parámetros de la URL
  const getQueryParams = () => {
    const searchParams = new URLSearchParams(location.search)
    const order = searchParams.get('ordering') || ''
    const categories = searchParams.get('categories') ? searchParams.get('categories').split(',').map(Number) : []
    const subCategories = searchParams.get('sub_categories') ? searchParams.get('sub_categories').split(',').map(Number) : []
    return { order, categories, subCategories }
  }

  // Funcion para obtener el titulo del filtro
  const getFilterTitle = (pathname) => {
    if (pathname === homeUrls.products) {
      return 'Productos'
    } else if (pathname === homeUrls.boardGames) {
      return 'Juegos de mesa'
    } else if (pathname === homeUrls.marketplace) {
      return 'Productos publicados'
    } else if (pathname === homeUrls.promos) {
      return 'Promociones'
    }
  }

  const fetchProducts = async (order = '', selectedCategories = [], selectedSubCategories = []) => {
    try {
      const response = await getProducts(1, 10, order, selectedCategories, selectedSubCategories)
      setTotalProducts(response.totalProducts)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const { order, categories, subCategories } = getQueryParams()
    setOrdering(order)
    setSelectedCategories(categories)
    setSelectedSubCategories(subCategories)
    fetchProducts(order, categories, subCategories)
  }, [location.search])

  useEffect(() => {
    console.log('location.pathname... ', location.pathname)
    setFilterTitle(getFilterTitle(location.pathname))
  }, [location.pathname])

  const handleOrderingChange = (order) => {
    setOrdering(order)
    updateUrlParams(order, selectedCategories, selectedSubCategories)
  }

  const handleCategoriesChange = (categories) => {
    setSelectedCategories(categories)
    updateUrlParams(ordering, categories, selectedSubCategories)
  }

  const handleSubCategoriesChange = (subCategories) => {
    setSelectedSubCategories(subCategories)
    updateUrlParams(ordering, selectedCategories, subCategories)
  }

  return (
    <div className='flex flex-col'>
      <div>
        <Header />
      </div>
      {location.pathname !== homeUrls.home && (
        <div className='mx-12 mt-2'>
          <Filters
            totalProducts={totalProducts}
            ordering={ordering}
            onOrderingChange={handleOrderingChange}
            selectedCategories={selectedCategories}
            selectedSubCategories={selectedSubCategories}
            onCategoriesChange={handleCategoriesChange}
            onSubCategoriesChange={handleSubCategoriesChange}
            filterTitle={filterTitle}
            showCategories={location.pathname !== homeUrls.boardGames}
          />
        </div>
      )}
      <div>
        {children}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}
