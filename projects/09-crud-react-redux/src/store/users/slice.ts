import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type UserId = string

export interface User {
  name: string
  email: string
  github: string
}

export interface UserWithId extends User {
  id: UserId
}

const initialState: UserWithId[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@gmail.com",
    github: "john",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@gmail.com",
    github: "jane",
  },
  {
    id: "3",
    name: "Juls Smith",
    email: "jusl@gmail.com",
    github: "julsj",
  },
];

export const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    deleteUserById: (state, action: PayloadAction<UserId>) => {
      const id = action.payload
      return state.filter((user) => user.id !== id)
    }
  },
})

export default usersSlice.reducer
export const { deleteUserById } = usersSlice.actions
