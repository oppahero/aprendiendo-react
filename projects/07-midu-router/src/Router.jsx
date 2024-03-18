import { useState, useEffect } from 'react'
import { EVENTS } from './utils/consts.js'

export function Router ({ routes = [], defaultComponent: DefaultComponent = () => null }) {
  const [currentPage, setCurrentPage] = useState(window.location.pathname)

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPage(window.location.pathname)
    }

    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
    window.addEventListener(EVENTS.POPSTATE, onLocationChange)

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
    }
  }, [])

  const Page = routes.find(({ path }) => path === currentPage)?.Component
  return Page ? <Page /> : <DefaultComponent />
}
