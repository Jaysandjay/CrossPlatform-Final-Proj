import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/index';


export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActionPaths: ['payload.date', 'payload.updates.date'],
                ignoredPaths: ['expenses']
            }
        })
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;