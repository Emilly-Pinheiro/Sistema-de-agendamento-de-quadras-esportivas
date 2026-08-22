import { Link as RouterLink } from 'react-router-dom'

export function Link({ to, ...props }) {
  return <RouterLink to={to} {...props} />
}
