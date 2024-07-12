import { Accordion, AccordionItem } from '@nextui-org/react'
import { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'

const dummyPurchases = [
  {
    id: 1,
    date: '2024-01-01',
    totalAmount: '$60.00',
    products: [
      { title: 'Product 1', quantity: 2, price: '$20.00' },
      { title: 'Product 2', quantity: 2, price: '$40.00' }
    ]
  },
  {
    id: 2,
    date: '2024-01-02',
    totalAmount: '$30.00',
    products: [
      { title: 'Product 3', quantity: 1, price: '$30.00' }
    ]
  }
  // Agrega más compras ficticias aquí
]

export function ShopingHistoryForm () {
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
          <h2 className='text-base font-semibold leading-7 text-default-900'>Compras recientes</h2>
          <p className='mt-1 text-sm leading-6 text-default-500'>Aquí podras ver tus ultimas 10 compras</p>
        </div>
        <div className='grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2'>
          <Accordion className='col-span-full'>
            {purchases.map((purchase) => (
              <AccordionItem
                key={purchase.id}
                aria-label={`Purchase ${purchase.id}`}
                title={`Order #${purchase.id} - ${purchase.totalAmount}`}
                subtitle={`Date: ${purchase.date}`}
                startContent={
                  <Icon icon='ic:baseline-shopping-cart' width={24} />
                }
              >
                <div>
                  {purchase.products.map((product, index) => (
                    <p key={index}>{`${product.title} x${product.quantity} - ${product.price}`}</p>
                  ))}
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  )
}
