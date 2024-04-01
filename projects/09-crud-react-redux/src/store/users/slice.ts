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

// ? Con Redux toolkit se puede mutar el estado debido al Immer (hacerle push por ejemplo)
// Algo que fuera de esto (useState) se debe de evitar 

export const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    addNewUser: (state, action: PayloadAction<User>) => {
      const id = crypto.randomUUID()
      state.push( {id,...action.payload})
    },
    deleteUserById: (state, action: PayloadAction<UserId>) => {
      const id = action.payload
      return state.filter((user) => user.id !== id)
    },
    rollbackUser: (state, action: PayloadAction<UserWithId>) => {
      const isUserAlreadyDefined = state.some(user => user.id === action.payload.id)
      if(!isUserAlreadyDefined){
        state.push(action.payload)
      }
    }
  },
})

export default usersSlice.reducer
export const { addNewUser, deleteUserById, rollbackUser } = usersSlice.actions
