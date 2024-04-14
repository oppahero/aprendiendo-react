/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useUsers } from '../hooks/useUsers'

export const Results = () => {
  const { users } = useUsers()

  return <h3>Results {users.length}</h3>
}
