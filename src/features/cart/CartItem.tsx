import { FC } from 'react'
import { useDispatch } from 'react-redux'
import Button from '../../ui/Button'
import { formatCurrency } from '../../utilities/helpers'
import { IItem } from '../../utilities/schemas'
import {
  decreaseItemQuantity,
  deleteItem,
  increaseItemQuantity,
} from './cartSlice'

interface CartItemProps {
  item: IItem
}

const CartItem: FC<CartItemProps> = ({ item }) => {
  const { pizzaId, name, quantity, totalPrice } = item
  const dispatch = useDispatch()

  return (
    <li className='py-3 sm:flex sm:items-center sm:justify-between'>
      <p className='mb-1 sm:mb-0'>
        {quantity}&times; {name}
      </p>
      <div className='flex items-center justify-between sm:gap-6'>
        <p className='text-sm font-bold'>{formatCurrency(totalPrice)}</p>
        <div className='flex items-center gap-2 md:gap-3'>
          <Button
            type='round'
            onClick={() => dispatch(increaseItemQuantity(pizzaId))}
          >
            +
          </Button>
          <span className='text-sm font-medium'>{quantity}</span>
          <Button
            type='round'
            onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
          >
            -
          </Button>
        </div>
        <Button type='small' onClick={() => dispatch(deleteItem(pizzaId))}>
          Delete
        </Button>
      </div>
    </li>
  )
}

export default CartItem
