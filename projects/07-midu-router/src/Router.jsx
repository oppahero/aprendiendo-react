import { useState, useEffect } from 'react'
import { EVENTS } from './utils/consts.js'
import { match } from 'path-to-regexp'

export function Router ({ routes = [], defaultComponent: DefaultComponent = () => null }) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
    window.addEventListener(EVENTS.POPSTATE, onLocationChange)

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
    }
  }, [])

  let routeParams = {}

  const Page = routes.find(({ path }) => {
    if (path === currentPath) return true

    // Usando path-to-regrexp para
    // detectar rutas dinámicas
    // Ej search/:query
    const matchedUrl = match(path, { decode: decodeURIComponent })
    const matched = matchedUrl(currentPath)
    if (!matched) return false

    // Guadar los parámetros de la url que eran dinámicos
    routeParams = matched.params // {query: 'dato url'}
    return true
  })?.Component

  return Page
    ? <Page routeParams={routeParams} />
    : <DefaultComponent routeParams={routeParams} />
}
