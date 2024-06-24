import {
  Chip,
  CheckboxGroup,
  Select,
  SelectItem
} from '@nextui-org/react'

import PopoverFilterWrapper from './PopoverFilterWrapper'
import TagGroupItem from './TagGroupItem'
import { useEffect, useState } from 'react'
import { useInfoAPI, getCategories, getKindsAndSubkindsByCategoryId, getSubkindsByKindId } from '../../hooks/useInfoAPI'

export function Filters (
  {
    totalProducts,
    ordering,
    onOrderingChange,
    categories,
    kinds,
    subKinds,
    selectedCategories,
    selectedKinds,
    selectedSubKinds,
    onCategoriesChange,
    onKindsChange,
    onSubKindsChange
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
  const [subKindsInfo, setSubKindsInfo] = useState([])

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await getAllFilters()
        setFiltersInfo(response)
      } catch (error) {
        console.error('Get all filters failed', error)
      }
    }
    fetchInfo()
  }, []) // Este efecto solo se ejecuta una vez cuando el componente se monta

  useEffect(() => {
    console.log('filtersInfo... ', filtersInfo)
  }, [filtersInfo]) // Este efecto se ejecuta cada vez que `filtersInfo` cambia

  useEffect(() => {
    // Ejemplo de uso:
    const data = [
      {
        categoryId: '3',
        categoryName: 'Pokemon',
        kindId: '1',
        kindName: 'Shrouded Fable',
        subKindId: '1',
        subKindName: 'single'
      },
      {
        categoryId: '3',
        categoryName: 'Pokemon',
        kindId: '1',
        kindName: 'Shrouded Fable',
        subKindId: '2',
        subKindName: 'thin'
      },
      {
        categoryId: '3',
        categoryName: 'Pokemon',
        kindId: '1',
        kindName: 'Shrouded Fable',
        subKindId: '3',
        subKindName: 'sellado'
      },
      {
        categoryId: '3',
        categoryName: 'Pokemon',
        kindId: '2',
        kindName: 'Twilight Masquerade',
        subKindId: '4',
        subKindName: 'sellado'
      },
      {
        categoryId: '3',
        categoryName: 'Pokemon',
        kindId: '2',
        kindName: 'Twilight Masquerade',
        subKindId: '5',
        subKindName: 'single'
      },
      {
        categoryId: '3',
        categoryName: 'Pokemon',
        kindId: '4',
        kindName: 'Paldean Fates',
        subKindId: '6',
        subKindName: 'sellado'
      },
      {
        categoryId: '3',
        categoryName: 'Pokemon',
        kindId: '4',
        kindName: 'Paldean Fates',
        subKindId: '7',
        subKindName: 'single'
      },
      {
        categoryId: '2',
        categoryName: 'YuGiOh',
        kindId: '5',
        kindName: '2014 Mega Tins',
        subKindId: '8',
        subKindName: 'single'
      },
      {
        categoryId: '2',
        categoryName: 'YuGiOh',
        kindId: '5',
        kindName: '2014 Mega Tins',
        subKindId: '9',
        subKindName: 'especial'
      },
      {
        categoryId: '2',
        categoryName: 'YuGiOh',
        kindId: '3',
        kindName: '2017 Mega Tins',
        subKindId: '10',
        subKindName: 'single'
      },
      {
        categoryId: '1',
        categoryName: 'Juegos de Mesa',
        kindId: '6',
        kindName: 'Para adultos',
        subKindId: '11',
        subKindName: 'otros'
      },
      {
        categoryId: '1',
        categoryName: 'Juegos de Mesa',
        kindId: '8',
        kindName: 'Rompecabezas',
        subKindId: '12',
        subKindName: 'otros'
      },
      {
        categoryId: '1',
        categoryName: 'Juegos de Mesa',
        kindId: '7',
        kindName: 'Para niños',
        subKindId: '13',
        subKindName: 'otros'
      }
    ]

    // Caso 1: Cuando se ingresa categoryId
    const categoryId = '3'
    const { kinds: kindsWithCategory, subkinds: subkindsWithCategory } = getKindsAndSubkindsByCategoryId(data, categoryId)
    console.log('Kinds with categoryId:', kindsWithCategory)
    console.log('Subkinds with categoryId:', subkindsWithCategory)

    // Caso 2: Cuando no se ingresa categoryId
    const { kinds: allKinds, subkinds: allSubkinds } = getKindsAndSubkindsByCategoryId(data, '')
    console.log('All Kinds:', allKinds)
    console.log('All Subkinds:', allSubkinds)

    // Caso 3: Cuando se ingresa kindId
    const kindId = '1'
    const subkindsByKind = getSubkindsByKindId(data, kindId)
    console.log('Subkinds with kindId:', subkindsByKind)

    // Caso 4: Cuando no se ingresa kindId
    const allSubkindsByKind = getSubkindsByKindId(data, '')
    console.log('All Subkinds:', allSubkindsByKind)
  }, []) // Este efecto se ejecuta cada vez que `categoriesInfo` cambia

  //! ******************************

  const handleCategoriesChange = (values) => {
    onCategoriesChange(values.map(Number))
  }

  const handleKindsChange = (values) => {
    onKindsChange(values.map(Number))
  }

  const handleSubKindsChange = (values) => {
    onSubKindsChange(values.map(Number))
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
            <PopoverFilterWrapper title='Category'>
              <CheckboxGroup
                aria-label='Select category'
                className='gap-1'
                orientation='horizontal'
                value={selectedCategories.map(String)}
                onChange={handleCategoriesChange}
              >
                {categories.map(category => (
                  <TagGroupItem key={category.id} value={category.id.toString()}>{category.name}</TagGroupItem>
                ))}
              </CheckboxGroup>
            </PopoverFilterWrapper>

            {/* Kind */}
            <PopoverFilterWrapper title='Kind'>
              <CheckboxGroup
                aria-label='Select kind'
                className='gap-1'
                orientation='horizontal'
                value={selectedKinds.map(String)}
                onChange={handleKindsChange}
              >
                {kinds.map(kind => (
                  <TagGroupItem key={kind.id} value={kind.id.toString()}>{kind.name}</TagGroupItem>
                ))}
              </CheckboxGroup>
            </PopoverFilterWrapper>

            {/* Sub-Kind */}
            <PopoverFilterWrapper title='Sub Kind'>
              <CheckboxGroup
                aria-label='Select sub-kind'
                className='gap-1'
                orientation='horizontal'
                value={selectedSubKinds.map(String)}
                onChange={handleSubKindsChange}
              >
                {subKinds.map(subKind => (
                  <TagGroupItem key={subKind.id} value={subKind.id.toString()}>{subKind.name}</TagGroupItem>
                ))}
              </CheckboxGroup>
            </PopoverFilterWrapper>

            <Select
              aria-label='Sort by'
              classNames={{
                base: 'items-center justify-end max-w-fit',
                value: 'w-[142px]'
              }}
              selectedKeys={[getKeyFromOrdering(ordering)]}
              labelPlacement='outside-left'
              placeholder='Select an option'
              variant='bordered'
              onSelectionChange={(keys) => handleSortChange(Array.from(keys)[0])}
            >
              <SelectItem key='newest' value='newest'>
                Newest
              </SelectItem>
              <SelectItem key='price_low_to_high' value='price_low_to_high'>
                Price: Low to High
              </SelectItem>
              <SelectItem key='price_high_to_low' value='price_high_to_low'>
                Price: High to Low
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
