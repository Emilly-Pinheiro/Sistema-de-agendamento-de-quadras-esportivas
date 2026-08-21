import { useEffect, useState } from 'react'

export default function useLocation() {
  const [location, setLocation] = useState(() => window.location)

  useEffect(() => {
    const update = () => setLocation({ pathname: window.location.pathname, search: window.location.search })
    window.addEventListener('popstate', update)
    return () => window.removeEventListener('popstate', update)
  }, [])

  return location
}
