import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const DEFAULT_STATE: UserWithId[] = [
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


export type UserId = string

export interface User {
  name: string
  email: string
  github: string
}

export interface UserWithId extends User {
  id: UserId
}

// ? Ejemplo de una Inmediatly Invoked function expression (IIFE)
// Es una función que es llamada inmediatamente despúes de ser definida
const initialState: UserWithId[] = ( ()=> {
  const persistedState = localStorage.getItem('__redux_state__')
  if (persistedState) return JSON.parse(persistedState).users
  return DEFAULT_STATE
})()

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
