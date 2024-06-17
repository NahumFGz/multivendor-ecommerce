import {
  Chip,
  CheckboxGroup,
  Select,
  SelectItem
} from '@nextui-org/react'

import PriceSlider from './PriceSlider'
import PopoverFilterWrapper from './PopoverFilterWrapper'
import TagGroupItem from './TagGroupItem'

export function Filters () {
  return (
    <div className='flex flex-col'>
      <header className='rounded-medium bg-default-50 px-4 py-3 mt-2'>

        {/* Mobile Title */}
        <div className='flex items-center gap-1 md:hidden md:gap-2'>
          <h2 className='text-large font-medium'>Shoes</h2>
          <span className='text-small text-default-400'>(1240)</span>
        </div>

        <div className='flex items-center justify-between gap-2'>

          {/* Desktop Title */}
          <div className='flex flex-row gap-2'>
            <div className='hidden items-center gap-1 md:flex'>
              <h2 className='text-medium font-medium'>Shoes</h2>
              <span className='text-small text-default-400'>(1240)</span>
            </div>
          </div>

          {/* Filters */}
          <div className='-ml-2 flex w-full flex-wrap items-center justify-start gap-2 md:ml-0 md:justify-end'>
            <PopoverFilterWrapper title='Pricing Range'>
              <PriceSlider
                aria-label='Pricing Filter'
                range={{
                  min: 0,
                  defaultValue: [100, 500],
                  max: 2000,
                  step: 1
                }}
              />
            </PopoverFilterWrapper>
            {/* Categories */}
            <PopoverFilterWrapper title='Category'>
              <CheckboxGroup
                aria-label='Select category'
                className='gap-1'
                orientation='horizontal'
              >
                <TagGroupItem value='category1'>Cat 1</TagGroupItem>
                <TagGroupItem value='category2'>Category 2</TagGroupItem>
                <TagGroupItem value='category3'>Category 3</TagGroupItem>
                <TagGroupItem value='category4'>Category 4</TagGroupItem>
                <TagGroupItem value='category5'>Cat 5</TagGroupItem>
                <TagGroupItem value='category6'>Category 6</TagGroupItem>
                <TagGroupItem value='category7'>Category 7</TagGroupItem>
              </CheckboxGroup>
            </PopoverFilterWrapper>

            {/* Kind */}
            <PopoverFilterWrapper title='Kind'>
              <CheckboxGroup
                aria-label='Select kind'
                className='gap-1'
                orientation='horizontal'
              >
                <TagGroupItem value='kind1'>Ki 1</TagGroupItem>
                <TagGroupItem value='kind2'>Kind 2</TagGroupItem>
                <TagGroupItem value='kind3'>Kind 3</TagGroupItem>
                <TagGroupItem value='kind4'>Kind 4</TagGroupItem>
                <TagGroupItem value='kind5'>Kind 5</TagGroupItem>
              </CheckboxGroup>
            </PopoverFilterWrapper>

            {/* Sub-Kind */}
            <PopoverFilterWrapper title='Sub Kind'>
              <CheckboxGroup
                aria-label='Select kind'
                className='gap-1'
                orientation='horizontal'
              >
                <TagGroupItem value='subkind1'>Sk 1</TagGroupItem>
                <TagGroupItem value='subkind2'>Sub kind 2</TagGroupItem>
                <TagGroupItem value='subkind3'>Sub kind 3</TagGroupItem>
                <TagGroupItem value='subkind4'>Sub kind 4</TagGroupItem>
                <TagGroupItem value='subkind5'>Sub kind 5</TagGroupItem>
              </CheckboxGroup>
            </PopoverFilterWrapper>
            <Select
              aria-label='Sort by'
              classNames={{
                base: 'items-center justify-end max-w-fit',
                value: 'w-[142px]'
              }}
              defaultSelectedKeys={['most_popular']}
              labelPlacement='outside-left'
              placeholder='Select an option'
              variant='bordered'
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
              <SelectItem key='top_rated' value='top_rated'>
                Top Rated
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
            onClose={() => {}}
          >
            Filter {index + 1}
          </Chip>
        ))}
      </div>
    </div>
  )
}
