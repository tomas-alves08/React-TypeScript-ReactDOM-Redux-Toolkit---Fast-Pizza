import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../ui/Button'
import { formatCurrency } from '../../utilities/helpers'
import { IPizza } from '../../utilities/schemas'
import {
  addItem,
  getCart,
  deleteItem,
  decreaseItemQuantity,
  increaseItemQuantity,
} from '../cart/cartSlice'

interface MenuItemProps {
  pizza: IPizza
}

const MenuItem: FC<MenuItemProps> = ({ pizza }) => {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza
  const dispatch = useDispatch()
  const cart = useSelector(getCart)
  const pizzaIsAdded = cart?.find((pizza) => pizza.pizzaId === Number(id))

  console.log('cart: ', cart)
  const newPizza = {
    pizzaId: Number(id),
    name,
    unitPrice,
    quantity: 1,
    totalPrice: unitPrice,
  }

  return (
    <li className='flex gap-4 py-2'>
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 rounded-sm ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div className='flex grow flex-col pt-0.5'>
        <p className='font-medium'>{name}</p>
        <p className='text-sm capitalize italic text-stone-500'>
          {ingredients.join(', ')}
        </p>
        <div className='mt-auto flex items-center justify-between'>
          {!soldOut ? (
            <p className='text-sm'>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className='text-sm font-medium uppercase text-stone-500'>
              Sold out
            </p>
          )}

          {!soldOut &&
            (!pizzaIsAdded ? (
              <Button type='small' onClick={() => dispatch(addItem(newPizza))}>
                Add to cart
              </Button>
            ) : (
              <div className='ms:gap-3 flex items-center gap-2'>
                <Button
                  type='round'
                  onClick={() =>
                    dispatch(increaseItemQuantity(pizzaIsAdded.pizzaId))
                  }
                >
                  +
                </Button>
                <span className='text-sm font-medium'>
                  {pizzaIsAdded.quantity}
                </span>
                <Button
                  type='round'
                  onClick={() =>
                    dispatch(decreaseItemQuantity(pizzaIsAdded.pizzaId))
                  }
                >
                  -
                </Button>
                <Button
                  type='small'
                  onClick={() => dispatch(deleteItem(Number(id)))}
                >
                  Delete
                </Button>
              </div>
            ))}
        </div>
      </div>
    </li>
  )
}

export default MenuItem
