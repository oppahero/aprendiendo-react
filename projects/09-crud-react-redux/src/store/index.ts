import { Middleware, configureStore } from "@reduxjs/toolkit";
import usersReducer, { UserWithId, rollbackUser } from "./users/slice";
import { toast } from "sonner";

const persistanceLocalStorageMiddleware: Middleware =
  (store) => (next) => (action) => {
    console.log(store.getState());
    next(action);
    console.log(store.getState());
    localStorage.setItem("__redux_state__", JSON.stringify(store.getState()));
  };

const syncWithDatabase: Middleware = (store) => (next) => (action) => {
  const { type, payload } = action;
  const previousState = store.getState();
  console.log(store.getState());
  
  next(action);
  
  console.log(store.getState());

  // Actualización de forma optimista: El UI se actualiza visualmente
  // pero realmente la ejecución de la acción está en proceso

  if (type === "users/deleteUserById") {
    const userIdToRemove = payload;
    const userToRemove = previousState.users.find(
      (user: UserWithId) => user.id === userIdToRemove
    );

    fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok)
          toast.success(`Usuario ${userIdToRemove} eliminado correctamente`);
        else throw new Error("Error al eliminar el usuario");
      })
      .catch((err) => {
        toast.error(`Error elimando usuario ${userIdToRemove}`);
        if (userToRemove) store.dispatch(rollbackUser(userToRemove));
        console.log(err);
      });
  }
};

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(persistanceLocalStorageMiddleware)
      .concat(syncWithDatabase);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
