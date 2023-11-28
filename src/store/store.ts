import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { eventsApi } from "./eventsApi";
import { usersApi } from "./usersApi";

const rootReducer = combineReducers({
  [eventsApi.reducerPath]: eventsApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  // Другие ваши редюсеры здесь
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(eventsApi.middleware, usersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
