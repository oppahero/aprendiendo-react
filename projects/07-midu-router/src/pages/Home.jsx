import { Link } from '../Link.jsx'

export default function HomePage () {
  return (
    <>
      <h1>Home</h1>
      <p>Esta es una página de ejemplo para crear React Router desde cero</p>
      <Link to='/about'>Ir a sobre nosotros</Link>
    </>
  )
}
