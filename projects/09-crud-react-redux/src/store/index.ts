import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './users/slice'


const persistanceLocalStorageMiddleware = (store) => (next) => (action) => {
    next(action)
    localStorage.setItem('__redux_state__', JSON.stringify(store.getState()))
}

export const store = configureStore({
    reducer: {
        users: usersReducer,
    },
    middleware:(getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(persistanceLocalStorageMiddleware)
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
