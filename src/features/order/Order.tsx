// Test ID: IIDSAT

import { IDelivery, IItem } from '../../utilities/schemas'
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utilities/helpers'
import { getOrder } from '../../services/apiRestaurant'
import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom'
import OrderItem from './OrderItem'

function Order() {
  const order = useLoaderData() as IDelivery
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
    customer,
  } = order
  const deliveryIn = calcMinutesLeft(estimatedDelivery || '')

  console.log(cart)

  return (
    <div className='space-y-8 px-4 py-6'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <h2 className='text-xl font-semibold'>Order #{id} status</h2>

        <div className='space-x-2'>
          {priority && (
            <span className='rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase text-red-50'>
              Priority
            </span>
          )}
          <span className='rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase text-green-50'>
            {status} order
          </span>
        </div>
      </div>

      {customer && <p>{customer}</p>}
      <div className='flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5'>
        <p className='font-medium'>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery || '')} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className='text-xs text-stone-500'>
          (Estimated delivery: {formatDate(estimatedDelivery || '')})
        </p>
      </div>

      <ul className='divide-y divide-stone-200 border-b border-t'>
        {cart &&
          cart.map((item) => {
            console.log('item: ', item.pizzaId)
            return <OrderItem item={item as IItem} key={item.pizzaId} />
          })}
      </ul>

      <div className='space-y-2 bg-stone-200 px-6 py-5'>
        <p className='text-sm font-medium text-stone-600'>
          Price pizza: {formatCurrency(orderPrice || 0)}
        </p>
        {priority && (
          <p className='text-sm font-medium text-stone-600'>
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className='font-bold'>
          To pay on delivery:{' '}
          {formatCurrency((orderPrice || 0) + priorityPrice)}
        </p>
      </div>
    </div>
  )
}

export async function loader(args: LoaderFunctionArgs<{ orderId: string }>) {
  console.log(args.params.orderId)
  if (typeof args.params.orderId === 'string') {
    const order = (await getOrder(args.params.orderId)) as IDelivery[]
    console.log(order)
    return order
  }
}

export default Order
