import { FC, MouseEventHandler } from 'react'
import { Link } from 'react-router-dom'
import { IButtonStyles } from '../utilities/schemas'

interface ButtonProps {
  children: string
  disabled?: boolean
  to?: string
  type?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}

const Button: FC<ButtonProps> = ({
  children,
  disabled,
  to,
  type = 'primary',
  onClick,
}) => {
  const base =
    'inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed'

  const styles: IButtonStyles = {
    primary: base + ' px-4 py-3 sm:px-6 sm:py-4',
    small: base + ' px-4 py-2 md:px-5 md:py-2.5 text-sm',
    round: base + ' px-2.5 py-1 md:px-3.5 md:py-2 text-sm',
    secondary:
      'inline-block text-sm px-4 py-2.5 sm:px-6 sm:py-3.5 rounded-full border-2 border-stone-300 font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:text-stone-800 focus:bg-stone-300 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed',
  }
  if (to)
    return (
      <Link className={(styles as any)[type]} to={to}>
        {children}
      </Link>
    )

  if (onClick)
    return (
      <button
        disabled={disabled}
        onClick={onClick}
        className={(styles as any)[type]}
      >
        {children}
      </button>
    )

  return (
    <button disabled={disabled} className={(styles as any)[type]}>
      {children}
    </button>
  )
}

export default Button
