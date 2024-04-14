/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchUsers } from '../services/users.ts'
import { type User } from '../types'

export const useUsers = () => {
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    refetch,
    fetchNextPage
  } = useInfiniteQuery<{ nextCursor?: number, users: User[] }>({
    queryKey: ['users'],
    queryFn: fetchUsers,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 3
  })

  return {
    users: data?.pages.flatMap((page) => page.users) ?? [],
    isLoading,
    isError,
    hasNextPage,
    refetch,
    fetchNextPage
  }
}
