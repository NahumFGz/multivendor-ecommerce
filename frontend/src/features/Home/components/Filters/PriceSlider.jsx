import { Divider, Input, Slider, cn } from '@nextui-org/react'
import { forwardRef, useCallback, useMemo, useState } from 'react'

function clampValue (value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function scaleValue (value, fromRange, toRange = [0, 100]) {
  const [fromMin, fromMax] = fromRange
  const [toMin, toMax] = toRange

  // Scaling factor to map the value from one range to another
  const scale = (toMax - toMin) / (fromMax - fromMin)

  // Applying the scaling factor to the value and adjusting by the minimum of the target range
  return (value - fromMin) * scale + toMin
}

const PriceSliderPip = ({ animation = 'height', isInRange }) => {
  const rand = useMemo(() => Math.floor(Math.random() * 100), [])

  const height = clampValue(rand, 30, 100) + '%'

  const pip = useMemo(() => {
    if (animation === 'height') {
      return (
        <span
          className="relative h-12 w-1 rounded-full bg-default-100 after:absolute after:bottom-0 after:h-0 after:w-full after:rounded-full after:bg-primary after:transition-all after:!duration-500 after:content-[''] data-[in-range=true]:after:h-full"
          data-in-range={isInRange}
          style={{
            height
          }}
        />
      )
    }

    return (
      <span
        className='h-12 w-1 rounded-full bg-primary transition-all !duration-500'
        style={{
          background: isInRange
            ? 'hsl(var(--nextui-primary-500))'
            : 'hsl(var(--nextui-default-100))',
          height
        }}
      />
    )
  }, [isInRange, height, animation])

  return pip
}

const PriceSlider = forwardRef(({ range, animation, className, ...props }, ref) => {
  const defaultValue = useMemo(() => range?.defaultValue || [0, 1000], [range?.defaultValue])

  const [value, setValue] = useState(defaultValue)

  const rangePercentageValue = useMemo(() => {
    const rangeScale = [range?.min || defaultValue[0], range?.max || defaultValue[1]]

    const minPercentage = Math.floor(scaleValue(value[0], rangeScale))
    const maxPercentage = Math.floor(scaleValue(value[1], rangeScale))

    return [minPercentage, maxPercentage]
  }, [value, range?.min, range?.max, defaultValue])

  const rangePips = useMemo(() => {
    return Array.from({ length: 32 }).map((_, index) => {
      const pipValuePercentage = Math.round(scaleValue(index, [0, 31]))

      const isInRange =
        pipValuePercentage >= rangePercentageValue[0] + 5 &&
        pipValuePercentage <= rangePercentageValue[1] + 2

      return <PriceSliderPip key={index} animation={animation} isInRange={isInRange} />
    })
  }, [animation, rangePercentageValue])

  const onMinInputValueChange = useCallback(
    (inputValue) => {
      const newValue = Number(inputValue)
      const minValue = range?.min ?? defaultValue[0]

      if (!isNaN(newValue)) {
        const clampedValue = clampValue(newValue, minValue, value[1])

        setValue([clampedValue, value[1]])
      }
    },
    [value, range?.min, defaultValue]
  )

  const onMaxInputValueChange = useCallback(
    (inputValue) => {
      const newValue = Number(inputValue)
      const maxValue = range?.max ?? defaultValue[1]

      if (!isNaN(newValue) && newValue <= maxValue) {
        setValue([value[0], newValue])
      }
    },
    [value, range?.max, defaultValue]
  )

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div className='flex flex-col gap-1'>
        <div className='flex h-12 w-full items-end justify-between px-2'>{rangePips}</div>
        <Slider
          {...props}
          ref={ref}
          formatOptions={{ style: 'currency', currency: 'USD' }}
          maxValue={range?.max}
          minValue={range?.min}
          size='sm'
          step={range?.step}
          value={value}
          onChange={(value) => {
            setValue(value)
          }}
        />
      </div>
      <div className='flex items-center'>
        <Input
          aria-label='Min price'
          labelPlacement='outside'
          startContent={<p className='text-default-400'>S/</p>}
          type='number'
          value={`${value[0]}`}
          onValueChange={onMinInputValueChange}
        />

        <Divider className='mx-2 w-2' />
        <Input
          aria-label='Max price'
          labelPlacement='outside'
          startContent={<p className='text-default-400'>S/</p>}
          type='number'
          value={`${value[1]}`}
          onValueChange={onMaxInputValueChange}
        />
      </div>
    </div>
  )
})

PriceSlider.displayName = 'PriceSlider'

export default PriceSlider
