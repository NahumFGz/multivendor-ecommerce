import { useNavigate, useLocation } from 'react-router-dom'

export function useUrlParams () {
  const navigate = useNavigate()
  const location = useLocation()

  const updateUrlParams = (params) => {
    const searchParams = new URLSearchParams(location.search)
    searchParams.set('page', params.currentPage)
    searchParams.set('pageSize', params.pageSize)
    if (params.ordering) {
      searchParams.set('ordering', params.ordering)
    } else {
      searchParams.delete('ordering')
    }
    if (params.selectedCategories.length > 0) {
      searchParams.set('categories', params.selectedCategories.join(','))
    } else {
      searchParams.delete('categories')
    }
    if (params.selectedSubCategories.length > 0) {
      searchParams.set('sub_categories', params.selectedSubCategories.join(','))
    } else {
      searchParams.delete('sub_categories')
    }
    navigate({
      pathname: location.pathname,
      search: searchParams.toString()
    })
  }

  const getQueryParams = () => {
    const searchParams = new URLSearchParams(location.search)
    const currentPage = parseInt(searchParams.get('page')) || 1
    const pageSize = parseInt(searchParams.get('pageSize')) || 12
    const ordering = searchParams.get('ordering') || ''
    const selectedCategories = searchParams.get('categories') ? searchParams.get('categories').split(',').map(Number) : []
    const selectedSubCategories = searchParams.get('sub_categories') ? searchParams.get('sub_categories').split(',').map(Number) : []
    return { currentPage, pageSize, ordering, selectedCategories, selectedSubCategories }
  }

  return { updateUrlParams, getQueryParams }
}
