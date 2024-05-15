import { FC } from 'react'
import { useRouteError } from 'react-router-dom'
import LinkButton from './LinkButton'

const Error: FC = () => {
  const error = useRouteError() as any
  console.log(error)

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>
      <LinkButton to='-1'>&larr; Go back</LinkButton>
    </div>
  )
}

export default Error
