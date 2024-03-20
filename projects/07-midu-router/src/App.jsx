// imports estáticos
import './App.css'
import { Suspense, lazy } from 'react'
import { Router } from './Router.jsx'
import { Route } from './Route.jsx'

// ?Imports dinámicos: devuelven una promesa
// lazy recibe una función que hará el import
const LazyAboutPage = lazy(() => import('./pages/About.jsx'))
const LazyHomePage = lazy(() => import('./pages/Home.jsx'))
const Lazy404Page = lazy(() => import('./pages/404.jsx'))
const LazySearchPage = lazy(() => import('./pages/Search.jsx'))

const appRoutes = [
  {
    path: '/:lang/about',
    Component: LazyAboutPage
  },
  {
    path: '/search/:query',
    Component: LazySearchPage
  }
]

// Cuando se haga imports dinámicos es necesario decirle a react que hay elementos de ui que no estaán disponibles
// Para eso hay que envolver esa parte con las etiquetas <Suspense></Suspense>
// Suspense puede recibir un callback, si hay una parte de Ui que está disponible}
// se podria decirle que poner mientras

function App () {
  return (
    <>
      <main>
        <Suspense fallback={<div>Loading</div>}>
          <Router routes={appRoutes} defaultComponent={Lazy404Page}>
            <Route path='/' Component={LazyHomePage} />
            <Route path='/about' Component={LazyAboutPage} />
          </Router>
        </Suspense>
      </main>
    </>
  )
}

export default App
