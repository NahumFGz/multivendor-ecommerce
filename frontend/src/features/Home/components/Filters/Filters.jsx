import {
  Chip,
  CheckboxGroup,
  Select,
  SelectItem
} from '@nextui-org/react'

import PopoverFilterWrapper from './PopoverFilterWrapper'
import TagGroupItem from './TagGroupItem'
import { useEffect, useState } from 'react'
import { useInfoAPI, getCategories, getKindsByCategoryId } from '../../hooks/useInfoAPI'

export function Filters (
  {
    totalProducts,
    ordering,
    onOrderingChange,
    selectedCategories,
    selectedKinds,
    onCategoriesChange,
    onKindsChange
  }) {
  const handleSortChange = (key) => {
    let order = ''
    if (key === 'newest') {
      order = '-updated_at'
    } else if (key === 'price_low_to_high') {
      order = 'price'
    } else if (key === 'price_high_to_low') {
      order = '-price'
    }
    onOrderingChange(order)
  }

  //! Test useInfoAPI **************
  const { getAllFilters } = useInfoAPI()
  const [filtersInfo, setFiltersInfo] = useState([])
  const [categoriesInfo, setCategoriesInfo] = useState([])
  const [kindsInfo, setKindsInfo] = useState([])

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const { allFiltersInfo } = await getAllFilters()
        setFiltersInfo(allFiltersInfo)

        const categories = getCategories(allFiltersInfo)
        setCategoriesInfo(categories)

        const { kinds: allKinds } = getKindsByCategoryId(allFiltersInfo, '')
        setKindsInfo(allKinds)
      } catch (error) {
        console.error('Get all filters failed', error)
      }
    }
    fetchInfo()
  }, [])

  useEffect(() => {
    if (filtersInfo.length) {
      console.log('filtersInfo... ', filtersInfo)
      console.log('categoriesInfo... ', categoriesInfo)
      console.log('kindsInfo... ', kindsInfo)
    }
  }, [filtersInfo])

  //! ******************************

  const handleCategoriesChange = (values) => {
    console.log('values... ', values)
    const { kinds: allKinds } = getKindsByCategoryId(filtersInfo, values)
    setKindsInfo(allKinds)
    onCategoriesChange(values.map(Number))
  }

  const handleKindsChange = (values) => {
    console.log('values... ', values)
    onKindsChange(values.map(Number))
  }

  const getKeyFromOrdering = (ordering) => {
    switch (ordering) {
      case '-updated_at':
        return 'newest'
      case 'price':
        return 'price_low_to_high'
      case '-price':
        return 'price_high_to_low'
      default:
        return 'newest'
    }
  }

  return (
    <div className='flex flex-col'>
      <header className='rounded-medium bg-default-50 px-4 py-3 mt-2'>

        {/* Mobile Title */}
        <div className='flex items-center gap-1 md:hidden md:gap-2'>
          <h2 className='text-large font-medium'>Products</h2>
          <span className='text-small text-default-400'>{`(${totalProducts})`}</span>
        </div>

        <div className='flex items-center justify-between gap-2'>

          {/* Desktop Title */}
          <div className='flex flex-row gap-2'>
            <div className='hidden items-center gap-1 md:flex'>
              <h2 className='text-medium font-medium'>Products</h2>
              <span className='text-small text-default-400'>{`(${totalProducts})`}</span>
            </div>
          </div>

          {/* Filters */}
          <div className='-ml-2 flex w-full flex-wrap items-center justify-start gap-2 md:ml-0 md:justify-end'>

            {/* Categories */}
            <PopoverFilterWrapper title='Productos'>
              <CheckboxGroup
                aria-label='Select products'
                className='gap-1'
                orientation='horizontal'
                value={selectedCategories.map(String)}
                onChange={handleCategoriesChange}
              >
                {categoriesInfo.map(val => (
                  <TagGroupItem key={val.id} value={val.categoryId}>{val.categoryName}</TagGroupItem>
                ))}
              </CheckboxGroup>
            </PopoverFilterWrapper>

            {/* Kind */}
            <PopoverFilterWrapper title='Colección'>
              <CheckboxGroup
                aria-label='Select collection'
                className='gap-1'
                orientation='horizontal'
                value={selectedKinds.map(String)}
                onChange={handleKindsChange}
              >
                {kindsInfo.map(val => (
                  <TagGroupItem key={val.id} value={val.kindId}>{val.kindName}</TagGroupItem>
                ))}
              </CheckboxGroup>
            </PopoverFilterWrapper>

            <Select
              aria-label='Sort by'
              classNames={{
                base: 'items-center justify-end max-w-fit',
                value: 'w-[162px]'
              }}
              selectedKeys={[getKeyFromOrdering(ordering)]}
              labelPlacement='outside-left'
              placeholder='Select an option'
              variant='bordered'
              onSelectionChange={(keys) => handleSortChange(Array.from(keys)[0])}
            >
              <SelectItem key='newest' value='newest'>
                Productos nuevos
              </SelectItem>
              <SelectItem key='price_low_to_high' value='price_low_to_high'>
                Precio: menos a más
              </SelectItem>
              <SelectItem key='price_high_to_low' value='price_high_to_low'>
                Precio: más a menos
              </SelectItem>
            </Select>
          </div>
        </div>
      </header>

      {/* List of applied filters */}
      <div className='mb-4 mt-2 flex flex-wrap items-center gap-2'>
        {Array.from({ length: 6 }).map((_, index) => (
          <Chip
            key={index}
            classNames={{
              content: 'text-default-700',
              closeButton: 'text-default-500'
            }}
            variant='flat'
            onClose={() => { console.log('close') }}
          >
            Filter {index + 1}
          </Chip>
        ))}
      </div>
    </div>
  )
}
