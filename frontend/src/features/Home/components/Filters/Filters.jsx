import {
  CheckboxGroup,
  RadioGroup,
  Select,
  SelectItem
} from '@nextui-org/react'

import PriceSlider from './PriceSlider'
import PopoverFilterWrapper from './PopoverFilterWrapper'
import ColorRadioItem from './ColorRadioItem'
import TagGroupItem from './TagGroupItem'
import RatingRadioGroup from './RatingRadioGroup'

export function Filters () {
  return (
    <header className='relative z-20 flex flex-col gap-2 rounded-medium bg-default-50 px-4 pb-3 pt-2 md:pt-3'>
      <div className='flex items-center gap-1 md:hidden md:gap-2'>
        <h2 className='text-large font-medium'>Shoes</h2>
        <span className='text-small text-default-400'>(1240)</span>
      </div>
      <div className='flex items-center justify-between gap-2 '>
        <div className='flex flex-row gap-2'>
          <div className='hidden items-center gap-1 md:flex'>
            <h2 className='text-medium font-medium'>Shoes</h2>
            <span className='text-small text-default-400'>(1240)</span>
          </div>
        </div>
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
          <PopoverFilterWrapper title='Color'>
            <RadioGroup
              aria-label='Color'
              classNames={{
                wrapper: 'gap-2'
              }}
              orientation='horizontal'
            >
              <ColorRadioItem color='#3F3F46' tooltip='Gray' value='gray' />
              <ColorRadioItem color='#F31260' tooltip='Red' value='red' />
              <ColorRadioItem color='#006FEE' tooltip='Blue' value='blue' />
              <ColorRadioItem color='#17C964' tooltip='Green' value='green' />
              <ColorRadioItem color='#F5A524' tooltip='Yellow' value='yellow' />
              <ColorRadioItem color='#222222' tooltip='Black' value='black' />
              <ColorRadioItem color='#ffffff' tooltip='White' value='white' />
            </RadioGroup>
          </PopoverFilterWrapper>
          <PopoverFilterWrapper title='Size'>
            <CheckboxGroup
              aria-label='Select size'
              className='gap-1'
              orientation='horizontal'
            >
              <TagGroupItem value='35'>35</TagGroupItem>
              <TagGroupItem value='36'>36</TagGroupItem>
              <TagGroupItem value='37'>37</TagGroupItem>
              <TagGroupItem value='38'>38</TagGroupItem>
              <TagGroupItem value='39'>39</TagGroupItem>
              <TagGroupItem value='40'>40</TagGroupItem>
              <TagGroupItem value='41'>41</TagGroupItem>
              <TagGroupItem value='42'>42</TagGroupItem>
              <TagGroupItem value='43'>43</TagGroupItem>
              <TagGroupItem value='44'>44</TagGroupItem>
              <TagGroupItem value='45'>45</TagGroupItem>
              <TagGroupItem value='46'>46</TagGroupItem>
            </CheckboxGroup>
          </PopoverFilterWrapper>
          <PopoverFilterWrapper title='Rating'>
            <RatingRadioGroup className='w-72' />
          </PopoverFilterWrapper>
          <PopoverFilterWrapper title='Category'>
            <CheckboxGroup
              aria-label='Select category'
              className='gap-1'
              orientation='horizontal'
            >
              <TagGroupItem value='sneakers'>Sneakers</TagGroupItem>
              <TagGroupItem value='boots'>Boots</TagGroupItem>
              <TagGroupItem value='sandals'>Sandals</TagGroupItem>
              <TagGroupItem value='slippers'>Slippers</TagGroupItem>
              <TagGroupItem value='basketball'>Basketball</TagGroupItem>
              <TagGroupItem value='running'>Running</TagGroupItem>
              <TagGroupItem value='football'>Football</TagGroupItem>
              <TagGroupItem value='paddle'>Paddle</TagGroupItem>
              <TagGroupItem value='tennis'>Tennis</TagGroupItem>
              <TagGroupItem value='golf'>Golf</TagGroupItem>
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
            <SelectItem key='most_popular' value='most_popular'>
              Most Popular
            </SelectItem>
          </Select>
        </div>
      </div>
    </header>
  )
}
