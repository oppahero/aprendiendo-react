/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type APIResults } from '../types.d'

interface FetchParams {
  pageParam?: number
}

const delay = async (ms: number) => await new Promise((resolve) => setTimeout(resolve, ms))

export const fetchUsers = async ({ pageParam = 1 }: FetchParams) => {
  await delay(1000)

  return await fetch(`https://randomuser.me/api?results=3&seed=midudev&page=${pageParam}`)
    .then(async (res) => {
      if (!res.ok) throw new Error('Error en la petición')
      return await res.json()
    })
    .then((res: APIResults) => {
      const currentPage = Number(res.info.page)
      const nextCursor = currentPage > 3 ? undefined : currentPage + 1
      return {
        users: res.results,
        nextCursor
      }
    })
}
