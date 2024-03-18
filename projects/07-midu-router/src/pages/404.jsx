import { Link } from '../Link.jsx'
export default function Page404 () {
  return (
    <>
      <div>
        <h1>This is NOT FINE</h1>
        <img src='https://midu.dev/images/this-is-fine-404.gif' alt='Gif del perro This is fine quemándose' />
      </div>
      <Link to='/'>Ir a Home</Link>
    </>
  )
}
