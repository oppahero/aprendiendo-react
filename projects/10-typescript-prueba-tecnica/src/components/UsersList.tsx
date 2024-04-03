/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { SortBy, type User } from '../types.d'

interface Props {
  users: User[]
  showColors: boolean
  deleteUser: (uuid: string) => void
  changeSorting: (sort: SortBy) => void
}

export function UsersList ({ changeSorting, users, showColors, deleteUser }: Props) {
  return (
    <table width='100%'>
      <thead>
        <tr>
          <th>Foto</th>
          <th className='pointer' onClick={() => { changeSorting(SortBy.NAME) }}>Nombre</th>
          <th className='pointer' onClick={() => { changeSorting(SortBy.LAST) }}>Apellido</th>
          <th className='pointer' onClick={() => { changeSorting(SortBy.COUNTRY) }}>Pais</th>
          <th >Acciones</th>
        </tr>
      </thead>
      <tbody className={ showColors ? 'table--showColors' : ''}>
        {users.map((user, index: number) => {
          // const backgroundColor = index % 2 === 0 ? '#333' : '#555'
          // const style = showColors ? backgroundColor : 'transparent'

          return (
            <tr key={user.login.uuid} >
              <td>
                <img src={user.picture.thumbnail} alt="User image" />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button onClick={() => { deleteUser(user.login.uuid) }}>Borrar</button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
