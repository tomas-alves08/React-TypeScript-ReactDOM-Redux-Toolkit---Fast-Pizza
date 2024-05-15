import { FC } from 'react'
import LinkButton from '../../ui/LinkButton'
import Button from '../../ui/Button'
import CartItem from './CartItem'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, getCart } from './cartSlice'
import { useNavigate } from 'react-router-dom'
import { getUser } from '../user/userSlice'

const Cart: FC = () => {
  const cart = useSelector(getCart)
  const username = useSelector(getUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleClearCart() {
    dispatch(clearCart())
    navigate('/menu')
  }

  return (
    <div className='px-4 py-3'>
      <LinkButton to='/menu'>&larr; Back to menu</LinkButton>

      {!cart?.length ? (
        <p className='py-3'>
          Your cart is empty{username ? `, ${username}!` : '!'}
        </p>
      ) : (
        <>
          <h2 className='mt-7 text-xl font-semibold'>
            Your cart, <span className='capitalize'>{username}</span>
          </h2>

          <ul className='mt-3 divide-y divide-stone-200 border-b '>
            {cart &&
              cart.map((item) => <CartItem item={item} key={item.pizzaId} />)}
          </ul>

          <div className='mt-6 space-x-2'>
            <Button to='/order/new'>Order pizzas</Button>
            <Button type='secondary' onClick={handleClearCart}>
              Clear cart
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart
