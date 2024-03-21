import { useState, useEffect, Children } from 'react'
import { EVENTS } from './utils/consts.js'
import { match } from 'path-to-regexp'
import { getCurrentPath } from './utils.js'

export function Router ({ children, routes = [], defaultComponent: DefaultComponent = () => null }) {
  const [currentPath, setCurrentPath] = useState(getCurrentPath())

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(getCurrentPath())
    }

    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
    window.addEventListener(EVENTS.POPSTATE, onLocationChange)

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
    }
  }, [])

  let routeParams = {}

  // añadir rutas de los childrens <Route /> components
  const routesFromChildren = Children.map(children, ({ props, type }) => {
    const { name } = type
    const isRoute = name === 'Route'
    return isRoute ? props : null
  })

  const routesTouse = routes.concat(routesFromChildren).filter(Boolean)

  const Page = routesTouse.find(({ path }) => {
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
