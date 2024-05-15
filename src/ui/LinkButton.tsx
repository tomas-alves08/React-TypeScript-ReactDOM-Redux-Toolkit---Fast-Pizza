import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'

interface LinkButtonProps {
  children: string
  to: string
}

const LinkButton: FC<LinkButtonProps> = ({ children, to }) => {
  const navigate = useNavigate()
  const styleClass = 'text-sm text-blue-500 hover:text-blue-600'

  if (to === '-1')
    return (
      <button onClick={() => navigate(-1)} className={styleClass}>
        {children}
      </button>
    )

  return (
    <Link to={to} className={styleClass}>
      {children}
    </Link>
  )
}

export default LinkButton
