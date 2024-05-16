import { FC } from 'react'
import { IDelivery } from '../../utilities/schemas'
import Button from '../../ui/Button'
import { ActionFunction, useFetcher } from 'react-router-dom'
import { updateOrder } from '../../services/apiRestaurant'

interface UpdateOrderProps {
  order: IDelivery
}

const UpdateOrder: FC<UpdateOrderProps> = () => {
  const fetcher = useFetcher()

  return (
    <fetcher.Form method='PATCH' className='text-right'>
      <Button>Make priority</Button>
    </fetcher.Form>
  )
}

export default UpdateOrder

export const action: ActionFunction = async ({ request, params }) => {
  console.log('update', request, params)
  const data = { priority: true }
  const { orderId } = params
  await updateOrder(orderId ? orderId : '', data)
  return null
}
