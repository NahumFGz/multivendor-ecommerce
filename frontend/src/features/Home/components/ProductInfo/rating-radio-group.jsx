import { RadioGroup } from '@nextui-org/react'

import { cn } from './cn'

import RatingRadioItem from './rating-radio-item'
import { forwardRef, useMemo, useState } from 'react'

const RatingRadioGroup = forwardRef(({ className, label, hideStarsText, ...props }, ref) => {
  const [value, setValue] = useState('1')
  const starsText = useMemo(() => {
    // Special case for 5 stars
    if (value === '5') {
      return '5 stars'
    }

    // For 1 to 4 stars, use a generic approach
    return `${value} stars & up`
  }, [value])

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <RadioGroup
        ref={ref}
        value={value}
        {...props}
        defaultValue='1'
        orientation='horizontal'
        onValueChange={setValue}
      >
        <RatingRadioItem value='1' />
        <RatingRadioItem value='2' />
        <RatingRadioItem value='3' />
        <RatingRadioItem value='4' />
        <RatingRadioItem value='5' />
      </RadioGroup>
      {label || null}
      {!hideStarsText && <p className='text-medium text-default-400'>{starsText}</p>}
    </div>
  )
})

RatingRadioGroup.displayName = 'RatingRadioGroup'

export default RatingRadioGroup
