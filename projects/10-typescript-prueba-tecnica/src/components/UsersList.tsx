import { type User } from '../types.d'

interface Props {
  users: User[]
  showColors: boolean
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function UsersList ({ users, showColors }: Props) {
  return (
    <table width='100%'>
      <thead>
        <tr>
          <th>Foto</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Pais</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index: number) => {
          const backgroundColor = index % 2 === 0 ? '#333' : '#555'
          const style = showColors ? backgroundColor : 'transparent'

          return (
            <tr key={user.login.uuid} style={{ backgroundColor: style }}>
              <td>
                <img src={user.picture.thumbnail} alt="User image" />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button>Borrar</button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
