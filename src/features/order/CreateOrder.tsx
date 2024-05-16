import { FC, useState } from 'react'
import {
  ActionFunction,
  Form,
  redirect,
  useActionData,
  useNavigation,
} from 'react-router-dom'
import { createOrder } from '../../services/apiRestaurant'
import Button from '../../ui/Button'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAddress } from '../user/userSlice'
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice'
import store, { RootStateType } from '../../store'
import { formatCurrency } from '../../utilities/helpers'
import { IDelivery } from '../../utilities/schemas'

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  )

const CreateOrder: FC = () => {
  const [withPriority, setWithPriority] = useState<number>(0)
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  const formErrors = useActionData() as { phone: string }
  const cart = useSelector(getCart)
  const user = useSelector((state: RootStateType) => state.user)
  const dispatch = useDispatch()

  const totalPrice = useSelector(getTotalCartPrice) || 0
  const priorityPrice = withPriority ? totalPrice * 0.2 : 0
  const totalOrderPrice = totalPrice + priorityPrice

  const isLoading = user.status === 'loading'

  return (
    <div className='px-4 py-6'>
      <h2 className='mb-8 text-xl font-semibold'>Ready to order? Let's go!</h2>

      <Form method='POST' action=''>
        <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>First Name</label>
          <input
            type='text'
            name='customer'
            defaultValue={user.username}
            required
            className='input grow'
          />
        </div>

        <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>Phone number</label>
          <div className='grow'>
            <input type='tel' name='phone' required className='input w-full' />
            {formErrors?.phone && (
              <p className='mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700'>
                {formErrors?.phone}
              </p>
            )}
          </div>
        </div>
        <div className='relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>Address</label>
          <div className='grow'>
            <input
              type='text'
              name='address'
              defaultValue={isLoading ? 'loading address...' : user.address}
              disabled={isLoading}
              required
              className='input w-full'
            />
            {user.status === 'error' && (
              <p className='mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700'>
                {user.error}
              </p>
            )}
          </div>
          {!user.address && (
            <span className='absolute right-[3px] top-[3px] z-20'>
              <Button
                disabled={isLoading}
                type='small'
                onClick={(e) => {
                  e.preventDefault()
                  dispatch(fetchAddress() as any)
                }}
              >
                Get Address
              </Button>
            </span>
          )}
        </div>

        <div className='mb-12 flex gap-5'>
          <input
            type='checkbox'
            name='priority'
            id='priority'
            className='h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2'
            value={withPriority}
            onChange={(e) => setWithPriority(Number(e.target.checked))}
          />
          <label htmlFor='priority' className='font-medium'>
            Want to yo give your order priority?
          </label>
        </div>

        <input type='hidden' name='cart' value={JSON.stringify(cart)} />
        <input
          type='hidden'
          name='position'
          value={
            user.position?.latitude && user.position.longitude
              ? `${user.position?.latitude},${user.position?.longitude}`
              : ''
          }
        />
        <div>
          <Button disabled={isSubmitting || isLoading}>
            {isSubmitting
              ? 'Placing order...'
              : `Order now (${formatCurrency(totalOrderPrice)})`}
          </Button>
        </div>
      </Form>
    </div>
  )
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  console.log(data)

  const errors: any = {}

  if (typeof data.phone === 'string' && !isValidPhone(data.phone))
    errors.phone = 'Please provide a valid phone number.'

  if (Object.values(errors).length > 0) return errors

  const order = {
    ...data,
    id: '',
    estimatedDelivery: '',
    position: '',
    orderPrice: 0,
    priorityPrice: 0,
    status: '',
    customer: data.customer,
    phone: data.phone,
    address: data.address,
    cart: !(data.cart instanceof File)
      ? JSON.parse(data.cart)
      : [
          {
            pizzaId: 0,
            name: '',
            quantity: 0,
            unitPrice: 0,
            totalPrice: 0,
          },
        ],
    priority: data.priority && data.priority === '1' ? true : false,
  }

  const newOrder = await createOrder(order as IDelivery)

  // DO NOT OVERUSE!!
  store.dispatch(clearCart())

  return redirect(`/order/${newOrder.id}`)
}

export default CreateOrder
