import { Accordion, AccordionItem, Button } from '@nextui-org/react'
import { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'

const dummyPurchases = [
  { id: 1, title: 'Product 1', description: 'Description for product 1', date: '2024-01-01', price: '$10.00' },
  { id: 2, title: 'Product 2', description: 'Description for product 2', date: '2024-01-02', price: '$20.00' },
  { id: 3, title: 'Product 3', description: 'Description for product 3', date: '2024-01-03', price: '$30.00' },
  { id: 4, title: 'Product 4', description: 'Description for product 4', date: '2024-01-04', price: '$40.00' },
  { id: 5, title: 'Product 5', description: 'Description for product 5', date: '2024-01-05', price: '$50.00' },
  { id: 6, title: 'Product 6', description: 'Description for product 6', date: '2024-01-06', price: '$60.00' },
  { id: 7, title: 'Product 7', description: 'Description for product 7', date: '2024-01-07', price: '$70.00' },
  { id: 8, title: 'Product 8', description: 'Description for product 8', date: '2024-01-08', price: '$80.00' },
  { id: 9, title: 'Product 9', description: 'Description for product 9', date: '2024-01-09', price: '$90.00' },
  { id: 10, title: 'Product 10', description: 'Description for product 10', date: '2024-01-10', price: '$100.00' }
]

export function SellingHistoryForm () {
  const [purchases, setPurchases] = useState([])

  useEffect(() => {
    // Aquí deberías hacer la llamada a la API para obtener las últimas compras.
    // Simulamos la llamada con datos ficticios.
    setPurchases(dummyPurchases)
  }, [])

  return (
    <div className='space-y-12'>
      <div className='grid grid-cols-1 gap-x-8 gap-y-10 border-b border-default-900/10 pb-12 md:grid-cols-3'>
        <div>
          <h2 className='text-base font-semibold leading-7 text-default-900'>Recent Purchases</h2>
          <p className='mt-1 text-sm leading-6 text-default-500'>Here are your latest 10 purchases.</p>
        </div>
        <div className='grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2'>
          <Accordion className='col-span-full'>
            {purchases.map((purchase) => (
              <AccordionItem
                key={purchase.id}
                aria-label={`Purchase ${purchase.id}`}
                title={`${purchase.title} - ${purchase.price}`}
                subtitle={`Date: ${purchase.date}`}
                startContent={
                  <Icon icon='solar:box-bold' width={24} />
                }
              >
                <div>
                  <p>{purchase.description}</p>
                  <Button size='sm' className='mt-2'>
                    View Details
                  </Button>
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  )
}
